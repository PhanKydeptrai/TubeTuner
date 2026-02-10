import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifestBase from './src/manifest.json';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig(({ mode }) => {
  const isFirefox = mode === 'firefox';

  const manifest = { ...manifestBase };

  if (isFirefox) {
    manifest.browser_specific_settings = {
      gecko: {
        id: "{8aec21ca-47ea-4ca1-b62f-068fb3ec4069}",
        strict_min_version: "112.0",
        data_collection_permissions: {
          required: ["none"]
        }
      }
    };
    manifest.background = {
      scripts: ["background.js"],
      type: "module"
    };
  }

  return {
    base: './',
    root: resolve(__dirname, 'src'), // Set the root of the source code to the src directory
    envDir: resolve(__dirname), // Load .env from project root
    build: {
      outDir: resolve(__dirname, isFirefox ? 'dist/firefox' : 'dist/chrome'),
      emptyOutDir: true,
      rollupOptions: {
        input: {
          popup: resolve(__dirname, 'src/popup.html'),
        },
      },
    },
    plugins: [
      {
        name: 'copy-css',
        generateBundle() {
          const stylesCss = fs.readFileSync(resolve(__dirname, 'src/styles.css'), 'utf-8');
          this.emitFile({
            type: 'asset',
            fileName: 'styles.css',
            source: stylesCss
          });
        }
      },
      crx({ manifest }),
    ],
  };
});