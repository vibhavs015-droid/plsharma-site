# Third-party notices — production dependencies of `site/`

Attribution for third-party software shipped with or copied into the production site,
per the charter rule (permissive licences: copying allowed with attribution).

| Package | Version | Licence | Copyright holder / source |
|---|---|---|---|
| next | 16.4.6 | MIT | Vercel — github.com/vercel/next.js |
| react, react-dom | 19.3.0 | MIT | Meta Platforms — github.com/facebook/react |
| radix-ui | 1.8.1 | MIT | WorkOS — github.com/radix-ui/primitives |
| lucide-react | 1.72.0 | ISC | Lucide Contributors — github.com/lucide-icons/lucide |
| tailwindcss | 4.3.3 | MIT | Tailwind Labs — github.com/tailwindlabs/tailwindcss |
| class-variance-authority | 0.7.1 | Apache-2.0 | Joe Bell — github.com/joe-bell/cva |
| tw-animate-css | 1.4.0 | MIT | Wombosvideo — github.com/Wombosvideo/tw-animate-css |
| @fontsource/playfair-display | 5.3.0 | OFL-1.1 (package) | Fontsource; the Playfair Display font itself is © The Playfair Display Project Authors, licensed under the SIL Open Font License 1.1 |
| Inter (via next/font/google) | — | SIL OFL 1.1 | © The Inter Project Authors |
| sharp | 0.35.5 | Apache-2.0 | Lovell Fuller — github.com/lovell/sharp (image pipeline at request/build time) |
| shadcn/ui components (copied source in `site/components/ui`) | Nova preset | MIT | shadcn — github.com/shadcn-ui/ui; restyled into this project's token system |

Frontend studio tooling (dev-only, never shipped): see `TOOLING_LOG.md`
(Playwright Apache-2.0; axe-core MPL-2.0; Lighthouse CI Apache-2.0).

Full licence texts ship with each package (`node_modules/<pkg>/LICENSE`). If this
repository is ever distributed, regenerate a complete notice file from
`npx license-checker` at that time.
