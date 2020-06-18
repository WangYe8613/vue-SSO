module.exports = {
    publicPath: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        disableHostCheck: true,
        host: '172.24.32.33',   // 设置运行ip
        port: 8090,             // 设置运行端口号
    }
}