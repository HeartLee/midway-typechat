import { Inject, Controller, Get, Query, Post, Body } from '@midwayjs/core';
import { Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { Star } from '../entity/star.entity';
import { InjectEntityModel } from "@midwayjs/typeorm";
import { Repository } from "typeorm";

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
    async add(@Body() star: Star) {
        // 新增
        return await this.starModel.save(star);
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
