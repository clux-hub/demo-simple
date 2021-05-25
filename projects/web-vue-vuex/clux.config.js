const apiProxy = {
  '/api': {
    target: 'http://192.168.0.232:8000',
    pathRewrite: {
      '^/api': '',
    },
    xfwd: true,
    secure: false,
    changeOrigin: true,
    timeout: 3000,
    proxyTimeout: 3000,
  },
};

module.exports = {
  type: 'vue',
  devServerPreset: {port: 4002},
  webpackPreset: {cssProcessors: {less: true}},
  development: {
    apiProxy,
    clientGlobalVar: {
      apiMaps: {'/api': '/api'},
    },
  },
  production: {
    clientPublicPath: '/client/',
    clientGlobalVar: {
      apiMaps: {'/api': 'http://192.168.0.232:8000'},
    },
  },
};
