#ifndef __CAPTURE_APP_AUDIO_H__
#define __CAPTURE_APP_AUDIO_H__

#include <stdint.h>

#ifdef _WIN32
#ifndef WIN32_LEAN_AND_MEAN
#define WIN32_LEAN_AND_MEAN
#endif // !WIN32_LEAN_AND_MEAN
#include <windows.h>
#ifdef CAPTUREAPPAUDIO_EXPORTS
#define BOOM_API __declspec(dllexport)
#else
#define BOOM_API __declspec(dllimport)
#endif // CAPTUREAPPAUDIO_EXPORTS
#endif // _WIN32

namespace boom {
class AudioFrameCallback {
public:
    virtual ~AudioFrameCallback() {}

    /**
     * 数据回调
     * data 音频数据
     * length 数据长度
     * sampleRate 采样率
     * channel 声道数
     */
    virtual void OnCapturedRawAudioFrame(char* data, uint32_t length, uint32_t sampleRate, uint32_t channel) = 0;
};

class CaptureAppAudio {
public:
    /**
     * 开始音频采集
     * hwndId 指定窗口 ID
     * IncludeOrExclude 设置采集模式，true：只采集指定窗口音频 false：采集除了指定窗口外的音频
     * callback 音频数据回调指针
     * dump_audio 表示是否本地保存音频用于分析问题，true：保存 false：不保存，默认 false
     */
    virtual bool StartCapture(HWND hwndId, bool IncludeOrExclude, AudioFrameCallback* callback,
                              bool dump_audio = false) = 0;

    /**
     * 停止音频采集
     */
    virtual bool StopCapture() = 0;

protected:
    virtual ~CaptureAppAudio() {}
};
} // namespace boom

extern "C" {
    BOOM_API boom::CaptureAppAudio* getShareInstance();

    BOOM_API void destroyShareInstance();
}

#endif // __CAPTURE_APP_AUDIO_H__