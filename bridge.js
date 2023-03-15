const ffi = require('ffi-napi')
const path = require('path')

// const audioCppUtils = require('./lib/lib/Release_x64/capture-app-audio.dll')
// console.log('audioCppUtils', audioCppUtils)

// function showText(text) {
//     return new Buffer(text, 'utf-8').toString()
// }

// const myUser32 = ffi.Library('user32.dll', {
//     "MessageBoxW": ['int32', ['int32', 'string', 'string', 'int32']]
// })

// const isOk = myUser32.MessageBoxW(0, showText('i am'), showText('node js'), 1)

const libPath = path.join(__dirname, './lib/lib/Release_x64/capture-app-audio.dll')

console.log('libPath', libPath)

const testLib = ffi.Library(libPath, {
    "getShareInstance": ['pointer', []],
    'destroyShareInstance': ['void', []]
})

const instance = testLib.getShareInstance()
console.log('instance', instance.deref())
console.log('instance StartCapture', instance.StartCapture)

function startCapture(sourceId) {
    if(instance) {
        console.log('instance StartCapture', instance.StartCapture)
    }
}

module.exports = {

}