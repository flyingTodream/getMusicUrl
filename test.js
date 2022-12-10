const { getPlayUrl, execu } = require('./getUrl')
const fs = require('fs')

async function exe() {
    // console.log(mp3ToAac)
    const d = await getPlayUrl('晴天', '周杰伦', 1111111)
    // const buffer = _decodeBase64(d.url)
    // await fs.writeFileSync('./acc/1111111.aac', buffer)
    // // mp3ToAac("./acc/1475091192.aac", "./acc/output.mp3")
    // await execu('./ffmpeg -i ./acc/1111111.aac -acodec libmp3lame ./acc/1111111.mp3')
    // await execu('rm ./acc/1111111.mp3')

    console.log('0000000')
}


function _decodeBase64(base64) {
    const content = base64.split(';base64,').pop()
    return Buffer.from(content, 'base64')
}

const lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
function decode(base64) {
    let bufferLength = base64.length * 0.75,
        len = base64.length,
        i,
        p = 0,
        encoded1,
        encoded2,
        encoded3,
        encoded4;

    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }

    const arraybuffer = new ArrayBuffer(bufferLength),
        bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];

        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
};
exe()
