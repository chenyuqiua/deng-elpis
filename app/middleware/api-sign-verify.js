const md5 = require('md5');

/**
 * api接口签名验证合法性中间件
 * @param {Object} app 应用实例
 */
module.exports = (app) => {
  return async (ctx, next) => {
    // 只对api请求进行参数验证 例如页面请求则不进行验证
    if (!ctx.path.startsWith('/api')) return await next();

    const { path, method } = ctx;
    const { headers } = ctx.request;

    // 获取请求头中的s_sign和s_t, 约定放在headers中
    const { s_sign: sSign, s_t: st } = headers;

    const signKey = '1a491251-b695-4628-8718-92bc5b3e2758';
    const signature = md5(`${signKey}_${st}`);
    app.logger.info(`[-- ${path}-${method} --] sSign: ${sSign}, signature: ${signature}`);

    if (!sSign || !st || signature !== sSign.toLowerCase() || Date.now() - st > 1000 * 600) {
      ctx.status = 200;
      ctx.body = {
        success: false,
        message: '签名验证失败',
        code: 445,
      };
      return;
    }

    await next();
  };
};
