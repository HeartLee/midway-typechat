import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1698320798018_8628',
  koa: {
    port: 7001,
    key: join(__dirname, '../ssl/server.key'),
    cert: join(__dirname, '../ssl/server.crt'),
  },
} as MidwayConfig;
