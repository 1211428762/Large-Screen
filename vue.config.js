const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
function resolve(dir) {
    return path.join(__dirname, './', dir)
}

module.exports = {
    runtimeCompiler: true,
    productionSourceMap: true, //生产环境 sourceMap
    publicPath: './',
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source maps?
        sourceMap: false,
    },
    // assetsDir: 'static',
    // 开发代理服务器 防止跨域
    devServer: {
        // port: 8081,
        proxy: {
            '/proxy': {
                target: 'http://39.107.158.88/', // target host
                ws: true, // proxy websockets
                changeOrigin: true, // needed for virtual hosted sites
                pathRewrite: {
                    '^/proxy': '' // rewrite path
                }
            },
        }
    },
    chainWebpack: config => {
        // svg rule loader 
        // const svgRule = config.module.rule('svg') // 找到svg-loader
        // svgRule.uses.clear() // 清除已有的loader, 如果不这样做会添加在此loader之后
        // svgRule.exclude.add(/node_modules/) // 正则匹配排除node_modules目录
        // svgRule // 添加svg新的loader处理
        //     .test(/\.svg$/)
        //     .use('svg-sprite-loader')
        //     .loader('svg-sprite-loader')
        //     .options({
        //         symbolId: 'icon-[name]',
        //     })

        // 修改images loader 添加svg处理
        // const imagesRule = config.module.rule('images')
        // imagesRule.exclude.add(resolve('src/icons'))
        // config.module
        //     .rule('images')
        //     .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)

    }
};