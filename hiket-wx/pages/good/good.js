// pages/good/good.js
const app = getApp();

Page({
    data: {
        rewardLabel: '答谢：',
        goodInfo: null,
        col: null,
        index: null,
        swiperCurrent: 0,
        userInfo: null,
        studentInfo: null,
        hasUserInfo: false,
        hasStudentInfo: false,
        hasFavorite: false,
        modalHidden: true,
        modalTitle: '提示',
        modalContent: '',
        modalSendContent: '推荐使用其他社交软件进行联系',
        modalNoUserInfoMessage: '未进行微信认证',
        modalNoStudentInfoMessage: '未进行学生认证',
        modalCopySuccessMessage: '复制成功'
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
        if (options.goodId) {
            this.getGoodInfoFromServer(options.goodId);
        } else {
            this.getGoodInfoFromStorage();
        }
    },
    onShow: function () {
        if (this.data.goodInfo) {
            this.browse();
        }
    },
    onShareAppMessage: function () {
        return {
            title: '我在嗨市发现了一件好货',
            path: '/pages/index/index?goodId=' + this.data.goodInfo.goodId
            // path: '/pages/good/good?goodId=' + this.data.goodInfo.goodId
        }
    },
    browse: function () {
        this.data.goodInfo.browseNumber = this.data.goodInfo.browseNumber + 1;
        this.setData({
            goodInfo: this.data.goodInfo
        });
        let that = this;
        wx.request({
            url: app.globalData.browseBrowseGoodUrl,
            header: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            data: {
                openId: app.globalData.openId,
                goodId: that.data.goodInfo.goodId
            },
            method: 'POST',
            success: function (res) {
                console.log(res);
            }
        });
    },
    getGoodInfoFromServer: function (goodId) {
        let that = this;
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        wx.request({
            url: app.globalData.searchGetGoodUrl,
            header: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            data: {
                openId: app.globalData.openId,
                goodId: goodId
            },
            method: 'POST',
            success: function (res) {
                console.log(res);
                wx.hideLoading();
                if (res.data.success) {
                    that.setData({
                        goodInfo: res.data.data
                    });
                    that.browse();
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
                    title: '服务器维护中',
                    icon: 'none'
                })
            }
        })
    },
    getGoodInfoFromStorage: function () {
        let that = this;
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        wx.getStorage({
            key: 'good',
            success: function (res) {
                wx.hideLoading();
                that.setData({
                    goodInfo: res.data.goodInfo,
                    index: res.data.index
                });
                that.browse();
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
    bindFavorite: function () {
        if (!this.data.hasUserInfo || !this.data.hasStudentInfo) {
            this.setData({
                modalHidden: false
            })
        } else {
            let that = this;
            if (!this.data.goodInfo.myFavorite) {
                wx.request({
                    url: app.globalData.favoriteFavoriteGoodUrl,
                    header: {
                        "Content-Type": 'application/x-www-form-urlencoded'
                    },
                    data: {
                        openId: app.globalData.openId,
                        goodId: that.data.goodInfo.goodId
                    },
                    method: 'POST',
                    success: function (res) {
                        console.log(res);
                        if (res.data.success) {
                            wx.showToast({
                                title: '收藏成功',
                            });
                            that.data.goodInfo.myFavorite = true;
                            that.setData({
                                goodInfo: that.data.goodInfo
                            })
                        } else {
                            wx.showToast({
                                title: '收藏失败',
                                icon: ''
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
            } else {
                wx.request({
                    url: app.globalData.favoriteNoneFavoriteGoodUrl,
                    header: {
                        "Content-Type": 'application/x-www-form-urlencoded'
                    },
                    data: {
                        openId: app.globalData.openId,
                        goodId: that.data.goodInfo.goodId
                    },
                    method: 'POST',
                    success: function (res) {
                        console.log(res);
                        if (res.data.success) {
                            wx.showToast({
                                title: '取消成功',
                            });
                            that.data.goodInfo.myFavorite = false;
                            that.setData({
                                goodInfo: that.data.goodInfo
                            })
                        } else {
                            wx.showToast({
                                title: '取消失败',
                                icon: ''
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
            }
        }
    },
    bindSend: function () {
        let warn = '';
        let flag = true;
        if (this.data.goodInfo.state == 0) {
            this.setData({
                modalHidden: false,
                modalContent: this.data.modalSendContent
            });
            flag = false;
        } else if (this.data.goodInfo.state == 1) {
            warn = "商品已下架"
        } else if (this.data.goodInfo.state == 2) {
            warn = "商品已卖出"
        } else {
            warn = "商品状态异常"
        }
        if (flag) {
            wx.showToast({
                title: warn,
                icon: 'none'
            })
        }
    },
    modalBindConfirm: function () {
        this.setData({
            modalHidden: true,
        });
        if (!this.data.hasUserInfo || !this.data.hasStudentInfo) {
            app.globalData.studentRegister = true;
            wx.switchTab({
                url: '../mine/mine'
            });
        }
    },
    modalBindCancel: function () {
        this.setData({
            modalHidden: true,
        })
    },
    copyPhoneNumber: function () {
        let self = this;
        wx.setClipboardData({
            data: self.data.goodInfo.phoneNumber,
            success: function (res) {
                wx.showToast({
                    title: self.data.modalCopySuccessMessage,
                })
            }
        });
    },
    copyWeixinNumber: function () {
        let self = this;
        wx.setClipboardData({
            data: self.data.goodInfo.weixinNumber,
            success: function (res) {
                wx.showToast({
                    title: self.data.modalCopySuccessMessage,
                })
            }
        });
    },
    copyQQNumber: function () {
        let self = this;
        wx.setClipboardData({
            data: self.data.goodInfo.qqNumber,
            success: function (res) {
                wx.showToast({
                    title: self.data.modalCopySuccessMessage,
                })
            }
        });
    },
    //滑块视图切换事件
    swiperChange: function (e) {
        if (e.detail.source == 'touch') {
            this.setData({
                swiperCurrent: e.detail.current
            })
        }
    },
    previewImage: function (e) {
        wx.previewImage({
            current: this.data.goodInfo.uploadImagePathList[e.currentTarget.dataset.index], // 当前显示图片的http链接
            urls: this.data.goodInfo.uploadImagePathList // 需要预览的图片http链接列表
        })
    },
    bindEdit: function () {
        wx.setStorage({
            key: "good",
            data: {
                index: this.data.index,
                goodInfo: this.data.goodInfo
            }
        });
        wx.redirectTo({
            url: '../release/release?edit=true',
        })
    },
    bindReport: function () {
        if (!this.data.hasUserInfo || !this.data.hasStudentInfo) {
            this.setData({
                modalHidden: false
            })
        } else {
            let that = this;
            wx.showModal({
                content: '确定举报该商品？',
                success: function (res) {
                    if (res.confirm) {
                        that.changeGoodState(3)
                    }
                }
            });
        }
    },
    bindInvalid: function () {
        let that = this;
        wx.showModal({
            content: '确定下架该商品？',
            success: function (res) {
                if (res.confirm) {
                    that.changeGoodState(1)
                }
            }
        })
    },
    bindSold: function () {
        let that = this;
        wx.showModal({
            content: '确定标记商品为已卖出？',
            success: function (res) {
                if (res.confirm) {
                    that.changeGoodState(2)
                }
            }
        })
    },
    bindResell: function () {
        let that = this;
        wx.showModal({
            content: '确定重新上架该商品？',
            success: function (res) {
                if (res.confirm) {
                    that.changeGoodState(0)
                }
            }
        })
    },
    bindExamine: function () {
        let that = this;
        wx.showModal({
            content: '确定请求审核该商品？',
            success: function (res) {
                if (res.confirm) {
                    that.changeGoodState(4)
                }
            }
        })
    },
    changeGoodState: function (newState) {
        let that = this;
        wx.request({
            url: app.globalData.operationUpdateGoodStateUrl,
            header: {
                "Content-Type": 'application/x-www-form-urlencoded'
            },
            data: {
                openId: app.globalData.openId,
                goodId: that.data.goodInfo.goodId,
                state: newState
            },
            method: 'POST',
            success: function (res) {
                console.log(res);
                if (res.data.success) {
                    that.data.goodInfo.state = newState;
                    that.setData({
                        goodInfo: that.data.goodInfo
                    });
                    wx.setStorage({
                        key: "good",
                        data: {
                            goodInfo: that.data.goodInfo,
                            index: that.data.index,
                            change: true
                        }
                    });
                    wx.showToast({
                        title: '操作成功',
                    })
                } else {
                    wx.showToast({
                        title: '操作失败',
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
    }
});