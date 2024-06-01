import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ command }) => {
  if (command === "serve") {
    return {
      plugins: [react()],
    };
  } else {
    // command === 'build'
    return {
      plugins: [react()],
      build: {
        target: "es2022",
        rollupOptions: {
          input: {
            "main": "./index.html",
            "firebase-messaging-sw": "./src/firebase-messaging-sw.js",
          },
          output: {
            entryFileNames: (chunkInfo) => {
              return chunkInfo.name === "firebase-messaging-sw"
                ? "[name].js" // Output service worker in root
                : "assets/[name]-[hash].js"; // Others in `assets/`
            },
          },
        },
      },
    };
  }
});