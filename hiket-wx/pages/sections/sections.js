// pages/sections/sections.js
const app = getApp();

Page({
    data: {
        sections: ["学习用品", "动植物", "生活美妆", "吃喝玩乐", "电子设备", "时尚穿搭"],
        Loading: true, //是否加载
        beginIndex: 0,
        numberIndex: 20, //每次加载的数据量
        sectionId: -1,
        recommend: false,
        favorite: false,
        my: false,
        searchValue: null,
        hideSearch: false,
        goods: [],
        col1: [],
        col2: [],
    },
    onLoad: function (options) {
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
        app.userInfoReadyCallback = res => {
            this.setData({
                userInfo: res.userInfo,
                hasUserInfo: true
            })
        };
        app.studentInfoReadyCallback = studentInfo => {
            this.setData({
                studentInfo: studentInfo,
                hasStudentInfo: true,
            })
        };
        // 选择类别
        // 今日推荐
        // 我的收藏
        // 我的发布
        if (options.sectionId) {
            wx.setNavigationBarTitle({
                title: this.data.sections[options.sectionId],
            });
            this.setData({
                sectionId: options.sectionId
            });
            this.searchGoods(this.data.sectionId, null, this.data.goods.length, this.data.numberIndex, true);
        } else if (options.recommend) {
            wx.setNavigationBarTitle({
                title: "今日推荐",
            });
            this.setData({
                recommend: true
            });
            this.searchGoods(this.data.sectionId, null, this.data.goods.length, this.data.numberIndex, true);
        } else if (options.favorite) {
            wx.setNavigationBarTitle({
                title: "我的收藏",
            });
            this.setData({
                hideSearch: true,
                favorite: true
            });
            this.myFavoriteGoods()
        } else if (options.my) {
            wx.setNavigationBarTitle({
                title: "我的发布",
            });
            this.setData({
                hideSearch: true,
                my: true
            });
            this.myGoods()
        }
    },
    onShow: function () {
        let that = this;
        wx.getStorage({
            key: 'good',
            success: function (res) {
                console.log(res);
                if (res.data) {
                    let goodInfo = res.data.goodInfo;
                    let col = res.data.col;
                    let index = res.data.index;
                    if(col==0) {
                        that.data.col1[index] = goodInfo;
                    }else if(col==1){
                        that.data.col2[index] = goodInfo;
                    }
                    that.setData({
                        goods: that.data.goods,
                        col1:that.data.col1,
                        col2:that.data.col2
                    })
                }
                wx.removeStorage({
                    key: 'good',
                })
            }
        })
    },
    onPullDownRefresh: function () {
        this.setData({
            Loading: true
        });
        if (this.data.favorite) {
            this.myFavoriteGoods();
        } else if (this.data.my) {
            this.myGoods();
        } else {
            let number = this.data.numberIndex > this.data.goods.length ? this.data.numberIndex : this.data.goods;
            this.searchGoods(this.data.sectionId, this.data.searchValue, 0, number, false);
        }
        wx.stopPullDownRefresh();
    },
    onReachBottom: function () {
        if (!this.data.favorite && !this.data.my) {
            this.setData({
                Loading: true
            });
            this.searchGoods(this.data.sectionId, this.data.searchValue, this.data.goods.length, this.data.numberIndex, true)
        }
    },
    onShareAppMessage: function () {
        return app.onShareAppMessage();
    },
    searchGoods: function (section, title, beginIndex, numberIndex, connect) {
        let that = this;
        wx.request({
            url: app.globalData.searchActiveGoodUrl,
            data: JSON.stringify({
                openId: app.globalData.openId,
                section: section,
                title: title,
                beginIndex: beginIndex,
                numberIndex: numberIndex
            }),
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
                    that.sliceGoods()
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
    sliceGoods: function () {
        let length = Math.ceil(this.data.goods.length / 2);
        this.setData({
            col1: this.data.goods.slice(0, length),
            col2: this.data.goods.slice(length)
        })
    },
    bindGoodTap: function (e) {
        let good = null;
        if(e.currentTarget.dataset.col==0) {
            good = this.data.col1[e.currentTarget.dataset.index];
        }else if(e.currentTarget.dataset.col==1){
            good = this.data.col2[e.currentTarget.dataset.index];
        }
        wx.setStorage({
            key: "good",
            data: {
                goodInfo: good,
                col:e.currentTarget.dataset.col,
                index: e.currentTarget.dataset.index
            }
        });
        if(good!=null){
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
    myFavoriteGoods: function () {
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
                    that.sliceGoods()
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
                    title: '服务器错误',
                    icon: 'none'
                });
                that.setData({
                    Loading: false
                })
            }
        })
    },
    myGoods: function () {
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
                    that.sliceGoods()
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
                    title: '服务器错误',
                    icon: 'none'
                });
                that.setData({
                    Loading: false
                })
            }
        })
    }
});