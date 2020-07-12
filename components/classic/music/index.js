import {behavior} from "../behavior";

const audio = wx.getBackgroundAudioManager();

Component({
    /**
     * 组件的属性列表
     */
    behaviors: [behavior],
    properties: {
        music: String,
    },

    /**
     * 组件的初始数据
     */
    data: {
        playing: false,
        // 是否已经播放过一次
        already: false,
    },

    /**
     * 组件的方法列表
     */
    methods: {

        toggleMusic() {

            if (this.data.playing) {
                audio.pause();
            } else {
                if (!this.data.already) {
                    this.watchPlay();
                    audio.title = this.data.title;
                    audio.epname = '';
                    audio.singer = '';
                    audio.coverImgUrl = this.data.image;
                    // 设置了 src 之后会自动播放
                    audio.src = this.data.music;
                }
                audio.play();
            }
        },

        watchPlay() {
            audio.onPause(() => {
                this.setData({
                    playing: false,
                })
            });

            audio.onPlay(() => {
                this.setData({
                    playing: true,
                })
            });
        }

    },

    lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached() {
            if (this.data.music === audio.src) {
                this.setData({
                    playing: true,
                    already: true,
                });

                this.watchPlay();
            }

        },

        moved() {

        },

        detached() {

        },
    },
});
