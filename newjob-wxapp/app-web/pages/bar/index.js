import * as echarts from '../../ec-canvas/echarts';

let barchart = null;
let linechart = null;
let scalepiechart = null;
let propertypiechart = null;



Page({
  onShareAppMessage: function(res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function() {},
      fail: function() {}
    }
  },
  data: {
    ecBar: {
      onInit: function(canvas, width, height) {
        barchart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(barchart);
        return barchart;
      }
    },
    ecLine: {
      onInit: function(canvas, width, height) {
        linechart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(linechart);
        return linechart;
      }
    },
    ecScalepie: {
      onInit: function(canvas, width, height) {
        scalepiechart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(scalepiechart);
        return scalepiechart;
      }
    },
    ecPropertypie: {
      onInit: function(canvas, width, height) {
        propertypiechart = echarts.init(canvas, null, {
          width: width,
          height: height
        });
        canvas.setChart(propertypiechart);
        return propertypiechart;
      }
    },
  },

  onReady() {
    setTimeout(this.getbarData, 500);
    setTimeout(this.getlineData, 500);
    setTimeout(this.getscalepieData, 500);
    setTimeout(this.getpropertypieData, 500);
    // setInterval(this.getbarData, 5000);
    // setInterval(this.getlinerData, 5000);
    // setInterval(this.getscalepieData, 5000);
    // setInterval(this.getpropertypieData, 5000);
  },
  getbarData() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http://127.0.0.1:5000/first/bar',
      herder: {
        "content-type": "json"
      },
      success: function(res) {
        console.log(res);
        var result = res.data;
        console.log(result)
        barchart.setOption({
          title: {
            text: '学历需求',
            subtext: '-数量-',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '5%',
            top: '25%',
            bottom: '15%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: result.category,
            axisLine: {
              show: true,
              lineStyle: {
                color: "#090609",
                width: 1,
                type: "solid"
              },
            },

            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              show: true,
              splitNumber: 15,
              textStyle: {
                color: "#090609",
                fontSize: '12',
              },
            },
          }],
          yAxis: [{
            name: '数量(个)',
            type: 'value',
            axisLabel: {
              show: true,
              textStyle: {
                color: "#090609",
                fontSize: '12',
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#090609",
                width: 1,
                type: "solid"
              },
            },
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              }
            }
          }],
          series: [{
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'top',
                  color: '#090609'
                }
              },
              data: result.value,
              barWidth: '35%', //柱子宽度
              // barGap: 1, //柱子之间间距
              itemStyle: {
                normal: {
                  color: '#2739CF',
                  opacity: 1,
                  barBorderRadius: 5,
                }
              }
            }

          ]
        })
        wx.hideLoading();
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getlineData() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http://127.0.0.1:5000/first/line',
      herder: {
        "content-type": "json"
      },
      success: function(res) {
        console.log(res);
        var result = res.data;
        console.log(result)
        linechart.setOption({
          title: {
            text: '热门城市薪资',
            subtext: '-平均月薪-',
            x: 'center'
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '3%',
            right: '5%',
            top: '25%',
            bottom: '15%',
            containLabel: true
          },

          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: result.name,
            axisLine: {
              lineStyle: {
                color: '#090609',
                fontSize: 10
              }
            },

          },
          yAxis: {
            name: '薪水(k/月)',
            type: 'value',
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              }
            },
            axisLine: {
              lineStyle: {
                color: '#090609',
                fontSize: 10
              }
            },
          },
          series: [


            {
              name: '平均薪水',
              type: 'line',
              stack: '总量',
              color: ['#28ec00'],
              data: result.value,
              itemStyle: {
                normal: {
                  label: {
                    show: true
                  }
                }
              }
            },
          ]
        })
        wx.hideLoading();
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getscalepieData() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http://127.0.0.1:5000/first/scale',
      herder: {
        "content-type": "json"
      },
      success: function(res) {
        console.log(res);
        var result = res.data;
        var datachage = [];
        for (var i = 0; i < result.category.length; i++) {
          datachage.push({
            name: result.category[i],
            value: result.value[i]
          })
        }
        console.log(result)
        scalepiechart.setOption({
          title: {
            text: '企业规模',
            subtext: '-百分比-',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: "{b}\n:{c}家({d}%)"
          },
          visualMap: {
            show: false,
            min: 500,
            max: 600,
            inRange: {}
          },
          series: [{
            type: 'pie',
            radius: '50%',
            clockWise: false,
            color: ['rgb(131,249,103)', '#FBFE27', '#FE5050', '#1DB7E5'],
            data: datachage,
            roseType: 'radius',
            labelLine: {
              normal: {
                lineStyle: {
                  color: '#A1FF9F'
                },
                smooth: 0.2,
                length: 3,
                length2: 0

              }
            },
          }]
        })
        wx.hideLoading();
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  getpropertypieData() {
    wx.showLoading({
      title: '加载中...',
    })
    wx.request({
      url: 'http://127.0.0.1:5000/first/property',
      herder: {
        "content-type": "json"
      },
      success: function(res) {
        console.log(res);
        var result = res.data;
        var datachage = [];
        for (var i = 0; i < result.name.length; i++) {
          datachage.push({
            name: result.name[i],
            value: result.value[i]
          })
        }
        console.log(result)
        propertypiechart.setOption({
          title: {
            text: '企业类型',
            subtext: '-百分比-',
            x: 'center'
          },
          tooltip: {
            show: true,
            formatter: '{b}:{c}\n({d}%)'
          },
          "series": [{
            "type": "pie",
            "center": ["50%", "60%"],
            "radius": ["30%", "40%"],
            "color": ["#FEE449", "#00FFFF", "#00FFA8", "#9F17FF", "#FFE400", "#F76F01", "#01A4F7", "#FE2C8A"],
            "startAngle": 135,
            "labelLine": {
              "normal": {
                "length": 15
              }
            },
            "label": {
              "normal": {
                "formatter": "{b|{b}}",
                "backgroundColor": "rgba(255, 147, 38, 0)",
                "borderColor": "transparent",
                "borderRadius": 4,
                "rich": {
                  "a": {
                    "color": "#999",
                    "lineHeight": 22,
                    "align": "center"
                  },
                  "hr": {
                    "borderColor": "#aaa",
                    "width": "100%",
                    "borderWidth": 1,
                    "height": 0
                  },
                  "b": {
                    "color": "#b3e5ff",
                    "fontSize": 10,
                    "lineHeight": 33
                  },
                  "c": {
                    "fontSize": 10,
                    "color": "#eee"
                  },
                  "per": {
                    "color": "#FDF44E",
                    "fontSize": 10,
                    "padding": [5, 8],
                    "borderRadius": 2
                  }
                },
                "textStyle": {
                  "color": "#fff",
                  "fontSize": 10
                }
              }
            },
            "emphasis": {
              "label": {
                "show": true,
                "formatter": "{b|{b}}",
                "backgroundColor": "rgba(255, 147, 38, 0)",
                "borderColor": "transparent",
                "borderRadius": 4,
                "rich": {
                  "a": {
                    "color": "#999",
                    "lineHeight": 22,
                    "align": "center"
                  },
                  "hr": {
                    "borderColor": "#aaa",
                    "width": "100%",
                    "borderWidth": 1,
                    "height": 0
                  },
                  "b": {
                    "color": "#fff",
                    "fontSize": 10,
                    "lineHeight": 33
                  },
                  "c": {
                    "fontSize": 10,
                    "color": "#eee"
                  },
                  "per": {
                    "color": "#FDF44E",
                    "fontSize": 10,
                    "padding": [5, 6],
                    "borderRadius": 2
                  }
                }
              }
            },
            "data": datachage
          }, {
            "type": "pie",
            "center": ["50%", "60%"],
            "radius": ["20%", "21%"],
            "label": {
              "show": false
            },
            "data": [{
              "value": 0,
              "itemStyle": {
                "normal": {
                  "color": {
                    "x": 0,
                    "y": 0,
                    "x2": 1,
                    "y2": 0,
                    "type": "linear",
                    "global": false,
                    "colorStops": [{
                      "offset": 0,
                      "color": "#9F17FF"
                    }, {
                      "offset": 0.2,
                      "color": "#01A4F7"
                    }, {
                      "offset": 0.5,
                      "color": "#FE2C8A"
                    }, {
                      "offset": 0.8,
                      "color": "#FEE449"
                    }, {
                      "offset": 1,
                      "color": "#00FFA8"
                    }]
                  }
                }
              }
            }]
          }]
        })
        wx.hideLoading();
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
});