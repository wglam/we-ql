// plugins/vip/buyinfo.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: String,
    key: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: 0,
    infos: [{
      period: '1个月',
      money: '169'
    }, {
      period: '3个月',
      money: '299'
    }, {
      period: '6个月',
      money: '369'
    }],
    vipinfos: [{
      url: 'http://image.weilanwl.com/img/4x3-1.jpg',
      name: '专业全方位系统评估'
    }, {
      url: 'http://image.weilanwl.com/img/4x3-1.jpg',
      name: '量身定制专属健身及饮食计划'
    }, {
      url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537262844254&di=78e033e0836ad431ead59adb7e5a6464&imgtype=0&src=http%3A%2F%2Fpic.35pic.com%2Fnormal%2F08%2F35%2F11%2F3637404_163333224000_2.jpg',
      name: 'xxxx'
    }, {
      url: 'http://image.weilanwl.com/img/4x3-1.jpg',
      name: 'xxxx'
    }, {
      url: 'http://image.weilanwl.com/img/4x3-1.jpg',
      name: 'xxxx'
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    infoTab: function (e) {
      const that = this;
      that.setData({
        current: e.currentTarget.dataset.index
      });
      console.log(e.currentTarget.dataset.item)
    }
  }
})