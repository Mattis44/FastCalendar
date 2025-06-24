import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.tsx"],
    format: ["esm", "cjs"],
    dts: {
        entry: "src/index.tsx",
        resolve: true,
    },
    clean: true,
    splitting: false,
    outDir: "dist",
});
