import { URL, fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(
  ({ command /* mode, isSsrBuild, isPreview */ }) => ({
    plugins: [vue()],

    resolve: {
      alias: {
        '@nag5000/vue-view-transitions': fileURLToPath(
          new URL('./src/lib/index.ts', import.meta.url)
        ),
        '@demo': fileURLToPath(new URL('./src/demo', import.meta.url)),
      },
    },

    root: command === 'serve' ? 'src/demo' : 'src/lib',

    build: {
      lib: {
        entry: fileURLToPath(new URL('./src/lib/index.ts', import.meta.url)),
        formats: ['es'],
      },
      outDir: fileURLToPath(new URL('./dist', import.meta.url)),
      emptyOutDir: true,
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue',
          },
        },
      },
    },
  })
)
