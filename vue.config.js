const webpack = require('webpack')

module.exports = {
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery"
      })
    ]
  },
  devServer: {
    port: 8080,
    host: '192.168.31.97',
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: '192.168.31.229:80',
        pathRewrite: {'^/api' : ''},
        changeOrigin: true,  // target是域名的话，需要这个参数，
        secure: false,  // 设置支持https协议的代理
      },
      '/socket.io': {
        target: 'http://192.168.31.229:80',
        ws: true,
        changeOrigin: true
      },
      'sockjs-node': {
        target: 'http://192.168.31.229:80',
        ws: true,
        changeOrigin: true
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
}