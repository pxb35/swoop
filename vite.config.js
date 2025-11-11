import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "/swoop_2/", // <-- add this line
  plugins: [react()],
});
