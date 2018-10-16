import F2 from '../../components/f2-canvas/lib/f2';

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

// 


var g = getApp().globalData
Component({

  attached: function() {
    // charts = this.data.datas;
    // minx = 1527401498000;
    // maxx = 1538287898000;

    // maxy = 61;
    // miny = 50;

  },
  ready: function() {},
  /**
   * 组件的属性列表
   */
  properties: {
    unit: String,
    name: String,
    target: Number,
    bodyType: Number,
    loadCurrent: {
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal, changedPath) {
        if (newVal) {
          this._searchBody()
        }
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputHide: true,
    opts: {
      lazyLoad: true,
    },
    btnHide: false,
    isLoading: false,
    nodata: false,
    page: 0,
    pageSize: 10,
    charts: [],
    minx: 0,
    maxx: 0,
    miny: 0,
    maxy: 0,
    now: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _searchBody: function() {
      var that = this;
      if (that.data.page >= 1 && (that.data.isLoading || that.data.nodata)) {
        return
      }

      that._showLoading(false)
      var param = {}
      param.memberId = g.userInfo.memberId
      param.bodyType = that.data.bodyType
      param.page = that.data.page + 1
      param.size = that.data.pageSize
      g.api.searchBody({
          data: param
        })
        .then(res => {
          var data = res.data
          // data = {
          //   retCode: "0000",
          //   retDesc: "查询成功",
          //   totalrecords: "1",
          //   list: [{
          //     xVal: "165",
          //     yVal: "2018-10-08"
          //   }, {
          //     xVal: "172",
          //     yVal: "2018-06-07"
          //   }],
          //   pageCount: "1", //总页数
          //   total: 1 //总条数
          // }

          if (data.retCode == '0000') {

            var opts = {}
            if (that.data.page == 0) {
              opts.charts = []
            } else {
              opts.charts = that.data.charts
            }

            opts.minx = that.data.minx
            opts.maxx = that.data.maxx
            opts.miny = that.data.miny
            opts.maxy = that.data.maxy
            opts.unit = that.data.unit
            opts.target = that.data.target

            for (var it of data.list) {
              it.x = new Date(it.yVal.replace(/-/g, "/")).getTime()
              it.y = parseFloat(it.xVal)
              it.time = it.yVal
              delete it.xVal
              delete it.yVal
              opts.charts.push(it)
              opts.minx = opts.minx == 0 ? it.x : Math.min(opts.minx, it.x)
              opts.maxx = Math.max(opts.maxx, it.x)
              opts.miny = opts.miny == 0 ? it.y : Math.min(opts.miny, it.y)
              opts.maxy = Math.max(opts.maxy, it.y)
            }

            that.setData({
              opts,
              isLoading: false,
              nodata: (data.list.length < param.size),
              page: param.page
            })
            that.chartComponent = that.selectComponent('#line_' + that.data.bodyType)
            that.chartComponent.init((canvas, width, height) => {
              return that.initCharts(canvas, width, height, opts.minx, opts.maxx, opts.miny, opts.maxy, opts.target, opts.unit, opts.charts)
            })

          } else {
            that._hideLoading()
          }
        })
        .catch(res => {
          console.log(res)
          that._hideLoading()
        })
    },
    redrawcharts(target) {
      var that = this
      var opts = this.data.opts
      if (opts.charts.length < 1) {
        return
      }
      that.chartComponent = that.selectComponent('#line_' + that.data.bodyType)
      that.chartComponent.init((canvas, width, height) => {
        return that.initCharts(canvas, width, height, opts.minx, opts.maxx, opts.miny, opts.maxy, opts.target, opts.unit, opts.charts)
      })
    },
    compare(obj1, obj2) {
      var val1 = obj1.x;
      var val2 = obj2.x;
      if (val1 < val2) {
        return -1;
      } else if (val1 > val2) {
        return 1;
      } else {
        return 0;
      }
    },
    _showLoading(_nodata) {
      var that = this;
      that.setData({
        isLoading: true,
        nodata: _nodata
      })
    },
    _hideLoading() {
      var that = this;
      that.setData({
        isLoading: false
      })
    },
    _hideInput: function() {
      var that = this;
      that.setData({
        inputHide: true
      });
    },
    showInput: function() {
      var that = this;
      that.setData({
        now: false,
        inputHide: false
      });
    },
    confirm: function(e) {
      console.log(e);
    },
    cancel: function(e) {
      console.log(e);
      this._hideInput();
    },
    scroll: function(e) {

    },
    scrollLower: function(e) {
      this._searchBody()
    },
    initCharts: function(canvas, width, height, minx, maxx, miny, maxy, target, unit, charts) {
      var that = this

      var chart = new F2.Chart({
        el: canvas,
        width,
        height
      });

      chart.tooltip(false);
      chart.interaction('pan');
      // 定义进度条
      chart.scrollBar({
        mode: 'x',
        xStyle: {
          backgroundColor: 'rgba(0, 0, 0, .0)',
          fillerColor: 'rgba(0, 0, 0, .0)',
          offsetY: -5
        }
      });

      chart.axis('x', {
        line: null
      });

      var yticks = new Array
      if (target == null || target < 0 || target == miny || target == maxy) {
        yticks = [miny, maxy];
      } else if (target < miny) {
        yticks.push(target)
        yticks.push(miny)
        yticks.push(maxy)
      } else if (target > maxy) {
        yticks.push(miny)
        yticks.push(maxy)
        yticks.push(target)
      } else if (target > miny && target < maxy) {
        yticks.push(miny)
        yticks.push(target)
        yticks.push(maxy)
      }

      chart.source(charts, {
        x: {
          tickCount: 4,
          formatter(val) {
            var temp = new Date(val)
            return temp.Format("MM/dd");
          },
          min: minx,
          max: maxx
        },
        y: {
          ticks: yticks,
          formatter(val) {
            return val + unit;
          }
        }
      });

      chart.axis('y', {
        line: null,
        grid: (text, index, total) => {
          if (target > 0 && text == (target + unit)) {
            return {
              stroke: '#726C7A',
              lineDash: [8, 8]
            };
          }
          return {
            stroke: 'rgba(0, 0, 0, .0)'
          }
        }
      });
      //  {
      //   sortable: false // 数据已在外部排序，提升性能
      // }
      chart.line({
        sortable: false
      }).position('x*y').color('type', (type) => {
        return "#e88b12";
      });
      chart.render();
      return chart;
    },
    btnNow: function(e) {
      var that = this
      that.setData({
        now: true,
        inputHide: false
      })
    },
    confirm: function(e) {
      console.log(e.detail.value);
      var i = parseFloat(e.detail.value.value)
      if (i && i > 0) {
        wx.showLoading({
          title: '正在提交',
        })
        var that = this
        if (that.data.now) {
          g.api.addMemberBody({
              data: {
                memberBody: {
                  memberId: g.userInfo.memberId,
                  bodyType: that.data.bodyType,
                  valStr: i
                }
              }
            })
            .then(res => {
              wx.hideLoading()
              if (res.data.retCode == "0000") {
                wx.showToast({
                  title: '提交成功',
                })
                that.setData({
                  page: 0,
                  inputHide: true
                })
                that._searchBody()
              } else {
                wx.showToast({
                  title: res.data.retDesc,
                  icon: "none"
                })
              }
            })
            .catch(res => {
              wx.hideLoading()
              console.log(res)
              wx.showToast({
                title: '提交失败',
                icon: "none"
              })

            })
        } else {
          var param = {}
          param.memberId = g.userInfo.memberId
          param.toheight = g.userInfo.toheight
          param.toweight = g.userInfo.toweight
          param.toBIM = g.userInfo.toBIM
          param.tobust = g.userInfo.tobust
          param.towaist = g.userInfo.towaist
          param.tothigh = g.userInfo.tothigh
          //身体数据类型：1（体重）；2（身高）；3（BMI计算值不用传）；4（胸围）；5（腰围）；6（腿围）
          switch (that.data.bodyType) {
            case 1:
              param.toweight = i
              break;
            case 2:
              param.height = i
              break;
            case 3:
              param.toBIM = i
              break;

            case 4:
              param.tobust = i
              break;
            case 5:
              param.towaist = i
              break;
            case 6:
              param.tothigh = i
              break;
          }

          g.api.setBodyTarget({
              data: {
                memberInfo: param
              }
            })
            .then(res => {
              wx.hideLoading()
              if (res.data.retCode == "0000") {
                wx.showToast({
                  title: '提交成功',
                })
                that.setData({
                  target: i,
                  inputHide: true
                })
                that.redrawcharts(i)
              } else {
                wx.showToast({
                  title: res.data.retDesc,
                  icon: "none"
                })
              }
            })
            .catch(res => {
              wx.hideLoading()
              console.log(res)
              wx.showToast({
                title: '提交失败',
                icon: "none"
              })
            })

        }
      } else {
        wx.showToast({
          title: '请输入',
          icon: 'none'
        })
      }
    }
  }
})