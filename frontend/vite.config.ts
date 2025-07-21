import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  // resolve: {
  //   alias: {
  //     // '~' というエイリアスを、'./app' ディレクトリへの絶対パスとして設定する
  //     "~": path.resolve(__dirname, "./app"),
  //   },
  // },
  // server: {
  //   proxy: {
  //     // '${API_BASE_URL}' で始まるリクエストをAPI_BASE_URLに転送
  //     "${API_BASE_URL}": {
  //       target: "http://localhost:3000",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\${API_BASE_URL}/, ""),
  //     },
  //   },
  // },
});
