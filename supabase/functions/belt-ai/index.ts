// Belt smart setup. Holds the AI keys so they never ship in the app.
//   judge        Gemini listens to short clips of the backing track and the lead vocal
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
    const sb = createClient(env("SUPABASE_URL"), env("SUPABASE_ANON_KEY"));
    const { data } = await sb.auth.getUser(auth.replace(/^Bearer\s+/i, ""));
    if (!data?.user) return json({ error: "Sign in to use smart setup" }, 401);
    const body = await req.json();
    if (body.action === "judge") return json(await judge(body));
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

async function judge({ backing, vocal, guess }: { backing: string; vocal: string; guess?: { title?: string; artist?: string } }) {
  const key = env("GEMINI_API_KEY");
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

async function alignStart({ url, language }: { url: string; language?: string }) {
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
