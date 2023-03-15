const lib = require('bindings')('bjy_electron_plugin')

const instance = new lib.BJYCppPlugin()

instance.createEngineInstance()

function eventCallBack(data) {
    console.log('audio data', Object.prototype.toString.call(data), data[0], data[1], data[2], data[3])
}

instance.SetEventCallback('onCapturedRawAudioFrameNode', eventCallBack)

/**
 * 
 * @param {number} sid 
 * @param {boolean} ignore 
 */
function startCapture(sid, ignore) {
    instance.startAudioCapture(sid, ignore)
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
    destroy
}