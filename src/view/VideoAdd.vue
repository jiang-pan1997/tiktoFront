<!--   http://localhost  -->
<!--   http://study-everyday.cn   -->
<template>
  <div class="container">
    <h1 id="title_msg"></h1>
    <br />
    <!-- 视频与图片上传 -->
    <div>
      <!-- 视频图片-->
      <div class="form-group">
        <label for="exampleInputFile">请上传视频封面：</label>
        <input id="file_img" type="file" multiple="multiple" name="img" />
        <p class="help-block">Example block-level help text here.</p>
        <img id="img_original" :src="novelImgPosition" alt="..." class="img-rounded" width="250" style="display: none" />
      </div>
      <!-- 视频-->
      <div class="form-group">
        <label for="novel_file">请上传视频文件：</label>
        <input id="file_video" type="file" multiple="multiple" name="novel_file" @change="matching(this)" />
        <p class="help-block">Example block-level help text here.</p>
      </div>
      <button id="btn" type="submit" class="btn btn-primary" @click.prevent="Add">添加</button>
    </div>
    <hr />
    <!-- 视频信息与作者头像上传 -->
    <div class="form-group">
      <label for="novel_file">请上传作者头像：</label>
      <input id="AuthorImg" type="file" multiple="multiple" name="img" @change="uploadAuthorImg" />
      <label for="novel_file">请上传视频资料文件：</label>
      <input id="videoData" type="file" name="" @change="getVideoData" />
      <br />
      <button id="btn" type="submit" class="btn btn-primary" @click.prevent="PostVideoData">发送视频详细信息</button>
    </div>
    <hr />
    <!-- 视频发布时间上传 -->
    <div class="form-group">
      <label for="novel_file">请选择视频发布时间文件：</label>
      <input id="videoCreateTime" type="file" name="" @change="getVideoDataReleaseTime" />
      <br />
      <button id="btn" type="submit" class="btn btn-primary" @click.prevent="PostDataAllReleaseTime">发送视频创作时间</button>
    </div>
    <hr />
    <!-- 视频评论上传 -->
    <div class="form-group">
      <label for="novel_file">请选择视频评论数据文件：</label>
      <input id="videoComment" type="file" name="" @change="getVideoCommentData" />
      <br />
      <button id="btn" type="submit" class="btn btn-primary" @click.prevent="PostVideoCommentData">发送视频评论数据</button>
    </div>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  name: 'VideoAdd',
  data() {
    return {
      UpLoading: false,
      Index: [],
      flag: true,
      novelImgPosition: '',
      imgId: '',
      imgUrl: '',
      videoId: '',
      videoUrl: '',
      duration: '',
      name: '',
      commentData: [],
      videoData: []
    }
  },
  created() {
    this.$bus.$emit('tabShow', { tabShow: false })
  },
  methods: {
    // 图片与视频相互匹配
    matching() {
      var imgarr = document.getElementById('file_img').files
      var novelArr = document.getElementById('file_video').files
      console.log(imgarr)
      console.log(novelArr)
      for (let i = 0; i < imgarr.length; i++) {
        const temp = []
        const sign = imgarr[i].name.substring(0, imgarr[i].name.indexOf('.'))
        for (let j = 0; j < novelArr.length; j++) {
          if (sign === novelArr[j].name.substring(0, novelArr[j].name.indexOf('.'))) {
            const obj = { first: i, second: j }
            temp.push(obj)
            this.Index.push(...temp)
          }
        }
      }
    },
    // 图片上传
    async uploadImg(index) {
      var formData = new FormData() // 需要用到formData
      formData.append('img', document.getElementById('file_img').files[index]) // 添加选择的文件 key值为file
      const { data: res } = await Axios.post('http://localhost:8000/storageServices/picture/upload', formData, {
        'Content-type': 'multipart/form-data'
      })
      if (res.code == 1) {
        console.log(res.data)
        this.imgId = res.data.id
        this.imgUrl = res.data.originalImgUrl
        console.log('图片资源写入成功！')
        return res.data
      } else {
        console.log('图片资源写入失败！')
      }
    },
    // 视频上传
    async uploadVideo(index) {
      var formData = new FormData() // 需要用到formData
      formData.append('video', document.getElementById('file_video').files[index]) // 添加选择的文件 key值为file
      const { data: res } = await Axios.post('http://localhost:8000/storageServices/video/upload', formData, {
        'Content-type': 'multipart/form-data'
      })
      console.log(res.data)
      if (res.code == 1) {
        this.videoId = res.data.id
        this.videoUrl = res.data.url
        this.duration = res.data.duration
        this.name = res.data.name
        console.log('视频资源写入成功！')
      } else {
        console.log('视频资源写入失败')
      }
    },
    // 图片与视频单个上传
    async upload() {
      const params = new URLSearchParams()
      params.append('imgId', this.imgId)
      params.append('imgUrl', this.imgUrl)
      params.append('videoId', this.videoId)
      params.append('videoUrl', this.videoUrl)
      params.append('videoDuration', this.duration)
      params.append('name', this.name)
      params.append('author', 'jiangpan')
      params.append('title', '')
      const { data: res } = await Axios.post('http://localhost:9696/movie', params)
      if (res.code == 1) {
        console.log(res.data)
        this.videoId = res.data.id
        this.videoUrl = res.data.url
        console.log('所以资源写入成功！')
      } else {
        console.log('所以资源写入失败')
      }
    },
    // 图片与视频循环上传
    async Add() {
      const indexTemp = this.Index
      for (let i = 0; i < indexTemp.length; i++) {
        await this.uploadImg(indexTemp[i].first)
        await this.uploadVideo(indexTemp[i].second)
        await this.upload()
        console.log('当前文件位置：=》' + i)
      }
    },
    // 上传作者头像
    async uploadAuthorImg() {
      var formData = new FormData() // 需要用到formData
      formData.append('img', document.getElementById('AuthorImg').files[0]) // 添加选择的文件 key值为file
      const { data: res } = await Axios.post('http://localhost:8000/storageServices/picture/upload', formData, {
        'Content-type': 'multipart/form-data'
      })
      if (res.code == 1) {
        console.log(res.data)
        this.imgUrl = res.data.originalImgUrl
        console.log('图片资源写入成功！')
        return res.data
      } else {
        console.log('图片资源写入失败！')
      }
    },
    // 获取视频详细信息
    getVideoData() {
      var arr = []
      let videoTemp = ''
      const reader = new FileReader()
      reader.readAsText(document.getElementById('videoData').files[0], 'utf8') // input.files[0]为第一个文件
      reader.onload = () => {
        let content = reader.result
        content = content.split('\n')
        for (let i = 0; i < content.length; i++) {
          videoTemp = content[i].split('\t')
          if (videoTemp[3].indexOf('w') != -1) {
            videoTemp[3] = parseFloat(videoTemp[3].substr(0, videoTemp[3].length - 1) * 10000)
            // console.log(temp*10000);
          } else {
            // console.log(parseFloat(videoTemp[3]));
            videoTemp[3] = parseFloat(videoTemp[3])
          }
          const obj = {
            likes: videoTemp[3],
            author: videoTemp[4],
            name: videoTemp[2]
          }
          arr.push(obj)
          console.log(arr)
          this.videoData = arr
          console.log(this.videoData)
        }
      }
      // console.log( this.videoData);
    },
    // 发送视频单个详细信息
    async PostVideoSignalData(likes, author, name) {
      var data = new URLSearchParams()
      data.append('likes', likes)
      data.append('author', author)
      data.append('name', name)
      data.append('headPortrait', this.imgUrl)
      const { data: res } = await Axios.post('http://localhost:9696/movie/update', data)
      console.log(res)
    },
    // 循环发送视频单个详细信息
    PostVideoData() {
      const dataArr = this.videoData
      for (let i = 0; i < dataArr.length; i++) {
        this.PostVideoSignalData(dataArr[i].likes, dataArr[i].author, dataArr[i].name)
      }
    },
    // 获取视频发布时间数据
    getVideoDataReleaseTime() {
      var arr = []
      let videoTemp = ''
      const reader = new FileReader()
      reader.readAsText(document.getElementById('videoCreateTime').files[0], 'utf8') // input.files[0]为第一个文件
      reader.onload = () => {
        let content = reader.result
        content = content.split('\n')
        for (let i = 0; i < content.length; i++) {
          videoTemp = content[i].split('\t')
          const obj = {
            name: videoTemp[0],
            releaseTime: videoTemp[1]
          }
          arr.push(obj)
          //   console.log(obj);
          this.videoData = arr
        }
      }
    },
    // 发送视频单个视频创作时间
    async PostVideoDataReleaseTime(name, releaseTime) {
      var data = new URLSearchParams()
      data.append('name', name)
      data.append('releaseTime', releaseTime)
      const { data: res } = await Axios.post('http://localhost:9696/movie/update', data)
      console.log(res)
    },
    // 循环发送视频单个视频创作时间
    PostDataAllReleaseTime() {
      const dataArr = this.videoData
      for (let i = 0; i < dataArr.length; i++) {
        this.PostVideoDataReleaseTime(dataArr[i].name, dataArr[i].releaseTime)
      }
    },
    // 获取视频评论数据
    getVideoCommentData() {
      const reader = new FileReader()
      reader.readAsText(document.getElementById('videoComment').files[0], 'utf8') // input.files[0]为第一个文件
      reader.onload = () => {
        let content = reader.result
        content = content.split('\r\n')
        this.commentData = content
      }
    },
    // 发送视频单个视频评论数据
    async uploadSignalComment(data) {
      console.log(data)
      const params = new URLSearchParams()
      params.append('avatarUri', data.avatar_uri)
      params.append('cid', data.cid)
      params.append('createTime', data.create_time)
      params.append('customVerify', data.custom_verify)
      params.append('diggCount', data.digg_count)
      params.append('ipLabel', data.ip_label)
      params.append('nickname', data.nickname)
      params.append('replyCommentTotal', data.reply_comment_total)
      params.append('text', data.text)
      const { data: res } = await Axios.post('http://localhost:9696/comment/upload', params)
      if (res.code != 1) {
        this.$notify({
          message: '修改失败',
          color: '#ad0000',
          background: '#ffe1e1',
          duration: 1000
        })
      }
    },
    // 批量上传评论数据
    PostVideoCommentData() {
      for (let i = 0; i < this.commentData.length; i++) {
        const obj1 = JSON.parse(this.commentData[i]) // https://p3-pc.douyinpic.com/aweme/100x100/
        obj1.avatar_uri = 'https://p3-pc.douyinpic.com/aweme/100x100/' + obj1.avatar_uri
        this.getVideoCommentData(obj1)
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
