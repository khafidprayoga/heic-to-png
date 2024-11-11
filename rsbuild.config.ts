import { RsbuildConfig, defineConfig, loadEnv } from '@rsbuild/core';
import { pluginSvelte, PluginSvelteOptions } from '@rsbuild/plugin-svelte';
import { pluginImageCompress } from '@rsbuild/plugin-image-compress';

const { parsed, publicVars } = loadEnv();

const svelteConfig: PluginSvelteOptions = {
  svelteLoaderOptions: {},
  preprocessOptions: {
    postcss: true,
  },
};

const Config: RsbuildConfig = {
  plugins: [pluginSvelte(svelteConfig), pluginImageCompress(['png', 'svg'])],
  html: {
    title: 'HEIC to PNG Image Converter',
    meta: {
      description:
        'Decentralized Image converter for HEIC to PNG with Acurast and Cere Network',
    },
  },
  performance:{
   chunkSplit: {
    strategy: "all-in-one",
   }
  },
  output: {
    distPath: {
      root: "./server/dist/frontend"
    }
  },
  source: {
    define: parsed,
  },
};

export default defineConfig(Config);
