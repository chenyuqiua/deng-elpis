module.exports = (app) => {
  /**
   * 基类
   * 提供一些service通用的基础方法
   */
  return class BaseService {
    constructor() {
      this.config = app.config;
    }
  };
};
