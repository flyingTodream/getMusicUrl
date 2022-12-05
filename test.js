const { getPlayUrl } = require('./getUrl')
async function exe() {
    const d = await getPlayUrl('可能否', '木小雅')
    console.log(d)
}

exe()