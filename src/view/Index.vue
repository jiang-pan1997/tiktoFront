<template>
  <div class="index">
    <first-nav />
    <VideoList :video-list="videoList" :index-active="true" :page-index="pageIndex" />
  </div>
</template>

<script>
import FirstNav from '@/components/FirstNav.vue'
import VideoList from '@/components/VideoList.vue'
import { geRandomData } from '@/api'
export default {
  name: 'Index',
  components: {
    FirstNav,
    VideoList
  },
  data() {
    return {
      videoList: [],
      pageIndex: 0
    }
  },
  created() {
    const result = JSON.parse(localStorage.getItem('indexList'))
    const pageIndexNum = localStorage.getItem('indexPage')
    if (result == null || pageIndexNum == null) {
      this.getData()
    } else {
      this.videoList = result
      this.pageIndex = pageIndexNum
    }
    this.$bus.$on('getNewVideo', () => {
      this.getData()
      this.pageIndex = localStorage.getItem('indexPage')
    })
    this.$bus.$emit('tabShow', { tabShow: true, select: 0 })
  },
  methods: {
    // 获取视频数据
    async getData() {
      const { data: res } = await geRandomData()
      const result = [...this.videoList, ...res.data]
      this.videoList = this.uniqueFunc(result)
      localStorage.setItem('indexList', JSON.stringify(this.videoList))
    },
    uniqueFunc(arr) {
      var temp = []
      arr.forEach(function (a) {
        var check = temp.every(function (b) {
          return a.id !== b.id
        })
        check ? temp.push(a) : ''
      })
      return temp
    }
  }
}
</script>

<style lang="less" scoped>
.index {
  width: 100%;
  height: 100%;
}
</style>
