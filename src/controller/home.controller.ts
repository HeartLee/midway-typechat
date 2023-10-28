import { Controller, Get } from '@midwayjs/core';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Demo } from '../schema/demo';
import { createLanguageModel, createJsonTranslator } from 'typechat';

@Controller('/')
export class HomeController {
  @Get('/')
  async home(): Promise<any> {
    const model = createLanguageModel(process.env);
    console.log(JSON.stringify(model));
    // 读取我们前面定义的schema
    const schema = readFileSync(join(__dirname, '../schema/demo.ts'), 'utf8');
    // 创建转换器
    const translator = createJsonTranslator<Demo>(model, schema, 'Demo');
    // 解析输入的内容
    const response = await translator.translate(
      '十天前我买了西瓜，花了100元。'
    );
    console.log;
    if (response.success) {
      return response.data;
    }
    return 'Hello Midwayjs!';
  }
}
