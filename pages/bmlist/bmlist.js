var Entrance = require('../../utils/common.js'); //通用js函数库
// 请求数据
var page = 0;
var loadMore = function (that, call = "infolistReadyCallback") {
    page++;
    var infodata = {
        pagesize: 10,
        t:that.data.t,
        id:that.data.id,
    };
    var infourl = "?c=samples&a=bmList";
    setTimeout(function () {
        Entrance.infodata(that, infourl, "加载中...", infodata, "info", "POST", call);
    }, 500);
}

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //上拉加载操作
        scrollTop: 0,
        scrollHeight: 0,
        list: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        page = 0;
        that.setData({
            t:options.t,
            id:options.id,
        })
        loadMore(that); //发送加载请求
        that.infolistReadyCallback = res => { //赋值后进行数据处理
            var list = that.data.list;
            if (that.data.infodata != null) {
                for (var i = 0; i < that.data.infodata.length; i++) {
                    list.push(that.data.infodata[i]);
                }
                that.setData({
                    list: list
                });
            }
        }
        //设置当前页面高度
        wx.getSystemInfo({
            success: function (res) {
                that.setData({
                    scrollHeight: res.windowHeight
                });
            }
        });
    },

    /**
     * 页面上拉触底事件的处理函数
     */

    //页面滑动到底部
    bindDownLoad: function () {
        var that = this;
        loadMore(that);
    },

})