// pages/message/message.js
const app = getApp();

Page({
    data: {
        messages: null,
        messageUnRead: false
    },
    load: function () {
        let that = this;
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        wx.request({
            url: app.globalData.messageGetMyMessageUrl,
            header: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            data: {
                openId: app.globalData.openId,
            },
            method: 'POST',
            success: function (res) {
                console.log(res);
                wx.hideLoading();
                if (res.data.success) {
                    that.setData({
                        messages: res.data.data
                    })
                } else {
                    wx.showToast({
                        title: '加载失败',
                        icon: 'none'
                    })
                }
            },
            fail: function () {
                wx.hideLoading();
                wx.showToast({
                    title: '服务器错误',
                    icon: 'none'
                })
            }
        })
    },
    onLoad: function (options) {
        this.load();
        this.setData({
            messageUnRead: app.globalData.messageUnRead
        });

        app.hasUnreadMessageCallback = messageUnRead => {
            this.setData({
                messageUnRead: messageUnRead
            });
        }
    },
    onShareAppMessage: function () {
        return app.onShareAppMessage();
    },
    bindMessage: function (e) {
        if (this.data.messages[e.currentTarget.dataset.index].state == 0) {
            this.data.messages[e.currentTarget.dataset.index].state = 1;
            this.setData({
                messages: this.data.messages
            });
            wx.request({
                url:app.globalData.messageReadMessageUrl,
                data: JSON.stringify(this.data.messages[e.currentTarget.dataset.index]),
                method: 'POST',
                success: function (res) {
                    console.log(res);
                }
            });
        }
        wx.setStorage({
            key: "message",
            data: this.data.messages[e.currentTarget.dataset.index]
        });
        wx.navigateTo({
            url: '../message_info/message_info'
        })
    },
    readAllMessage: function () {
        app.globalData.messageUnRead = false;
        for (let i = 0; i < this.data.messages.length; i++) {
            this.data.messages[i].state = 1;
        }
        this.setData({
            messages: this.data.messages,
            messageUnRead: false
        });
        wx.request({
            url: app.globalData.messageReadAllMessageUrl,
            header: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            data: {
                openId: app.globalData.openId
            },
            method: 'POST',
            success: function (res) {
                console.log(res);
            }
        })
    }
});