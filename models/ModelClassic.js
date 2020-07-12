import {Http} from "../utils/Http";

let latestIndex = wx.getStorageSync('classic-latest').index || 8;

class ModelClassic extends Http {

    //获取最新一期
    getLatest() {

        return this.request({
            url: '/classic/latest',
        }).then(v => {
            //最新一期的期刊号
            latestIndex = v.index;
            const obj = this._processData(v);
            this._setStorage(v.index, obj);
            this._setStorage('latest', obj);
            return obj;
        }, err => {

            let storage = this._getStorage('latest');
            if (storage) {
                wx.showToast({
                    title: '离线数据',
                    icon: 'none',
                    direction: 700,
                });
                return storage;
            } else {
                wx.showToast({
                    title: '无数据',
                    icon: 'none',
                    direction: 700,
                });
            }
        });
    }


    // 获取上一期或者下一期  index期号
    flip(leftOrRight = 'right', index) {

        let askIndex = leftOrRight === 'right' ? index - 1 : index + 1;
        const storage = this._getStorage(askIndex);
        //优先得到缓存
        if (storage) {
            //最新一期的上一期的nav状态更换
            if (storage.classic.index === latestIndex - 1) {
                storage.latest = false;
            }
            return Promise.resolve(storage);
        } else {
            const condition = leftOrRight === 'right' ? 'previous' : 'next';
            //发送网络请求整个页面
            return this.request({
                url: `/classic/${index}/${condition}`,
            }).then(v => {
                const obj = this._processData(v);
                this._setStorage(obj.classic.index, obj);
                return obj;
            })
        }
    }


    //获取点赞信息 type: 100电影 200音乐 300句子
    updateLike(index, type, id) {
        //发送网络请求点赞状态
        return this.request({
            url: `/classic/${type}/${id}/favor`,
        }).then(v=>{
            const storage = this._getStorage(index);
            v.type = type;
            storage.like = v;
            this._setStorage(index, storage);
            return v;
        })
    }

    //详情页打开
    isDetail(type, id) {
        return this.request({
            url: `/classic/${type}/${id}`,
        }).then(v => this._processData(v), err => {
            wx.showToast({
                title: '请求失败',
                icon: 'none',
                direction: 700,
            })
        });
    }


    //整个页面数据处理
    _processData(obj) {

        if (Object.keys(obj).length !== 0) {
            const final = obj.index === 1 ? true : false,
                latest = obj.index === latestIndex ? true : false,
                pubdate = this._processPubdate(obj.pubdate);
            return {
                classic: obj,
                pubdate,
                latest,
                final,
                like: {
                    like_status: obj.like_status,
                    fav_nums: obj.fav_nums,
                    id: obj.id,
                    type: obj.type,
                },
            }
        }
    }

    _setStorage(key, value) {
        let _key = 'classic-' + key;
        wx.setStorageSync(_key, value);
    }

    _getStorage(key) {
        let _key = 'classic-' + key;
        return wx.getStorageSync(_key);
    }


    _processPubdate(str) {
        const date = new Date(str),
            year = date.getFullYear(),
            month = (date.getMonth() + 1) + '月';
        return {year, month};
    }


}

export {ModelClassic}