const audioCtx = new AudioContext()
const mediaStream = new MediaStream()

/**
 * 
 * @param {ArrayBuffer} buffer 
 */
async function convertArrayBufferToAudioBuffer(buffer) {
    return audioCtx.decodeAudioData(buffer)
}

/**
 * 
 * @param {AudioBuffer} buffer 
 * @param {MediaStream} mediaStream 
 */
function addAudioBufferToMediaStream(buffer, mediaStream) {
    const destinationNode = audioCtx.createMediaStreamDestination()

    const bufferSource = audioCtx.createBufferSource()
    bufferSource.buffer = buffer
    bufferSource.connect(destinationNode)
    bufferSource.start(0)
    mediaStream.addTrack(destinationNode.stream.getAudioTracks()[0])
    return mediaStream
}


module.exports = {
    convertArrayBufferToAudioBuffer,addAudioBufferToMediaStream,audioCtx, mediaStream
}
