// pages/training/plan/plan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "训练主题：胸+背+肩",
    top: 0,
    current: 0,
    items: [{
      name: '热身',
      items: [{
        target: '热身动作',
        name: '开合跳',
        zushu: 10,
        cishu: 15,
        video: 'xxx',
        rest: "15s",
        value: 0,
        dzyl: "核心收紧，不要塌腰，感受胸部发力",
        hxyl: "核心收紧，不要塌腰，感受胸部发力",
        unit: "组"
      }]
    }, {
      name: '训练',
      items: [{

        target: '胸部',
        name: '跪姿俯卧撑',
        zushu: 10,
        cishu: -1,
        rest: "30s",
        value: 0,
        dzyl: "核心收紧，不要塌腰，感受胸部发力",
        hxyl: "核心收紧，不要塌腰，感受胸部发力",
        unit: "组"
      }, {

        target: '肩部',
        name: '哑铃侧平举',
        zushu: 4,
        cishu: 20,
        rest: "30s",
        value: 0,
        unit: "组"
      }]
    }, {
      name: '有氧',
      items: [{
        name: '快走',
        time: "40分钟",
        xinlv: "130次/分",
        strong: 1,
        value: 0,
        unit: "分钟"
      }]
    }, {
      name: '拉伸',
      items: [{
        target: "拉伸",
        name: '四头肌拉伸',
        zushu: 3,
        time: "30s",
        value: 0,
        unit: "分钟"
      }]
    }],
    inputHide: true,
    slider: {
      unit: "组",
      max: 10,
      value: 0,
      top: 0,
      index: 0
    }
  },
  complete: function(e) {
    var that = this;
    var val = that.data.slider
    val.value = e.currentTarget.dataset.item.value
    val.top = e.currentTarget.dataset.top
    val.index = e.currentTarget.dataset.index
    val.unit = e.currentTarget.dataset.item.unit
    that.setData({
      slider: val,
      inputHide: false
    });

    // console.log(e.currentTarget.dataset.top);
    // console.log(e.currentTarget.dataset.index);
    console.log(that.data.sliderItem);
  },
  _hideInput: function() {
    var that = this;
    that.setData({
      inputHide: true
    });
  },
  confirm: function(e) {
    console.log(e.detail.value);
  },
  cancel: function(e) {
    this._hideInput();
  },
  empty: function(e) {

  },
  sliderChange: function(e) {
    var that = this;

    //
    var val = that.data.slider
    val.value = e.detail.value

    var vals = that.data.items;
    vals[val.top].items[val.index].value = e.detail.value

    that.setData({
      items: vals,
      slider: val
    })
  }
})