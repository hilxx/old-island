import {Http} from "../../utils/Http";
export class BookDetail extends Http {

    //详情
    getDetail(id) {
        return this.request({
            url: `/book/${id}/detail`
        });
    }

    //短评
    getShortComment(id) {
        return this.request({
            url: `/book/${id}/short_comment`
        });
    }

    //获取点赞
    getLike(id) {
        return this.request({
            url: `/book/${id}/favor`,
        })
    }

    //12字内短评
    addComment(id, content) {
        return this.request({
            url: '/book/add/short_comment',
            method: 'POST',
            data: {
                book_id: id,
                content,
            }
        }).then(v => {
            wx.showToast({
                title: '评论成功',
                icon: 'success',
                direction: 1000,
            })
        }, err => {
            wx.showToast({
                title: '发送失败',
                icon: 'none',
                direction: 1000
            })
        })
    }

    getCommentStorage(key) {
        return wx.getStorageSync('book-comments');
    }
    setCommentStorage(value) {
        wx.setStorageSync('book-comments', value);
    }
}
