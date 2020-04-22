'use strict';

const Service = require('egg').Service;

class UserAccessService extends Service {
  async login(payload) {
    const { ctx, service } = this;

    const userInfo = await service.user.findByMobile(payload.mobile);

    if (!userInfo) {
      // ctx.throw(404, 'user not found');
      const userInfo = await service.user.create(payload);
      return { token: await service.actionToken.apply(userInfo._id), userInfo };
    }

    return { token: await service.actionToken.apply(userInfo._id), userInfo };
  }

  async current() {
    const { ctx, service } = this
    const res = await service.userAccess.current();

    ctx.helper.success({ ctx, res });
  }
}

module.exports = UserAccessService;
