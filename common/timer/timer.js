// common/timer/timer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    before:String,
    after:String,
    time: {
      type: Number,
      value: 0,
      observer: function(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
        // var imilliseconds = newVal % 1000;
        var iseconds = parseInt(newVal / 1000)
        var iminute = parseInt(iseconds / 60);
        var ihour = parseInt(iminute / 60);
        iminute = iminute % 60;
        iseconds = iseconds % 60;
        // imilliseconds = parseInt(imilliseconds / 100);

        var data = {
          hour: this.formatTimer(ihour),
          minute: this.formatTimer(iminute),
          seconds: this.formatTimer(iseconds),
          // milliseconds: imilliseconds
        }

        var that = this;
        that.setData(data);
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    hour: "00",
    minute: "00",
    seconds: "00",
    // milliseconds: "0"
  },

  /**
   * 组件的方法列表
   */
  methods: {
    formatTimer: function(v) {
      var a = v < 10 ? "0" + v : v
      return a;
    }
  }
})