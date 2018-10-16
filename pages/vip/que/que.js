import {
  Form
} from '../../../utils/form'

var g = getApp().globalData
Form({
  onReady: function() {
    this.loadMemberAnswer()
  },
  /**
   * 页面的初始数据
   */
  data: {
    region: ['--', '--', '--'],
    memberSex: 0,
    genders: ['--', '男', '女'],
    ydtime: 0,
    ydtimes: ['早餐前或后', '中餐前或后', '晚餐前或后'],
    images: [],
  },
  formSubmit: function(e) {

    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var that = this
    const params = e.detail.value
    if (!that.WxValidate.checkForm(params)) {
      const error = that.WxValidate.errorList[0]
      wx.showModal({
        content: error.msg,
        showCancel: false,
      })
      return false
    }
    wx.showLoading({
      title: '正在提交',
    })
    var paths = that.data.images
    if (paths && paths.length >= 1) {
      params.images = []
      var i = 0
      that.uploadFile(paths, i, params.images, res => {
        that.addMemberAnswer({
          data: {
            memberId: g.userInfo.memberId,
            answerContent: params
          }
        })
      })
    } else {
      that.addMemberAnswer({
        data: {
          memberId: g.userInfo.memberId,
          answerContent: params
        }
      })
    }

  },
  uploadFile(paths, i, images, success) {
    var self = this

    g.api.uploadFile(paths[i], res => {
      var val = JSON.parse(res.data)
      if (val.retCode == '0000') {
        images.push(g.api.getFile(val.list["0"]))
        i++
        if (i <= paths.length - 1) {
          self.uploadFile(paths, i, images, success)
        } else {
          success(images)
        }
      } else {
        wx.hideLoading()
        wx.showToast({
          title: val.retDesc,
          icon: 'none'
        })
      }
    }, e => {
      wx.hideLoading()
      console.log(e)
      wx.showToast({
        title: '上传图片失败',
        icon: 'none'
      })
    })
  },
  addMemberAnswer(param) {
    g.api.addMemberAnswer(param).then(res => {
        wx.hideLoading()
        if (res.data.retCode == '0000') {
          wx.navigateBack({
            delta: 1
          })
          wx.showToast({
            title: '提交成功',
          })
        } else {
          wx.showToast({
            title: '提交失败',
            icon: 'none'
          })
        }
      })
      .catch(res => {
        wx.hideLoading()
        wx.showToast({
          title: '提交失败',
          icon: 'none'
        })
      })
  },
  bindSexChange: function(e) {
    var that = this
    that.setData({
      memberSex: e.detail.value
    })
  },
  bindRegionChange: function(e) {
    var that = this
    that.setData({
      region: e.detail.value
    })
  },
  bindDateChange: function(e) {

    var that = this
    that.setData({
      birthDay: e.detail.value
    })
  },
  bindYdTimesChange: function(e) {
    var that = this
    that.setData({
      ydtime: e.detail.value
    })
  },
  addImage: function(e) {
    var that = this;
    wx.chooseImage({
      sizeType: ['compressed'],
      success(res) {
        var val = that.data.images;
        for (var item of res.tempFilePaths) {
          val.push(item)
        }
        that.setData({
          images: val
        })
      }
    })
  },
  delImage: function(e) {
    var that = this;
    var val = that.data.images;
    val.splice(e.currentTarget.dataset.index, 1);
    that.setData({
      images: val
    })
  },
  loadMemberAnswer() {
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    g.api.getMemberAnswer({
        data: {
          memberId: g.userInfo.memberId
        }
      })
      .then(res => {
        wx.hideLoading()
        var val
        if (res.data.retCode == '0000') {
          val = res.data.retVal
        } else {
          val = g.userInfo
        }
        that.setData(val)
      })
      .catch(res => {
        wx.hideLoading()
        var val = g.userInfo
        that.setData(val)
      })
  },
})