const Service = require('egg').Service

class UserService extends Service {
  async create(payload) {
    const {ctx} = this;
    return ctx.model.User.create(payload);
  }

  async update(_id, payload) {
    const { ctx } = this;

    const user = ctx.service.user.find(_id);

    if (!user) {
      ctx.throw(404, 'user not found');
    }

    return ctx.model.User.findByIdAndUpdate(_id, payload);
  }
  //Common
  async findByMobile(mobile) {
    return this.ctx.model.User.findOne({ mobile: mobile });
  }

  async find(id) {
    return this.ctx.model.User.findById(id);
  }

  async findByIdAndUpdate(id, values) {
    return this.ctx.model.User.findByIdAndUpdate(id, values);
  }
}

module.exports = UserService;
