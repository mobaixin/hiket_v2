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
        currentTab: -1,
        sections: ["学习书籍", "美妆洗护", "生活家居", "时尚穿搭", "体育数码", "生鲜零食"],
        sectionTags: [
            ["教材", "考研", "雅思", "托福GRE", "考证系列", "文学", "工具书", "其它"],
            ["个人洗护", "美妆工具", "口红专区", "防晒", "彩妆", "面膜", "香水", "其它"],
            ["收纳储藏", "日用品", "宿舍好物", "小家电", "桌椅", "玩偶", "养生保健", "其它"],
            ["饰品", "包包", "裙子", "帽子", "鞋", "上衣", "裤子", "其它"],
            ["耳机", "键盘", "体育装备", "运动器械", "智能设备", "健身卡", "音响", "其它"],
            ["膨化食品", "咖啡", "坚果类", "奶制品", "饮料", "速食品", "水果", "其它"]
        ],
        Loading: true, //是否加载
        searchValue: null,
        goods: [],
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
        }else {
            app.userInfoReadyCallback = userInfo => {
                this.setData({
                    userInfo: userInfo,
                    hasUserInfo: true
                })
            };
        }
        if (app.globalData.studentInfo) {
            this.setData({
                studentInfo: app.globalData.studentInfo,
                hasStudentInfo: true,
            })
        }else{
            app.studentInfoReadyCallback = studentInfo => {
                this.setData({
                    studentInfo: studentInfo,
                    hasStudentInfo: true,
                    modalHidden: true
                })
            };
        }
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
        if (app.globalData.openId) {
            this.searchRecommend();
        }else {
            app.searchRecommendCallback = res=> {
                this.searchRecommend();
            }
        }
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
    bindTab: function (e) {
        let current = e.target.dataset.current;
        this.setData({
            currentTab: current
        })
    },
    bindSectionTap: function (e) {
        let sectionId = e.currentTarget.id;
        wx.navigateTo({
            url: '../sections/sections?sectionId=' + sectionId
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
    },

// 搜索
    searchRecommend: function () {
        let search = this.getSearch();
        search.orderByBrowseNumber = 1;
        this.searchGoods(search, true);
        // console.log(search);
    },
    getSearch: function () {
        return {
            openId: app.globalData.openId,
            section: this.data.currentTab,
            pattern: this.data.searchValue,
            beginIndex: 0,
            numberIndex: 20,
            orderByBrowseNumber: 0,
            orderByCreateTime: 0
        }
    },
    searchGoods: function (search, connect) {
        let that = this;
        wx.request({
            url: app.globalData.searchActiveGoodUrl,
            data: JSON.stringify(search),
            method: 'POST',
            success: function (res) {
                console.log(res);
                if (res.data.success) {
                    if (connect) {
                        that.setData({
                            goods: that.data.goods.concat(res.data.data)
                        });
                    } else {
                        that.setData({
                            goods: res.data.data
                        });
                    }
                }
                that.setData({
                    Loading: false
                })
            },
            fail: function () {
                wx.showToast({
                    title: '服务器错误',
                    icon: 'none'
                });
                that.setData({
                    Loading: false
                })
            }
        })
    },
    bindGoodTap: function (e) {
        let good = null;
        if (e.currentTarget.dataset.col == 0) {
            good = this.data.col1[e.currentTarget.dataset.index];
        } else if (e.currentTarget.dataset.col == 1) {
            good = this.data.col2[e.currentTarget.dataset.index];
        }
        wx.setStorage({
            key: "good",
            data: {
                goodInfo: good,
                col: e.currentTarget.dataset.col,
                index: e.currentTarget.dataset.index
            }
        });
        if (good != null) {
            wx.navigateTo({
                url: '../good/good',
            })
        }
    },
    searchValueInput: function (e) {
        this.setData({
            searchValue: e.detail.value
        })
    },
    bindSearch: function () {
        this.searchGoods(this.data.sectionId, this.data.searchValue, 0, this.data.numberIndex, false)
    },
});
