module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'futureBaby',
  productionSourceMap: false,
  configureWebpack: {
    resolve: {
      alias: {
        'components': '@/components',
        'assets': '@/assets',
        'utils':'@/utils',
        'views': '@/views',
        'vue$': 'vue/dist/vue.esm.js' 
      }
    },

  },
  devServer: {
    // host:'dragonworld.top',
    // port:80,
    // proxy:"http://112.74.163.209",

    proxy: {
      "/interface": {
        target: "http://ebooktest.trhui.com/interface",
        changeOrigin: true,
        logLevel:'debug',
        pathRewrite: { '/interface': '' }
      },
      "/paymentutil": {
        target: "http://47.101.219.181:10888/paymentutil",
        changeOrigin: true,
        logLevel:'debug',
        pathRewrite: { '/paymentutil': '' }
      },
      
      "/api": {
        target: "http://112.74.163.209",
        changeOrigin: true,
        logLevel:'debug',
        pathRewrite: { '/api': '' }
      },
     
     
      
      
    }
  }
}