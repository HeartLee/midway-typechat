import { Controller, Get } from '@midwayjs/core';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Praise } from '../schema/star';
import { createLanguageModel, createJsonTranslator } from 'typechat';

@Controller('/')
export class HomeController {
  @Get('/')
  async home(): Promise<any> {
    const model = createLanguageModel(process.env);
    // 读取我们前面定义的schema
    const schema = readFileSync(join(__dirname, '../schema/star.ts'), 'utf8');
    // 创建转换器
    const translator = createJsonTranslator<Praise>(model, schema, 'Praise');
    // 解析输入的内容
    const response = await translator.translate(
      '刚哥夸奖凯凯，在他工作忙不开的时候，凯凯主动帮他承担源氏项目的需求，最终刚哥能顺利完成迭代任务'
    );
    if (response.success) {
      return response.data;
    }
    return 'Hello Midwayjs!';
  }
}
