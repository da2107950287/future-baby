module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'futureBaby',

  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'assets': '@/assets',
        'utils': '@/utils',
        'views': '@/views',
        'vue$': 'vue/dist/vue.esm.js'
      }
    },

  },
  devServer: {
    proxy: "http://112.74.163.209",
    //  {
    //   // "/interface": {
    //   //   target: "http://ebooktest.trhui.com/interface",
    //   //   changeOrigin: true,
    //   //   logLevel:'debug',
    //   //   // pathRewrite: { '^/interface': '' }
    //   // },
    //   "/paymentutil": {
    //     target: "http://47.101.219.181:10888",
    //     changeOrigin: true,
    //     logLevel:'debug',
    //     // pathRewrite: { '^/paymentutil': '' }
    //   },

    //   "/api": {
    //     target: "http://112.74.163.209",
    //     changeOrigin: true,
    //     logLevel:'debug',
    //     pathRewrite: { '^/api': '' }
    //   },  
    // }
  }
}