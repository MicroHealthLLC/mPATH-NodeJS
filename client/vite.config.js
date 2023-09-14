// import { fileURLToPath, URL } from 'node:url'

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//     vue(),
//   ],
//   resolve: {
//     alias: {
//       '@': fileURLToPath(new URL('./src', import.meta.url))
//     }
//   }
// })
import { defineConfig } from "vite";
import { createVuePlugin } from "vite-plugin-vue2";
import ViteComponents from "vite-plugin-components";
import { resolve } from "path";

const config = defineConfig({
  resolve: {
    // extensions: ['.js', '.vue'], 
    alias: {
      // 'vue$': 'vue/dist/vue.esm.js',
      "@": `${resolve(__dirname, "src")}`,
    },
  },

  base: "/vue-template/",

  build: {
    minify: true,
    commonjsOptions: {
      include: [/linked-dep/, /node_modules/],
    }
  },
  optimizeDeps: {
    include: ['linked-dep'],
  },
  plugins: [createVuePlugin({}), ViteComponents({ transformer: "vue2" })],

  server: {
    port: 8080,
  },
});

export default config;