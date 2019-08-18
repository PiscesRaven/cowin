const webpack = require('webpack');

module.exports = {
  chainWebpack(config) { 
    config.devtool = 'eval';
  },
  productionSourceMap: false,
  configureWebpack: {
    plugins:[
      new webpack.ProvidePlugin({
        MMT: 'moment'
      }),
    ],
    resolve: {
      alias: {
        '@as': '@/assets',
        '@c': '@/components',
        '@v': '@/views',
        '@img': '@/assets/img',
        '@css': '@/assets/css',
        '@js': '@/assets/js',
        '@mix': '@/assets/mixins',
      }
    }
  }
}