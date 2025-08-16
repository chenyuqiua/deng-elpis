const path = require('path');
const { sep } = path;

/**
 * config 加载器
 * @param {Object} app 应用实例
 * 通过env区分不同环境, 从而加载不同的配置文件 env.config
 * 并覆盖默认的default.config, 最终加载到内存中, 挂载到app.config
 *
 * 约定的配置文件: 环境不同时, 配置文件名字不同, 例如 dev.config, prod.config
 * 默认配置:     /config/default.config.js
 * 开发环境配置:  /config/dev.config.js
 * 生产环境配置:  /config/prod.config.js
 * 测试环境配置:  /config/beta.config.js
 */
module.exports = (app) => {
  const configPath = path.resolve(app.baseDir, `.${sep}config`);

  // 加载默认配置
  let defaultConfig = {};
  try {
    defaultConfig = require(path.resolve(configPath, 'default.config.js'));
  } catch (error) {
    console.error(`[exception] can not load default.config.js: ${error}`);
  }

  // 加载环境配置
  let envConfig = {};
  try {
    const envConfigMap = {
      dev: `${configPath}${sep}dev.config.js`,
      prod: `${configPath}${sep}prod.config.js`,
      beta: `${configPath}${sep}beta.config.js`,
    };
    const envConfigPath = envConfigMap[app.env.get()];
    if (envConfigPath) envConfig = require(envConfigPath);
  } catch (error) {
    console.error(`[exception] can not load ${app.env.get()}.config.js: ${error}`);
  }

  app.config = Object.assign({}, defaultConfig, envConfig);
};
