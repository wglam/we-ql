// common/card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    url: String,
    bg: String,
    title: String,
    info: String,
    btn: String,
    progress: {
      type: Number,
      value: -1
    },
    progressName: String,
    bottom: Boolean,
    openType: {
      type: String,
      value: "navigate"
    },
    tips: String
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onClick: function() {
      const that = this;
      that.triggerEvent('Click')
    }
  }
})