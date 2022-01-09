const path = require("path");

module.exports = {
  devServer: {
    proxy: {
      "^/": {
        target: `http://localhost:${process.env.SERVER_PORT}`,
        ws: true,
        changeOrigin: true,
      },
    },
  },
  outputDir: path.resolve(__dirname, process.env.OUTPUT_DIR),
};
