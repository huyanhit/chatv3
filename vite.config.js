import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'
export default ({ mode }) => {
  return defineConfig({
    plugins: [
      vue(),
    ],
    server: {
      host: 'localhost',
      port: '8080',
    },
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm-bundler.js',
        '@': resolve(__dirname, './src'),
      },
    },
  });
}


