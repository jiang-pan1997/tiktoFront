<template>
  <div>
    <Header
      :author="'我的'"
      @getAuthorLike="getAllLike"
      @getData="getAllWorker"
      @getAuthorCollected="getAllCollected"
    ></Header>
    <!-- <List :videoList="videoList" ref="ListRef"></List> -->
    <router-view></router-view>
  </div>
</template>

<script>
import List from "@/components/List.vue";
import Header from "@/components/Header.vue";
export default {
  name: "Home",
  components: {
    List,
    Header,
  },
  created() {
    this.$bus.$emit("tabShow", { tabShow: true, select: 3 });
  },
  activated() {
     this.$bus.$emit("tabShow", { tabShow: true, select: 3 });
  },
  data() {
    return {
      videoList: [],
      page: 1,
      total: 0,
    };
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
    },
  },
};
</script>

<style lang="less" scoped>
</style>
