<template>
  <div class="index">
    <first-nav></first-nav>
    <VideoList :videoList="videoList" :indexActive="true" :pageIndex="pageIndex"></VideoList>
  </div>
</template>

<script>
import FirstNav from '@/components/FirstNav.vue'
import Tab from '@/components/Tab.vue'
import VideoList from '@/components/VideoList.vue'
import { geRandomData } from '@/api'
export default {
  name: 'index',
  components: {
    FirstNav,
    Tab,
    VideoList
  },
  created() {
    let result = JSON.parse(localStorage.getItem('indexList'))
    let pageIndexNum = localStorage.getItem('indexPage')
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
  data() {
    return {
      videoList: [],
      pageIndex: 0
    }
  },
  methods: {
    // 获取视频数据
    async getData() {
      const { data: res } = await geRandomData()
      let result = [...this.videoList, ...res.data]
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
