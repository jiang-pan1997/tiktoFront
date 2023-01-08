<template>
  <div class="index" @touchstart="touchStart" @touchend="touchEnd">
    <van-swipe ref="Swipe" style="height: 100%" :show-indicators="false" :duration="duration" :initial-swipe="initialSwipe" vertical @change="onChange">
      <van-swipe-item v-for="(item, index) in videoList" :key="item.id">
        <div class="video">
          <video-play ref="videoRef" :windows-height="windowsHeight" :current-page="currentPage" :page-index="index" class="video" :video-list="item" @doubleClick="doubleClick" />
        </div>
        <div class="left-box">
          <list-left :detail="item" />
        </div>
        <div class="right-box">
          <list-right ref="listRight" :detail="item" />
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import VideoPlay from '@/components/VideoPlay.vue'
import ListLeft from '@/components/ListLeft.vue'
import ListRight from '@/components/ListRight.vue'
export default {
  components: {
    VideoPlay,
    ListLeft,
    ListRight
  },
  props: ['videoList', 'pageIndex', 'indexActive', 'total'],
  // props: {
  //   videoList: {
  //     type: Array,
  //     default() {
  //       return []
  //     }
  //   },
  //   pageIndex: {
  //     type: Number,
  //     default() {
  //       return 0
  //     }
  //   },
  //   indexActive: {
  //     type: Boolean,
  //     default: true
  //   },
  //   total: {
  //     type: Number,
  //     default: 0
  //   }
  // },
  data() {
    return {
      page: 0,
      pageStartY: 0,
      pageEndY: 0,
      initialSwipe: this.pageIndex,
      duration: 500,
      currentPage: 0,
      windowsHeight: window.innerHeight
    }
  },
  computed: {},
  created() {},
  mounted() {
    try {
      this.$refs.videoRef[this.pageIndex].videoPlay()
    } catch (error) {
      return
    }
  },
  methods: {
    // 触碰开始事件
    touchStart(res) {
      this.pageStartY = res.changedTouches[0].pageY
      // console.log('鼠标开始:'+this.pageStartY);
    },
    // 触碰结束事件
    touchEnd(res) {
      this.pageEndY = res.changedTouches[0].pageY
    },
    // swiper切换触发事件
    onChange(index) {
      console.log('翻页位置=>' + index)
      let timer = null
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (this.pageStartY > this.pageEndY) {
          this.pageStartY = 0
          this.pageEndY = 0
          this.currentPage = index
        } else {
          this.pageStartY = 0
          this.pageEndY = 0
          this.currentPage = index
        }
      }, 20)
      //  翻页请求数据
      if (index > this.$refs.videoRef.length - 3 && this.indexActive) {
        // console.log('index位置：' + index);
        localStorage.setItem('indexPage', index)
        if (this.$refs.videoRef.length == this.total) {
          return
        } else {
          setTimeout(() => {
            this.initialSwipe = index
            this.$bus.$emit('getNewVideo')
          }, 1000)
        }
        return
      }

      if (index > this.$refs.videoRef.length - 3) {
        if (this.$refs.videoRef.length == this.total) {
          return
        } else {
          setTimeout(() => {
            this.initialSwipe = index
            this.$emit('getNewVideoData')
          }, 1000)
        }
      }
    },
    // 屏幕双击事件处理
    doubleClick() {
      console.log('双击事件')
      this.$refs.listRight[this.page].change()
    }
  }
}
</script>

<style lang="less" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  text-align: center;
  background-color: #39a9ed;
  width: 100%;
  height: 100%;
}

.index {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #283032;
}

.left-box {
  z-index: 20;
  position: absolute;
  bottom: 60px;
  left: 10px;
}

.right-box {
  z-index: 30;
  position: absolute;
  bottom: 60px;
  right: 10px;
}
</style>
