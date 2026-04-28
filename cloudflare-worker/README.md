# TQL Interrogation Engine — Cloudflare Worker

A tiny Cloudflare Worker that proxies the Interrogation Engine's request to the
Anthropic API. The API key lives only on the Worker (as a secret); the static
site never sees it.

## What you need

1. A free **Cloudflare** account — https://dash.cloudflare.com/sign-up
2. An **Anthropic API key** — https://console.anthropic.com/ (Settings → API
   Keys → Create Key). A small balance (~$5) will cover thousands of these
   short calls; each one uses a few hundred tokens of `claude-haiku-4-5`.

## Deploy (5 commands)

```sh
# 1) From this folder
cd site/cloudflare-worker

# 2) Log into Cloudflare via your browser
npx wrangler@latest login

# 3) Store your Anthropic API key as a Worker secret
#    Paste the key when prompted; it is encrypted at rest, never written
#    to the repo, and never shipped to the browser.
npx wrangler@latest secret put ANTHROPIC_API_KEY

# 4) Deploy
npx wrangler@latest deploy

# 5) Wrangler prints a URL like:
#    https://tql-interrogate.<your-subdomain>.workers.dev
#    Copy that URL.
```

## Wire the site to the Worker

Open `site/index.html` and edit the `TQL_INTERROGATE_URL` line near the top of
the inline `<script type="text/babel">` block:

```html
<script>window.TQL_INTERROGATE_URL = 'https://tql-interrogate.<your-subdomain>.workers.dev';</script>
```

Commit, push to `main`, and GitHub Pages will rebuild in 1–2 minutes. The
Interrogation Engine on the live site will now hit the Worker, which calls
Anthropic, parses the JSON, and returns a real `{ assumption, reposed_a,
reposed_b }` payload.

## CORS

Edit `ALLOWED_ORIGINS` in `worker.js` and re-deploy if you bind a custom
domain. The default list already includes your GitHub Pages origin
(`https://suxiayang.github.io`) and `localhost` for local previewing.

## Updating the Worker later

```sh
cd site/cloudflare-worker
npx wrangler@latest deploy
```

That's it — no rebuild on the GitHub Pages side, since the URL stays the same.

## Cost guardrails baked in

- `MAX_QUESTION_LEN = 500` characters — input is truncated before being sent
  upstream.
- `MAX_OUTPUT_TOKENS = 400` — the model reply is capped well below the 60-word
  schema we ask for.
- Anthropic's `claude-haiku-4-5` is the cheapest tier; each call typically
  costs a fraction of a cent.

## Rotating the key

```sh
npx wrangler@latest secret put ANTHROPIC_API_KEY   # paste the new key
```

The next request picks up the new value automatically.
