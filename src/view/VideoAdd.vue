<template>
    <div class="container">

        <h1 id="title_msg"></h1>
        <br>
        <div class="form-group">
            <label for="exampleInputFile">请上传视频封面：</label>
            <input type="file" id="file_img" multiple="multiple" name="img">
            <p class="help-block">Example block-level help text here.</p>
            <img :src="novelImgPosition" alt="..." class="img-rounded" id="img_original" width="250"
                style="display: none;">
        </div>

        <div class="form-group">
            <label for="novel_file">请上传视频文件：</label>
            <input type="file" id="file_video" multiple="multiple" name="novel_file" @change="matching(this)">
            <p class="help-block">Example block-level help text here.</p>
        </div>

        <button type="submit" class="btn btn-primary" id="btn" @click.prevent="Add" > 添加</button>
       <br>
       <br>
        <div class="form-group">
            <label for="novel_file">请上传作者头像：</label>
            <input type="file" id="AuthorImg" multiple="multiple" name="img" @change="uploadAuthorImg" >
            <label for="novel_file">请上传视频资料文件：</label>
            <input type="file" name="" id="videoData" @change="getVideoDataReleaseTime">
            <br>
            <button @click.prevent="PostDataReleaseTime">发送视频时长数据</button>
        </div>
        <a href="#" @click.prevent="goBack">返回视频主界面</a>

        <button @click.prevent="PostComment">上传评论数据</button>

    </div>
</template>

