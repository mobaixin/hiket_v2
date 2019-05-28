// pages/release/release.js
const app = getApp();

Page({
    data: {
        userInfo: null,
        studentInfo: null,
        hasUserInfo: false,
        hasStudentInfo: false,
        isHelp: false,
        goodInfo: {
            sellerOpenId: null,

            type: 0,
            title: null,
            content: null,
            uploadImagePathList: [],

            section: null,
            oldPrice: null,
            price: null,

            helpTag: null,
            period: null,
            reward: null,

            phoneNumber: null,
            weixinNumber: null,
            qqNumber: null
        },

        sections: ["学习用品", "动植物", "生活美妆", "吃喝玩乐", "电子设备", "时尚穿搭"],
        sectionId: 0,

        helpTags: ["校园快递", "楼下外卖", "相约出行"],
        helpTagId: 0,
        period: ["10分钟", "30分钟", "1小时", "2小时", "4小时"],
        periodId: 0,
        periodValue: [10 * 60 * 1000, 30 * 60 * 1000, 60 * 60 * 1000, 2 * 60 * 60 * 1000, 4 * 60 * 60 * 1000],

        goodTitlePlaceholder: "请输入您的商品名称（不超过15个字）",
        helpTitlePlaceholder: "请输入您的需求（不超过15个字）",
        goodDescriptionPlaceholder: "请简要的描述一下您的商品，新旧程度、出售原因等（文字不超过140个字，附图不超过3张）",
        helpDescriptionPlaceholder: "请简要的描述一下您的需求，(不会显示在首页上，不需要附图)",
        inputLength: 0, // 文字输入框字数
        modalHidden: true,
        modalTitle: '提示',
        modalNoUserInfoMessage: '未进行微信认证',
        modalNoStudentInfoMessage: '未进行学生认证'
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
        this.data.goodInfo.sellerOpenId = app.globalData.openId;
        let that = this;
        wx.showLoading({
            title: '加载中',
            mask: true
        });
        // 编辑
        // 草稿
        // 新建
        if (options.edit) {
            wx.getStorage({
                key: 'good',
                success: function (res) {
                    that.setData({
                        goodInfo: res.data
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
        } else {
            wx.getStorage({
                key: 'release',
                success: function (res) {
                    if (res.data) {
                        that.setData({
                            goodInfo: res.data
                        });
                    } else {
                        that.data.goodInfo.section = that.data.sectionId;
                    }
                    wx.hideLoading();
                },
                fail: function () {
                    wx.hideLoading();
                }
            })
        }
    },
    onShareAppMessage: function () {
        return app.onShareAppMessage();
    },
    titleInput: function (e) {
        this.data.goodInfo.title = e.detail.value;
        wx.setStorage({
            key: "release",
            data: this.data.goodInfo
        })
    },
    contentInput: function (e) {
        this.data.goodInfo.content = e.detail.value;
        this.setData({
            inputLength: e.detail.value.length
        });
        wx.setStorage({
            key: "release",
            data: this.data.goodInfo
        })
    },
    priceInput: function (e) {
        this.data.goodInfo.price = e.detail.value;
        wx.setStorage({
            key: "release",
            data: this.data.goodInfo
        })
    },
    oldPriceInput: function (e) {
        this.data.goodInfo.oldPrice = e.detail.value;
        wx.setStorage({
            key: "release",
            data: this.data.goodInfo
        })
    },
    rewardInput: function (e) {
        this.data.goodInfo.reward = e.detail.value;
        wx.setStorage({
            key: "release",
            data: this.data.goodInfo
        })
    },
    phoneNumberInput: function (e) {
        this.data.goodInfo.phoneNumber = e.detail.value;
        wx.setStorage({
            key: "release",
            data: this.data.goodInfo
        })
    },
    weixinNumberInput: function (e) {
        this.data.goodInfo.weixinNumber = e.detail.value;
        wx.setStorage({
            key: "release",
            data: this.data.goodInfo
        })
    },
    qqNumberInput: function (e) {
        this.data.goodInfo.qqNumber = e.detail.value;
        wx.setStorage({
            key: "release",
            data: this.data.goodInfo
        })
    },
    uploadImage: function (imagePath) {
        let that = this;
        wx.showLoading({
            title: '上传中',
            mask: true
        });
        wx.uploadFile({
            url: app.globalData.releaseUploadImageUrl,
            filePath: imagePath,
            name: 'uploadImage',
            formData: {
                'openId': app.globalData.openId
            },
            method: 'POST',
            success(res) {
                console.log(res);
                wx.hideLoading();
                let data = JSON.parse(res.data);
                if (data.success) {
                    that.data.goodInfo.uploadImagePathList = that.data.goodInfo.uploadImagePathList.concat(data.data);
                    that.setData({
                        goodInfo: that.data.goodInfo
                    });
                    wx.setStorage({
                        key: "release",
                        data: that.data.goodInfo
                    });
                    wx.showToast({
                        title: '上传成功'
                    });
                } else {
                    wx.showToast({
                        title: '上传失败',
                        icon: 'none',
                    });
                }
            },
            fail() {
                wx.hideLoading();
                wx.showToast({
                    title: '服务器错误',
                    icon: 'none',
                });
            }
        })
    },
    chooseImage: function () {
        let that = this;
        wx.chooseImage({
            count: 3 - that.data.goodInfo.uploadImagePathList.length, //最多可以选择的图片张数
            sizeType: ['compressed'], // 压缩图
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success: function (res) {
                for (let i in res.tempFilePaths) {
                    that.uploadImage(res.tempFilePaths[i])
                }
            }
        });
    },
    // 预览图片
    previewImage: function (e) {
        wx.previewImage({
            current: this.data.goodInfo.uploadImagePathList[e.currentTarget.dataset.index], // 当前显示图片的http链接
            urls: this.data.goodInfo.uploadImagePathList // 需要预览的图片http链接列表
        })
    },
    // 删除已选图片
    deleteImage: function (e) {
        let index = e.currentTarget.dataset.index;
        let files = this.data.goodInfo.uploadImagePathList;
        files.splice(index, 1);
        this.data.goodInfo.uploadImagePathList = files;
        this.setData({
            goodInfo: this.data.goodInfo
        });
        wx.setStorage({
            key: "release",
            data: this.data.goodInfo
        })
    },
    // 是否为帮助
    bindHelp: function (e) {
        this.setData({
            isHelp: !this.data.isHelp
        });
        if (this.data.isHelp) {
            this.data.goodInfo.type = 1;
            this.data.goodInfo.section = null;
            this.data.goodInfo.price = null;
            this.data.goodInfo.oldPrice = null;
            this.data.goodInfo.helpTag = this.data.helpTags[this.data.helpTagId];
            this.data.goodInfo.period = this.data.periodValue[this.data.periodId];
        } else {
            this.data.goodInfo.type = 0;
            this.data.goodInfo.reward = null;
            this.data.goodInfo.helpTag = null;
            this.data.goodInfo.period = null;
            this.data.goodInfo.section = this.data.sectionId;
        }
        this.setData({
            goodInfo: this.data.goodInfo
        });
        wx.setStorage({
            key: "release",
            data: this.data.goodInfo
        })
    },
    // 物品类别滚动选择器事件监听
    bindSectionChange: function (e) {
        this.setData({
            sectionId: e.detail.value
        });
        this.data.goodInfo.section = this.data.sectionId;
        wx.setStorage({
            key: "release",
            data: this.data.goodInfo
        })
    },
    // 帮助类别滚动选择器事件监听
    bindHelpTagChange: function (e) {
        this.setData({
            helpTagId: e.detail.value
        });
        this.data.goodInfo.helpTag = this.data.helpTags[this.data.helpTagId];
        wx.setStorage({
            key: "release",
            data: this.data.goodInfo
        })
    },
    // 帮助持续时间
    bindPeriodChange: function (e) {
        this.setData({
            periodId: e.detail.value
        });
        this.data.goodInfo.period = this.data.periodValue[this.data.periodId];
        wx.setStorage({
            key: "release",
            data: this.data.goodInfo
        })
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
    // 表单验证和提交
    formSubmit: function (e) {
        this.data.goodInfo.sellerOpenId = app.globalData.openId;
        if (!this.data.hasUserInfo || !this.data.hasStudentInfo) {
            this.setData({
                modalHidden: false
            });
            return
        }
        let that = this;
        // 金额，联系方式输入验证正则表达式
        let priceReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
        let phoneNumberReg = /^([1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8})$/;
        let qqNumberReg = /^([1-9][0-9]{4,14})$/;
        let warn = "";
        let flag = false;

        if (!this.data.goodInfo.title) warn = "请填写标题！";
        else if (!this.data.goodInfo.content) warn = "请填写描述！";
        else if (!this.data.isHelp && this.data.goodInfo.uploadImagePathList.length == 0) warn = "请上传图片！";
        else if (!this.data.isHelp && !priceReg.test(this.data.goodInfo.price)) warn = "请正确填写价格！";
        else if (!this.data.isHelp && !priceReg.test(this.data.goodInfo.oldPrice)) warn = "请正确填写原价！";
        else if (!this.data.goodInfo.phoneNumber && !this.data.goodInfo.weixinNumber && !this.data.goodInfo.qqNumber) warn = "请填写至少一个联系方式";
        else if (this.data.goodInfo.phoneNumber && !phoneNumberReg.test(this.data.goodInfo.phoneNumber)) warn = "请正确填写手机号码";
        else if (this.data.goodInfo.qqNumber && !qqNumberReg.test(this.data.goodInfo.qqNumber)) warn = "请正确填写QQ号码";
        else if (this.data.goodInfo.price > 9999 || this.data.goodInfo.oldPrice > 9999) warn = "亲亲的宝贝怎么这么贵呢";
        else flag = true;

        if (!flag) {
            wx.showToast({
                title: warn,
                icon: 'none'
            });
        } else {
            wx.showModal({
                title: '提示',
                content: '请检查填写内容，确认发布',
                success: function (res) {
                    if (res.confirm) {
                        wx.request({
                            url: app.globalData.releaseReleaseGoodUrl,
                            data: JSON.stringify(that.data.goodInfo),
                            method: 'POST',
                            success: function (res) {
                                console.log(res);
                                if (res.data.success) {
                                    wx.setStorage({
                                        key: "release",
                                        data: null
                                    });
                                    wx.setStorage({
                                        key: "good",
                                        data: res.data.data
                                    });
                                    wx.redirectTo({
                                        url: '../good/good'
                                    });
                                    wx.showToast({
                                        title: '发布成功',
                                    })
                                } else {
                                    wx.showToast({
                                        title: '发布失败',
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
                    }
                }
            })
        }
    }
});