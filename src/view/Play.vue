<template>
  <div class="play">
    <video-list :videoList="videoList" :pageIndex="pageIndex"></video-list>
  </div>
</template>

<script>
import VideoList from "@/components/VideoList.vue";
export default {
  name: "",
  components: {
    VideoList,
  },
  created() {
    let result = JSON.parse(localStorage.getItem("videoList"));
    this.videoList = result;
    this.$bus.$emit("tabShow", { tabShow: false });
  },
  data() {
    return {
      videoList: [],
      pageIndex: this.$route.params.index,
      page:this.$route.params.page,
      total: 0,
    };
  },
  methods: {
    // 获取视频数据
    async getData() {
      let { data: res } = await this.$http.get(
        `/movie/getAuthor/${this.author}`,
        {
          params: {
            page: this.page,
            pageSize: 10,
          },
        }
      );
      this.videoList = [...this.videoList, ...res.data.records];
      this.total = res.data.total;
      localStorage.setItem("videoList", JSON.stringify(this.videoList));
      // this.$refs.ListRef.goPageTop();
    },
  },
};
</script>

<style lang="less" scoped>
.play {
  height: 100%;
  width: 100%;
}
</style>