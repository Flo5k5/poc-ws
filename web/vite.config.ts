import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import mkcert from "vite-plugin-mkcert";
// import dns from "dns";

// Explanations here about 127.0.0.1 instead of localhost: https://vitejs.dev/config/server-options.html#server-host
// Localhost can be set back with this uncommented following line.
// dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), "");
  const { VITE_PORT, HTTPS } = env;

  // Shell environment variables always have string values.
  const hasHttps = HTTPS === "true";

  return {
    plugins: [react(), ...(hasHttps ? [mkcert()] : [])],
    resolve: {
      alias: {
        src: path.resolve(__dirname, "./src"),
      },
    },
    server: {
      https: hasHttps,
      port: parseInt(VITE_PORT, 10),
      strictPort: true,
    },
  };
});
