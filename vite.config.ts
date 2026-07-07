import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  resolve: {
    // Native tsconfig path resolution (Vite 8+ built-in, replaces vite-tsconfig-paths plugin)
    tsconfigPaths: true,
  },
  plugins: [
    tailwindcss(),
    TanStackRouterVite({ autoCodeSplitting: true }),
    tanstackStart({
      server: { entry: "src/server.ts" },
    }),
    react(),
  ],
});
