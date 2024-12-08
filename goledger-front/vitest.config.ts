import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib/vite.config.ts
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/setupTests.js"],
    // ui: true,
    // you might want to disable the `css: true` line, since we don't have
    // tests that rely on CSS -- and parsing CSS is slow.
    // I'm leaving it in here becasue often people want to parse CSS in tests.
    css: true,
    alias: {
      '@': path.resolve(__dirname, './src'), // Garante que `@` aponta para a pasta `src`
    },
  },
  server: {
    // to match sundae server expectation
    port: 3000,
    // exit if port 3000 is in use (to avoid CORS errors)
    // strict: true,
  },
});
