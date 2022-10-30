module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      },
    }
  },
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
        prependData: `@import "./src/assets/styles/global.scss";`
      }
    }
  }
}
