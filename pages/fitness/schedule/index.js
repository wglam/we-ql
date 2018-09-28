// pages/index.js
const MONTHS = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'June.', 'July.', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    year: new Date().getFullYear(),      // 年份
    month: new Date().getMonth() + 1,    // 月份
    day: new Date().getDate(),
    str: MONTHS[new Date().getMonth()],  // 月份字符串


    demo4_days_style: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const days_count = new Date(this.data.year, this.data.month, 0).getDate();

    let demo4_days_style = new Array;
    // for (let i = 1; i <= days_count; i++) {
    //   if (i == 3) {
    //     demo4_days_style.push({
    //       month: 'current', day: i, color: 'white', background: '#46c4f3'
    //     });
    //   } else if (i == 7) {

    //   } else if (i == 12 || i == 23 || i == 24) {
    //     demo4_days_style.push({
    //       month: 'current', day: i, color: 'white', background: '#865fc1'
    //     });
    //   } else if (i == 21 || i == 22) {
    //     demo4_days_style.push({
    //       month: 'current', day: i, color: 'white', background: '#eb4986'
    //     });
    //   } else {
    //     demo4_days_style.push({
    //       month: 'current', day: i, color: '#333333'
    //     });
    //   }
    // }
    demo4_days_style.push({
      month: MONTHS[7], day: 12, color: 'white', background: '#ffb72b'
    });
    this.setData({
      demo4_days_style
    });
  },
})