// components/tag/index.js
Component({
    /**
     * 组件的属性列表
     */
    externalClasses: ['ex-wrap', 'ex-alarm'],
    properties: {
        content: String,
        alarm: Boolean,
    },

    /**
     * 组件的初始数据
     */
    options: {
        multipleSlots: true // 在组件定义时的选项中启用多slot支持
    },
    data: {},

    /**
     * 组件的方法列表
     */


    methods: {}
});
