<template>
  <div>
    <h4>历史记录</h4>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false" @load="onLoad">
      <List ref="ListRef" :video-list="videoList" />
    </van-list>
  </div>
</template>

<script>
import { getUserVideoHistory } from '@/api'
import List from '@/components/List.vue'
export default {
  name: 'UserHostory',
  components: {
    List
  },
  data() {
    return {
      videoList: [],
      total: 0,
      author: '',
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
    this.getUserVideoHostory()
  },
  destroyed() {
    localStorage.setItem('page', this.page)
  },
  methods: {
    async getUserVideoHostory() {
      this.author = localStorage.getItem('author')
      const params = {
        userId: localStorage.getItem('userId'),
        page: this.page,
        pageSize: 10
      }
      const { data: res } = await getUserVideoHistory(params)
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
        this.getUserVideoHostory()
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

<style lang="less" scoped>
h4 {
  font-weight: bold;
  text-align: center;
}
</style>
