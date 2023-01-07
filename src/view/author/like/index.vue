<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false" @load="onLoad">
      <List :videoList="videoList" ref="ListRef"></List>
    </van-list>
  </div>
</template>

<script>
import { getUserLike } from '@/api'
import List from '@/components/List.vue'
export default {
  name: 'like',
  components: {
    List
  },
  created() {
    this.videoList = []
    this.page = 1
    this.getAuthorLike()
  },
  computed: {},
  activated() {
    if (this.author != localStorage.getItem('author')) {
      this.videoList = []
      this.page = 1
      this.loading = false
      this.finished = false
      this.getAuthorLike()
    }
  },
  deactivated() {
    localStorage.setItem('page', this.page)
  },
  data() {
    return {
      videoList: [],
      total: 0,
      author: '',
      page: 1,
      total: 0,
      pages: 0,
      loading: false,
      finished: false
    }
  },
  methods: {
    async getAuthorLike() {
      this.author = localStorage.getItem('author')
      let params = {
        userId: localStorage.getItem('userId'),
        worksAuthor: localStorage.getItem('author'),
        relish: 1,
        page: this.page,
        pageSize: 10
      }
      const { data: res } = await getUserLike(params)
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
        this.getAuthorLike()
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
