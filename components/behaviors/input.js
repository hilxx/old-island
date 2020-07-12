export const inputBh = Behavior({
    behaviors: [],
    properties: {
        myBehaviorProperty: {
            type: String
        }
    },
    data: {

    },
    attached: function(){},
    methods: {
        //清空搜索框文字
        inputClear() {
            wx.hideLoading();
            this.setData({
                focus: true,
                hidden: true,
                initial: '',
                isInitial: true,
            });
            this.triggerEvent('inputClear',{
                value: true,
            });
        },

        cancel() {
            wx.navigateBack({
                delta: 1,
            })
        },
    }
});