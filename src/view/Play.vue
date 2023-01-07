<template>
  <div class="play">
    <video-list
      :videoList="videoList"
      :pageIndex="pageIndex"
      :total="total"
      @getNewVideoData="getNewVideoData"
    ></video-list>
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
    this.author = localStorage.getItem("author");
    if (this.author != null) {
      this.getAuthorInfo();
    } else {
      this.getUserInfo();
    }
  },
  mounted() {
    this.page = parseInt(localStorage.getItem("page"));
    this.getNewVideoData()
  },
  updated() {
    if (
      this.pathEnterUrl == "/author/works" ||
      this.pathEnterUrl == "/home/works"
    ) {
      this.total = this.total;
    } else if (
      this.pathEnterUrl == "/author/like" ||
      this.pathEnterUrl == "/home/like"
    ) {
      this.total = this.likes;
    } else if (
      this.pathEnterUrl == "/author/collect" ||
      this.pathEnterUrl == "/home/collect"
    ) {
      this.total = this.collected;
    } else if (this.pathEnterUrl == "/userHostory") {
     
    }
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.pathEnterUrl = from.fullPath;
    });
  },
  data() {
    return {
      videoList: [],
      pageIndex: this.$route.params.index,
      page: 0,
      total: 0,
      pathEnterUrl: "",
      likes: 0,
      collected: 0,
    };
  },
  methods: {
    // 获取视频数据
    async getNewVideoData() {
      if (
        this.pathEnterUrl == "/author/works" ||
        this.pathEnterUrl == "/home/works"
      ) {
        this.getAuthorPageDate();
      } else if (
        this.pathEnterUrl == "/author/like" ||
        this.pathEnterUrl == "/home/like"
      ) {
        this.getAuthorLike();
      } else if (
        this.pathEnterUrl == "/author/collect" ||
        this.pathEnterUrl == "/home/collect"
      ) {
        this.getAuthorCollected();
      } else if (this.pathEnterUrl == "/userHostory") {
        this.getUserVideoHostory();
      }
    },
    // 获取作者作品下一页数据
    async getAuthorPageDate() {
      this.author = localStorage.getItem("author");
      this.page = this.page + 1;
      let { data: res } = await this.$http.get(`/movie/getAuthor`, {
        params: {
          author: localStorage.getItem("author"),
          page: this.page,
          pageSize: 10,
        },
      });
      this.videoList = [...this.videoList, ...res.data.records];
      this.total = res.data.total;
      this.pages = res.data.pages;
      localStorage.setItem("videoList", JSON.stringify(this.videoList));
    },
    // 获取作者作品喜欢下一页数据
    async getAuthorLike() {
      this.author = localStorage.getItem("author");
      this.page = this.page + 1;
      const { data: res } = await this.$http.get(`/contact/getUserLike`, {
        params: {
          userId: localStorage.getItem("userId"),
          worksAuthor: localStorage.getItem("author"),
          relish: 1,
          page: this.page,
          pageSize: 10,
        },
      });
      this.videoList = [...this.videoList, ...res.data.records];
      this.total = res.data.total;
      this.pages = res.data.pages;
      localStorage.setItem("videoList", JSON.stringify(this.videoList));
    },
    // 获取作者作品收藏下一页数据
    async getAuthorCollected() {
      this.author = localStorage.getItem("author");
      this.page = this.page + 1;
      const { data: res } = await this.$http.get(`/contact/getUserCollected`, {
        params: {
          userId: localStorage.getItem("userId"),
          worksAuthor: localStorage.getItem("author"),
          collect: 1,
          page: this.page,
          pageSize: 10,
        },
      });
      this.videoList = [...this.videoList, ...res.data.records];
      this.total = res.data.total;
      this.pages = res.data.pages;
      localStorage.setItem("videoList", JSON.stringify(this.videoList));
    },
    async getUserVideoHostory() {
      this.page = this.page + 1;
      const { data: res } = await this.$http.get(
        `/contact/getUserVideoHistory`,
        {
          params: {
            userId: localStorage.getItem("userId"),
            page: this.page,
            pageSize: 10,
          },
        }
      );
      this.videoList = [...this.videoList, ...res.data.records];
      this.total = res.data.total;
      this.pages = res.data.pages;
      localStorage.setItem("videoList", JSON.stringify(this.videoList));
    },
    async getAuthorInfo() {
      this.author = localStorage.getItem("author");
      let { data: res } = await this.$http.get(
        `/contact/getSignalAuthor/${this.author}`,
        {
          params: {
            userId: localStorage.getItem("userId"),
            relish: 1,
            collect: 1,
          },
        }
      );
      if (res.code == 1) {
        if (res.data == null) {
          return;
        }
        this.authorInfo = res.data.authorInfo;
        this.total = res.data.total;
        this.likes = res.data.likes;
        this.collected = res.data.collected;
      }
    },
    async getUserInfo() {
      let { data: res } = await this.$http.get(`/contact//getUserInfo`, {
        params: {
          userId: localStorage.getItem("userId"),
        },
      });
      if (res.code == 1) {
        if (res.data == null) {
          return;
        }
        this.total = res.data.authorTotal;
        this.likes = res.data.likes;
        this.collected = res.data.collected;
      }
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