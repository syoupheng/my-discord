import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";
// import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // eslint({
    //   cache: false,
    //   include: ["./src/**/*.tsx", "./src/**/*.ts"],
    // }),
  ],
  resolve: {
    alias: [{ find: "@", replacement: path.resolve(__dirname, "src") }],
  },
});
