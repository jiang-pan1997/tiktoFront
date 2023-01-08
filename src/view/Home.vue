<template>
  <div>
    <AuthorHeader :author="'我的'" @getAuthorLike="getAllLike" @getData="getAllWorker" @getAuthorCollected="getAllCollected" />
    <!-- <List :videoList="videoList" ref="ListRef"></List> -->
    <router-view />
  </div>
</template>

<script>
import AuthorHeader from '@/components/AuthorHeader.vue'
export default {
  name: 'Home',
  components: {
    AuthorHeader
  },
  data() {
    return {
      videoList: [],
      page: 1,
      total: 0
    }
  },
  created() {
    this.$bus.$emit('tabShow', { tabShow: true, select: 3 })
  },
  activated() {
    this.$bus.$emit('tabShow', { tabShow: true, select: 3 })
    localStorage.removeItem('author')
  },
  methods: {
    async getAllLike() {
      localStorage.removeItem('author')
      this.$router.replace('/home/like')
    },
    getAllWorker() {
      localStorage.removeItem('author')
      this.$router.replace('/home/works')
    },
    async getAllCollected() {
      localStorage.removeItem('author')
      this.$router.replace('/home/collect')
    }
  }
}
</script>

<style lang="less" scoped></style>
