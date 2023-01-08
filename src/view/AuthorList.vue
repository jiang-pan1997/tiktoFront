<template>
  <div>
    <h1>作者列表</h1>
    <p v-for="author in authorList" :key="author.id" @click="goAuthor(author.author)">{{ author.author }}</p>
  </div>
</template>

<script>
import { getAuthorList } from '@/api'
export default {
  name: 'AuthorList',
  data() {
    return {
      authorList: []
    }
  },
  created() {
    this.getAuthorList()
    this.$bus.$emit('tabShow', { tabShow: false })
  },
  methods: {
    async getAuthorList() {
      const { data: res } = await getAuthorList()
      this.authorList = res.data
    },
    goAuthor(author) {
      localStorage.setItem('author', author)
      this.$router.push({
        name: 'author',
        params: {
          author: author
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
p {
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  color: #000;
  margin: 0;
  border-bottom: 1px solid #000;
}
</style>
