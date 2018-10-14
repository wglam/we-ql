var g = getApp().globalData

Page({
  data: {
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
    }]
  },
  onLoad(options) {
    var that = this;
    that.setData({
      current: options.tab,
      tabIndex: options.tab
    });
  },

  onReady() {
    if (g.userInfo != null) {
      var that = this;
      var loadDefault = function() {
        var user = g.userInfo
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
        if (user.toBIM && user.toBIM.length >= 1) {
          val[5].target = parseFloat(user.toBIM)
        }
        val[5].target=50
        that.setData({
          chats: val
        })

      }
      g.api.getBodyTarget(g.userInfo.memberId, loadDefault, loadDefault)
    }
  },
  onTabChange: function(e) {

    var that = this;
    that.setData({
      tabIndex: e.detail.current
    });
  }
});