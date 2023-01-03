<template>
  <div>
    <Header
      :author="'我的'"
      @getAuthorLike="getAllLike"
      @getData="getAllWorker"
      @getAuthorCollected="getAllCollected"
    ></Header>
    <List :videoList="videoList" ref="ListRef"></List>
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
     localStorage.setItem("videoList", JSON.stringify(this.videoList));
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
      let { data: res } = await this.$http.get("/movie/getVideoLike/1");
      this.videoList = res.data;
      this.$refs.ListRef.goPageTop()
      localStorage.setItem("videoList", JSON.stringify(this.videoList));
    },
    getAllWorker() {
      this.videoList = [];
    },
    async getAllCollected() {
      let { data: res } = await this.$http.get("/movie/getVideoCollected/1");
      this.videoList = res.data;
       this.$refs.ListRef.goPageTop()
      localStorage.setItem("videoList", JSON.stringify(res.data));
    },
  },
};
</script>

<style lang="less" scoped>
</style>
