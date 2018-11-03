Component({
  options: {
    multipleSlots: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    height: String,
    sliderTrans: {
      type: Boolean,
      value: false
    },
    tabColor: {
      type: String,
      value: "white"
    },
    tabs: Array,
    normal: {
      type: String,
      value: '#333333'
    },
    active: {
      type: String,
      value: '#e88b12'
    },
    current: {
      type: Number,
      value: 0
    },
    isTabs: {
      type: Boolean,
      value: true
    }
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
    tabClick(e) {
      this.onTabChange(e.currentTarget.id);
    },
    onTabChange(i) {
      this.setData({
        current: i
      });
      var item = {};
      item.name = this.data.tabs[i];
      item.current = i
      this.triggerEvent('Tab', item);
    }
  }
})