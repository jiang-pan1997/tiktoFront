<template>
  <div class="collected">
    <Header :author="'收藏列表'" />
    <List :video-list="videoList" />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import List from '@/components/List.vue'
export default {
  name: 'Collected',
  components: {
    List,
    Header
  },
  data() {
    return {
      videoList: []
    }
  },
  created() {
    const result = JSON.parse(localStorage.getItem('videoList'))
    if (result == null) {
      this.getData()
    } else {
      this.videoList = result
    }
    this.$bus.$emit('tabShow', { tabShow: true, select: 2 })
  },
  methods: {
    // 获取视频数据
    async getData() {
      const { data: res } = await this.$http.get('/movie/getVideoCollected/1')
      this.videoList = res.data
      localStorage.setItem('videoList', JSON.stringify(res.data))
    }
  }
}
</script>

<style lang="less" scoped>
.collected {
  margin-bottom: 50px;
}
h2 {
  text-align: center;
  font-weight: 400;
  color: red;
  font-size: 16px;
}
</style>
