// pages/training/plan/plan.js
var g = getApp().globalData

Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    top: 0,
    current: 0,
    items: [],
    inputHide: true,
    slider: {
      unit: "组",
      max: 10,
      value: 0,
      top: 0,
      index: 0
    },
    complete: true
  },
  onLoad() {
    this.loadPlan();
  },
  complete: function(e) {
    var that = this;
    var val = that.data.slider
    val.value = e.currentTarget.dataset.item.value
    val.top = e.currentTarget.dataset.top
    val.index = e.currentTarget.dataset.index
    val.unit = e.currentTarget.dataset.item.unit
    val.max = e.currentTarget.dataset.item.max
    that.setData({
      slider: val,
      inputHide: false
    });
    console.log(e.currentTarget.dataset.item);
  },
  _hideInput: function() {
    var that = this;
    that.setData({
      inputHide: true
    });
  },
  confirm: function(e) {
    // console.log(e.detail.value);
    var that = this;
    var val = {}
    val.current = that.data.current;
    val.top = that.data.top;
    var items = that.data.items
    if (val.current < (items[val.top].items.length - 1)) {
      val.current++
    } else {
      val.top++;
      val.current = 0;
    }
    val.inputHide = true;
    that.setData(val);
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
  },
  loadPlan() {
    var that = this
    wx.showLoading({
      title: '加载中',
    })

    var data = {}
    data.memberId = g.userInfo.memberId
    data.timeStr = new Date().Format("yyyy-MM-dd")

    g.api.getMemberJsPlan({
        data
      })
      .then(res => {
        if (res.data.retCode == '0000') {
          var s = res.data.retVal.planContent.replace(/\s+/g, '');
          var val = JSON.parse(s)
          val.complete = val.completeRate >= 1
          that.setData(val)
        }

        wx.hideLoading()
      })
      .catch(res => {
        wx.hideLoading()
      })
  },
  submit: function() {
    var that = this;
    var param = {}
    param.planContent = {}
    param.planContent.title = that.data.title
    param.planContent.items = that.data.items

    var value = 0;
    var max = 0;
    var complete = true;
    for (var i = 0; i <= param.planContent.items.length - 1; i++) {
      var ic = param.planContent.items[i]
      for (var j = 0; j <= ic.items.length - 1; j++) {
        var item = ic.items[j]
        value += 100 * item.value / item.max
        if (complete && item.value == 0) {
          complete = false;
        }
        max += 100;
        // item.value = 0
      }
    }
    param.completeRate = 100 * value / max;

    console.log(param);
    if (complete) {
      that._addMemberJsPlan(param)
    } else {
      wx.showModal({
        title: '氢练',
        content: '还有训练项目未完成，您要提交吗？',
        confirmText: '提交',
        confirmColor: '#39f',
        success: res => {
          if (res.confirm) {
            that._addMemberJsPlan(param)
          }
        }
      })
    }
  },
  _addMemberJsPlan(param) {
    var that = this
    wx.showLoading({
      title: '提交中',
    })
    g.api.addMemberJsPlan({
        data: {
          memberJsPlan: param
        }
      })
      .then(res => {
        that.setData({
          top: -1,
          current: -1,
          complete: true
        })
        wx.hideLoading()
      })
  }
})