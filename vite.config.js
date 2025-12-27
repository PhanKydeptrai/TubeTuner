import { defineConfig } from 'vite';
import { crx } from '@crxjs/vite-plugin';
import manifestBase from './src/manifest.json';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig(({ mode }) => {
  const isFirefox = mode === 'firefox';

  // Create a copy of the manifest to customize for each browser
  const manifest = { ...manifestBase };

  if (isFirefox) {
    // Automatically add Firefox-specific configuration
    manifest.browser_specific_settings = {
      gecko: {
        id: "8aec21ca-47ea-4ca1-b62f-068fb3ec4069",
        strict_min_version: "109.0"
      }
    };
    // Ensure Firefox platform receives the correct background script
    manifest.background = {
      scripts: ["background.js"],
      type: "module"
    };
  }

  return {
    root: resolve(__dirname, 'src'), // Set the root of the source code to the src directory
    build: {
      outDir: resolve(__dirname, isFirefox ? 'dist/firefox' : 'dist/chrome'),
      emptyOutDir: true,
      rollupOptions: {
        input: {
          // Declare HTML pages if Vite does not automatically detect them
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
          const interfaceCss = fs.readFileSync(resolve(__dirname, 'src/interface.css'), 'utf-8');
          this.emitFile({
            type: 'asset',
            fileName: 'interface.css',
            source: interfaceCss
          });
        }
      },
      crx({ manifest }),
    ],
  };
});