<template>
  <div class="author">
    <Header @getAuthorLike="getAuthorLike" @getData="goWorks" @getAuthorCollected="getAuthorCollected" />
    <router-view />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  name: 'Author',
  components: {
    Header
  },
  data() {
    return {}
  },
  computed: {},
  created() {
    this.$bus.$emit('tabShow', { tabShow: false })
  },
  mounted() {},
  activated() {
    this.$bus.$emit('tabShow', { tabShow: false })
  },
  methods: {
    // 进入视频作者页
    async goWorks() {
      this.author = localStorage.getItem('author')
      this.$router.replace('/author/works')
    },
    async getAuthorLike() {
      this.author = localStorage.getItem('author')
      this.$router.replace('/author/like')
    },
    async getAuthorCollected() {
      this.author = localStorage.getItem('author')
      this.$router.replace('/author/collect')
    }
  }
}
</script>

<style lang="less" scoped>
.author {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}
h2 {
  text-align: center;
  font-weight: 400;
  color: red;
  font-size: 16px;
}
</style>
