const sha1 = require("sha1");
const {getinputdate,shiftJsDate,formatting} = require("../utils/tool");
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

            // console.log(userdate);
            let resdate = "你说啥子列,听不懂啊";
            if (userdate.Content === "1") {
                resdate = "大吉大利\n今晚吃鸡";
            } else if (userdate.Content === "2") {
                resdate = "apex英雄\n你值得拥有";
            } else if (userdate.Content && userdate.Content.indexOf("3") !== -1) {
                resdate = "兽人永不为奴\n为了部落";
            } else if (userdate.Content && userdate.Content.indexOf("4") !== -1) {
                resdate = "还玩儿,还玩儿\n让你玩儿= =";
            }
    
            const resUltimaDate = `<xml>
            <ToUserName><![CDATA[${userdate.FromUserName}]]></ToUserName>
            <FromUserName><![CDATA[${userdate.ToUserName}]]></FromUserName>
            <CreateTime>${Date.now()}</CreateTime>
            <MsgType><![CDATA[text]]></MsgType>
            <Content><![CDATA[${resdate}]]></Content>
            </xml>`;
            
            res.send(resUltimaDate);

        }else{
            res.send("error");
        }
    }
}
