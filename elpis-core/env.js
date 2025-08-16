module.exports = () => {
  return {
    isDev() {
      return process.env._ENV === 'dev';
    },
    isBeta() {
      return process.env._ENV === 'beta';
    },
    isProd() {
      return process.env._ENV === 'prod';
    },
    get() {
      return process.env._ENV ?? 'dev';
    },
  };
};
