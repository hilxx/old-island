import {BookDetail} from "../../models/BookDetail";
import {filter} from "../../../utils/filter";

const bookDetail = new BookDetail();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        bid: {
            type: String,
            value: '',
        },
        placeholder: {
            type: String,
            value: '12字内短评',
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        disabled: false,
        detail: {},
        like: {},
        comments: [],
        initial: '',
    },

    pageLifetimes: {
        // 组件所在页面的生命周期函数
        show() {
            const id = this.data.bid;
            if (!id) return false;
            const detail = bookDetail.getDetail(id),
                shortComment = bookDetail.getShortComment(id),
                like = bookDetail.getLike(id);
            const company = Promise.all([detail, shortComment, like]);
            company.then(v => {
                // /n文本换成空格
                v[0].summary = filter.format(v[0].summary);
                const comments = filter.limit(v[1].comments, 10),
                    temp = bookDetail.getCommentStorage() || {};
                if (Array.isArray(temp[id])) {
                    for (let item of temp[id]) {
                        comments.forEach((v, index) => {
                            if (v.content === item) {
                                comments[index].already = true;
                            }
                        })
                    }
                }
                //书籍类型
                v[2].type = 400;
                this.setData({
                    detail: v[0],
                    comments,
                    like: v[2],
                });

            });
        },
    },
    /**
     * 组件的方法列表
     */
    methods: {
        //本地存储{id:['a','b'],}形式
        fastComment(e) {
            const index = e.currentTarget.dataset.index,
                content = this.data.comments[index].content,
                id = this.data.detail.id,
                temp = bookDetail.getCommentStorage() || {};

            if (temp[id] && temp[id].indexOf(content) !== -1) {
                wx.showToast({
                    title: '清除缓存可再次点赞噢😊',
                    icon: 'none',
                    direction: 1000
                });
            } else {
                bookDetail.addComment(id, content).then(v => {
                    const comments = this.data.comments;
                    if (Array.isArray(temp[id])) {
                        temp[id].push(content);
                    } else {
                        temp[id] = [content];
                    }
                    comments[index].nums += 1;
                    comments[index].already = true;
                    bookDetail.setCommentStorage(temp);
                    this.setData({
                        comments: comments,
                    })
                })
            }
        },
        addComment(e) {
            const value = e.detail.value,
                id = this.data.detail.id;
            bookDetail.addComment(id ,value).then(v  => {
                const comments =this.data.comments,
                    interim = {content: value, nums: 1, already: true};
                comments.unshift(interim);
                this.setData({
                    comments,
                    initial: '',
                })
            });
        },
    },
});
