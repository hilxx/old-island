import {Http} from "../../utils/Http";

class ModelLike extends Http {


    makeLike(type, id, alarm, cancel) {
        const url = cancel ? '/like' : '/like/cancel';
        this.request({
            url,
            method: 'POST',
            data: {
                art_id: id,
                type: type
            }
        }).then(v => {
            if (alarm) {
                wx.showToast({
                    title:  cancel? '收藏成功' : '取消成功',
                    icon: 'none',
                    duration: 700,
                })
            }
        })
    }
}

export {ModelLike};