<template>
  <div class="headerContainer">
    <div class="header">
      <div class="return-header">
        <div class="right-header menu" @click.prevent="goUserMenu"><span class="iconfont icon-mulu"></span>&nbsp;</div>
      </div>
      <div class="author">
        <div class="user-nav">
          <div class="imgContainer">
            <img :src="authorInfo ? authorInfo.headPortrait : require('../../public/images/1.jpg')" />
          </div>
        </div>
        <div class="user-nav" @click="goAuthorList">
          <span class="title">关注</span>
          <span class="num">{{ total }}</span>
        </div>
        <div class="user-nav">
          <span class="title">喜欢</span>
          <span class="num">{{ likes }}</span>
        </div>
        <div class="user-nav">
          <span class="title">收藏</span>
          <span class="num">{{ collected }}</span>
        </div>
      </div>
      <div class="name">{{ username }}</div>
      <div class="option">
        <div class="bar" ref="WorksRef" @click="getWorks">作品</div>
        <div class="bar" ref="likesRef" @click="getLikes">喜欢</div>
        <div class="bar" ref="collectedRef" @click="getcollected">收藏</div>
      </div>
    </div>
    <van-popup v-model="show" position="right" :style="{ height: '100%', width: '50%' }">
      <div>
        <span class="iconfont icon-qiehuanyonghu1 menu_num" @click="goLogin"> &nbsp;切换用户 </span>
      </div>
      <div>
        <span class="iconfont icon-history menu_num" @click="goUserHostory"> &nbsp;观看历史</span>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
export default {
  name: 'AuthorHeader',
  mounted() {
    this.$refs.WorksRef.style.borderBottom = '2px solid #000'
    this.author = localStorage.getItem('author')
    if (this.author != null) {
      this.getAuthorInfo()
    } else {
      this.getUserInfo()
    }
  },
  activated() {
    this.show = false
    this.username = localStorage.getItem('username')
    this.routeJudge()
    this.author = localStorage.getItem('author')
    if (this.author != null) {
      this.getAuthorInfo()
    } else {
      this.getUserInfo()
    }
  },
  deactivated() {},
  data() {
    return {
      authorInfo: null,
      total: 0,
      likes: 0,
      collected: 0,
      author: '',
      username: '',
      show: false
    }
  },
  methods: {
    showPopup() {
      this.show = true
    },
    onClickLeft() {
      this.$router.push('/index')
    },
    getWorks() {
      this.$refs.WorksRef.style.borderBottom = '2px solid #000'
      this.$refs.likesRef.style.borderBottom = 'none'
      this.$refs.collectedRef.style.borderBottom = 'none'
      this.$emit('getData')
    },
    getLikes() {
      this.$refs.WorksRef.style.borderBottom = 'none'
      this.$refs.likesRef.style.borderBottom = '2px solid #000'
      this.$refs.collectedRef.style.borderBottom = ' none'
      this.$emit('getAuthorLike')
    },
    getcollected() {
      this.$refs.WorksRef.style.borderBottom = 'none'
      this.$refs.likesRef.style.borderBottom = 'none'
      this.$refs.collectedRef.style.borderBottom = '2px solid #000'
      this.$emit('getAuthorCollected')
    },
    async getUserInfo() {
      let params = {
        userId: localStorage.getItem('userId')
      }
      let { data: res } = await getUserInfo(params)
      if (res.code == 1) {
        if (res.data == null) {
          return
        }
        this.total = res.data.authorTotal
        this.likes = res.data.likes
        this.collected = res.data.collected
      }
    },
    goAuthorList() {
      if (this.author) {
        return
      }
      this.$router.push('/authorList')
    },
    goUserMenu() {
      this.show = true
    },
    goLogin() {
      this.$router.replace('/login')
    },
    goUserHostory() {
      this.$router.push('/userHostory')
    },
    routeJudge() {
      if (this.$route.path == '/author/like' || this.$route.path == '/home/like') {
        this.$refs.WorksRef.style.borderBottom = 'none'
        this.$refs.likesRef.style.borderBottom = '2px solid #000'
        this.$refs.collectedRef.style.borderBottom = ' none'
      } else if (this.$route.path == '/author/collect' || this.$route.path == '/home/collect') {
        this.$refs.WorksRef.style.borderBottom = 'none'
        this.$refs.likesRef.style.borderBottom = 'none'
        this.$refs.collectedRef.style.borderBottom = '2px solid #000'
      } else {
        this.$refs.WorksRef.style.borderBottom = '2px solid #000'
        this.$refs.likesRef.style.borderBottom = 'none'
        this.$refs.collectedRef.style.borderBottom = 'none'
      }
    }
  }
}
</script>

<style lang="less" scoped>
.headerContainer {
  width: 100%;
  height: 200px;
  background-color: #ffffff;
}

.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 200px;
  background-color: #ffffff;
  z-index: 100;
}

.return-header {
  position: relative;
  height: 40px;
  font-size: 24px;
  line-height: 40px;
  // font-weight: 700;
  background-color: #222629;
  color: #fff;

  .right-header {
    position: absolute;
    margin: auto 0;
    top: 10px;
    right: 15px;
    width: 16px;
    height: 16px;
    line-height: 16px;
  }
}

.author {
  display: flex;
  align-items: center;
  flex: 4;
  width: 100%;
  height: 80px;
}

.user-nav {
  flex: 1;
  display: flex;
  flex-direction: column;
  text-align: center;

  .imgContainer {
    height: 100%;
    width: 100%;
    padding: 5px;

    img {
      height: 90%;
      width: 90%;
      border-radius: 50%;
      vertical-align: middle;
    }
  }

  .title {
    font-size: 14px;
    color: rgba(22, 24, 35, 0.5);
  }

  .num {
    height: 30px;
    color: #161823;
    font-size: 18px;
    line-height: 30px;
    margin-top: 2px;
  }
}

.name {
  height: 40px;
  padding-top: 15px;
  padding-left: 10px;
  background-color: #ffffff;
  font-size: 20px;
  line-height: 40px;
  color: #161823;
  font-weight: 500;
}

.option {
  display: flex;
  justify-items: auto;
  height: 40px;
  padding-top: 10px;
  line-height: 40px;
  width: 100%;
  background-color: #fff;

  .bar {
    flex: 1;
    text-align: center;
  }
}

.menu {
  position: relative;
  height: 16px;
  width: 16px;
  line-height: 16px;
  padding-left: 10px;
  font-size: 16px;
  span {
    position: absolute;
    top: 0;
    left: 0;
  }
}
.menu_num {
  height: 40px;
  width: 100%;
  line-height: 40px;
  padding-left: 10px;
  font-size: 16px;
}
</style>
