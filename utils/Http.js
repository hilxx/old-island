import {config} from "../config";

const message = {
    1: '发生了一个错误',
    1002: '找不到资源',
    1003: '未知错误',
    1004: '禁止访问',
    1006: '服务器错误',
    3000: '该期内容不存在'
};

export class Http {

    request({url =null, method ='GET',data}) {
        return new Promise((resolve,reject)=> {

            wx.request({
                url: config.url + url,
                method,
                header: {
                    appKey: config.appKey
                },
                data,
                success(res) {

                    if (!res.statusCode.toString().startsWith('2')) {
                        const errCode = res.error_code;
                        reject(res);
                    } else {
                        resolve(res.data);
                    }
                },
                fail(err) {
                    console.log(err);
                    reject(err);
                }
            })
        })

    }
}

function showErr(code) {
    wx.showToast({
        title: message[code],
        direction: 1500,
        icon: 'none'
    })
}

