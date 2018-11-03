var g = getApp().globalData

Page({
  data: {

    opts: {
      lazyLoad: true,
    },
    tabs: ["体重", "胸围", "腰围", "腿围", "身高", "BMI"],
    chats: [{
      name: "体重",
      unit: "kg",
      target: -1,
      bodyType: 1
    }, {
      name: "胸围",
      unit: "cm",
      target: -1,
      bodyType: 4

    }, {
      name: "腰围",
      unit: "cm",
      target: -1,
      bodyType: 5
    }, {
      name: "腿围",
      unit: "cm",
      target: -1,
      bodyType: 6
    }, {
      name: "身高",
      unit: "cm",
      target: -1,
      bodyType: 2
    }, {
      name: "BMI",
      target: -1,
      bodyType: 3
    }],
    loadComplete: false
  },
  onLoad(options) {

    var val = {}

    if (options.id) {
      val.id = options.id
      val.isShare = g.userInfo ? (val.id != g.userInfo.memberId) : true
      if (val.isShare && options.title) {
        val.title = options.title
        wx.setNavigationBarTitle({
          title: options.title
        })
      }
    }
    if (options.tab) {
      val.current = options.tab
    } else {
      val.current = 0
    }
    this.setData(val)
    console.log(val)
    if (g.userInfo == null) {
      wx.navigateTo({
        url: '/pages/shouquan/shouquan',
      })
    }
  },

  onReady() {
    var _id = null
    var that = this;
    if (that.data.id) {
      _id = that.data.id
    }
    if (!_id && g.userInfo != null) {
      _id = g.userInfo.memberId
    }
    if (_id) {
      var loadDefault = function(user) {
        var val = that.data.chats
        if (user.toweight && user.toweight.length >= 1) {
          val[0].target = parseFloat(user.toweight)
        }
        if (user.tobust && user.tobust.length >= 1) {
          val[1].target = parseFloat(user.tobust)
        }
        if (user.towaist && user.towaist.length >= 1) {
          val[2].target = parseFloat(user.towaist)
        }

        if (user.tothigh && user.tothigh.length >= 1) {
          val[3].target = parseFloat(user.tothigh)
        }

        if (user.toheight && user.toheight.length >= 1) {
          val[4].target = parseFloat(user.toheight)
        }
        if (user.toBMI && user.toBMI.length >= 1) {
          val[5].target = parseFloat(user.toBMI)
        }

        that.setData({
          chats: val,
          loadComplete: true
        })
        console.log(val)
      }
      g.api.getBodyTarget(_id)
        .then(res => {
          if (res.data.retCode == '0000') {
            var item = res.data.retVal
            var user;
            if (that.data.isShare) {
              user = {}
            } else {
              user = g.userInfo;
            }
            if (item.memberName) user.memberName = item.memberName
            if (item.height) user.toheight = item.height
            if (item.weight) user.toweight = item.weight
            if (item.BMI) user.toBMI = item.BMI
            if (item.bust) user.tobust = item.bust
            if (item.waist) user.towaist = item.waist
            if (item.thigh) user.tothigh = item.thigh
            if (!that.data.isShare) wx.setStorageSync("userInfo", user)
            loadDefault(user)
          } else {
            loadDefault(g.userInfo)
          }
        })
        .catch(e => {
          console.log(e)
          loadDefault(g.userInfo)
        })
    }
  },
  onTabChange: function(e) {

    var that = this;
    that.setData({
      current: e.detail.current,
    });
  },
  onShareAppMessage: function(ops) {
    var self = this;
    if (ops.from === 'menu') {
      var shareObj = {
        title: '氢练',
        path: "/pages/my/add/add?shareId=" + g.userInfo.openid + "&title=" + g.userInfo.memberName + "的数据&id=" + g.userInfo.memberId + "&tab=" + self.data.current,
      }
      return shareObj;
    }
  },
  onShow: function() {
    this.setData({
      refresh: !this.data.refresh
    })
  },
  stopTouchMove: function() {
    return false;
  },
  onReachBottom: function() {
    this.setData({
      reachbottom: !this.data.reachbottom
    })
  }

});