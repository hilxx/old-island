// components/comment/index.js
Component({
    /**
     * 组件的属性列表
     */
    externalClasses: ['ex-pop'],
    properties: {
        placeholder: {
            type: String,
            value: '你想输入的',
        },
        initial: {
            type: String,
            value: '',
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        hidden: true,
        maxLength: 12,
        isInitial: true,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        switchInput() {
            this.setData({
                hidden: false,
            });
        },

        onShut() {
            this.setData({
                hidden: true,
            })
        },

        //回车提交
        onSubmit(e) {
            const value = e.detail.value;
            console.log(value.length);
            if (value) {
                this.triggerEvent('addComment', {
                    value,
                });
                this.setData({
                    hidden: true,
                })
            }
        },


        onClear() {
            this.setData({
                initial: '',
                isInitial: true,
            });
        },

        //监听input输入
        onInput(e) {
            const value = e.detail.value;
            this.setData({
                isInitial: !Boolean(value),
            });
        }
    },

});
