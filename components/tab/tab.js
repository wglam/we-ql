// common/tab/tab.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

Component({
  attached: function() {
    var that = this;
    wx.getSystemInfo({
      success: function(res) {
        that.setData({
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.current
        });
      }
    });
  },
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: Array,
    normal: {
      type: String,
      value: '#333333'
    },
    active: {
      type: String,
      value: '#e88b12'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    tabClick(e) {
      this.onTabChange(e.currentTarget.id);
    },
    onChange(e) {
      if ("touch" == e.detail.source) {
        this.onTabChange(e.detail.current);
      }
    },
    onTabChange(i) {
      this.setData({
        current: i
      });
      this.triggerEvent('Tab',i);
    }
  }
})