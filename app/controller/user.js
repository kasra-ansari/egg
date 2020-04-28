'use strict';

const Controller = require('egg').Controller;

const createRule = {
  mobile: 'string',
};


class UserController extends Controller {
  async create() {
    const { ctx, service } = this;
    // validate the `ctx.request.body` with the expected format
    // status = 422 exception will be thrown if not passing the parameter validation
    ctx.validate(createRule, ctx.request.body);
    const payload = ctx.request.body || {};

    const res = await service.userAccess.accessOrRegister(payload);

    ctx.helper.success({ ctx, res });
  }

  async update() {
    const { ctx, service } = this;
    const { id } = ctx.params;
    const payload = ctx.request.body || {};

    const res = await service.user.update(id, payload);

    ctx.helper.success({ ctx, res });
  }

  async index() {
    const { ctx, service } = this;

    const res = await service.user.list();

    ctx.helper.success({ ctx, res });
  }

  async destroy() {
    const { ctx, service } = this;
    const { id } = ctx.params;

    const res = await service.user.delete(id);

    ctx.helper.success({ ctx, res });
  }

}

module.exports = UserController;
