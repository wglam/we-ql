// pages/index.js
const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];
let _year = 0;
let _month = 0;
let _day = 0;

Date.prototype.Format = function(fmt) {
  var o = {
    "M+": this.getMonth() + 1, //月份 
    "d+": this.getDate(), //日 
    "h+": this.getHours(), //小时 
    "m+": this.getMinutes(), //分 
    "s+": this.getSeconds(), //秒 
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
    "S": this.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
var g = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: new Date().getFullYear(), // 年份
    month: new Date().getMonth() + 1, // 月份
    day: new Date().getDate(),
    str: MONTHS[new Date().getMonth()], // 月份字符串
    days_style: [],
    title: '暂无',
    progress: -1,
    endDate: new Date().Format("yyyy-MM"),
    days: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    _year = this.data.year
    _month = this.data.month
    _day = this.data.day

    let days_style = new Array;

    days_style.push({
      month: 'current',
      day: _day,
      color: 'white',
      background: '#ff7e00'
    });

    var _days = g.api.getJsDays()
    this.setData({
      days_style,
      days: _days
    });

    this.loadPlan(new Date())
  },
  next: function(e) {
    var item = e.detail

    let days_style = new Array;
    if (_year == item.currentYear && _month == item.currentMonth) {
      days_style.push({
        month: 'current',
        day: _day,
        color: 'white',
        background: '#ff7e00'
      });
    }

    this.setData({
      days_style
    });

  },
  prev: function(e) {
    var item = e.detail

    let days_style = new Array;
    if (_year == item.currentYear && _month == item.currentMonth) {
      days_style.push({
        month: 'current',
        day: _day,
        color: 'white',
        background: '#ff7e00'
      });
    }

    this.setData({
      days_style
    });
  },
  dayClick: function(e) {
    console.log(e.detail)
    var item = e.detail
    var that = this;


    _year = item.year
    _month = item.month
    _day = item.day


    let days_style = new Array
    days_style.push({
      month: 'current',
      day: _day,
      color: 'white',
      background: '#ff7e00'
    });
    let progress = new Object
    if (item.year >= that.data.year && item.month >= that.data.month && item.day > that.data.day) {
      that.setData({
        days_style,
        title: '暂无',
        progress: -1
      });
    } else {
      that.setData({
        days_style
      });
      var date = new Date()
      date.setFullYear(_year)
      date.setMonth(_month)
      date.setDate(_day)
      that.loadPlan(date)
    }

  },
  loadPlan(date) {
    var that = this
    wx.showLoading({
      title: '加载中',
    })

    var data = {}
    data.memberId = g.userInfo.memberId
    data.timeStr = date.Format("yyyy-MM-dd")

    g.api.getMemberJsPlan({
        data
      })
      .then(res => {
        var _val = {}
        if (res.data.retCode == '0000') {
          _val.title = res.data.retVal.planContent.title
          _val.progress = res.data.retVal.completeRate
        } else {
          _val.title = '暂无'
          _val.progress = -1
        }
        that.setData(_val)
        wx.hideLoading()
      }, fail => {
        wx.hideLoading()
      })
  }
})