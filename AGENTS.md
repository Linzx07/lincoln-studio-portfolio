# Portfolio deployment preference

Whenever this portfolio is updated, validate the change and deploy it directly to Lincoln's Cloudflare Worker in the same task using the repository's `wrangler.jsonc` and Wrangler. The production destination is `https://lincoln-studio-portfolio.lincolnbcfreitas.workers.dev/`. Verify that URL after deployment and send it to Lincoln. Preserve the existing audience and Cloudflare hosting configuration. Do not deploy through ChatGPT Sites or use the `chatgpt.site` address for future updates. Do not leave a requested portfolio update as a local-only change unless Lincoln explicitly asks for that.

When showing the portfolio to Lincoln, also follow the local preview preference in `MEMORIES.md`: verify and send the current local IP URL with the preview server running.
