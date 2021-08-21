//不能直接写ES6写法，用common.js的写法
//import path from 'path'是异步操作，不能与const path = require('path')兼容，另是同步的
const path = require("path")
module.exports = {
  //入口文件,得自己先手动建一个
  entry: "./src/index.js",
  //出口文件
  output: {
    //文件名
    filename: "app.js",
    //放在那里
    //__dirname是指当前目录
    //打包生成app.js最后放在public
    //resolve与join模块相反???
    path: path.resolve(__dirname, "public"),
  },
  //得装server模块才能有
  devServer: {
    //五代写法,表示静态
    static: {
      //拼合成一个文件夹
      //启动这个文件夹
      directory: path.join(__dirname, "public"),
    },
    compress: true, //是否压缩
    port: 9000, //运行端口
  },
  mode: "development",
}
