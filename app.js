const express = require("express");
const sha1 = require("sha1");
const app = express();
var { parseString } = require('xml2js');
app.use(async (req, res, ) => {
    const { signature, timestamp, nonce, echostr } = req.query;
    const token = "hello wechat";
    const paixv = [token, timestamp, nonce].sort();
    const sha1Str = sha1(paixv.join(""));
    if (req.method === "GET") {
        if (sha1Str === signature) {
            res.end(echostr);
        } else {
            res.end("error");
        };
    } else if (req.method === "POST") {
        if (sha1Str !== signature) {
            res.end("error");
            return;
        }
    }else{
        res.send("error");
    }
});

app.listen(3000, err => {
    if (!err) console.log("服务器启动成功");
    else console.log(err);
});