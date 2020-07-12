Component({
    /**
     * 组件的属性列表
     */

    properties: {
        index: String,
        like: Object,
        classic: {
            type: Object,
            observer(newV) {
                let category;
                if (newV) {
                    category = {
                        100: '电影',
                        200: '音乐',
                        300: '句子',
                    }[newV.type]
                }
                const c = this.data.classic,
                    like = this.data.like;
                like.id = c.id;
                like.type = c.type;
                this.setData({
                    category,
                    like,
                })
            }
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        category: '',
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onLike(e) {
            const status = e.detail.status;
            if (status === false) {
                wx.showModal({
                    title: '提示',
                    content: '是否取消收藏',
                    success: (res)=> {
                        if (res.confirm) {
                            this.triggerEvent('dislike', {
                                index: this.data.index,
                            })
                        } else if (res.cancel) {
                            const like = this.data.like;
                            like.like_status = true;
                            this.setData({
                                like,
                            })
                        }
                    }
                });
            }
        }
    },

});
