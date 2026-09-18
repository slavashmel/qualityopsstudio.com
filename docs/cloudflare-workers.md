# Cloudflare Workers preview and cutover

## Preview deployment

The temporary Worker is intentionally separate from production. Always deploy
from a detached clean worktree, never from this potentially dirty Career
checkout:

```bash
CI=true pnpm run preview:deploy:clean
```

The command creates a temporary detached worktree from `HEAD`, restores
dependencies from the frozen lockfile, and deploys the Vinext artifact at
`dist/server/wrangler.json` as `qualityopsstudio-preview`. It then removes only
that temporary worktree. Do not add a Worker route, custom domain, or DNS
record as part of preview work. The Worker applies `X-Robots-Tag: noindex,
nofollow, noarchive` and returns a disallowing `robots.txt` only when the host
is the `qualityopsstudio-preview.*.workers.dev` preview URL.

## Current runtime inventory

- SSR is required on `/`: locale selection reads `NEXT_LOCALE` and
  `Accept-Language`, then redirects to `/en`, `/ru`, or `/sr`.
- The language selector writes `NEXT_LOCALE` in the browser with `Path=/`,
  `Max-Age=31536000`, and `SameSite=Lax`.
- The public site has no forms, database calls, `next/image`, or external image
  optimizer usage. The Worker therefore has no D1, R2, or Images bindings.
- `app/chatgpt-auth.ts`, `db/`, and `examples/d1/` are starter scaffolding and
  are not imported by public routes. Do not enable ChatGPT authentication or
  D1 without a separate design and binding review.

## Verification before cutover

1. Run `CI=true pnpm lint` and `CI=true pnpm test`.
2. Check `/`, `/en`, `/ru`, `/sr`, `/robots.txt`, `/sitemap.xml`, and
   `/favicon.svg` on the preview URL. Confirm locale redirects for both an
   `Accept-Language` header and a `NEXT_LOCALE` cookie.
3. Confirm the preview is SSR-rendered, its language switcher persists the
   cookie, its mailto CTA is intact, and browser console errors are absent.
4. Compare headers, canonical links, TLS, redirects, apex and `www` behavior
   with the existing VPS origin. Preview is expected to differ by its
   `workers.dev` hostname and noindex controls.
5. Before production routing, inspect the exact Cloudflare DNS and Worker-route
   diff. Keep `qualityopsstudio.com` and `www.qualityopsstudio.com` on the VPS
   for at least seven days after cutover.

## Rollback

If a production Worker route is later approved and fails verification, remove
only that Worker route. The existing `A` records and nginx proxy continue to
serve the VPS origin, so no application rollback or DNS rewrite is needed.
Do not disable nginx, the systemd service, or the VPS certificate while the
rollback window is open.

## Free-plan constraints

- The current public runtime fits Workers Free because it has no database,
  storage, image-transformation, or authentication binding.
- The prior image optimizer handler was removed: it required an `IMAGES`
  binding even though no public route uses `next/image`. Reintroducing image
  optimization requires a separate feature and cost review.
- Future D1, R2, SIWC/ChatGPT authentication, or custom caching must be
  explicitly configured and tested before a production deployment.
