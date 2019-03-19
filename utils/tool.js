const { parseString } = require('xml2js');
module.exports = {
    
    /**
     * 获取用户输入的内容
     * @param {请求对象} req 
     * 返回xml格式的用户输入数据
     */
    getinputdate(req) {
        return new Promise((resolve, reject) => {
            let inputdate = "";
            req.on("data", data => {
                inputdate += data.toString();
            })
                .on("end", () => {
                    resolve(inputdate);
                });
        });
    },

    /**
     * 将xml对象转为js对象
     * @param {xml对象} shower 
     * 返回xml对应的js对象
     */
    shiftJsDate(shower){
        let jsdate = null;
        parseString(shower, { trim: true }, (err, result) => {
            if(!err) jsdate = result;
            else jsdate = {};
        });
        return jsdate;
    },

    /**
     * 格式化js对象方法
     * @param {*} jsdate
     * 返回格式化后的js对象 
     */
    formatting(jsdate){
        const { xml } = jsdate;
        let userdate = {}
        for (var key in xml) {
            userdate[key] = xml[key][0];
        }
        return userdate;
    }
}