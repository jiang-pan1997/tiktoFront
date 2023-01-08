<template>
  <div class="listLeft">
    <div class="author">@{{ videoData.author }}</div>
    <div class="title">
      <span>{{ videoData.name }}</span>
    </div>
    <div class="release_time">
      <span>{{ format(videoData.releaseTime) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['detail'],
  data() {
    return {}
  },
  computed: {
    videoData() {
      return this.detail || {}
    }
  },
  created() {},
  methods: {
    // 格式化时间
    format(time) {
      var dat = new Date(time * 1000)
      // 获取年月日，时间
      const year = dat.getFullYear()
      const mon = dat.getMonth() + 1 < 10 ? '0' + (dat.getMonth() + 1) : dat.getMonth() + 1
      const data = dat.getDate() < 10 ? '0' + dat.getDate() : dat.getDate()
      const hour = dat.getHours() < 10 ? '0' + dat.getHours() : dat.getHours()
      const min = dat.getMinutes() < 10 ? '0' + dat.getMinutes() : dat.getMinutes()
      const seon = dat.getSeconds() < 10 ? '0' + dat.getSeconds() : dat.getSeconds()

      const newDate = year + '-' + mon + '-' + data + ' ' + hour + ':' + min + ':' + seon
      // const newDate = year + '-' + mon + '-' + data + ' ' + hour + ':' + min
      return newDate
    }
  }
}
</script>

<style lang="less" scoped>
.listLeft {
  // max-height: 140px;
  margin-left: 10px;
  color: #fff;
  width: 150px;
}

.author {
  height: 35px;
  width: 100%;
  line-height: 35px;
  font-size: 15px;
}

.title {
  // height: 36px;
  width: 100%;
  line-height: 22px;
  font-size: 12px;

  span {
    margin: 0;
    height: 100%;
  }
}

.release_time {
  margin-top: 5px;
  width: 100%;
  line-height: 14px;
  font-size: 12px;
  color: #bbb;
}

@keyframes music {
  0% {
    transform: translate3d(80%, 0, 0);
  }

  100% {
    transform: translate3d(-80%, 0, 0);
  }
}
</style>
