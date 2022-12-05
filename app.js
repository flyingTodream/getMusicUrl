
const express = require('express')
const { getPlayUrl } = require('./getUrl')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    getPlayUrl()
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})