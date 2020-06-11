module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    // devServer: {
    //     proxy: {
    //         '/api':{
    //             target:'http://jsonplaceholder.typicode.com',
    //             changeOrigin:true,
    //             pathRewrite:{
    //                 '/api':''
    //             }
    //         }
    //     }
    // }
    devServer: {
        disableHostCheck: true,
        host: 'localhost',   // 通过ipconfig查看本机IP
        port: 8090,          // 设置运行端口号
    }
}