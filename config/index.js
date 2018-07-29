const baseConfig = require('../src/config/base-config.json');

const HWPPageBaseConfig = Object.keys(baseConfig).reduce((accumulator, key) => {
  accumulator[key] = baseConfig[key];
  return accumulator;
}, {});

const HWPPageBaseConfigForServer = Object.keys(baseConfig).reduce((accumulator, key) => {
  accumulator[key] = `<!--baseConfig-${key}-->`;
  return accumulator;
}, {});

module.exports = {
  build: {
    HWPPageBaseConfig
  },
  dev: {
    HWPPageBaseConfig
  },
  server: {
    HWPPageBaseConfigForServer,
  },
};
