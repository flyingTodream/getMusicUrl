const UNM = require("@unblockneteasemusic/rust-napi");
const executor = new UNM.Executor();
const ctx = {
    enableFlac: null,
    proxyUri: null,
    searchMode: null,
    config: {
        'joox:cookie': null,
        'qq:cookie': null,
        'ytdl:exe': null,
    },
}
function toBuffer(data) {
    if (data instanceof Buffer) {
        return data;
    } else {
        return Buffer.from(data);
    }
}

async function getBiliVideoFile(url) {
    const axios = await import('axios').then(m => m.default);
    const response = await axios.get(url, {
        headers: {
            Referer: 'https://www.bilibili.com/',
            'User-Agent': 'okhttp/3.4.1',
        },
        responseType: 'arraybuffer',
    });

    const buffer = toBuffer(response.data);
    const encodedData = buffer.toString('base64');

    return encodedData;
}
async function getPlayUrl(songName, artistsName) {
    const searchResult = await executor.search(
        ['ytdl', 'kugou', 'bilibili', 'pyncm', 'migu', 'kuwo',],
        {
            id: "",
            name: songName,
            artists: [
                {
                    id: "",
                    name: artistsName,
                },
            ],
        },
        ctx
    );
    const retrievedSong = await executor.retrieve(searchResult, ctx);
    if (retrievedSong.url.includes('bilivideo.com')) {
        retrievedSong.url = await getBiliVideoFile(retrievedSong.url);
    }
    retrievedSong.url =
        retrievedSong.source === 'bilibili'
            ? `data:application/octet-stream;base64,${retrievedSong.url}`
            : retrievedSong.url;
    return retrievedSong
}

module.exports = {
    getPlayUrl
}
