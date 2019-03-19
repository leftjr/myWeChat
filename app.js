const express = require("express");
const app = express();
const reply = require("./reply");
app.use(reply());

app.listen(3000, err => {
    if (!err) console.log("服务器启动成功");
    else console.log(err);
});