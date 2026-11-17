import type { MetadataRoute } from "next";

/**
 * Web app manifest (TASK 12.7) — installed-app identity for Android.
 * Colours from the brand tokens (app/globals.css :root):
 * background --paper #faf6ec, theme --ink #282e3f — the same value the
 * layout's themeColor already ships. Icons are the generated
 * public/icons set (resized from app/icon.png, the site's canonical
 * raster mark); the existing favicon set in app/ is untouched and
 * keeps serving (icon.svg, icon.png, favicon.ico, apple-icon.png).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "P.L. Sharma And Company",
    short_name: "P.L. Sharma & Co.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf6ec",
    theme_color: "#282e3f",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
