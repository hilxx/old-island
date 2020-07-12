export const filter = {
    format(text) {
        if (!text) return false;
        const reg = new RegExp('\\\\n', 'g');
        return '&nbsp;&nbsp;&nbsp;&nbsp;' +
            text.toString().replace(reg, '\n&nbsp;&nbsp;&nbsp;&nbsp;');
    },

    limit(arr, end) {
        if (!Array.isArray(arr)) return false;
        return arr.slice(0, end);
    },

    //数组取得每个对象下一个属性值,返回数组
    getArrayAttr(arr, attr) {
        const newArr = arr.map((item, index) => {
            return item[attr]
        });

        return [...(new Set(newArr))];
    }

};


