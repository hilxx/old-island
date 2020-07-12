import {ModelMy} from "../../models/ModelMy";

const modelMy = new ModelMy();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        likeBookCount: 0,
        likeClassic: [],
        like: {
            like_status: true,
        },
        userInfo: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this._pageShow();

        // 查看是否授权
        this._checkUserInfo();
    },

    getUserInfo(e) {
        this.setData({
            userInfo: e.detail.userInfo,
        })
    },

    onDetail(e) {
        const id = e.currentTarget.dataset.id,
            type = e.currentTarget.dataset.type;

        wx.navigateTo({
            url: `./classic-detail/classic-detail?id=${id}&type=${type}`,
        })
    },

    onDislike(e) {
        const index = e.detail.index,
            likeClassic = this.data.likeClassic;
        likeClassic.splice(index, 1);
        this.setData({
            likeClassic,
        })
    },

    _pageShow(arr) {
        const likeBookCount = modelMy.getLikeBookCount(),
            LikeClassic = modelMy.getLikeClassic();

        Promise.all([likeBookCount, LikeClassic]).then(v => {
            this.setData({
                likeBookCount: v[0].count,
                likeClassic: v[1],
            });
        }, err => {
            if (err.key === 'book-like-count') {
                this.setData({
                    likeBookCount: err,
                });
            } else {
                this.setData({
                    likeClassic: err,
                });
            }
        });
    },

    _checkUserInfo() {
        const that = this;
        wx.getSetting({
            success (res){
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: function(res) {
                            console.log(res.userInfo);
                            that.setData({
                                userInfo: res.userInfo,
                            })
                        }
                    })
                }
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        this._pageShow();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})