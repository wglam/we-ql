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

  },
  ready: function() {},
  /**
   * 组件的属性列表
   */
  properties: {
    unit: String,
    name: String,
    target: {
      type: Number,
      value: -1,
      observer: function(newVal, oldVal, changedPath) {
        // console.log("target", newVal, oldVal)
      }
    },
    bodyType: {
      type: Number,
      value: 0,
      observer: function(newVal, oldVal, changedPath) {
        if (this.data.loadCurrent) {
          this.data.page = 0
          this.data.opts.charts = []
          this.data.opts.minx = 0
          this.data.opts.maxx = 0
          this.data.opts.miny = 0
          this.data.opts.maxy = 0
          this._searchBody()
        }
      }
    },
    loadCurrent: {
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal, changedPath) {
        if (newVal && this.data.page == 0) {
          this._searchBody()
        }
      }
    },
    memberid: String,
    isshare: Boolean,
    refresh: {
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal, changedPath) {
        if (this.data.loadCurrent && this.data.isshare) {
          this.data.page = 0
          this._searchBody()
        }
      }
    },
    reachbottom: {
      type: Boolean,
      value: false,
      observer: function(newVal, oldVal, changedPath) {
        if (this.data.loadCurrent) {
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
      charts: [],
      minx: 0,
      maxx: 0,
      miny: 0,
      maxy: 0,
    },
    btnHide: false,
    isLoading: false,
    nodata: false,
    page: 0,
    pageSize: 10,
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
      param.memberId = that.data.memberid ? that.data.memberid : g.userInfo.memberId
      param.bodyType = that.data.bodyType
      param.page = that.data.page + 1
      param.size = that.data.pageSize
      console.log("_searchBody", param)
      g.api.searchBody({
          data: param
        })
        .then(res => {
          var data = res.data

          if (data.retCode == '0000') {
            var opts = {}
            if (that.data.page == 0) {
              opts.charts = []
            } else {
              opts.charts = that.data.opts.charts
            }

            opts.minx = that.data.opts.minx
            opts.maxx = that.data.opts.maxx
            opts.miny = that.data.opts.miny
            opts.maxy = that.data.opts.maxy
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

            setTimeout(() => {
              that.redrawcharts(opts.target)
            }, 500)
          } else {
            that._hideLoading()
          }
        })
        .catch(e => {
          console.log(e)
          that._hideLoading()
        })
    },
    redrawcharts(target) {

      var that = this
      var opts = this.data.opts
      console.log("redrawcharts", opts)
      if (!opts) {
        return
      }
      if (!opts.charts) {
        return
      }
      if (opts && opts.charts && opts.charts.length < 1) {
        return
      }
      opts.target = target
      that.chartComponent = that.selectComponent('#line')
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


      if (target != null && target != -1) {
        miny = Math.min(miny, target)
        maxy = Math.max(maxy, target)
      }

      chart.source(charts, {
        x: {
          tickCount: 5,
          formatter(val) {
            var temp = new Date(val)
            return temp.Format("MM/dd");
          },
          min: minx,
          max: maxx
        },
        y: {
          tickCount: 3,
          formatter(val) {
            return val + unit;
          },
          min: Math.floor(miny),
          max: Math.ceil(maxy)
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
        sortable: true
      }).position('x*y').color('type', (type) => {
        return "#e88b12";
      })

      chart.point().position('x*y').color("#e88b12").size(2.5)
      chart.render()
      ///
      // that._canvasToTempFilePath('line_' + that.data.bodyType, width, height)
      console.log("initCharts", charts);
      return chart;
    },
    _canvasToTempFilePath: function(id, _width, _height) {
      var that = this
      console.log("_canvasToTempFilePath", id, _width, _height)
      setTimeout(function(that, width, height) {
        wx.canvasToTempFilePath({
          canvasId: id,
          width: _width,
          height: _height,
          success(res) {
            console.log("_canvasToTempFilePath", res.tempFilePath)
            that.setData({
              tempImg: res.tempFilePath
            })
          },
          fail(e) {
            console.log("_canvasToTempFilePath", e)
          }
        }, this)
      }, 3000)
    },
    btnNow: function(e) {
      var that = this
      that.setData({
        now: true,
        inputHide: false
      })
    },
    confirm: function(e) {

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
            .catch(e => {
              wx.hideLoading()
              console.log(e)
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
          param.toBMI = g.userInfo.toBMI
          param.tobust = g.userInfo.tobust
          param.towaist = g.userInfo.towaist
          param.tothigh = g.userInfo.tothigh
          //身体数据类型：1（体重）；2（身高）；3（BMI计算值不用传）；4（胸围）；5（腰围）；6（腿围）
          switch (that.data.bodyType) {
            case 1:
              param.toweight = i
              break;
            case 2:
              param.toheight = i
              break;
            case 3:
              param.toBMI = i
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
                g.userInfo.toheight = param.toheight
                g.userInfo.toweight = param.toweight
                g.userInfo.toBMI = param.toBMI
                g.userInfo.tobust = param.tobust
                g.userInfo.towaist = param.towaist
                g.userInfo.tothigh = param.tothigh
                wx.setStorageSync('userInfo', g.userInfo);
                wx.showToast({
                  title: '提交成功',
                })

                that.redrawcharts(i)
                that.setData({
                  target: i,
                  inputHide: true
                })

              } else {
                wx.showToast({
                  title: res.data.retDesc,
                  icon: "none"
                })
              }
            })
            .catch(e => {
              wx.hideLoading()
              console.log(e)
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