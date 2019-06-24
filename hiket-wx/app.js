//app.js
//const serverUrl = "http://localhost:8080";
//const serverUrl = "http://39.104.108.69:8080";
//const serverUrl = "http://39.106.179.8:8003";
//const serverUrl = "http://118.25.159.178:8005";
const serverUrl = "https://www.werehunter.com";


App({
    onLaunch: function () {
        let that = this;
        wx.hideTabBar({});
        wx.showLoading({
            title: '登录中',
            mask: true
        });
        // 登录
        // 如果第一次登录，后台存储用户 OpenId
        // 如果已经完成的学生认证，则将 userInfo 和 studentInfo 全部赋值
        // 因为是异步获取，所以成功后启用回调
        wx.login({
            success: res => {
                if (res.code) {
                    wx.request({
                        url: that.globalData.userRegisterUrl,
                        header: {
                            "Content-Type": 'application/x-www-form-urlencoded'
                        },
                        data: {
                            code: res.code,
                        },
                        method: 'POST',
                        success: function (res) {
                            console.log(res);
                            if (res.data.success) {
                                that.globalData.openId = res.data.data.openId;
                                that.getHasUnreadMessage();
                                if (that.openIdReadyCallback) {
                                    that.openIdReadyCallback();
                                }
                                if (that.searchRecommendCallback) {
                                    that.searchRecommendCallback();
                                }
                                if (that.gotoGoodCallback) {
                                    that.gotoGoodCallback();
                                }
                                if (res.data.data.role && res.data.data.role != 0) {
                                    that.globalData.studentInfo = res.data.data;
                                    that.globalData.userInfo = res.data.data;
                                    if (that.userInfoReadyCallback) {
                                        that.userInfoReadyCallback(res.data.data)
                                    }
                                    if (that.studentInfoReadyCallback) {
                                        that.studentInfoReadyCallback(res.data.data)
                                    }
                                }
                                wx.hideLoading();
                                wx.showToast({
                                    title: "登录成功"
                                })
                            } else {
                                wx.hideLoading();
                                wx.showModal({
                                    title: '提示',
                                    content: "微信登录失败，请退出应用后重试"
                                })
                            }
                        },
                        fail: function () {
                            wx.hideLoading();
                            wx.showToast({
                                title: '服务器维护中',
                                icon: 'none'
                            })
                        }
                    })
                }
            }
        });
        // 获取用户信息
        // 尝试更新用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo;
                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res.userInfo)
                            }
                            // 如果已经获取到 OpenId，直接更新 userInfo
                            // 如果没有获取到 OpenId，定义 OpenIdReady 的回调
                            if (this.globalData.openId) {
                                this.updateUserInfo();
                            } else {
                                this.openIdReadyCallback = function () {
                                    that.updateUserInfo();
                                };
                            }
                        }
                    })
                }
            }
        })
    },
    updateUserInfo: function () {
        let that = this;
        this.globalData.userInfo.openId = this.globalData.openId;
        wx.request({
            url: that.globalData.userUpdateUserInfoUrl,
            data: JSON.stringify(that.globalData.userInfo),
            method: 'POST',
            success: function (res) {
                console.log(res);
                if (res.data.success) {
                    if (res.data.data.role && res.data.data.role != 0) {
                        that.globalData.studentInfo = res.data.data;
                    }
                } else {
                    wx.showToast({
                        title: '信息未更新',
                        icon: 'none'
                    })
                }
            },
            fail: function () {
                wx.showToast({
                    title: '服务器维护中',
                    icon: 'none'
                })
            }
        })
    },
    // 自定义tabbar组件
    editTabbar: function () {
        let tabbar = this.globalData.tabBar;
        let currentPages = getCurrentPages();
        let _this = currentPages[currentPages.length - 1];
        let pagePath = _this.route;
        (pagePath.indexOf('/') != 0) && (pagePath = '/' + pagePath);
        for (let i in tabbar.list) {
            tabbar.list[i].selected = false;
            (tabbar.list[i].pagePath == pagePath) && (tabbar.list[i].selected = true);
        }
        _this.setData({
            tabbar: tabbar
        });
    },
    onShareAppMessage: function () {
        return {
            title: '一起来逛嗨市吧',
            path: '/pages/index/index',
            // imageUrl: 'https://www.werehunter.com/upload/banner/tiny/1.png'
        }
    },
    getHasUnreadMessage: function () {
        let that = this;
        wx.request({
            url: that.globalData.messageHasUnreadMessageUrl,
            header: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            data: {
                openId: that.globalData.openId,
            },
            method: 'POST',
            success: function (res) {
                console.log(res);
                if (res.data.success) {
                    that.globalData.messageUnRead = res.data.data;
                    if (that.hasUnreadMessageCallback) {
                        that.hasUnreadMessageCallback(res.data.data);
                    }
                }
            }
        });
    },
    globalData: {
        openId: null,
        userInfo: null,
        studentInfo: null,
        studentRegister: false,
        messageUnRead: false,
        userGetTopBannerUrl: serverUrl + '/user/getTopBanner',
        userRegisterUrl: serverUrl + '/user/register',
        userWeixinRegisterUrl: serverUrl + '/user/weixinRegister',
        userStudentRegisterUrl: serverUrl + '/user/studentRegister',
        userUpdateUserInfoUrl: serverUrl + '/user/updateUserInfo',
        releaseUploadImageUrl: 'https://www.werehunter.com' + '/release/uploadImage',
        releaseReleaseGoodUrl: serverUrl + '/release/releaseGood',
        searchGetGoodUrl: serverUrl + '/search/getGood',
        searchActiveGoodUrl: serverUrl + '/search/searchActiveGood',
        favoriteFavoriteGoodUrl: serverUrl + '/favorite/favoriteGood',
        favoriteNoneFavoriteGoodUrl: serverUrl + '/favorite/noneFavoriteGood',
        favoriteMyFavoriteGoodUrl: serverUrl + '/favorite/myFavoriteGood',
        operationMyGoodUrl: serverUrl + '/operation/myGood',
        operationUpdateGoodStateUrl: serverUrl + '/operation/updateGoodState',
        messageHasUnreadMessageUrl: serverUrl + '/message/hasUnreadMessage',
        messageGetMyMessageUrl: serverUrl + '/message/getMyMessage',
        messageReadMessageUrl: serverUrl + '/message/readMessage',
        messageReadAllMessageUrl: serverUrl + '/message/readAllMessage',
        browseBrowseGoodUrl: serverUrl + '/browse/browseGood',
        tabBar: {
            "backgroundColor": "#ffffff",
            "color": "#979795",
            "selectedColor": "#E74552",
            "list": [{
                "pagePath": "/pages/index/index",
                "iconPath": "icon/home.png",
                "selectedIconPath": "icon/home_selected.png",
                "text": "我要买"
            },
            {
                "pagePath": "/pages/release/release",
                "iconPath": "icon/icon_release.png",
                "isSpecial": true,
                "text": ""
            },
            {
                "pagePath": "/pages/mine/mine",
                "iconPath": "icon/mine.png",
                "selectedIconPath": "icon/mine_selected.png",
                "text": "我的"
            }
            ]
        }
    }
});