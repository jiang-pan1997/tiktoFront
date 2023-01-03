<template>
  <div class="videoPlayer" @click="click">
    <video
      id="video"
      class="video"
      ref="videoList"
      :style="{ height: windowsHeight - 60 + 'px' }"
      x5-video-player-type="h5"
      :poster="videoList.imgUrl"
      webkit-playsinline="true"
      preload="none"
      x-webkit-airplay="true"
      playsinline="true"
      x5-video-player-fullscreen="false"
      :src="videoList.videoUrl"
      v-on:ended="ended"
    ></video>
  </div>
</template>

<script>
export default {
  name: "",
  created() {},
  mounted() {
	this.playNum=this.videoList.playNum
  },
  computed: {},
  watch: {
    currentPage(newVal) {
      if (newVal == this.pageIndex) {
        this.videoPlay();
      } else {
        this.videoPause();
      }
    },
  },
  props: ["videoList", "currentPage", "pageIndex", "windowsHeight"],
  data() {
    return {
      playStatus: false,
      dblclick: false,
      playNum: 0,
    };
  },
  methods: {
    // 单击事件
    singleClick() {
      let video = this.$refs.videoList;
      if (!this.playStatus) {
        video.play();
        this.playStatus = true;
      } else {
        video.pause();
        this.playStatus = false;
      }
    },
    // 单击与双击事件判断
    click() {
      this.dblclick = !this.dblclick;
      setTimeout(() => {
        if (this.dblclick) {
          // 单击
          let video = this.$refs.videoList;
          if (!this.playStatus) {
            video.play();
            this.playStatus = true;
          } else {
            video.pause();
            this.playStatus = false;
          }
        } else {
          console.log("doubleClick");
          this.$emit("doubleClick");
        }
        this.dblclick = false;
      }, 300);
    },
    //    播放函数
    videoPlay() {
      let video = this.$refs.videoList;
      video.currentTime = 0;
      video.play();
      this.playStatus = true;
    },
    // 暂停函数
    videoPause() {
      let video = this.$refs.videoList;
      video.currentTime = 0.0;
      video.pause();
      this.playStatus = false;
    },
    async updatePlay() {
      let data = {
        id: this.videoList.id,
        playNum: this.playNum,
      };
       let { data: res } = await this.$http.put(`/movie/updatePlayNum`,data);
    },
    ended() {
      this.playNum = this.playNum + 1;
      let video = this.$refs.videoList;
      video.currentTime = 0;
      video.play();
      this.updatePlay();
    },
  },
};
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
