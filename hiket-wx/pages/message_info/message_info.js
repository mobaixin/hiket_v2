// pages/message_info/message_info.js
const app = getApp;

Page({
    data: {
        message: null,
    },
    onLoad: function (options) {
        let that = this;
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        wx.getStorage({
            key: 'message',
            success: function (res) {
                that.setData({
                    message: res.data
                });
                wx.hideLoading();
            },
            fail: function () {
                wx.hideLoading();
                wx.showToast({
                    title: '加载失败',
                    icon: 'none'
                })
            }
        })
    },
    onShareAppMessage: function () {
        return app.onShareAppMessage();
    }
});