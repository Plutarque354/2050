# Diplomatic Atlas

Personal dashboard for the fictional Conseil de Paix mondiale simulation at UQAM. The UK is the default perspective. The 23 confirmed delegations start with unknown positions. The scenario’s Beanstalk crisis in Ecuador and the user-supplied Diego Garcia initiative are separate records.

## Run in WebStorm

Extract the ZIP, open its DiplomaticAtlas folder in WebStorm, and run `npm start` in the terminal with Node.js 22 or later. Open http://127.0.0.1:3000/. No npm install or frontend build is needed. WebStorm's built-in HTTP preview of `public/index.html` also supports manual mode. Keep the same browser and origin for access to the same local IndexedDB archive.

Start in Statements. Paste a publication or import TXT, text-based PDF, CSV, or JSON. Bulk import lets you correct each delegation and split a PDF into records before saving. Save a three- or four-line summary and review exact quotations before applying classifications. On World Map, switch between relationships toward a selected delegation and positions on a particular proposal. Countries contains complete statement histories. Proposals separates estimates from recorded ballots. Settings exports and restores the local database.

## Enable OpenAI analysis

Copy `.env.example` to `.env`. Set `OPENAI_API_KEY`, an `OPENAI_MODEL` your account supports for Responses structured outputs, and a random `OWNER_TOKEN` of 32 or more characters. The example file shows a command for generating a token. Restart the server and enter only the owner token in Settings. The browser keeps the token in memory for that session. Using Analyze sends the current publication, prior statements from that delegation, and proposal context to OpenAI. Use manual review for material you do not want to send. The API key stays on the server.

## Push to GitHub

The source is hosted in Plutarque354/2050. To work on it locally, clone the repository:

```sh
git clone https://github.com/Plutarque354/2050.git
cd 2050
```

## Deploy

For static hosting, publish the contents of `public/` as the site root. GitHub Pages supports manual mode and hash-based profile links. Its static host does not run the AI endpoint. Check your repository's Pages eligibility and audience before enabling it.

For a hosted AI endpoint, the supplied Wrangler config serves the app and API together. In the project folder, use `npx wrangler login`, `npx wrangler deploy`, and `npx wrangler secret put` for each of `OPENAI_API_KEY`, `OPENAI_MODEL`, and `OWNER_TOKEN`. The Worker checks the owner token and uses a Durable Object for rate limiting. To restrict access to the interface itself, configure access restrictions on the host. Local archives only move between browser origins through backup and restore.

## Source and verification

Scenario references use the course handout *2050 — Ascenseur en panne*, pp. 4 and 11–13. Voting uses the course procedures, arts. 2 and 16–20. Natural Earth provides reference boundaries. Leaflet 1.9.4 and PDF.js 4.10.38 are bundled. See [testing notes](docs/TESTING.md).
