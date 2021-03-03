// vue.config.js
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const path = require('path')
const merge = require('lodash/merge')
function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/less/webpack-global.less')
      ]
    })
}

module.exports = {
  chainWebpack: config => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type =>
      addStyleResource(config.module.rule('less').oneOf(type))
    )
  },
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  devServer: {
    port: 8899,

    after: function(app) {
      console.log('---')
    },
    proxy: {
      '/api.php/': {
        target: 'http://gx.xcwll.cn',
        ws: true,
        changeOrigin: true
        // cookieDomainRewrite: {
        //   'localhost': '*',
        //   'yaojunzk.com': 'localhost'
        //   // '*': ''
        // }
      }
    }
  },
  configureWebpack: config => {
    // console.log(config)
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      // const myplugins = []

      // myplugins.push(
      //   new UglifyJsPlugin({
      //     uglifyOptions: {
      //       compress: {
      //         warnings: false,
      //         drop_debugger: true,
      //         drop_console: true,
      //         pure_funcs: ['console.log', 'console.info']
      //       }
      //     },
      //     sourceMap: false,
      //     parallel: true
      //   })
      // )
      // config.plugins = [
      //   ...config.plugins,
      //   ...myplugins
      // ]

      config.optimization.minimizer[0].options.terserOptions = merge(
        config.optimization.minimizer[0].options.terserOptions,
        {
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true,
            pure_funcs: ['console.log', 'console.info']
          }
        }
      )
      // config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    } else {
      // 为开发环境修改配置...
      config.plugins = [...config.plugins]
    }
  },
  // pwa: {},
  // pluginOptions: {
  //   'style-resources-loader': {
  //     preProcessor: 'less',
  //     patterns: [
  //       path.resolve(__dirname, './src/assets/less/webpack-global.less')
  //     ]
  //   }
  // },
  // transpileDependencies: ['vue-clamp', 'resize-detector'],
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        // data: `@import "/element-variables.scss";`
      },
      less: {
        // javascriptEnabled: true,
        // less 全局变量
        globalVars: {
          themeBlack: '#333333',
          themeColor: '#4fb495',
          themeGray: '#f2f2f2'
        }
      }
    }
  }
}
