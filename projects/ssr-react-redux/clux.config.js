module.exports = {
  type: 'react ssr',
  devServerPreset: {
    port: 4003,
    proxy: {
      '/api': {
        target: 'http://localhost:3003/',
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
    serverGlobalVar: {
      ApiPrefix: 'http://127.0.0.1:3003',
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
