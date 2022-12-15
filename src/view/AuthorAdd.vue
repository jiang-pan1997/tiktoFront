<template>
    <div class="container">

        <div class="form-group">
              <label for="novel__author">视频作者：</label>
              <input type="text" class="form-control" id="novel__author" v-model="author"  placeholder="请输入视频作者昵称" name="author" >
          </div>
        <h1 id="title_msg"></h1>
        <div class="form-group">
            <label for="exampleInputFile">请上传作者头像：</label>
            <input type="file" id="file_img" multiple="multiple" name="img" @change="uploadImg" >
            <img :src="novelImgPosition" alt="..." class="img-rounded" id="img_original" width="250"
                style="display: none;">
        </div>
        <button type="submit" class="btn btn-primary" id="btn" @click.prevent="upload" > 添加</button>
    </div>
</template>

<script>
import Axios from 'axios'
export default {
    name: 'AuthorAdd',
    created(){
        this.$bus.$emit('tabShow',this.$route.meta.tabShow)
    },
    data() {
        return {
            novelImgPosition: '',
            UpLoading: false,
            imgId: "",
            imgUrl: "",

            author:''
        }
    },
    methods: {
        // 图片上传
        async uploadImg() {
            var formData = new FormData(); //需要用到formData
            formData.append("img", document.getElementById("file_img").files[0]
            ); //添加选择的文件 key值为file  
              const { data: res } = await Axios.post("http://localhost:8000/storageServices/picture/upload",
            // const { data: res } = await Axios.post("http://study-everyday.cn:8000/storageServices/picture/upload",
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

        async upload() {
            const params = new URLSearchParams();
            params.append("author", this.author);
            params.append("headPortrait", this.imgUrl);
            params.append("headId", this.imgId);
            const { data: res } = await Axios.post(
                // "http://study-everyday.cn:9696/movie",
                "http://localhost:9696/author/upload",
                params
            );
            if (res.code == 1) {
                console.log('所以资源写入成功！');
            }
            else {
                console.log('所以资源写入失败');
            }
        },


    }
}
</script>

<style lang="less" scoped>

</style>