import type { SnapConfig } from '@metamask/snaps-cli';
import { resolve } from 'path';

const config: SnapConfig = {
  bundler: 'webpack',
  input: resolve(__dirname, 'src/index.ts'),
  server: {
    port: 8080,
  },
  polyfills: {
    buffer: true,
    querystring: true,
    crypto: true,
    events: true,
    assert: true,
    http: true,
    https: true,
    zlib: true,
    util: true,
    url: true,
    punycode: true,
    stream: true,
    string_decoder: true,
  },
};

export default config;
