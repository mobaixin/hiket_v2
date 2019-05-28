// pages/mine/mine.js
const app = getApp();

Page({
    data: {
        canIUse: wx.canIUse('button.open-type.getUserInfo'),
        userInfo: null,
        studentInfo: null,
        hasUserInfo: false,
        hasStudentInfo: false,
        modalHidden: true,
        studentNumber: null,
        studentPassword: null,
        modalErrorHidden: true,
        modalErrorBeginMessage: '学号或密码错误，你还可尝试&nbsp;',
        modalErrorEndMessage: '&nbsp;次',
        modalErrorCount: 5,
        adminContent: '多次认证失败，可加管理员微信进行人工审核。',
        adminWeixinAvatarUrl: "https://wx.qlogo.cn/mmopen/vi_32/owcQAbjUWRRMaywxzMArsxzm2iaWtC07ZeJL4aT7fqsDQsFNrZLlvnzPCibw3rGkdHZXKONgsy6A6QCEAXkatmAg/132",
        adminWeixinNumber: 'F_Mortal',
        chooseCampus: false,
        tabbar: {},
        mine1: [
            {
                id: 1,
                name: "我的消息",
                url: '../message/message'
            }, {
                id: 2,
                name: "我的收藏",
                url: '../sections/sections?favorite=1'
            }, {
                id: 3,
                name: "我的发布",
                url: '../sections/sections?my=1'
            }
        ],
        mine2: [
            {
                id: 4,
                name: "防骗指南",
                url: '../about/about?id=0'
            }, {
                id: 5,
                name: "用户协议",
                url: '../about/about?id=1'
            }, {
                id: 6,
                name: "关于我们",
                url: '../about/about?id=2'
            }
        ]
    },
    onLoad: function () {
        app.editTabbar();
        if (app.globalData.userInfo) {
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        }
        if (app.globalData.studentInfo) {
            this.setData({
                studentInfo: app.globalData.studentInfo,
                hasStudentInfo: true
            })
        }
        app.userInfoReadyCallback = userInfo => {
            this.setData({
                userInfo: userInfo,
                hasUserInfo: true
            })
        };
        app.studentInfoReadyCallback = studentInfo => {
            this.setData({
                studentInfo: studentInfo,
                hasStudentInfo: true,
            })
        };

        // 由主页检测到未进行学生认证跳转来的
        if (app.globalData.studentRegister && this.data.hasUserInfo && !this.data.hasStudentInfo) {
            app.globalData.studentRegister = false;
            this.setData({
                modalHidden: false
            })
        }

        if (app.globalData.messageUnRead) {
            this.setData({
                'mine1[0].id': 1.1,
                'tabbar.list[2].iconPath': 'icon/mine_1.png',
                'tabbar.list[2].selectedIconPath': 'icon/mine_selected_1.png'
            })
        } else {
            this.setData({
                'mine1[0].id': 1,
                'tabbar.list[2].iconPath': 'icon/mine.png',
                'tabbar.list[2].selectedIconPath': 'icon/mine_selected.png'
            })
        }

        app.hasUnreadMessageCallback = messageUnRead => {
            if (messageUnRead) {
                this.setData({
                    'mine1[0].id': 1.1,
                    'tabbar.list[2].iconPath': 'icon/mine_1.png',
                    'tabbar.list[2].selectedIconPath': 'icon/mine_selected_1.png'
                })
            } else {
                this.setData({
                    'mine1[0].id': 1,
                    'tabbar.list[2].iconPath': 'icon/mine.png',
                    'tabbar.list[2].selectedIconPath': 'icon/mine_selected.png'
                })
            }
        };
    },
    onReady: function () {
        wx.hideTabBar({});
    },
    onShow: function () {
        wx.hideTabBar({});
        app.hasUnreadMessageCallback = messageUnRead => {
            if (messageUnRead) {
                this.setData({
                    'mine1[0].id': 1.1,
                    'tabbar.list[2].iconPath': 'icon/mine_1.png',
                    'tabbar.list[2].selectedIconPath': 'icon/mine_selected_1.png'
                })
            } else {
                this.setData({
                    'mine1[0].id': 1,
                    'tabbar.list[2].iconPath': 'icon/mine.png',
                    'tabbar.list[2].selectedIconPath': 'icon/mine_selected.png'
                })
            }
        };
        app.getHasUnreadMessage();
        if (app.globalData.messageUnRead) {
            this.setData({
                'mine1[0].id': 1.1,
                'tabbar.list[2].iconPath': 'icon/mine_1.png',
                'tabbar.list[2].selectedIconPath': 'icon/mine_selected_1.png'
            })
        } else {
            this.setData({
                'mine1[0].id': 1,
                'tabbar.list[2].iconPath': 'icon/mine.png',
                'tabbar.list[2].selectedIconPath': 'icon/mine_selected.png'
            })
        }
    },
    onShareAppMessage: function () {
        return app.onShareAppMessage();
    },
    bindGetUserInfo: function (e) {
        let that = this;
        e.detail.userInfo.openId = app.globalData.openId;
        wx.request({
            url: app.globalData.userWeixinRegisterUrl,
            data: JSON.stringify(e.detail.userInfo),
            method: 'POST',
            success: function (res) {
                console.log(res);
                if (res.data.success) {
                    app.globalData.userInfo = e.detail.userInfo;
                    that.setData({
                        userInfo: e.detail.userInfo,
                        hasUserInfo: true
                    });
                    wx.showToast({
                        title: "微信认证成功"
                    })
                } else {
                    wx.showModal({
                        title: '提示',
                        content: "微信认证失败，请退出应用后重试"
                    })
                }
            },
            fail: function () {
                wx.showToast({
                    title: "服务器错误",
                    icon: 'none'
                })
            }
        })
    },
    bindAuthorize: function () {
        this.setData({
            modalHidden: false
        })
    },
    studentNumberInput: function (e) {
        this.setData({
            studentNumber: e.detail.value
        })
    },
    studentPasswordInput: function (e) {
        this.setData({
            studentPassword: e.detail.value
        })
    },
    modalBindConfirm: function () {
        this.setData({
            modalHidden: true,
        });
        this.getStudentInfo()
    },
    modalBindCancel: function () {
        this.setData({
            modalHidden: true,
        })
    },
    getStudentInfo: function () {
        if (this.data.modalErrorCount > 0) {
            if (!this.data.studentNumber || !this.data.studentPassword) {
                wx.showModal({
                    title: '提示',
                    content: '请正确填写学号和密码',
                });
                this.bindAuthorize()
            } else {
                let that = this;
                wx.request({
                    url: app.globalData.userStudentRegisterUrl,
                    data: JSON.stringify({
                        openId: app.globalData.openId,
                        number: that.data.studentNumber,
                        password: that.data.studentPassword
                    }),
                    method: 'POST',
                    success: function (res) {
                        console.log(res);
                        if (res.data.success) {
                            wx.showToast({
                                title: '学生认证成功',
                            });
                            app.globalData.studentInfo = res.data.data;
                            that.setData({
                                hasStudentInfo: true,
                                studentInfo: res.data.data
                            })
                        } else {
                            that.setData({
                                modalErrorCount: that.data.modalErrorCount - 1,
                                modalErrorHidden: false,
                            });
                            that.bindAuthorize()
                        }
                    },
                    fail: function () {
                        wx.showToast({
                            title: '服务器错误',
                            icon: 'none'
                        })
                    }
                })
            }
        } else {
            wx.showToast({
                title: '可尝试次数为空',
                icon: 'none'
            })
        }
    },
    bindChooseCampus: function () {
        this.setData({
            chooseCampus: true
        })
    },
    chooseCampusBalitai: function (e) {
        this.updateUserInfo("八里台校区");
        this.setData({
            chooseCampus: false
        })
    },
    chooseCampusJinnan: function () {
        this.updateUserInfo("津南校区");
        this.setData({
            chooseCampus: false
        })
    },
    chooseCampusTaida: function () {
        this.updateUserInfo("泰达校区");
        this.setData({
            chooseCampus: false
        })
    },
    chooseCampusCancel: function () {
        this.setData({
            chooseCampus: false
        })
    },
    updateUserInfo: function (campus) {
        let that = this;
        wx.request({
            url: app.globalData.userUpdateUserInfoUrl,
            data: JSON.stringify({
                openId: app.globalData.openId,
                campus: campus
            }),
            method: 'POST',
            success: function (res) {
                console.log(res);
                if (res.data.success) {
                    app.globalData.userInfo = res.data.data;
                    app.globalData.studentInfo = res.data.data;
                    that.setData({
                        userInfo: res.data.data,
                        studentInfo: res.data.data
                    })
                } else {
                    wx.showToast({
                        title: '更新信息失败',
                        icon: 'none'
                    })
                }
            },
            fail: function () {
                wx.showToast({
                    title: '服务器错误',
                    icon: 'none'
                })
            }
        })
    },
    copyAdminWeixinNumber: function () {
        let that = this;
        wx.setClipboardData({
            data: that.data.adminWeixinNumber,
            success: function (res) {
                wx.showToast({
                    title: '复制成功',
                })
            }
        });
    }
});