// components/search/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        placeholder: String,
        books: Array,
        hotTitle: Array,
        history: Array,
        total: Number,
    },

    /**
     * 组件的初始数据
     */
    data: {
        hidden: true,
        initial: '',
        isInitial: true,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //提交搜索
        commit(e) {
            const value = e.detail.value;
            if (!value && value !== 0) return;
            this._mixinParent(value, 'commit')
        },

        //点击热搜
        hotSearch(e) {
            const title = e.target.dataset.title;
            this._mixinParent(title, 'hotSearch');
            console.log(title)
        },

        //历史记录发出请求
        historyAsk(e) {
            const value = e.target.dataset.title;
            this._mixinParent(value, 'historyAsk');
        },

        //整合以上
        _mixinParent(value, eventName) {
            this.setData({
                initial: value,
                hidden: false,
                isInitial: false,
            });
            this.triggerEvent(eventName, {
                value: value,
            })
        },

        //详情
        onDetail(e) {
            const id = e.currentTarget.dataset.id;
            this.triggerEvent('onDetail', {
                value: id,
            })
        },

        //清空搜索框文字
        inputClear() {
            wx.hideLoading();
            this.setData({
                focus: true,
                hidden: true,
                initial: '',
                isInitial: true,
            });
            this.triggerEvent('inputClear', {
                value: true,
            });
        },

        //删除第index条纪录
        cutHistory(e) {
            const value = e.target.dataset.index;
            this.triggerEvent('cutHistory', {
                value,
            })
        },

        //返回
        cancel() {
            wx.navigateBack({
                delta: 1,
            })
        },

        //监听input输入
        input(e) {
            setTimeout(v => {
                this.setData({
                    isInitial: !e.detail.value,
                })
            }, 200);
        }
    }
});
