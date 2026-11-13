// Belt smart setup. Holds the AI keys so they never ship in the app.
//   judge        Gemini listens to a clip of the song (and the lead vocal, if given)
//   split_start  Demucs (open source, run on Replicate) separates a song into vocals + the rest
//   split_poll   checks the separation
//   fetch_output streams one separated part back to the app
//   words_start  WhisperX (open source, on Replicate) times every sung word on the separated vocal
//   words_poll   checks it and returns the words with their times
// Only signed-in Belt users can call it.
import { createClient } from "npm:@supabase/supabase-js@2";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (b: unknown, s = 200) =>
  new Response(JSON.stringify(b), { status: s, headers: { ...CORS, "Content-Type": "application/json" } });
const env = (k: string) => {
  const v = Deno.env.get(k);
  if (!v) throw new Error(`${k} is not set in the function secrets`);
  return v;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  try {
    const auth = req.headers.get("Authorization") || "";
    // the app's own public key comes with every request; older projects also have SUPABASE_ANON_KEY
    const key = req.headers.get("apikey") || Deno.env.get("SUPABASE_ANON_KEY") || Deno.env.get("SUPABASE_PUBLISHABLE_KEY") || "";
    const sb = createClient(env("SUPABASE_URL"), key);
    const { data } = await sb.auth.getUser(auth.replace(/^Bearer\s+/i, ""));
    if (!data?.user) return json({ error: "Sign in to use smart setup" }, 401);
    const body = await req.json();
    console.log("belt-ai action:", body.action);
    if (body.action === "judge") return json(await judge(body));
    if (body.action === "split_start") return json(await splitStart(body));
    if (body.action === "split_poll") return json(await splitPoll(body));
    if (body.action === "fetch_output") return await fetchOutput(body);
    if (body.action === "words_start") return json(await wordsStart(body));
    if (body.action === "words_poll") return json(await wordsPoll(body));
    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    const msg = String((e as Error)?.message || e);
    console.error("belt-ai failed:", msg); // shows in Supabase > Edge Functions > belt-ai > Logs
    return json({ error: msg }, 500);
  }
});

/* ---------- Gemini: the judge that listens ---------- */
const MODELS = [Deno.env.get("GEMINI_MODEL"), "gemini-3.8-flash", "gemini-3.5-flash", "gemini-flash-latest", "gemini-2.5-flash"]
  .filter(Boolean) as string[];

async function judge({ song, backing, vocal, guess }: { song?: string; backing?: string; vocal?: string; guess?: { title?: string; artist?: string } }) {
  const key = env("GEMINI_API_KEY");
  if (song) return judgeSong(key, song, guess);
  const prompt =
    `You check uploads for Belt, a karaoke app. Clip A is the start of a backing track the user bought. ` +
    `Clip B is part of the separate lead-vocal file for the same song. We think the song is ` +
    `"${guess?.title || "unknown"}" by ${guess?.artist || "unknown"}. Listen to both clips and answer only in JSON. ` +
    `Write any problems as one short, plain sentence telling the user what to fix.`;
  const schema = {
    type: "OBJECT",
    properties: {
      backingIsInstrumental: { type: "BOOLEAN", description: "Clip A has no lead vocal (backing vocals are fine)" },
      countInSeconds: { type: "NUMBER", description: "Seconds of clicks or count-in before the music starts in clip A, 0 if none" },
      vocalIsSoloLead: { type: "BOOLEAN", description: "Clip B is mostly one lead singer with little or no instruments" },
      sameSong: { type: "BOOLEAN", description: "Clip A and clip B are the same song" },
      matchesGuess: { type: "BOOLEAN", description: "The song is the one we think it is" },
      heardTitle: { type: "STRING", description: "The song title you hear, if you recognize it" },
      heardArtist: { type: "STRING", description: "The original artist, if you recognize it" },
      problems: { type: "ARRAY", items: { type: "STRING" }, description: "Problems the user should fix, empty if none" },
    },
    required: ["backingIsInstrumental", "countInSeconds", "vocalIsSoloLead", "sameSong", "matchesGuess", "problems"],
  };
  const payload = {
    contents: [{
      parts: [
        { text: prompt },
        { text: "Clip A:" }, { inline_data: { mime_type: "audio/wav", data: backing } },
        { text: "Clip B:" }, { inline_data: { mime_type: "audio/wav", data: vocal } },
      ],
    }],
    generationConfig: { responseMimeType: "application/json", responseSchema: schema, temperature: 0 },
  };
  return askGemini(key, payload);
}

// One file: the song as people normally hear it, with the singer.
async function judgeSong(key: string, song: string, guess?: { title?: string; artist?: string }) {
  const prompt =
    `You check uploads for Belt, a karaoke app. This is a clip of a song the user owns. It should be a normal ` +
    `recording with a lead singer, so the app can separate the singer from the band. We think it is ` +
    `"${guess?.title || "unknown"}" by ${guess?.artist || "unknown"}. Listen and answer only in JSON. ` +
    `Write any problems as one short, plain sentence telling the user what to fix.`;
  const schema = {
    type: "OBJECT",
    properties: {
      hasLeadVocal: { type: "BOOLEAN", description: "A lead singer is clearly audible (not an instrumental or backing track)" },
      matchesGuess: { type: "BOOLEAN", description: "The song is the one we think it is" },
      heardTitle: { type: "STRING", description: "The song title you hear, if you recognize it" },
      heardArtist: { type: "STRING", description: "The original artist, if you recognize it" },
      goodQuality: { type: "BOOLEAN", description: "Clean studio-quality audio, not a phone recording, live bootleg or heavily distorted file" },
      problems: { type: "ARRAY", items: { type: "STRING" }, description: "Problems the user should fix, empty if none" },
    },
    required: ["hasLeadVocal", "matchesGuess", "goodQuality", "problems"],
  };
  return askGemini(key, {
    contents: [{ parts: [{ text: prompt }, { inline_data: { mime_type: "audio/wav", data: song } }] }],
    generationConfig: { responseMimeType: "application/json", responseSchema: schema, temperature: 0 },
  });
}

