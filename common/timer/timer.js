// common/timer/timer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    time: {
      type: Number,
      value: 0,
      observer: function(newVal, oldVal, changedPath) {
        // 属性被改变时执行的函数（可选），也可以写成在methods段中定义的方法名字符串, 如：'_propertyChange'
        // 通常 newVal 就是新设置的数据， oldVal 是旧数据
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
    milliseconds: "00"
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})