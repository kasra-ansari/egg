'use strict';

const Controller = require('egg').Controller;

const createRule = {
  mobile: 'string',
};

class UserAccessController extends Controller {
  async login() {
    const { ctx, service } = this;

    ctx.validate(createRule, ctx.request.body);

    const payload = ctx.request.body || {};

    const res = await service.userAccess.accessOrRegister(payload);

    ctx.helper.success({ ctx, res });

  }

  async current() {
    const { ctx, service } = this;

    const res = await service.userAccess.current();

    ctx.helper.success({ ctx, res });
  }
}

module.exports = UserAccessController;
