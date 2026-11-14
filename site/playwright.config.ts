import { defineConfig } from "@playwright/test";

// Studio QA config. Tests live in tests/e2e/.
// Start the site yourself first (`npm run dev` in this folder) — the printed
// port may be 3000 or 3001 if 3000 is taken; pass --port or edit baseURL.
export default defineConfig({
  testDir: "./tests/e2e",
  use: {
    baseURL: "http://localhost:3000",
  },
});
