import {Http} from "../utils/Http";

class ModelBook extends Http {

    //热门书籍
    getHotList() {
        return this.request({
            url: '/book/hot_list'
        }).then(v => {
            this.setStorage('hotList', v);
            return v
        }, err => {
            if (his.getStorage('hotList')) {
                wx.showToast({
                    title: '离线数据',
                    icon: 'loading',
                    duration: 700,
                });
                return this.getStorage('hotList');
            }
        })
    }


    // start: 开始记录数，默认为0
    // count: 记录条数，默认为20,超过依然按照20条计算
    // summary: 返回完整或简介,默认为0,0为完整内容,1为简介
    // q:搜索内容,比如你想搜索python相关书籍,则输入python
    searchBook({start, count, summary = 1}, q) {
        wx.showLoading({
            title: '客官请耐心等待',
        });

        return this.request({
            url: `/book/search?start=${start}&count=${count}&summary=${summary}&q=${q}`,
        }).then(v => {
            wx.hideLoading();
            return v;
        }, err => {
            wx.hideLoading();
            wx.showToast({
                title: '数据被风刮走了',
                icon: 'none',
                duration: 1000,
            });
            return Promise.reject(err);
        })
    }

    //搜索历史
    processHistory(value) {

        let history = this.getStorage('historySearch') || [];
        //队列
        if (history.length > 20) {
            history.pop();
            history.unshift(value);
        } else {
            history.unshift(value);
        }
        history = [...(new Set(history))];
        this.setStorage('historySearch', history);

        return history;
    }


    getStorage(key) {
        return wx.getStorageSync(`book-${key}`);
    }

    setStorage(key, value) {
        wx.setStorageSync(`book-${key}`, value);
    }


}

export {ModelBook};