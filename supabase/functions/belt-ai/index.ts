// Belt smart setup. Holds the AI keys so they never ship in the app.
//   judge        Gemini listens to a clip of the song (and the lead vocal, if given)
//   split_start  AudioShake separates a full song into lead vocal + instrumental
//   split_poll   checks the separation
//   fetch_output streams one separated part back to the app
//   align_start  AudioShake starts word-level lyric alignment on the lead vocal
//   align_poll   checks the alignment and returns the word timings when done
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
    if (body.action === "judge") return json(await judge(body));
    if (body.action === "split_start") return json(await splitStart(body));
    if (body.action === "split_poll") return json(await splitPoll(body));
    if (body.action === "fetch_output") return await fetchOutput(body);
    if (body.action === "align_start") return json(await alignStart(body));
    if (body.action === "align_poll") return json(await alignPoll(body));
    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    return json({ error: String((e as Error)?.message || e) }, 500);
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
    });
    if (r.status === 404) { lastErr = await r.text(); continue; }
    const j = await r.json();
    if (!r.ok) throw new Error(j?.error?.message || `Gemini error ${r.status}`);
    const text = (j.candidates?.[0]?.content?.parts || []).map((p: { text?: string }) => p.text || "").join("") || "{}";
    return { model: m, ...JSON.parse(text) };
  }
  throw new Error("No Gemini model available: " + lastErr.slice(0, 200));
}

/* ---------- AudioShake: word-level lyric alignment ---------- */
const AS = "https://api.audioshake.ai";

async function getTask(id: string) {
  const r = await fetch(`${AS}/tasks/${encodeURIComponent(id)}`, { headers: { "x-api-key": env("AUDIOSHAKE_API_KEY") } });
  const j = await r.json();
  if (!r.ok) throw new Error(j?.message || `AudioShake error ${r.status}`);
  return j;
}
const linkOf = (t: { output?: { format?: string; link?: string }[] }, fmt?: string) =>
  ((t.output || []).find((o) => !fmt || o.format === fmt) || (t.output || [])[0])?.link;

async function splitStart({ url }: { url: string }) {
  const r = await fetch(`${AS}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": env("AUDIOSHAKE_API_KEY") },
    body: JSON.stringify({ url, targets: [{ model: "vocals_lead", formats: ["mp3"] }, { model: "instrumental", formats: ["mp3"] }] }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j?.message || j?.error?.message || JSON.stringify(j).slice(0, 300));
  return { id: j.id };
}

async function splitPoll({ id }: { id: string }) {
  const j = await getTask(id);
  const ts = j.targets || [];
  const bad = ts.find((t: { status: string }) => t.status === "error");
  if (bad) return { status: "error", error: bad.error?.message || "Separation failed" };
  if (!ts.length || ts.some((t: { status: string }) => t.status !== "completed")) return { status: "processing" };
  return { status: "completed" };
}

async function fetchOutput({ id, model }: { id: string; model: string }) {
  const j = await getTask(id);
  const t = (j.targets || []).find((x: { model: string }) => x.model === model);
  const link = t && linkOf(t, "mp3");
  if (!link) return json({ error: `No ${model} output yet` }, 404);
  const r = await fetch(link);
  if (!r.ok || !r.body) return json({ error: `Couldn't download the ${model} part` }, 502);
  return new Response(r.body, { headers: { ...CORS, "Content-Type": "application/octet-stream" } });
}

async function alignStart({ url, taskId, model, language }: { url?: string; taskId?: string; model?: string; language?: string }) {
  if (!url && taskId) { // align straight from a separated part
    const j = await getTask(taskId);
    const t = (j.targets || []).find((x: { model: string }) => x.model === (model || "vocals_lead"));
    url = t && linkOf(t, "mp3");
    if (!url) throw new Error("The separated vocal isn't ready yet");
  }
  const r = await fetch(`${AS}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-api-key": env("AUDIOSHAKE_API_KEY") },
    body: JSON.stringify({ url, targets: [{ model: "alignment", formats: ["json"], language: language || "en" }] }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j?.message || j?.error?.message || JSON.stringify(j).slice(0, 300));
  return { id: j.id };
}

async function alignPoll({ id }: { id: string }) {
  const r = await fetch(`${AS}/tasks/${encodeURIComponent(id)}`, { headers: { "x-api-key": env("AUDIOSHAKE_API_KEY") } });
  const j = await r.json();
  if (!r.ok) throw new Error(j?.message || `AudioShake error ${r.status}`);
  const t = (j.targets || [])[0];
  if (!t || t.status === "processing") return { status: "processing" };
  if (t.status === "error") return { status: "error", error: t.error?.message || "Alignment failed" };
  const out = (t.output || []).find((o: { format?: string }) => o.format === "json") || (t.output || [])[0];
  if (!out?.link) return { status: "error", error: "Alignment finished without a result file" };
  const data = await (await fetch(out.link)).json();
  return { status: "completed", data };
}
