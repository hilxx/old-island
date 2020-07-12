import {ModelClassic} from "../../models/ModelClassic";

const modelClassic = new ModelClassic();

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        type: {
            type: Number,
            value: false,
            observer(newVal, oldVal) {
                if (newVal) {
                    modelClassic.isDetail(this.data.type, this.data.cid).then(v => {
                        this.setData(v);
                    })
                }
            }
        },
        cid: Number,
    },

    /**
     * 组件的初始数据
     */
    data: {
        classic: {},
        date: {},
        like: {},
        latest: true,
        final: false,
        loadingLike: true,
    },


    pageLifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        // 以component使用
        show() {
            if (!this.data.type) {   // 取得type值
                if (!this.data.type) {   //这里type打印0
                    modelClassic.getLatest().then(v => {
                        this.setData(v);
                    })
                }
            }
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {

        //上页下页
        pageUp(e) {

            const condition = e.detail.condition;
            const flip = modelClassic.flip(condition, this.data.classic.index).then(v => {
                if (v.final) {
                    this.setData({
                        loadingLike: false,
                    })
                }
                this.setData(v);
            });

            //优化like请求
            if (this.data.loadingLike && condition !== 'left' ) {
                const classic = this.data.classic;
                modelClassic.updateLike(classic.index, classic.type, classic.id).then(like => {
                    this.setData({
                        like,
                    });
                });
            }
        }
    },
});
