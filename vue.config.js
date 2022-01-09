const path = require("path");

module.exports = {
  devServer: {
    proxy: {
      "^/": {
        target: "http://localhost:3000/",
        ws: true,
        changeOrigin: true,
      },
    },
  },
  outputDir: path.resolve(__dirname, process.env.OUTPUT_DIR),
};
