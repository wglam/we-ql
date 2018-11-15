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
    jsdays: 0,
    isque: false,
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
          that._checkMemberAnswer()
        } else {
          val.vip = false
          if (that.data.isfirst) {
            wx.navigateTo({
              url: '/pages/vip/info/info?home=2',
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
          // s = '[{"jsTitle":"家庭减脂训练计划（胸＋肩＋腹）","jsTop":0,"jsCurrent":0,"bzName":"热身","target":"热身动作","name":"开合跳","video":0,"time":"30秒","zushu":10,"rest":"10~20秒","value":0,"dzyl":"核心收紧，不要塌腰，感受胸部发力","hxyl":"鼻吸口呼，用力吐气，省力吸气","unit":"组","max":10},{"jsTitle":"家庭减脂训练计划（胸＋肩＋腹）","jsTop":0,"jsCurrent":0,"bzName":"训练","target":"胸部","name":"跪姿俯卧撑","video":0,"zushu":4,"cishu":-1,"rest":"30秒","value":0,"dzyl":"核心收紧，不要塌腰，感受胸部发力","hxyl":"鼻吸口呼，用力吐气，省力吸气","unit":"组","max":4},{"jsTitle":"家庭减脂训练计划（胸＋肩＋腹）","jsTop":0,"jsCurrent":0,"bzName":"训练","target":"肩部","name":"哑铃侧平举","video":0,"zushu":4,"cishu":20,"rest":"30秒","value":0,"dzyl":"身体保持稳定，沉肩，微微向内旋转，肩带动大臂，大臂带动小臂，小臂带动哑铃","hxyl":"鼻吸口呼，用力吐气，省力吸气","unit":"组","max":4},{"jsTitle":"家庭减脂训练计划（胸＋肩＋腹）","jsTop":0,"jsCurrent":0,"bzName":"训练","target":"腹部","name":"平板支撑","video":0,"zushu":4,"cishu":-1,"rest":"30秒","value":0,"dzyl":"腰背、腹、臀收紧，身体呈平板式","hxyl":"鼻吸口呼，用力吐气，省力吸气","unit":"组","max":4},{"jsTitle":"家庭减脂训练计划（胸＋肩＋腹）","jsTop":0,"jsCurrent":0,"bzName":"有氧","name":"HIIT燃脂初级","video":1,"time":"40分钟","value":0,"dzyl":"按照视频节奏练习","hxyl":"鼻吸口呼，用力吐气，省力吸气","unit":"分钟","max":40},{"jsTitle":"家庭减脂训练计划（胸＋肩＋腹）","jsTop":0,"jsCurrent":0,"bzName":"拉伸","target":"拉伸","name":"上半身拉伸","video":0,"time":"8~10分钟","value":0,"dzyl":"侧重拉伸斜方肌、胸部和肩部肌群","hxyl":"鼻吸口呼，用力吐气，省力吸气","unit":"分钟","max":10}]'
          var val = JSON.parse(s)
          // console.log("back", val)
          // val.complete = res.data.retVal.completeRate >= 1
          if (Array.isArray(val)) {
            var t;

            for (var i = 0; i <= val.length - 1; i++) {
              var it = val[i]
              if (!t) {
                t = {}
                t.title = it.jsTitle
                t.map = new Map
              }
         

              var ittn = t.map.get(it.bzName)
              if (!ittn) {
                ittn = []
                t.map.set(it.bzName, ittn)
              }
              delete it.jsTitle
              delete it.bzName
              delete it.jsCurrent
              delete it.jsTop
              ittn.push(it)
            }
            t.map.forEach(function(v, k, map) {
              if (!t.items) {
                t.items = []
              }
              var tp = {}
              tp.name = k
              tp.items = v
              t.items.push(tp)
            })

            delete t.map
            val = t
            console.log(val)
          }

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
          if (res.data.retVal.diffDay) {
            val.jsdays = res.data.retVal.diffDay
          } else {
            val.jsdays = 0
          }

          val.nodata = false
          val.planId = res.data.retVal.planId
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
        imageUrl: '/img/share.jpg'
      }
      return shareObj;
    } else if (ops.from === 'button') {
      var _title = '跟着教练的计划健身第' + g.api.getJsDays() + '天，今天完成了（' + self.data.title + '）'
      var shareObj = {
        title: _title,
        path: "/pages/home/home?shareId=" + g.userInfo.openid,
        imageUrl: '/img/share.jpg'
      }
      self.setData({
        shareui: true,
      })
      return shareObj;
    }
  },
  _checkMemberAnswer() {
    var that = this;
    if (!that.data.isque) {
      g.api.checkMemberAnswer({
          data: {
            memberId: g.userInfo.memberId
          }
        })
        .then(res => {
          if (res.data.retCode == '2222') {
            that.setData({
              isque: true
            });
            that.loadPlan();
          }
        })
        .catch(e => {
          console.log(e)
        })
    }
  }
})