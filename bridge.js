const lib = require('./plugin/bjy_electron_plugin.node')

const instance = new lib.BJYCppPlugin()

instance.createEngineInstance()
let mainWindow

function eventCallBack(data, sampleRate, channel) {
    mainWindow.webContents.send('onAudioData', data, sampleRate, channel)
}

setEventCallback(eventCallBack)

function setEventCallback(callback) {
    instance.SetEventCallback('onCapturedRawAudioFrame', callback)
}

/**
 * 
 * @param {number} sid 
 * @param {boolean} onlySourceId 
 */
function startCapture(sid, onlySourceId, mainWindowInMain) {
    mainWindow = mainWindowInMain
    instance.startAudioCapture(sid, onlySourceId)
}

function stopCapture() {
    instance.stopAudioCapture()
}

function destroy() {
    instance.destroyEngineInstance()
}


module.exports = {
    startCapture,
    stopCapture,
    destroy,
    setEventCallback
}