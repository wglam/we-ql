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
    shareui: true,
    slider: {
      unit: "组",
      max: 10,
      value: 0,
      top: 0,
      index: 0
    },
    complete: true,
    nodata: false,
    select: 0,
    vip: false,
    isfirst: true,
  },
  onLoad: function(opts) {
 
  },
  onShow: function() {
    if (g.userInfo == null) {
      wx.navigateTo({
        url: '/pages/shouquan/shouquan',
      })
      return
    }
    var that = this
    g.api.checkMemberCard(g.userInfo.memberId)
      .then(res => {
        var val = {}
        if (res.data.retCode == '0000') {
          val.vip = true
          that.loadPlan();
        } else {
          val.vip = false
          if (that.data.isfirst) {
            wx.navigateTo({
              url: '/pages/vip/info/info',
            })
            val.isfirst = false
          }
        }
        that.setData(val)
      })
      .catch(e => {
        that.setData({
          isfirst: false
        })
        console.log(e)
      })
  },
  complete: function(e) {
    var that = this;
    var val = that.data.slider
    val.value = e.currentTarget.dataset.item.value
    val.top = e.currentTarget.dataset.top
    val.index = e.currentTarget.dataset.index
    val.unit = e.currentTarget.dataset.item.unit
    val.max = e.currentTarget.dataset.item.max

    if (val.top <= that.data.top) {
      that.setData({
        slider: val,
        inputHide: false
      })
    } else if (val.index <= that.data.current) {
      that.setData({
        slider: val,
        inputHide: false
      })
    } else {
      wx.showToast({
        title: '请按步骤训练',
        icon: 'none'
      })
    }

  },
  _hideInput: function() {
    var that = this;
    that.setData({
      inputHide: true,
    });
  },
  confirm: function(e) {

    var that = this;
    var val = {}
    val.current = that.data.current;
    val.top = that.data.top;

    // 修改之前数据不需增加current 和 top , sliderChange已经改变选择的完成情况
    var slider = that.data.slider
    if (slider.top < val.top) {
      that.setData({
        inputHide: true
      })
      return
    } else if (slider.index < val.current) {
      that.setData({
        inputHide: true
      })
      return
    }
    // 

    var items = that.data.items
    if (val.top >= items.length) {
      return
    }
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
    this.setData({
      inputHide: true,
      shareui: true
    });
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
        wx.hideLoading()
        if (res.data.retCode == '0000') {
          var s = res.data.retVal.planContent.replace(/\s+/g, '');
          var val = JSON.parse(s)
          // val.complete = res.data.retVal.completeRate >= 1
          console.log(val)
          if (val.self) {
            val.top = -1
            val.current = -1
            val.complete = true
          } else {
            val.top = 0
            val.current = 0
            val.complete = false
            for (var i = 0; i <= val.items.length - 1; i++) {
              var ic = val.items[i]
              var itLength = ic.items.length - 1
              for (var j = 0; j <= itLength; j++) {
                var item = ic.items[j]
                if (item.value >= 1) {
                  if (j >= itLength) {
                    val.top = i + 1;
                    val.current = 0
                  } else {
                    val.top = i
                    val.current = j + 1;
                  }
                }
              }
            }
          }

          console.log(val)
          val.nodata = false
          that.setData(val)
        } else {
          that.setData({
            nodata: true
          })
        }

      })
      .catch(res => {
        wx.hideLoading()
        that.setData({
          nodata: true
        })
      })
  },
  submit: function() {
    var that = this;
    if (that.data.complete) {
      wx.showToast({
        title: '今日健身进度已提交，不可重复提交',
        icon: 'none'
      })
      return
    }
    var param = {}
    param.planContent = {}
    param.planContent.title = that.data.title
    param.planContent.items = that.data.items
    param.planContent.self = true

    // console.log(param.planContent.items );
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
  _addMemberJsPlan(param, hidden) {
    var that = this
    wx.showLoading({
      title: '提交中',
    })

    var planContent = JSON.stringify(param.planContent)
    console.log(param)
    param.planContent = planContent
    param.memberId = g.userInfo.memberId
    g.api.addMemberJsPlan({
        data: {
          memberJsPlan: param
        }
      })
      .then(res => {
        wx.hideLoading()
        if (!hidden) {
          that.setData({
            complete: true,
            self: true,
            shareui: false,
            top: -1,
            current: -1
          })
        }
      })
      .catch(e => {
        wx.hideLoading()
        if (!hidden) {
          wx.showToast({
            title: '提交失败',
            icon: 'none'
          })
        }
      })
  },
  tabClick(e) {
    this.setData({
      select: e.currentTarget.dataset.index
    })
    console.log(this.data.select)
  },
  onHide() {
    var that = this;
    if (that.data.self) {
      return
    }
    var param = {}
    param.planContent = {}
    param.planContent.title = that.data.title
    param.planContent.items = that.data.items
    var value = 0;
    var max = 0;

    for (var i = 0; i <= param.planContent.items.length - 1; i++) {
      var ic = param.planContent.items[i]
      for (var j = 0; j <= ic.items.length - 1; j++) {
        var item = ic.items[j]
        value += 100 * item.value / item.max
        max += 100;
        // item.value = 0
      }
    }
    param.completeRate = 100 * value / max;
    if (param.completeRate >= 1) {
      that._addMemberJsPlan(param, true)
    }
    console.log(param.completeRate)
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function(ops) {
    var self = this;
    if (ops.from === 'menu') {
      var shareObj = {
        title: '氢练',
        path: "/pages/home/home?shareId=" + g.userInfo.openid,
        imageUrl: '/img/bg.jpg'
      }
      return shareObj;
    } else if (ops.from === 'button') {
      var _title = '跟着教练的计划健身第' + g.api.getJsDays() + '天，今天完成了（' + self.data.title + '）'
      var shareObj = {
        title: _title,
        path: "/pages/home/home?shareId=" + g.userInfo.openid,
        imageUrl: '/img/bg.jpg'
      }
      self.setData({
        shareui: true,
      })
      return shareObj;
    }
  },
})