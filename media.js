const { desktopCapturer } = require('electron')

async function desktopCapturerGetSources() {
    const data = { types: ['window', 'screen'] }
    const sources = await desktopCapturer.getSources(data)
    sources.forEach(source => {
        source.thumbnailBase64 = source.thumbnail.toDataURL()
    })
    return sources
}


/**
 * 
 * cpp dll库接受音频数据回调
 * @param {Array<string>} data 
 * @param {number} length 
 * @param {number} sampleRate 
 * @param {number} channel 
 */
async function onCapturedRawAudioFrame(data, length, sampleRate, channel) {
    console.log('data', data, 'length', length, 'sampleRate', sampleRate, 'channel', channel)
}



async function getScreenMedia(config) {
    return navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            mandatory: {
                chromeMediaSource: 'desktop',
                chromeMediaSourceId: config.sourceId
            }
        }
    })
}

module.exports = {
    desktopCapturerGetSources,
    getScreenMedia
}