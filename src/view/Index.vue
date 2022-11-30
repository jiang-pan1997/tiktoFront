<template>
  <div class="index"   @touchstart="touchStart" @touchend="touchEnd" >
    <van-swipe ref="Swipe" style="height: 100%;" :show-indicators="false" vertical @change="onChange"
  >
      <van-swipe-item v-for="(item,index) in videoList" :key="item.id">
        <div class="video">
          <video-play @doubleClick="doubleClick" :preloads="preloads" :page="index"   class="video" :videoList="item" ref="videoRef"></video-play>
        </div>
        <div class="left-box">
          <list-left :detail="item"></list-left>
        </div>
        <div class="right-box">
          <list-right ref="listRight"></list-right>
        </div>
      </van-swipe-item>
    </van-swipe>
    <list-left></list-left>
    <list-right></list-right>
  </div>
</template>

<script>
import VideoPlay from '@/components/VideoPlay.vue'
import ListLeft from '@/components/ListLeft.vue'
import ListRight from '@/components/ListRight.vue'
import axios from 'axios'
export default {
  components: {
    VideoPlay,
    ListLeft,
    ListRight
  },
  created() {
    this.getData()
  },
  computed:{

  },
  data() {
    return {
      videoList: [],
      page:0,
      pageStartY:0,
      pageEndY:0,
      preloads:0,

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
      let timer=null
      console.log('index位置：'+index);
      // console.log(index);
      // console.log( this.$refs.videoRef.length);
      // if(index==this.$refs.videoRef.length-3){
      //     console.log('最后第三页');
      //     this.getData()
      //     this.$refs.Swipe.resize();
      // }
      // if(this.page<index){
      //   // console.log(this.$refs.videoRef);
      // this.$refs.videoRef[index].videoPlay()
      // this.$refs.videoRef[index-1].videoPause()
      // this.page=index
      // console.log('向上翻页');
      // }else{
      // this.$refs.videoRef[index+1].videoPlay()
      // this.$refs.videoRef[index].videoPause()
      // this.page=index
      // console.log('向下翻页');
      // }

      //   if(this.page==this.$refs.videoRef.length-4){
      //     console.log('最后第三页');
      //     this.getData()
      //     this.$refs.Swipe.resize()
      // }
      clearTimeout(timer)
				timer = setTimeout(() => {
					if (this.pageStartY > this.pageEndY) {
						this.pageStartY = 0
						this.pageEndY = 0
      this.$refs.videoRef[index].videoPlay()
      this.$refs.videoRef[index-1].videoPause()
      // this.$refs.Swipe.swipeTo(this.page+1)
            this.page=index
						console.log('向上滑动');
           this.preloads=index
					} else {
						this.pageStartY = 0
						this.pageEndY = 0
            this.$refs.videoRef[index].videoPlay()
            this.$refs.videoRef[index+1].videoPause()
            // this.$refs.Swipe.swipeTo(this.page-1)
            this.page=index
            this.preloads=index
						console.log('向下滑动');
					}
				}, 20)

    },
    // 获取视频数据
    async getData() {
      let result = await axios.get('http://study-everyday.cn:9696/movie/geRandomData/50')
      this.videoList=result.data.data
      // let videoData =[...this.videoList,...result.data.data]
      // var obj = {};
      // videoData = videoData.reduce(function (item, next) {
      //   obj[next.id] ? '' : obj[next.id] = true && item.push(next);
      //   return item;
      // }, []);
      // this.videoList=videoData
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
		bottom: 50px;
		left: 10px;
	}

	.right-box {
		z-index: 30;
		position: absolute;
		bottom: 50px;
		right: 10px;
	}
</style>