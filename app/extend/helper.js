
exports.success = ({ ctx, res = null, msg = 'success' })=> {
  ctx.body = {
    code: 200,
    data: res,
    msg,
  }
  ctx.status = 200;
};