async function askGemini(key: string, payload: unknown) {
  let lastErr = "";
  for (const m of MODELS) {
    const r = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent`, {
      method: "POST",
      headers: { "x-goog-api-key": key, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(25000),
    });
    if (r.status === 404) { lastErr = await r.text(); continue; }
    const j = await r.json();
    if (!r.ok) throw new Error(`Gemini ${r.status} (${m}): ${j?.error?.message || "no details"}`);
    const text = (j.candidates?.[0]?.content?.parts || []).map((p: { text?: string }) => p.text || "").join("") || "{}";
    return { model: m, ...JSON.parse(text) };
  }
  throw new Error("No Gemini model available: " + lastErr.slice(0, 200));
}

/* ---------- Replicate: Demucs separation, a few cents per song ---------- */
const RP = "https://api.replicate.com/v1";
const rpToken = () => env("REPLICATE_API_TOKEN").trim().replace(/^["']|["']$/g, "").replace(/^Bearer\s+/i, "");
const rpHeaders = () => ({ Authorization: `Bearer ${rpToken()}`, "Content-Type": "application/json" });
const versions: Record<string, string> = {};

async function rp(path: string, init?: RequestInit) {
  const r = await fetch(RP + path, { ...init, headers: rpHeaders() });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(`Replicate ${r.status} on ${path.split("?")[0]}: ${j?.detail || j?.title || "no details"}`);
  return j;
}
async function latest(model: string) {
  if (versions[model]) return versions[model];
  const m = await rp(`/models/${model}`);
  const v = m?.latest_version?.id;
  if (!v) throw new Error(`Couldn't find the ${model} model on Replicate`);
  return (versions[model] = v);
}
const demucsVersion = () => latest(Deno.env.get("DEMUCS_MODEL") || "cjwbw/demucs");

async function splitStart({ url }: { url: string }) {
  const version = await demucsVersion();
  const p = await rp("/predictions", {
    method: "POST",
    body: JSON.stringify({ version, input: { audio: url, stem: "vocals", output_format: "mp3" } }),
  });
  return { id: p.id };
}

async function splitPoll({ id }: { id: string }) {
  const p = await rp(`/predictions/${encodeURIComponent(id)}`);
  if (p.status === "succeeded") return { status: "completed", parts: Object.keys(p.output || {}).filter((k) => p.output[k]) };
  if (p.status === "failed" || p.status === "canceled") return { status: "error", error: p.error || "Separation failed" };
  return { status: "processing" };
}

// Streams one part (vocals, no_vocals, drums, bass, other...) from Replicate's file host back to the app.
async function fetchOutput({ id, model }: { id: string; model: string }) {
  const p = await rp(`/predictions/${encodeURIComponent(id)}`);
  const out = p.output || {};
  const key = model === "instrumental" ? ["no_vocals", "no_stem", "accompaniment", "instrumental"].find((k) => out[k]) : model;
  // a part can come back as a plain link, a list with one link, or an object holding the link
  const pick = (v: unknown): string | undefined =>
    typeof v === "string" ? v : Array.isArray(v) ? pick(v[0]) : v && typeof v === "object" ? pick((v as Record<string, unknown>).url ?? (v as Record<string, unknown>).uri ?? (v as Record<string, unknown>).href) : undefined;
  const link = key ? pick(out[key]) : undefined;
  console.log("fetch_output", model, "->", key, typeof out[key as string], link ? new URL(link).hostname : "no link");
  if (!link) return json({ error: `No ${model} part`, parts: Object.keys(out).filter((k) => out[k]) }, 404);
  const host = new URL(link).hostname;
  if (!/(^|\.)replicate\.(delivery|com)$/.test(host)) return json({ error: `Unexpected file host ${host}` }, 400);
  // newer Replicate file links on api.replicate.com need the token; replicate.delivery links are public
  const r = await fetch(link, host.endsWith("replicate.com") ? { headers: { Authorization: `Bearer ${rpToken()}` } } : undefined);
  if (!r.ok || !r.body) { console.error("download failed", r.status, host); return json({ error: `Couldn't download the ${model} part (${r.status})` }, 502); }
  return new Response(r.body, { headers: { ...CORS, "Content-Type": "application/octet-stream" } });
}

// Word timing: run WhisperX on the separated vocal, with the lyrics as a hint, and keep word-level times.
async function wordsStart({ splitId, prompt }: { splitId: string; prompt?: string }) {
  const sp = await rp(`/predictions/${encodeURIComponent(splitId)}`);
  const vocal = sp?.output?.vocals;
  if (!vocal) throw new Error("The separated vocal isn't ready yet");
  const version = await latest(Deno.env.get("WHISPERX_MODEL") || "victor-upmeet/whisperx");
  const p = await rp("/predictions", {
    method: "POST",
    body: JSON.stringify({ version, input: { audio_file: vocal, language: "en", align_output: true, ...(prompt ? { initial_prompt: prompt.slice(0, 800) } : {}) } }),
  });
  return { id: p.id };
}
async function wordsPoll({ id }: { id: string }) {
  const p = await rp(`/predictions/${encodeURIComponent(id)}`);
  if (p.status === "succeeded") return { status: "completed", data: p.output };
  if (p.status === "failed" || p.status === "canceled") return { status: "error", error: p.error || "Word timing failed" };
  return { status: "processing" };
}
