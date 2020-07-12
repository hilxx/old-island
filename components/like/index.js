// components/like.js
import {ModelLike} from "../models/ModelLike";
const modelLike = new ModelLike();
Component({
    /**
     * 组件的属性列表
     */
    behaviors: [],
    properties: {
        like: {
            type: Object,
        },
        alarm: {
            type: Boolean,
            value: true,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        likeImg: 'images/like.png',
        dislikeImg: 'images/dislike.png',
    },


    /**
     * 组件的方法列表
     */

    methods: {

        toggleLike() {
            const like = this.data.like,
                alarm = this.data.alarm;
            this.setData({
                like: {
                    fav_nums: like.like_status? like.fav_nums -= 1: like.fav_nums += 1 ,
                    like_status: !like.like_status,
                    type: like.type,
                    id: like.id,
                }
            });
            if (like.like_status) {
                modelLike.makeLike(like.type, like.id, alarm);
            } else {
                modelLike.makeLike(like.type, like.id, alarm, true);
            }
            this.triggerEvent('like', {
                status: this.data.like.like_status,
                id: like.id,
            })
        }
    },


});
