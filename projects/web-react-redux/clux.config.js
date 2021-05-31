module.exports = {
  type: 'react',
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
  webpackPreset: {cssProcessors: {less: true}},
  development: {
    clientGlobalVar: {
      apiPrefix: '',
      staticPrefix: 'http://localhost:3003/',
    },
  },
  production: {
    clientPublicPath: '/client/',
    clientGlobalVar: {
      apiPrefix: '',
      staticPrefix: '/client/',
    },
  },
};
