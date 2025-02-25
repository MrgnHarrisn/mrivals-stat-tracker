const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,

  // Define Vue feature flags
  configureWebpack: {
    plugins: [
      new (require('webpack')).DefinePlugin({
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false),
      }),
    ],
  },

  // Proxy configuration
  devServer: {
    proxy: {
      '/api': {
        target: 'https://mrapi.org', // The API base URL
        changeOrigin: true, // Changes the origin of the host header to the target URL
        pathRewrite: { '^/api': '' }, // Removes the `/api` prefix from the request
      },
    },
  },
});