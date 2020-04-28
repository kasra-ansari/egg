'use strict';

const Controller = require('egg').Controller;

const createRule = {
  title: 'string',
  subTitle: 'string',
};

class PostController extends Controller {
  async create() {
    const { ctx, service } = this;

    ctx.validate(createRule, ctx.request.body);
    const payload = ctx.request.body || {};

    const res = await service.post.create(payload);

    ctx.helper.success({ ctx, res });

  }

  async show() {
    const { ctx, service } = this;
    const { id } = ctx.params;

    const res = await service.post.show(id);

    ctx.helper.success({ ctx, res });
  }

  async index() {
    const { ctx, service } = this;

    const res = await service.post.list();

    ctx.helper.success({ ctx, res });
  }
}

module.exports = PostController;
