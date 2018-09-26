// pages/vip/group/group.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nowDate:new Date(),
    swiper: [{
      video: 'https://pic.ibaotu.com/00/78/86/31w888piC8Pc.mp4',
      image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537262844254&di=78e033e0836ad431ead59adb7e5a6464&imgtype=0&src=http%3A%2F%2Fpic.35pic.com%2Fnormal%2F08%2F35%2F11%2F3637404_163333224000_2.jpg'
    }, {
      image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537262844254&di=04ec763529a73d671aa03ab32730372d&imgtype=0&src=http%3A%2F%2Fwww.jituwang.com%2Fuploads%2Fallimg%2F121027%2F234808-12102H3453020.jpg'
    }, {
      image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537262844252&di=82d6f27ffb69e501cab25eb1473caf8a&imgtype=0&src=http%3A%2F%2Fscimg.jb51.net%2Fallimg%2F161216%2F102-161216112014531.jpg'
    }, {
      image: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537262850940&di=19c04f38fb61236f689b6d7b9b120574&imgtype=0&src=http%3A%2F%2Fimg02.tooopen.com%2Fproducts%2F20150425%2Ftooopen_89347611.jpg'
    }],
    price: 15.8,
    srcPrice: 128,
    tips: '已拼457815件',
    title: '普通会员 1个月',
    num: 44,
    groups: [{
        name: "张三丰",
        avatar: "http://image.weilanwl.com/img/square-3.jpg",
        sum: 2,
        current: 1,
        deadline: '',
        color: '#f0f'
      },
      {
        name: "张三丰2",
        avatar: "http://image.weilanwl.com/img/square-3.jpg",
        sum: 2,
        current: 1,
        deadline: '',
        color: '#f0f'
      }, {
        name: "张三丰3",
        avatar: "http://image.weilanwl.com/img/square-3.jpg",
        sum: 2,
        current: 1,
        deadline: '',
        color: '#f0f'
      }, {
        name: "张三丰4",
        avatar: "http://image.weilanwl.com/img/square-3.jpg",
        sum: 2,
        current: 1,
        deadline: '',
        color: '#f0f'
      }, {
        name: "张三丰5",
        avatar: "http://image.weilanwl.com/img/square-3.jpg",
        sum: 2,
        current: 1,
        deadline: '',
        color: '#f0f'
      }
    ]
  },
  startInterval: function() {
    varthat = this;
    setInterthat.data.setInter = setInterval(function() {
      varnumVal = that.data.num + 1;
      that.setData({
        num: numVal
      });
      console.log('setInterval==' + that.data.num);
    }, 2000);
  },
  endSetInter: function() {
    varthat = this;
    clearInterval(that.data.setInter)
  },
  onHide: function() {},
  onUnload: function() {
    varthat = this;
    clearInterval(that.data.setInter)
  },




})