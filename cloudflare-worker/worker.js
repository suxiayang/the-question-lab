// TQL Interrogation Engine — Cloudflare Worker proxy to Anthropic API.
// Reads ANTHROPIC_API_KEY from environment (set via `wrangler secret put`).
// Accepts POST { question, lang } and returns { assumption, reposed_a, reposed_b }.

const MODEL = 'claude-haiku-4-5';
const MAX_QUESTION_LEN = 500;
const MAX_OUTPUT_TOKENS = 400;

// Tighten this list once you know your final domains. Empty string means allow any
// origin (echoes whatever the browser sent). Keep at least your GitHub Pages origin
// and any custom domain you'll bind later.
const ALLOWED_ORIGINS = [
  'https://suxiayang.github.io',
  // 'https://your-custom-domain.example',
  'http://localhost:8000',
  'http://localhost:8765',
];

export default {
  async fetch(request, env) {
    const origin = request.headers.get('origin') || '';
    const corsHeaders = makeCors(origin);

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    if (request.method !== 'POST') {
      return json({ error: 'use POST' }, 405, corsHeaders);
    }

    if (!env.ANTHROPIC_API_KEY) {
      return json({ error: 'server not configured (missing ANTHROPIC_API_KEY)' }, 500, corsHeaders);
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return json({ error: 'invalid JSON body' }, 400, corsHeaders);
    }

    const question = String(body.question || '').trim().slice(0, MAX_QUESTION_LEN);
    const lang = body.lang === 'zh' ? 'zh' : 'en';
    if (!question) return json({ error: 'empty question' }, 400, corsHeaders);

    const langInstr = lang === 'en' ? 'Reply in English only.' : '只用简体中文回答。';
    const userPrompt = `You are an analytical philosopher hosting a podcast called The Question Lab. ${langInstr} A user submits the question: "${question}".

Return ONLY a JSON object with this exact shape (no prose, no markdown fences, no commentary before or after):
{
  "assumption": "<one sentence (under 18 words) naming the hidden assumption inside the user's question>",
  "reposed_a": "<a sharper philosophical question (under 14 words)>",
  "reposed_b": "<a different sharper philosophical question (under 14 words)>"
}`;

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_OUTPUT_TOKENS,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!upstream.ok) {
      const errText = await upstream.text();
      return json({ error: 'upstream error', status: upstream.status, detail: errText.slice(0, 500) }, 502, corsHeaders);
    }

    const data = await upstream.json();
    const text = data?.content?.[0]?.text || '';
    const match = text.match(/\{[\s\S]*\}/);
    let parsed;
    try {
      parsed = JSON.parse(match ? match[0] : text);
    } catch {
      return json({ error: 'failed to parse model output', raw: text.slice(0, 500) }, 502, corsHeaders);
    }

    const out = {
      assumption: String(parsed.assumption || '').slice(0, 240),
      reposed_a:  String(parsed.reposed_a  || '').slice(0, 200),
      reposed_b:  String(parsed.reposed_b  || '').slice(0, 200),
    };
    if (!out.assumption || !out.reposed_a || !out.reposed_b) {
      return json({ error: 'incomplete model output', raw: parsed }, 502, corsHeaders);
    }
    return json(out, 200, corsHeaders);
  },
};

function makeCors(origin) {
  const allow = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0] || '*';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'content-type',
    'Access-Control-Max-Age': '600',
    'Vary': 'Origin',
  };
}

function json(obj, status, cors) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...cors },
  });
}
