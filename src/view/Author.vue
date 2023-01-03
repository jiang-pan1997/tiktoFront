<template>
  <div class="author">
    <Header
      :author="author"
      @getAuthorLike="getAuthorLike"
      @getData="getData"
      @getAuthorCollected="getAuthorCollected"
    ></Header>
    <List :videoList="videoList" ref="ListRef"></List>
  </div>
</template>

<script>
import List from "@/components/List.vue";
import Header from "@/components/Header.vue";
export default {
  name: "Author",
  components: {
    List,
    Header,
  },
  created() {
    this.getData();
    this.$bus.$emit("tabShow", { tabShow: false });
  },
  computed: {
    author() {
      if (this.$route.params.author == undefined) {
        return localStorage.getItem("author");
      } else {
        this.authorInfo=this.$route.params.author
        localStorage.setItem("author", this.$route.params.author);
        return this.$route.params.author;
    }
  }
},
watch:{
  authorInfo(newVal){
    this.videoList=[]
    this.getData()
  }
},
  activated(){
    this.$bus.$emit("tabShow", { tabShow: false });
  },
  data() {
    return {
      videoList: [],
      total:0,
      authorInfo:''
    };
  },
  methods: {
    // 获取视频数据
    async getData() {
      let { data: res } = await this.$http.get(
        `/movie/getAuthor/${this.author}`
      );
      this.videoList = res.data.data;
      this.total=res.data.total
      localStorage.setItem("videoList", JSON.stringify(res.data.data));
      this.$refs.ListRef.goPageTop();
    },
    async getAuthorLike() {
      const { data: res } = await this.$http.get(
        `/movie/getAuthorLike/${this.author}`
      );
      this.videoList = res.data;
      localStorage.setItem("videoList", JSON.stringify(res.data));
      this.$refs.ListRef.goPageTop();
    },
    async getAuthorCollected() {
      const { data: res } = await this.$http.get(
        `/movie/getAuthorCollected/${this.author}`
      );
      this.videoList = res.data;
      localStorage.setItem("videoList", JSON.stringify(res.data));
      this.$refs.ListRef.goPageTop();
    },
  },
};
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