const Ajv = require('ajv');
const ajv = new Ajv();

/**
 * api接口参数验证中间件
 * @param {Object} app 应用实例
 */
module.exports = (app) => {
  // 使用的json-schema版本
  const $schema = 'http://json-schema.org/draft-07/schema#';

  return async (ctx, next) => {
    // 只对api请求进行参数验证 例如页面请求则不进行验证
    if (!ctx.path.startsWith('/api')) return await next();

    const { headers, body, query } = ctx.request;
    const { path, method, params } = ctx;
    app.logger.info(`[-- ${path}-${method} --] params: ${JSON.stringify(params)}`);
    app.logger.info(`[-- ${path}-${method} --] body: ${JSON.stringify(body)}`);
    app.logger.info(`[-- ${path}-${method} --] query: ${JSON.stringify(query)}`);
    app.logger.info(`[-- ${path}-${method} --] headers: ${JSON.stringify(headers)}`);

    const routerSchema = app.routerSchema[path]?.[method.toLowerCase()];
    if (!routerSchema) return await next();
    let isNeedValid = true;
    let validate;

    if (isNeedValid && headers && routerSchema.headers) {
      routerSchema.headers.$schema = $schema;
      validate = ajv.compile(routerSchema.headers);
      isNeedValid = validate(headers);
    }

    if (isNeedValid && body && routerSchema.body) {
      routerSchema.body.$schema = $schema;
      validate = ajv.compile(routerSchema.body);
      isNeedValid = validate(body);
    }

    if (isNeedValid && query && routerSchema.query) {
      routerSchema.query.$schema = $schema;
      validate = ajv.compile(routerSchema.query);
      isNeedValid = validate(query);
    }

    if (!isNeedValid) {
      ctx.status = 200;
      ctx.body = {
        success: false,
        message: `参数验证失败: ${ajv.errorsText(validate.errors)}`,
        code: 446,
      };
      return;
    }

    await next();
  };
};
