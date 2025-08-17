const log4js = require('log4js');

/**
 * 日志工具
 * @param {Object} app 应用实例
 * 例如通过 app.logger.info('info') 可访问打印 info 日志
 */
module.exports = (app) => {
  const isDev = app.env.isDev();
  let logger;

  if (isDev) {
    logger = console;
  } else {
    // 非开发环境, 需要把日志写入文件 落盘
    log4js.configure({
      appenders: {
        console: { type: 'console' },
        dateFile: { type: 'dateFile', filename: 'logs/application.log', parent: 'yyyy-MM-dd' },
      },
      categories: { default: { appenders: ['console', 'dateFile'], level: 'trace' } },
    });
    logger = log4js.getLogger();
  }
  return logger;
};
