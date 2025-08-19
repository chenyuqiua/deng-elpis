/**
 * 错误处理中间件, 对所有错误进行兜底
 * @param {Object} app 应用实例
 * @returns {Function} 中间件函数
 */
module.exports = (app) => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      const { status, message, detail } = err;
      app.logger.error('[-- exception --]: ', err);
      app.logger.error('[-- exception --]: ', status, message, detail);

      if (message && message.includes('template not found')) {
        console.log(123321);
        ctx.status = 302;
        return ctx.redirect(`${app.options.redirectPath || '/'}`);
      }

      ctx.status = status;
      ctx.body = {
        success: false,
        message: '服务器小差了, 请稍后再试',
        code: 50000,
      };
      ctx.status = 200;
    }
  };
};
