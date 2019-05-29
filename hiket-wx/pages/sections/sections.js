// pages/sections/sections.js
const app = getApp();

Page({
    data: {
        Loading: false, //是否加载
        goods: [],
        favorite: false,
        my: false
    },
    onLoad: function (options) {
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        }else {
            app.userInfoReadyCallback = res => {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            };
        }
        if (app.globalData.studentInfo) {
            this.setData({
                studentInfo: app.globalData.studentInfo,
                hasStudentInfo: true
            })
        }else {
            app.studentInfoReadyCallback = studentInfo => {
                this.setData({
                    studentInfo: studentInfo,
                    hasStudentInfo: true,
                })
            };
        }
        if (options.my) {
            this.myGoods();
        }else if (options.favorite) {
            this.myFavoriteGoods();
        }
    },
    onShow: function () {
        let that = this;
        wx.getStorage({
            key: 'good',
            success: function (res) {
                console.log(res);
                let goodInfo = res.data.goodInfo;
                let index = res.data.index;
                let change = res.data.change;
                if (change) {
                    that.data.goods[index] = goodInfo;
                    that.setData({
                        goods: that.data.goods,
                    });
                }
                wx.removeStorage({key: 'good'})
            }
        })
    },
    onShareAppMessage: function () {
        return app.onShareAppMessage();
    },
    bindGoodTap: function (e) {
        let index = e.currentTarget.dataset.index;
        let good = this.data.goods[index];
        wx.setStorage({
            key: "good",
            data: {
                goodInfo: good,
                index: index
            }
        });
        if (good) {
            wx.navigateTo({
                url: '../good/good',
            })
        }
    },
    myFavoriteGoods: function () {
        wx.setNavigationBarTitle({
            title: '我的收藏',
        });
        this.setData({
            Loading: true,
            goods: null,
            favorite: true
        });
        let that = this;
        wx.request({
            url: app.globalData.favoriteMyFavoriteGoodUrl,
            header: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            data: {
                openId: app.globalData.openId,
            },
            method: 'POST',
            success: function (res) {
                console.log(res);
                if (res.data.success) {
                    that.setData({
                        goods: res.data.data
                    });
                } else {
                    wx.showToast({
                        title: '获取信息失败',
                        icon: 'none'
                    })
                }
                that.setData({
                    Loading: false
                })
            },
            fail: function () {
                wx.showToast({
                    title: '服务器维护中',
                    icon: 'none'
                });
                that.setData({
                    Loading: false
                })
            }
        })
    },
    myGoods: function () {
        wx.setNavigationBarTitle({
            title: '我的发布',
        });
        this.setData({
            Loading: true,
            goods: null,
            my: true
        });
        let that = this;
        wx.request({
            url: app.globalData.operationMyGoodUrl,
            header: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            data: {
                openId: app.globalData.openId,
            },
            method: 'POST',
            success: function (res) {
                console.log(res);
                if (res.data.success) {
                    that.setData({
                        goods: res.data.data
                    });
                } else {
                    wx.showToast({
                        title: '获取信息失败',
                        icon: 'none'
                    })
                }
                that.setData({
                    Loading: false
                })
            },
            fail: function () {
                wx.showToast({
                    title: '服务器维护中',
                    icon: 'none'
                });
                that.setData({
                    Loading: false
                })
            }
        })
    }
});
