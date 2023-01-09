
const express = require('express')
const { getPlayUrl, _decodeBase64 } = require('./getUrl')
const fs = require('fs')
const { requ, getU } = require('./request')
const app = express()
const port = 3003
const apiUrl = "localhost:3003"
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
app.use(express.static('file'));
app.get('/', async (req, res) => {
    try {
        const { id } = req.query
        let url = ""
        await getU(id, apiUrl)
        const { success } = await requ(`${apiUrl}/check/music?id=` + id)

        if (success) {
            const { data } = await requ(`${apiUrl}/song/url/v1?level=exhigh&id=` + id)
            if (data[0].freeTrialInfo) {
                // 试听
                url = await getU(id, apiUrl)
                res.send({
                    code: 200,
                    url
                })
            } else {
                url = data[0].url
                res.send({
                    code: 200,
                    url
                })
            }
        } else {
            url = await getU(id, apiUrl)
            res.send({
                code: 200,
                url
            })
        }
    } catch (error) {
        res.send({
            code: 500,
            msg: ''
        })
    }
})

app.get('/get', async (req, res) => {
    const { songName, artistsName, id } = req.query
    fs.exists(`./file/${id}.aac`, async (exists) => {
        if (exists) {
            res.send({
                status: 200,
                data: {
                    source: '',
                    url: `https://hua.flytodream.cn/musicApi/getUrl/${id}.aac`
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

app.get('/login', async (req, res) => {
    const { data } = await requ(`${apiUrl}/login/qr/key`)
    const { unikey } = data
    const d = await requ(`${apiUrl}/login/qr/create?key=${unikey}&qrimg=true`)
    const id = Date.now()
    const path = `./file/${id}.png`
    const buffer = _decodeBase64(d.data.qrimg)
    await fs.writeFileSync(path, buffer)
    res.send({ code: 200, key: unikey, url: `https://hua.flytodream.cn/musicApi/getUrl/${id}.png` })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})