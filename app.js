/*
 * @Author: 陈朝朝60258 zhaozhao.chen@going-link.com
 * @Date: 2024-04-04 07:45:47
 * @LastEditors: 陈朝朝60258 zhaozhao.chen@going-link.com
 * @LastEditTime: 2024-04-04 08:22:16
 * @FilePath: /chat-express/app.js
 * @Description: sockt发送数据
 */
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
app.use(cors("*"));
const server = http.createServer(app);

const io = new Server(server);
io.on("connection", (socket) => {
  console.log("连接成功");
  const data = fs.readFileSync(path.resolve(__dirname, "./sample_wave.csv"));
  const transData = data.toString().split(",");
  let Index = 0;
  setInterval(() => {
    const sendData = transData.filter(
      (num, index) => index >= Index && index < Index + 1000
    );
    socket.send(sendData);
    Index += 1;
  }, 1000);
});
app.get("/csvdata", (req, res) => {
  const data = fs.readFileSync(path.resolve(__dirname, "./sample_wave.csv"));
  res.json(data.toString().split(","));
});
server.listen(3000, () => {
  console.log("runnning");
});
