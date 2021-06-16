module.exports = {
  type: 'vue',
  devServerPreset: {
    port: 4003,
    proxy: {
      '/api': {
        target: 'http://localhost:3003/',
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  mockServerPreset: {port: 3003},
  webpackPreset: {
    cssProcessors: {less: true},
    resolveAlias: {'@stage': './src/modules/stage'},
  },
  development: {
    clientGlobalVar: {
      ApiPrefix: '',
      StaticPrefix: 'http://localhost:3003/',
    },
  },
  production: {
    clientPublicPath: '/client/',
    clientGlobalVar: {
      ApiPrefix: '',
      StaticPrefix: '/client/',
    },
  },
};
