<template>
  <div class="likes">
    <Header :author="'喜欢列表'" />
    <List :video-list="videoList" />
  </div>
</template>

<script>
import List from '@/components/List.vue'
import Header from '@/components/Header.vue'
export default {
  name: 'Likes',
  components: {
    List,
    Header
  },
  data() {
    return {
      videoList: [],
      total: 0
    }
  },
  created() {
    const result = JSON.parse(localStorage.getItem('videoList'))
    if (result == null) {
      this.getData()
    } else {
      this.videoList = result
    }
    this.$bus.$emit('tabShow', { tabShow: true, select: 1 })
  },
  methods: {
    // 获取视频数据
    async getData() {
      const { data: res } = await this.$http.get('/movie/getVideoLike/1')
      this.videoList = res.data
      localStorage.setItem('videoList', JSON.stringify(res.data))
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  margin-bottom: 50px;
}
h2 {
  text-align: center;
  font-weight: 400;
  color: red;
  font-size: 16px;
}
</style>
