<template>
  <div ref="listRef" class="list">
    <ul>
      <li v-for="(video, index) in videoList" :key="video.id" @click="goVideoPlay(index)">
        <div class="imgContainer">
          <img class="img" :style="{ height: (windowWidth / 3) * 1.33 + 'px' }" :src="video.imgUrl" alt="" />
          <div class="iconfont icon-aixin1 likes">&nbsp;{{ videolikeNum(video.likes) }}</div>
          <div class="iconfont icon-24gl-play playNum">
            {{ video.playNum }}
          </div>
        </div>
        <p class="name">{{ video.name }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: '',
  props: ['videoList', 'page'],
  data() {
    return {
      windowsHeiht: window.innerHeight,
      windowWidth: window.innerWidth,
      topHeight: 0
    }
  },
  computed: {},
  mounted() {
    window.addEventListener('scroll', this.getTopHeight, true)
  },
  activated() {
    document.documentElement.scrollTop = localStorage.getItem('topHieght')
  },
  deactivated() {
    localStorage.setItem('topHieght', this.topHeight)
  },
  methods: {
    goVideoPlay(index) {
      localStorage.setItem('videoList', JSON.stringify(this.videoList))
      this.$router.push({
        name: 'play',
        params: { index: index, page: this.page }
      })
    },
    goPageTop() {
      document.documentElement.scrollTop = 0
    },
    getTopHeight() {
      // 方法一
      // let topHeight = Math.floor(document.body.scrollTop || document.documentElement.scrollTop || window.pageXOffset)
      // console.log(topHeight)

      // 方法二
      this.$nextTick(() => {
        this.topHeight = document.body.scrollTop || document.documentElement.scrollTop || window.pageXOffset
      })
    },
    videolikeNum(likes) {
      return likes <= 10000 ? likes : likes / 10000 + 'w'
    }
  }
}
</script>

<style lang="less" scoped>
ul {
  box-sizing: border-box;
  width: 100%;
  padding-top: 6px;
  padding-left: 6px;
  padding-bottom: 50px;
}

li {
  box-sizing: border-box;
  display: inline-block;
  width: 33.3%;
  height: 100%;
  padding-right: 6px;
  padding-bottom: 6px;
}

.imgContainer {
  position: relative;
}

.likes {
  position: absolute;
  // font-weight: 700;
  font-size: 14px;
  color: #fff;
  bottom: 0;
  left: 2px;
  z-index: 20;
}

.playNum {
  position: absolute;
  // font-weight: 700;
  font-size: 14px;
  color: #fff;
  bottom: 0;
  right: 2px;
  z-index: 20;
}

.img {
  width: 100%;
  // height: 100%;
  vertical-align: top;
}

.name {
  width: 100%;
  height: 24px;
  margin-top: 4px;
  line-height: 24px;
  overflow: hidden;
  font-size: 12px;
  text-overflow: ellipsis;
}
</style>
