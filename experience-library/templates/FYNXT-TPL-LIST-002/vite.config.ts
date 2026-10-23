import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Minimal Vite config: this template is a library of components consumed by a host
// app, not a standalone app. Vite is used here only to power Vitest's test runner
// (jsdom + React) — see README.md for why this stack was chosen and what remains a
// developer decision.
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
    globals: true,
  },
});
