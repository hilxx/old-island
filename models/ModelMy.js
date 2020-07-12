import {Http} from "../utils/Http";

class ModelMy extends Http {

    //获取喜欢书籍数量
    getLikeBookCount() {
        const url = '/book/favor/count';
        return this.mixin(url, 'book-like-count', );
    }

    getLikeClassic() {
        const url =  '/classic/favor';
        return this.mixin(url, 'classic-like')
    }

    mixin(url, key, attr) {
        return this.request({
            url,
        }).then(v => {
            v.key = key;
            this._setStorage(key, v);
            return v;
        }).catch(v => {
            if (this._getStorage(key)) {
                return Promise.reject(this._getStorage(key));
            }
        });

    }



    _setStorage(key, v) {
        wx.setStorageSync(`my-${key}`, v);
    }

    _getStorage(key) {
        return  wx.getStorageSync(`my-${key}`);
    }
}

export {ModelMy};