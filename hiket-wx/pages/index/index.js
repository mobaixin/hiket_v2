// pages/index/index.js
const app = getApp();

Page({
    data: {
        userInfo: null,
        studentInfo: null,
        hasUserInfo: false,
        hasStudentInfo: false,
        modalHidden: true,
        tabbar: {},
        topBanner: [
            'https://www.werehunter.com/upload/banner/tiny/1.png',
            'https://www.werehunter.com/upload/banner/tiny/2.png',
            'https://www.werehunter.com/upload/banner/tiny/3.png'
        ],
        sections1: [{
            url: "../../images/index/s_1.png",
            title: "学习用品",
            idx: 0
        },
            {
                url: "../../images/index/s_2.png",
                title: "动植物",
                idx: 1
            },
            {
                url: "../../images/index/s_3.png",
                title: "生活美妆",
                idx: 2
            },
        ],
        sections2: [{
            url: "../../images/index/s_4.png",
            title: "吃喝玩乐",
            idx: 3
        },
            {
                url: "../../images/index/s_5.png",
                title: "电子设备",
                idx: 4
            },
            {
                url: "../../images/index/s_6.png",
                title: "时尚穿搭",
                idx: 5
            },
        ]
    },
    load: function () {
        let that = this;
        wx.request({
            url: app.globalData.userGetTopBannerUrl,
            method: 'POST',
            success: function (res) {
                console.log(res);
                if (res.data.success) {
                    that.setData({
                        topBanner: res.data.data.sort(function () {
                            return (0.5 - Math.random());
                        }).slice(0, 3)
                    })
                }
            }
        })
    },
    onLoad: function (options) {
        this.load();
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
                hasStudentInfo: true,
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
                modalHidden: true
            })
        };
        // 如果未认证，提示进行认证
        if (!app.globalData.userInfo || !app.globalData.studentInfo) {
            this.setData({
                modalHidden: false
            })
        }
        // 如果是通过分享链接跳转进来的
        if (options.goodId) {
            wx.navigateTo({
                url: '../good/good?goodId' + options.goodId
            });
        }

        if (app.globalData.messageUnRead) {
            this.setData({
                'tabbar.list[2].iconPath': 'icon/mine_1.png',
                'tabbar.list[2].selectedIconPath': 'icon/mine_selected_1.png'
            })
        } else {
            this.setData({
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
    onPullDownRefresh: function () {
        this.load();
        wx.stopPullDownRefresh();
    },
    bindSectionTap: function (e) {
        let sectionId = e.currentTarget.id;
        wx.navigateTo({
            url: '../sections/sections?sectionId=' + sectionId
        });
    },
    bindRecommend: function (e) {
        wx.navigateTo({
            url: '../sections/sections?recommend=1'
        });
    },
    modalBindConfirm: function () {
        this.setData({
            modalHidden: true,
        });
        if (this.data.hasUserInfo) {
            app.globalData.studentRegister = true;
        }
        wx.switchTab({
            url: '../mine/mine'
        })
    },
    modalBindCancel: function () {
        this.setData({
            modalHidden: true,
        })
    }
});
