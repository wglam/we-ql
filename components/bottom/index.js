// components/bottom/index.js
Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    bottom: Number
  },

  /**
   * 组件的初始数据
   */
  data: {
    content: 0
  },
  pageLifetimes: {

    show: function() {
      
    },
  },
  ready: function() {
    var that = this
    var query = wx.createSelectorQuery().in(this);
    query.select('#bottom').boundingClientRect()
    query.exec((res) => {
      var listHeight = res[0].height;;
      let content = wx.getSystemInfoSync().windowHeight - res["0"].height
      that.setData({
        content
      })
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})