const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  // transpileDependencies: true
  publicPath: "./",

  // outputDir: "./build", // 配置方式一，通过vue文档方式配置

  // 配置方式二
  // chainWebpack: (config) => {
  //   config.resolve.alias
  //     .set("@", path.resolve(__dirname, "src"))
  //     .set("views", "@/views")
  //     .set("components", "@/components");
  // },

  devServer: {
    proxy: {
      "^/api": {
        target: "http://152.136.185.210:4000",
        pathRewrite: {
          "^/api": ""
        },
        changeOrigin: true
      }
    }
  },
  // 配置方式三
  configureWebpack: {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        views: "@/views",
        components: "@/components"
      }
    },
    plugins: [
      // mark 按需引入ElelemntPlus组件  https://github.com/element-plus/unplugin-element-plus/blob/main/README.zh-CN.md
      require("unplugin-element-plus/webpack")({
        // options
      })
    ]
  }
});
