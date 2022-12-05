
const express = require('express')
const { getPlayUrl } = require('./getUrl')
const app = express()
const port = 3000

app.get('/', async (req, res) => {
    const { songName, artistsName } = req.body
    let d = null
    try {
        d = await getPlayUrl(songName, artistsName)
    } catch (error) {

    }
    res.send({
        status: 200,
        data: d
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})