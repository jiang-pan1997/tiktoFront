<template>
  <div>
    <!-- 展示总共多少条评论 -->
    <div class="header">{{ total }}条评论</div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" :immediate-check="false" @load="onLoad">
      <!-- 单个评论内容 -->
      <div class="comment" v-for="item in comments" :key="item.id">
        <!-- 头像显示 -->
        <div class="imgContainer">
          <img :src="item.avatarUri" alt="" />
        </div>
        <!--评论显示  -->
        <div class="display">
          <p>{{ item.nickname }}</p>
          <h4>{{ item.text }}</h4>
          <div class="createTime">{{ getTimer(item.createTime * 1000) }}·{{ item.ipLabel }}</div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { getCommentData } from '@/api'
export default {
  name: 'Comment',
  created() {
    this.getComment()
  },
  data() {
    return {
      comments: [],
      total: 0,
      size: 0,
      page: 1,
      loading: false,
      finished: false
    }
  },
  methods: {
    async getComment() {
      let params = {
        page: this.page,
        pageSize: 20
      }
      const { data: res } = await getCommentData(params)
      if (res.code == 1) {
        this.comments = [...this.comments, ...res.data.records]
        this.total = res.data.total
        this.size = res.data.size
      }
    },
    format(time) {
      var dat = new Date(time * 1000)
      //获取年月日，时间
      let year = dat.getFullYear()
      let mon = dat.getMonth() + 1 < 10 ? '0' + (dat.getMonth() + 1) : dat.getMonth() + 1
      let data = dat.getDate() < 10 ? '0' + dat.getDate() : dat.getDate()
      let hour = dat.getHours() < 10 ? '0' + dat.getHours() : dat.getHours()
      let min = dat.getMinutes() < 10 ? '0' + dat.getMinutes() : dat.getMinutes()
      let seon = dat.getSeconds() < 10 ? '0' + dat.getSeconds() : dat.getSeconds()

      // let newDate = year + "-" + mon + "-" + data + " " + hour + ":" + min + ":" + seon;
      let newDate = year + '-' + mon + '-' + data + ' ' + hour + ':' + min
      return newDate
    },
    getTimer(pubDate) {
      var minute = 1000 * 60
      var hour = minute * 60
      var day = hour * 24
      var week = day * 7
      var month = day * 30
      var time1 = new Date().getTime() //当前的时间戳
      var time2 = pubDate //指定时间的时间戳
      var time = time1 - time2

      var result = null
      if (time < 0) {
        result = '未知时间'
      } else if (time / month >= 1) {
        result = parseInt(time / month) + '月前'
      } else if (time / week >= 1) {
        result = parseInt(time / week) + '周前'
      } else if (time / day >= 1) {
        result = parseInt(time / day) + '天前'
      } else if (time / hour >= 1) {
        result = parseInt(time / hour) + '小时前'
      } else if (time / minute >= 1) {
        result = parseInt(time / minute) + '分钟前'
      } else {
        result = '刚刚'
      }
      return result
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        // for (let i = 0; i < 10; i++) {
        //   this.list.push(this.list.length + 1);
        // }
        this.page = this.page + 1
        this.getComment()
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.comments.length >= this.total) {
          this.finished = true
        }
      }, 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  margin-top: 5px;
  font-size: 14px;
  text-align: center;
}

.comment {
  //   display: flex;
  margin: 20px 2px;
  //   height: 60px;
  position: relative;

  .imgContainer {
    position: absolute;
    top: 0;
    left: 0;
    width: 35px;
    height: 35px;
    img {
      width: 35px;
      height: 35px;
      border-radius: 50%;
    }
  }

  .display {
    // height: 35px;
    p {
      margin: 0;
      padding-left: 40px;
      height: 15px;
      font-size: 10px;
      line-height: 15px;
      color: rgba(47, 48, 53, 0.7);
    }
    h4 {
      padding-left: 40px;
      margin: 0;
      //   height: 16px;
      font-size: 14px;
      line-height: 16px;
      color: #2f3035;
    }
    .createTime {
      padding-top: 2px;
      padding-left: 40px;
      height: 5px;
      font-size: 2px;
      color: rgba(47, 48, 53, 0.7);
    }
  }
}
</style>
