import {ModelBook} from "../../../models/ModelBook";
import {filter} from "../../../utils/filter";

const modelBook = new ModelBook(),
    Parameter = {
        start: 0,
        count: 20,
        summary: 0,
    };

Page({

    /**
     * 页面的初始数据
     */
    data: {
        books: [],
        count: 0,
        preventSearch: false,
        locking: false,
        total: 1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        //得到热搜缓存，随机一个placeholder， 搜索历史
        const hotTitle = filter.getArrayAttr(modelBook.getStorage('hotList'), 'title'),
            placeholder = hotTitle[Math.floor(Math.random() * 20)],
            history = modelBook.getStorage('historySearch') instanceof Array ? modelBook.getStorage('historySearch') : [];

        this.setData({
            placeholder,
            hotTitle: hotTitle.splice(Math.round(Math.random() * 14), 6),
            history,
        });
    },

    //搜索栏默认提交
    commit(e) {
        const value = e.detail.value;
        this._httpRequest(value);
    },

    //点击热搜发出请求
    hotSearch(e) {
        const value = e.detail.value;
        this._httpRequest(value);
    },

    //点击历史记录发出请求
    historyAsk(e) {
        const title = e.detail.value;
        this._httpRequest(title);
    },

    _httpRequest(value) {
        //搜索新值
        if (value !== this.data.value) {
            Parameter.start = 0;
            Parameter.count = 20;
            Parameter.summary = 0;
        }
        //value添加搜索历史,
        //未向服务器请求前存储
        const history = modelBook.processHistory(value);
        //存储、重写
        this.setData({
            value,
            history,
            preventSearch: false,
        });
        modelBook.searchBook(Parameter, value).then(v => {
            //不取消当前搜索
            if (!this.data.preventSearch) {
                this.setData({
                    books: v.books,
                    total: v.total,
                });
            }
            wx.hideLoading();
        })
    },

    //详情
    onDetail(e) {
        const id = e.detail.value;
        wx.navigateTo({
            url: `../detail/detail?id=${id}`,
        })
    },

    //中断这次搜索
    inputClear(e) {
        this.setData({
            preventSearch: e.detail.value,
            books: [],
        })
    },


    //删除第index条记录
    cutHistory(e) {
        const index = e.detail.value,
            history = this.data.history;
        history.splice(index, 1);
        this.setData({
            history,
        });
        modelBook.setStorage('historySearch');
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
        if (this.data.locking) return false;
        this.setData({
            locking: true,
        });
        Parameter.start += 20;
        if (Parameter.start >= this.data.total) {
            wx.showToast({
                title: '已经到底了',
                icon: 'none',
                direction: 1000,
            })
        } else {
            modelBook.searchBook(Parameter, this.data.value).then(v => {
                const books = this.data.books;
                this.setData({
                    books: books.concat(v.books),
                    locking: false,
                })
            }, err => {
                this.setData({
                    locking: false,
                });
                Parameter.start -= 20;
            })
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
});