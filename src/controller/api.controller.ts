import { Inject, Controller, Get, Query, Post, Body, Del } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { Star } from '../entity/star.entity';
import { InjectEntityModel } from "@midwayjs/typeorm";
import { Repository } from "typeorm";
import {createJsonTranslator, createLanguageModel} from "typechat";
import {readFileSync} from "fs";
import {join} from "path";
import {Praise} from "../schema/star";

@Controller('/api')
export class APIController {
  @InjectEntityModel(Star)
  starModel: Repository<Star>;

  @Get('/get_star')
  async list() {
    // 查询列表，倒序返回
    return await this.starModel.find({ order: { id: 'DESC' } });
  }
  @Post('/add_star')
    async add(@Body() data: {text: string}) {
        // 新增
    const model = createLanguageModel(process.env);
    // 读取我们前面定义的schema
    const schema = readFileSync(join(__dirname, '../schema/star.ts'), 'utf8');
    // 创建转换器
    const translator = createJsonTranslator<Praise>(model, schema, 'Praise');
    const response = await translator.translate(data?.text);
    if(response.success){
      // 解析输入的内容
      const {who, to, content } = response.data;
      return await this.starModel.save({
        who,
        to,
        content: JSON.stringify(content),
        origin_text: data?.text
      });
    }
    }
    @Del('/delete_star')
    async delete(@Query('id') id: number) {
        // 删除
        return await this.starModel.delete(id);
    }
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/get_user')
  async getUser(@Query('uid') uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }
}
