module.exports = (deploy) => {
    let resUltimaDate = `<xml>
            <ToUserName><![CDATA[${deploy.toUserName}]]></ToUserName>
            <FromUserName><![CDATA[${deploy.fromUserName}]]></FromUserName>
            <CreateTime>${Date.now()}</CreateTime>
            <MsgType><![CDATA[${deploy.type}]]></MsgType>`

    //文本
    if (deploy.type === "text") {
        resUltimaDate += `<Content><![CDATA[${deploy.content}]]></Content>`
    }
    //图片
    if (deploy.type === "image") {
        resUltimaDate += `<Image>
        <MediaId><![CDATA[${deploy.mediaId}]]></MediaId>
      </Image>`
    }
    //语音
    if (deploy.type === "voice") {
        resUltimaDate += `<Voice>
        <MediaId><![CDATA[${deploy.mediaId}]]></MediaId>
      </Voice>`
    }
    //视频
    if (deploy.type === "video") {
        resUltimaDate += ` <Video>
        <MediaId><![CDATA[${deploy.mediaId}]]></MediaId>
        <Title><![CDATA[${deploy.title}]]></Title>
        <Description><![CDATA[${deploy.description}]]></Description>
      </Video>`
    }
    //音乐
    if (deploy.type === "music") {
        resUltimaDate += `<Music>
        <Title><![CDATA[${deploy.title}]]></Title>
        <Description><![CDATA[${deploy.description}]]></Description>
        <MusicUrl><![CDATA[${deploy.musicUrl}]]></MusicUrl>
        <HQMusicUrl><![CDATA[${deploy.hqMusicUrl}]]></HQMusicUrl>
        <ThumbMediaId><![CDATA[${deploy.mediaId}]]></ThumbMediaId>
      </Music>`
    }
    //图文
    if (deploy.type === "news") {
        resUltimaDate += `<ArticleCount>${deploy.articles.length}</ArticleCount>
        <Articles>`;
        resUltimaDate += deploy.articles.reduce((last,now)=>{
            return last + `<item>
                <Title><![CDATA[${now.title}]]></Title>
                <Description><![CDATA[${now.description}]]></Description>
                <PicUrl><![CDATA[${now.picUrl}]]></PicUrl>
                <Url><![CDATA[${now.url}]]></Url>
              </item>`
        },"");
        resUltimaDate += `</Articles>`
    }

    resUltimaDate += `</xml>`;
    return resUltimaDate;
}