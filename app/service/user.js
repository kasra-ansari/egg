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

    await ctx.model.User.findByIdAndUpdate(_id, payload)

    return await ctx.service.user.find(_id);
  }

  async list() {
    const { ctx } = this;

    const users = await ctx.model.User.find({}).exec();
    const count = await ctx.model.User.countDocuments().exec();

    return { list: users, total: count };
  }

  async delete(_id) {
    const { ctx } = this;
    const res = await ctx.model.User.findByIdAndDelete(_id) !== null ? 'ok' : ctx.throw(404, 'user not found');
    return res;
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
