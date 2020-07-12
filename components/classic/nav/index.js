// components/nav/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        latest: Boolean,
        final: Boolean,
        title: String,
    },

    /**
     * 组件的初始数据
     */
    data: {
        left: 'images/triangle@left.png',
        disLeft: 'images/triangle.dis@left.png',
        right: 'images/triangle@right.png',
        disRight: 'images/triangle.dis@right.png',
    },

    /**
     * 组件的方法列表
     */
    methods: {

        next() {
            if (this.data.latest) return false;
            this.triggerEvent('upOrDown', {
                condition: 'left'
            }, {
                bubbles: true
            })
        },

        previous() {
            if (this.data.final) return false;
            this.triggerEvent('upOrDown',{
                condition: 'right',
            },{
                bubbles: true
            });
        },
    }
});
