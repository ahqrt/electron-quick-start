class PCMTransform {
    init(option) {
        const defaultOption = {
          inputCodec: 'Int16', // 传入的数据是采用多少位编码，默认16位
          channels: 1, // 声道数
          sampleRate: 8000, // 采样率 单位Hz
          flushTime: 1000 // 缓存时间 单位 ms
        }
    
        this.option = Object.assign({}, defaultOption, option) // 实例最终配置参数
        this.samples = new Float32Array() // 样本存放区域
        this.convertValue = this.getConvertValue()
        this.typedArray = this.getTypedArray()
        this.initAudioContext()
      }


      getConvertValue() {
        // 根据传入的目标编码位数
        // 选定转换数据所需要的基本值
        const inputCodecs = {
          'Int8': 128,
          'Int16': 32768,
          'Int32': 2147483648,
          'Float32': 1
        }
        if (!inputCodecs[this.option.inputCodec]) throw new Error('wrong codec.please input one of these codecs:Int8,Int16,Int32,Float32')
        return inputCodecs[this.option.inputCodec]
      }
    
}