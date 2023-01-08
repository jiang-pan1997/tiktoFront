<template>
  <div class="videoPlayer" @click="click">
    <video
      id="video"
      ref="videoList"
      class="video"
      :style="{ height: windowsHeight - 60 + 'px' }"
      x5-video-player-type="h5"
      :poster="videoList.imgUrl"
      webkit-playsinline="true"
      preload="none"
      x-webkit-airplay="true"
      playsinline="true"
      x5-video-player-fullscreen="false"
      :src="videoList.videoUrl"
      @ended="ended"
      @play="play"
    ></video>
  </div>
</template>

<script>
import { updateVideoPlayAllNum, updateUserVideoData } from '@/api'
export default {
  name: '',
  props: ['videoList', 'currentPage', 'pageIndex', 'windowsHeight'],
  data() {
    return {
      playStatus: false,
      dblclick: false,
      playNum: 0,
      firstPlay: true
    }
  },
  computed: {},
  watch: {
    currentPage(newVal) {
      if (newVal == this.pageIndex) {
        this.videoPlay()
      } else {
        this.videoPause()
        this.firstPlay = true
      }
    }
  },
  created() {},
  mounted() {
    this.playNum = this.videoList.playNum
  },
  methods: {
    // 单击事件
    singleClick() {
      const video = this.$refs.videoList
      if (!this.playStatus) {
        video.play()
        this.playStatus = true
      } else {
        video.pause()
        this.playStatus = false
      }
    },
    // 单击与双击事件判断
    click() {
      this.dblclick = !this.dblclick
      setTimeout(() => {
        if (this.dblclick) {
          // 单击
          const video = this.$refs.videoList
          if (!this.playStatus) {
            video.play()
            this.playStatus = true
          } else {
            video.pause()
            this.playStatus = false
          }
        } else {
          console.log('doubleClick')
          this.$emit('doubleClick')
        }
        this.dblclick = false
      }, 300)
    },
    //    播放函数
    videoPlay() {
      const video = this.$refs.videoList
      video.currentTime = 0
      video.play()
      this.playStatus = true
    },
    // 暂停函数
    videoPause() {
      const video = this.$refs.videoList
      video.currentTime = 0.0
      video.pause()
      this.playStatus = false
    },
    // 所以总共播放量统计
    async updateAllVideoPlay() {
      const data = {
        id: this.videoList.id
      }
      const { data: res } = await updateVideoPlayAllNum(data)
      if (res.code != 1) {
        this.$notify({
          message: '修改失败',
          color: '#ad0000',
          background: '#ffe1e1',
          duration: 1000
        })
      }
    },
    ended() {
      const video = this.$refs.videoList
      video.currentTime = 0
      video.play()
      this.updateUserVideoData()
      this.updateAllVideoPlay()
    },
    play() {
      if (this.firstPlay) {
        this.updateUserVideoData()
        this.updateAllVideoPlay()
        this.firstPlay = false
      }
    },
    async updateUserVideoData() {
      const data = {
        worksId: this.videoList.id,
        userId: localStorage.getItem('userId'),
        worksAuthor: this.videoList.author
      }
      const { data: res } = await updateUserVideoData(data)
      if (res.code != 1) {
        this.$notify({
          message: '修改失败',
          color: '#ad0000',
          background: '#ffe1e1',
          duration: 1000
        })
      }
    }
  }
}
</script>

<style>
.videoPlayer {
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 19;
  /* margin-bottom: 50px; */
}

.video {
  width: 100%;
  /* height: 98%; */
  object-fit: cover;
  /* object-fit: fill; */
  /* top: 0;
		left: 0; */
  z-index: 20;
}
</style>
