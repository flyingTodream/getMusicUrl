const request = require('request')
const fs = require('fs')
const { getPlayUrl } = require('./getUrl')

function requ(url) {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            "method": "get",
        }, function (error, response) {
            if (response && response.body) {
                const body = JSON.parse(response.body)
                resolve(body)
            }
        });
    })
}
function getU(id, apiurl) {
    return new Promise((resolve, reject) => {
        fs.exists(`./file/${id}.mp3`, async (exists) => {
            if (exists) {
                resolve(`https://hua.flytodream.cn/musicApi/getUrl/${id}.mp3`)
            } else {
                try {
                    const d = await requ(`${apiurl}/song/detail?ids=` + id)
                    const data = await getPlayUrl(d.songs[0].name, d.songs[0].ar[0].name, id)
                    resolve(data.url)
                } catch (error) {
                    console.log(error)
                }
            }
        });
    })
}
module.exports = { requ, getU }