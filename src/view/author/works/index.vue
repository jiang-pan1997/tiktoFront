<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false" @load="onLoad">
      <List ref="ListRef" :video-list="videoList" />
    </van-list>
  </div>
</template>

<script>
import { getAuthorWorksList } from '@/api'
import List from '@/components/List.vue'
export default {
  name: 'Works',
  components: {
    List
  },
  data() {
    return {
      videoList: [],
      author: '',
      total: 0,
      page: 1,
      pages: 0,
      loading: false,
      finished: false
    }
  },
  computed: {},
  created() {
    this.videoList = []
    this.page = 1
    this.getData()
  },
  activated() {
    if (this.author != localStorage.getItem('author')) {
      this.videoList = []
      this.page = 1
      this.loading = false
      this.finished = false
      this.getData()
    }
  },
  deactivated() {
    localStorage.setItem('page', this.page)
  },
  methods: {
    // 获取视频数据
    async getData() {
      this.author = localStorage.getItem('author')
      const params = {
        author: localStorage.getItem('author'),
        page: this.page,
        pageSize: 10
      }
      const { data: res } = await getAuthorWorksList(params)
      this.videoList = [...this.videoList, ...res.data.records]
      this.total = res.data.total
      this.pages = res.data.pages
      localStorage.setItem('videoList', JSON.stringify(this.videoList))
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        this.page = this.page + 1
        this.getData()
        // 加载状态结束
        this.loading = false
        setTimeout(() => {
          if (this.page >= this.pages) {
            this.finished = true
          }
        }, 200)
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped></style>
