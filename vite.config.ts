import { defineConfig, loadEnv } from 'vite'
import preact from '@preact/preset-vite'
import { visualizer } from "rollup-plugin-visualizer";
//@ts-ignore
import { cwd } from 'process';

// https://vitejs.dev/config/
export default ({ mode }: { mode: string }) => defineConfig({
  plugins: [
    preact(),
    // visualizer({ open: true }),
  ],
  assetsInclude: ['**/*.svg'],
  base: loadEnv(mode, cwd()).VITE_BASE_PATH || '/',
  server: {
    host: '0.0.0.0'
  }
})
