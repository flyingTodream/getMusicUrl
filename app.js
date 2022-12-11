
const express = require('express')
const { getPlayUrl } = require('./getUrl')
const fs = require('fs')
const app = express()
const port = 8080

app.all("*", function (req, res, next) {
    // 设置允许跨域的域名,*代表允许任意域名跨域
    res.header('Access-Control-Allow-Origin', '*');
    // 允许的header类型
    res.header('Access-Control-Allow-Headers', 'content-type');
    // 跨域允许的请求方式
    res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
    if (req.method.toLowerCase() == 'options')
        res.send(200); // 让options 尝试请求快速结束
    else
        next();
})
app.use(express.static('acc'));
app.get('/', async (req, res) => {
    res.send("hello")
})
app.get('/get', async (req, res) => {
    const { songName, artistsName, id } = req.query
    fs.exists(`./acc/${id}.mp3`, async (exists) => {
        if (exists) {
            res.send({
                status: 200,
                data: {
                    source: '',
                    url: `https://hua.flytodream.cn/musicApi/getUrl/${id}.mp3`
                }
            })
        } else {
            let d = null
            try {
                d = await getPlayUrl(songName, artistsName, id)
            } catch (error) {
            }
            res.send({
                status: 200,
                data: d
            })
        }
    });

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})