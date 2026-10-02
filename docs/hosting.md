# Production hosting

Production URL: https://stageturner.app/

- Railway project: `c0304a85-32f4-4c81-b6b5-d1ee1c1363fb`
- Service `web`: `bf4cf1f9-e178-4111-8988-c34dddef6f29`
- Production environment: `a7c0abc6-ccb2-4295-a255-887d78537e3a`
- Docker nginx listens on8080; healthcheck `/health`. Only public site files/assets copied into container.
- Deploy from this checkout: `railway up --service web --detach`.
- GitHub repository source connection was rejected by Railway (`User does not have access to the repo`). Git pushes alone do not deploy Railway; use the CLI above.
- Cloudflare apex DNS-only CNAME `i0mup52f.up.railway.app`; verification TXT `_railway-verify`.
- `www` is proxied through Cloudflare and has a301 Page Rule to `https://stageturner.app/$1`, preserving the path. Railway's current plan allows only one custom domain per service, so do not add www there.
- GitHub Pages remains a fallback copy; no longer the domain's origin. Do not switch DNS back when an old Pages certificate completes.
