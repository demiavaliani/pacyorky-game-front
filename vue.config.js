// vue.config.js
module.exports = {
    // options...
    devServer: {
        host: "localhost",
        transportMode: "ws",
        proxy: {
            "/api": {
                target: 'http://185.4.73.42:3000',
                ws: true,
                changeOrigin: true,
                logLevel: "debug"
            }
        }
    },
}