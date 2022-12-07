<template>
  <div class="index" @touchstart="touchStart" @touchend="touchEnd">
    <van-swipe ref="Swipe" style="height: 100%;" :show-indicators="false" :duration="duration" :initial-swipe="preloads"
      vertical @change="onChange">
      <van-swipe-item v-for="(item, index) in videoList" :key="item.id">
        <div class="video">
          <video-play @doubleClick="doubleClick" :preloads="preloads" :windowsHeight="windowsHeight" :page="index"
            :pageIndex="preloads" class="video" :videoList="item" ref="videoRef"></video-play>
        </div>
        <div class="left-box">
          <list-left :detail="item"></list-left>
        </div>
        <div class="right-box">
          <list-right ref="listRight" :detail="item"></list-right>
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
  created() {

  },
  computed: {

  },
  mounted() {
    // this.$refs.videoRef[this.pageIndex || 0].videoPlay() 
    // this.preloads=this.pageIndex
  },
  props: ['videoList', 'pageIndex', 'indexActive',],
  data() {
    return {
      page: 0,
      pageStartY: 0,
      pageEndY: 0,
      preloads: this.pageIndex,
      duration: 500,
      windowsHeight: window.innerHeight,

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
      // console.log('鼠标结束:'+this.pageEndY);
    },

    // swiper切换触发事件
    onChange(index) {
      console.log('index位置：' + index);
      // //  翻页请求数据
      // if (index > this.$refs.videoRef.length - 3 && this.indexActive ) {
      //   // console.log('index位置：' + index);
      //   this.preloads = index
      //   // this.duration=0
      //   for(let i=0;i< this.$refs.videoRef.length;i++){
      //     this.$refs.videoRef[index-1].videoPause()
      //   }
      //   this.$bus.$emit('getNewVideo')
      //  setTimeout(() => {
      //   this.$refs.Swipe.swipeTo(index)
      //   this.duration=500
      //   this.$refs.videoRef[index].videoPlay()
      //  }, 500);
      //   //  this.pageIndex=this.$refs.videoRef.length-2
      // }


      //  判断是否在第一页，获者在最后一页
      if (this.$refs.videoRef.length - 1 == index || index == 0) {
        for (let i = 0; i < this.$refs.videoRef.length; i++) {
          this.$refs.videoRef[i].videoPause()
        }
        this.$refs.videoRef[index].videoPlay()
        this.page = index
        // this.preloads = index  
        return
      }

      let timer = null

      clearTimeout(timer)
      timer = setTimeout(() => {
        if (this.pageStartY > this.pageEndY) {
          this.pageStartY = 0
          this.pageEndY = 0
          this.$refs.videoRef[index].videoPlay()
          this.$refs.videoRef[index - 1].videoPause()
          this.page = index
          // console.log('向上滑动');
          this.preloads = index
        } else {
          this.pageStartY = 0
          this.pageEndY = 0
          this.$refs.videoRef[index].videoPlay()
          this.$refs.videoRef[index + 1].videoPause()
          // this.$refs.Swipe.swipeTo(this.page-1)
          this.page = index
          this.preloads = index
          console.log('向下滑动');
        }
      }, 20)
      //  翻页请求数据
      if (index > this.$refs.videoRef.length - 3 && this.indexActive) {
        // console.log('index位置：' + index);
        setTimeout(() => {
          this.preloads = index
          this.$bus.$emit('getNewVideo')
        }, 1000);
      }

      if (this.indexActive) {
        localStorage.setItem('indexPage', index)
      }
    },
    // 屏幕双击事件处理
    doubleClick() {
      console.log("双击事件");
      this.$refs.listRight[this.page].change()
    },

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