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
  typeorm: {
    dataSource: {
      default: {
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '',
        database: 'typechat',
        synchronize: false,     // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        logging: false,
        entities: [
          '**/entity/*.entity{.ts,.js}'
        ]
      }
    }
  }
} as MidwayConfig;
