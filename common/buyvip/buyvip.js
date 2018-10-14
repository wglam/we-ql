// plugins/vip/buyinfo.js
var g = getApp().globalData
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info: null
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: 0,
    baseFile: g.api.getFileBase()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    infoTab: function(e) {
      const that = this;
      that.setData({
        current: e.currentTarget.dataset.index
      });
      that.triggerEvent('ItemClick', e.currentTarget.dataset.item);
    }
  }
})