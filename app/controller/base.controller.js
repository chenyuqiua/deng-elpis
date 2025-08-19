module.exports = (app) =>
  /**
   * 基类
   * 提供一些controller通用的基础方法
   */
  class BaseController {
    constructor() {
      this.config = app.config;
      this.service = app.service;
    }

    /**
     * 成功响应
     * @param {Object} ctx 上下文
     * @param {Object} data 返回的核心数据
     * @param {Object} metadata 附加数据
     */
    success(ctx, config) {
      const { data, metadata } = config;
      ctx.status = 200;
      ctx.body = {
        success: true,
        data,
        metadata,
      };
    }

    /**
     * 失败响应
     * @param {Object} ctx 上下文
     * @param {Object} config.message 错误信息
     * @param {Number} config.code 错误码
     */
    fail(ctx, config) {
      const { message, code } = config;
      ctx.body = {
        success: false,
        message,
        code,
      };
    }
  };
