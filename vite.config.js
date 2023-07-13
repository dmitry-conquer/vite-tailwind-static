import viteCompression from "vite-plugin-compression";
import { createHtmlPlugin } from "vite-plugin-html";
import { defineConfig } from "vite";
import path from "path";

const pages = [
  { name: "index", path: "./src/index.html" },
  { name: "about", path: "./src/about.html" },
];
const pagesInput = {};

pages.forEach(page => {
  pagesInput[page.name] = page.path;
});

export default defineConfig({
  root: "src",
  resolve: {
    alias: {
      "/~/": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      input: {
        ...pagesInput,
      },
      output: {
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
            return "assets/images/[name]-[hash][extname]";
          }

          if (/\.(ttf|otf|fnt|woff)$/.test(name ?? "")) {
            return "assets/fonts/[name]-[hash][extname]";
          }

          if (/\.css$/.test(name ?? "")) {
            return "assets/css/[name]-[hash][extname]";
          }

          return "assets/[name]-[hash][extname]";
        },
      },
    },
    outDir: "../dist",
    emptyOutDir: true,
    script: [],
  },
  server: {
    port: 3000,
    host: "0.0.0.0",
    hmr: true,
  },
  plugins: [
    viteCompression(),
    createHtmlPlugin({
      minify: true,
    }),
  ],
});
