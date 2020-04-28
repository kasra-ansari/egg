const Service = require('egg').Service;

class PostService extends Service {
  async create(payload) {
    const { ctx } = this;
    const userId = ctx.state.user.data._id;
    payload.user = userId;
    return ctx.model.Post.create(payload);
  }

  async show(id) {
    const { ctx } = this;
    const userId = ctx.state.user.data._id;
    ctx.logger.info(ctx.state)
    return await ctx.model.Post.findOne({ _id: id, user: userId }).populate('user');

  }

  async list() {
    const { ctx } = this;
    const userId = ctx.state.user.data._id;

    const posts = await ctx.model.Post.find({ user: userId }).exec();
    const count = await ctx.model.Post.countDocuments({ user: userId }).exec();

    return { list: posts, total: count };
  }
}

module.exports = PostService;
