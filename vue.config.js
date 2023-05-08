module.exports = {
    devServer: {
        open: true,
        proxy: {
            '/api': {
                target: 'http://124.221.197.218:8000/',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }

}