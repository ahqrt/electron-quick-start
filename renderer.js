/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

const { ipcRenderer } = require('electron')
const { convertArrayBufferToAudioBuffer, addAudioBufferToMediaStream, audioCtx, mediaStream } = require('./audioTransform')
const PCMPlayer = require('./pcmTransform')

let player
function initPlayer(channels, sampleRate) {
    player = new PCMPlayer({
        inputCodec: 'Int16',
        channels,
        sampleRate,
        flushTime: 0
    })
    window.pcmTransform = player

    const destinationNode = window.pcmTransform.destinationNode
    const stream = destinationNode.stream
    const audioPlayer = document.getElementById('pcm-player')
    audioPlayer.srcObject = stream
}


ipcRenderer.on('onAudioData', async (event, nodeBuffer, sampleRate, channel) => {
    // const arrayBuffer = nodeBuffer.buffer.slice(nodeBuffer.byteOffset, nodeBuffer.byteOffset + nodeBuffer.byteLength)
    if(!player) {
        initPlayer(channel, sampleRate)
    }
    player.feed(nodeBuffer)
})

window.electronAPI.desktopCapturerGetSources()