<script>
import Axios from 'axios'
export default {
    name: 'VideoAdd',
    created(){
        this.$bus.$emit('tabShow',{tabShow:false})
    },
    data() {
        return {
            novelImgPosition: '',
            UpLoading: false,
            Index: [],
            flag: true,
            novelImgPosition: "",
            imgId: "",
            imgUrl: "",
            videoId: "",
            videoUrl: "",
            duration: "",
            name: '',
            pinglun:[]
        }
    },
    methods: {

        matching() {
            var imgarr = document.getElementById('file_img').files
            var novelArr = document.getElementById('file_video').files
            console.log(imgarr);
            console.log(novelArr);
            for (let i = 0; i < imgarr.length; i++) {
                let temp = []
                let sign = imgarr[i].name.substring(0, imgarr[i].name.indexOf('.'))
                for (let j = 0; j < novelArr.length; j++) {
                    if (sign === novelArr[j].name.substring(0, novelArr[j].name.indexOf('.'))) {
                        let obj = { 'first': i, 'second': j }
                        temp.push(obj)
                        this.Index.push(...temp)
                    }
                }
            }

        },

        // 图片上传
        async uploadImg(index) {
            var formData = new FormData(); //需要用到formData
            formData.append(
                "img",
                document.getElementById("file_img").files[index]
            ); //添加选择的文件 key值为file  
            //   const { data: res } = await Axios.post("http://localhost:8000/storageServices/picture/upload",
            const { data: res } = await Axios.post("http://study-everyday.cn:8000/storageServices/picture/upload",
                formData,
                {
                    "Content-type": "multipart/form-data",
                }
            );
            if (res.code == 1) {
                console.log(res.data);
                this.imgId = res.data.id;
                this.imgUrl = res.data.originalImgUrl;
                console.log('图片资源写入成功！');
                return res.data
            }
            else {
                console.log('图片资源写入失败！');
            }

        },

     async   promisefun(num) {
            return new Promise((resolve, reject) => {
               this.uploadImg(num)
                resolve(num)
            })
        },

        // 视频上传
        async uploadVideo(index) {
            // console.log(document.getElementById("file_video").files[index].value);
            var formData = new FormData(); //需要用到formData
            formData.append(
                "video",
                document.getElementById("file_video").files[index]
            ); //添加选择的文件 key值为file
            //   const { data: res } = await Axios.post("http://localhost:8000/storageServices/video/upload",
            const { data: res } = await Axios.post("http://study-everyday.cn:8000/storageServices/video/upload",
                formData,
                {
                    "Content-type": "multipart/form-data",
                }
            );
            console.log(res.data);
            if (res.code == 1) {
                this.videoId = res.data.id;
                this.videoUrl = res.data.url;
                this.duration = res.data.duration
                this.name = res.data.name
                console.log('视频资源写入成功！');
            }
            else {
                console.log('视频资源写入失败');
            }


        },



        async upload() {
            const params = new URLSearchParams();
            params.append("imgId", this.imgId);
            params.append("imgUrl", this.imgUrl);
            params.append("videoId", this.videoId);
            params.append("videoUrl", this.videoUrl);
            params.append("videoDuration", this.duration);
            params.append("name", this.name);
            params.append("author", "jiangpan");
            params.append("title", "");
            const { data: res } = await Axios.post(
                "http://study-everyday.cn:9696/movie",
                // "http://localhost:9696/movie",
                params
            );
            if (res.code == 1) {
                console.log(res.data);
                this.videoId = res.data.id;
                this.videoUrl = res.data.url;
                console.log('所以资源写入成功！');
            }
            else {
                console.log('所以资源写入失败');
            }
        },



        async Add() {
            let indexTemp=this.Index
            for (let i = 0; i < indexTemp.length; i++) {
                await this.uploadImg(indexTemp[i].first)
                await this.uploadVideo(indexTemp[i].second)
                await this.upload()
                console.log('当前文件位置：=》'+i);
            }

        },

        getVideoData() {
            var arr = [];
            let videoTemp = ''
            const reader = new FileReader();
            reader.readAsText(document.getElementById("videoData").files[0], "utf8"); // input.files[0]为第一个文件
            reader.onload = () => {
                let content = reader.result;
                content = content.split("\n");
                // console.log(content[3]);

                for (let i = 0; i < content.length; i++) {
                    videoTemp = content[i].split("\t");
                    if (videoTemp[3].indexOf('w') != -1) {
                        videoTemp[3] = parseFloat(videoTemp[3].substr(0, videoTemp[3].length - 1) * 10000);
                        // console.log(temp*10000);
                    } else {
                        // console.log(parseFloat(videoTemp[3]));
                        videoTemp[3] = parseFloat(videoTemp[3])
                    }
                    let obj = {
                        likes: videoTemp[3],
                        author: videoTemp[4],
                        name: videoTemp[2]
                    };
                    arr.push(obj);
                    console.log(arr);
                    this.videoData = arr;
                    console.log(this.videoData);
                }

            };
            // console.log( this.videoData);
        },

        async PostVideoData(likes, author, name) {
            var data = new URLSearchParams();
            data.append("likes", likes);
            data.append("author", author);
            data.append("name", name);
            data.append("headPortrait", this.imgUrl);
            const { data: res } = await Axios.post(
                "http://study-everyday.cn:9696/movie/update",
                // "http://localhost:9696/movie/update",
                data
            );
            console.log(res);
        },

        getVideoDataReleaseTime() {
            var arr = [];
            let videoTemp = ''
            const reader = new FileReader();
            reader.readAsText(document.getElementById("videoData").files[0], "utf8"); // input.files[0]为第一个文件
            reader.onload = () => {
                let content = reader.result;
                content = content.split("\r\n");
                // console.log(content[3]);
                // console.log(content);
                this.pinglun=content
                // for (let i = 0; i < content.length; i++) {
                //     videoTemp = content[i].split("\t");
                //     let obj = {
                //         name: videoTemp[0],
                //         releaseTime: videoTemp[1],
                //     };
                //     arr.push(obj);
                //     console.log(arr);
                //     this.videoData = arr;
                //     console.log(this.videoData);
                // }
              this.transformation()
            };
            // console.log( this.videoData);
           
        },

        transformation(){
            var arr=[{}]
        for(let i=0;i<this.pinglun.length;i++){
            const obj1 = JSON.parse(this.pinglun[i]);     //https://p3-pc.douyinpic.com/aweme/100x100/
            
            obj1.avatar_uri= 'https://p3-pc.douyinpic.com/aweme/100x100/'+obj1.avatar_uri
            // arr.push(obj1)
            console.log(obj1);
            // uploadComment(obj1)
            this.uploadComment(obj1)
        }
           console.log(arr);
        },


      async  PostComment(){
          for(let i=0;i<this.pinglun.length;i++){
            this.uploadComment(this.pinglun[i])
          }

        },

      async  uploadComment(data){
        console.log(data);
         const params = new URLSearchParams();   
        params.append("avatarUri", data.avatar_uri);
        params.append("cid", data.cid);
        params.append("createTime", data.create_time);
        params.append("customVerify", data.custom_verify);
        params.append("diggCount", data.digg_count);
        params.append("ipLabel", data.ip_label);
        params.append("nickname", data.nickname);
        params.append("replyCommentTotal", data.reply_comment_total);
        params.append("text", data.text);
        const { data: res } = await Axios.post(
                "http://localhost:9696/comment/upload",
                params
            );
        },


        

            async PostVideoDataReleaseTime(name, releaseTime) {
            var data = new URLSearchParams();
            data.append("name", name);
            data.append("releaseTime", releaseTime);
            const { data: res } = await Axios.post(
                "http://study-everyday.cn:9696/movie/update",
                // "http://localhost:9696/movie/update",
                data
            );
            console.log(res);
        },
        
        PostData() {
            let dataArr = this.videoData;
            for (let i = 0; i < dataArr.length; i++) {
                this.PostVideoData(
                    dataArr[i].likes,
                    dataArr[i].author,
                    dataArr[i].name
                    
                );
            }
        },

        PostDataReleaseTime() {
            let dataArr = this.videoData;
            for (let i = 0; i < dataArr.length; i++) {
                this.PostVideoDataReleaseTime(
                    dataArr[i].name,
                    dataArr[i].releaseTime,            
                );
            }
        },

        async uploadAuthorImg() {
            var formData = new FormData(); //需要用到formData
            formData.append("img", document.getElementById("AuthorImg").files[0]
            ); //添加选择的文件 key值为file  
            //   const { data: res } = await Axios.post("http://localhost:8000/storageServices/picture/upload",
            const { data: res } = await Axios.post("http://study-everyday.cn:8000/storageServices/picture/upload",
                formData,
                {
                    "Content-type": "multipart/form-data",
                }
            );
            if (res.code == 1) {
                console.log(res.data);
                this.imgUrl = res.data.originalImgUrl;
                console.log('图片资源写入成功！');
                return res.data
            }
            else {
                console.log('图片资源写入失败！');
            }
        },


    }
}
</script>

<style lang="less" scoped>

</style>