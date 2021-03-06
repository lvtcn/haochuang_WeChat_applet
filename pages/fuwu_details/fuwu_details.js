var Entrance = require('../../utils/common.js'); //通用js函数库
var WxParse = require('../../static/wxParse/wxParse.js'); //html富文本

Page({

    /**
     * 页面的初始数据
     */
    data: {
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var id = options.id;
        var that = this;
        var data = {
            id: id,
        };
        var url = "?c=wxList&a=dfuwwudata";
        Entrance.infodata(that, url, "加载中...", data, "", "POST", "infouserInfoReadyCallback");
        that.infouserInfoReadyCallback = res => {
            var content = that.data.data.content;
            if(content != null){
                WxParse.wxParse("content", 'html', content, that, 5);
            }
            that.setData({
                scstatus: that.data.data.scstatus,
            })
        }
    },

    //收藏操作
    shoucang: function (e) {
        var that = this;
        Entrance.shouChangStatus(that,e,"fuwu");
    },

    //拨打电话操作
    calling:function(){
        var that = this;
        wx.makePhoneCall({
            phoneNumber: that.data.data.lxfs, //此号码并非真实电话号码，仅用于测试
        })
    },

    //购买操作
    GoMai:function (){
        var that = this;
        Entrance.pcuserInfobinding(that);
        if (getapp.globalData.uid !== 0) {
            wx.navigateTourl({
                url: "../order/order?id=" + that.data.id + "&t=fabu_fuwu",
            })
        }
    }
})