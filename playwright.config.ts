import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests/e2e",
  timeout: 30_000,
  use: { baseURL: "http://localhost:3100", headless: true },
  webServer: { command: "npm run build && npx next start -p 3100", url: "http://localhost:3100", reuseExistingServer: !process.env.CI, timeout: 180_000 },
  projects: [{ name: "chromium", use: { browserName: "chromium" } }],
});
