<template>
  <div id="app">
    <keep-alive include="Author,Home">
      <router-view />
    </keep-alive>
    <Tab v-show="tabShow" :select="select" />
    <van-popup v-model="showPop" closeable position="bottom" :style="{ height: '50%' }">
      <Comment v-if="showPop" />
    </van-popup>
  </div>
</template>

<script>
import Tab from '@/components/Tab.vue'
import Comment from '@/components/Comment.vue'
export default {
  name: 'App',
  components: {
    Tab,
    Comment
  },
  data() {
    return {
      btnStatus: true,
      bgc: '',
      tabShow: true,
      select: 0,
      showPop: false
    }
  },
  created() {
    localStorage.setItem('indexPage', 0)
    localStorage.removeItem('indexList')
    this.$bus.$on('tabShow', ({ tabShow, select }) => {
      this.tabShow = tabShow
      this.select = select
    })
    this.$bus.$on('showPopup', () => {
      this.showPop = true
    })
  },
  methods: {
    goIndex() {
      this.$router.push('/index')
      this.btnStatus = false
    },
    showPopup() {
      this.showPop = true
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  width: 100%;
  height: 100%;
}
body,
html {
  width: 100%;
  height: 100%;
}
</style>
