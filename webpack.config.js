
var path = require('path');

module.exports = {
  devServer: {
      port: 8080,
      host: '192.168.31.97',
      proxy: {
        '/api': {
          target: '192.168.31.229:80',
          pathRewrite: {'^/api' : ''},
          changeOrigin: true,  // target是域名的话，需要这个参数，
          secure: false,  // 设置支持https协议的代理
        },
      }
  },
};