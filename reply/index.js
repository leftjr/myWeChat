const sha1 = require("sha1");
const {getinputdate,shiftJsDate,formatting} = require("../utils/tool");
const template = require("./template");
module.exports = ()=>{
    return async (req, res, ) => {
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

            const shower = await getinputdate(req);
    
            const jsdate = shiftJsDate(shower);

            const userdate = formatting(jsdate);

            const deploy = {
                toUserName:userdate.FromUserName,
                fromUserName:userdate.ToUserName,
                content:"你说啥子列,听不懂啊"
            };

            if (userdate.MsgType === "text" && userdate.Content === "1") {
                deploy.type = userdate.MsgType;
                deploy.content = "大吉大利\n今晚吃鸡";
            } else if (userdate.MsgType === "text" && userdate.Content === "2") {
                deploy.type = userdate.MsgType;
                deploy.content = "apex英雄\n你值得拥有";
            } else if (userdate.MsgType === "text" && userdate.Content.indexOf("3") !== -1) {
                deploy.type = userdate.MsgType;
                deploy.content = "兽人永不为奴\n为了部落";
            } else if (userdate.MsgType === "text" && userdate.Content.indexOf("4") !== -1) {
                deploy.type = userdate.MsgType;
                deploy.content = "还玩儿,还玩儿\n让你玩儿= =";
            } else if(userdate.MsgType === "image"){
                deploy.type = userdate.MsgType;
                deploy.mediaId = userdate.MediaId;
            }
            
            const resUltimaDate = template(deploy);
            res.send(resUltimaDate);

        }else{
            res.send("error");
        }
    }
}
