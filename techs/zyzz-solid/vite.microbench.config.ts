// Standalone microbench build for Zyzz on Solid (§4.2). The zyzz Vite plugin compiles every
// style()/variants() call ahead of time, rewrites each call site to precompiled props, and
// delivers the CSS through Vite's module graph. The emitted stylesheet is consolidated
// (cssCodeSplit:false) so ssr-entry.tsx can read it back as the `css` half of the
// { html, css } contract. solid({ ssr: true }) compiles the JSX to Solid's string-
// concatenation SSR renderer instead of the DOM one.
import { defineConfig } from "vite";
import solid from "@solidjs/vite-plugin";
import { zyzz } from "zyzz/vite";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const here = dirname(fileURLToPath(import.meta.url));

export default defineConfig(async () => ({
  root: here,
  // zyzz runs BEFORE solid so its transform sees the authored calls, not compiled JSX.
  plugins: [zyzz(), solid({ ssr: true })],
  define: { "process.env.NODE_ENV": '"production"' },
  build: {
    outDir: "dist/microbench",
    emptyOutDir: true,
    sourcemap: true,
    minify: false,
    cssCodeSplit: false,
    ssr: true,
    ssrEmitAssets: true, // SSR builds skip CSS assets by default — keep the zyzz sheet
    target: "node20",
    rollupOptions: {
      input: "./ssr-entry.tsx",
      external: [],
      preserveEntrySignatures: "strict",
      output: { format: "es", entryFileNames: "entry.mjs", assetFileNames: "styles[extname]" },
    },
  },
  ssr: { noExternal: true },
}));
