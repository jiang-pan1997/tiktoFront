<template>
    <div class="author">
        <h2>作者列表</h2>
        <List :videoList="videoList"></List>
    </div>
</template>

<script>
import List from '@/components/List.vue'
export default {
    name: 'Author',
    components: {
        List
    },
    created() {
        let result = JSON.parse(localStorage.getItem('videoList'))
        console.log('result:'+result);
        if (result == null) {
            this.getData()
        }
        else {
            this.videoList = result
        }
    },
    data() {
        return {
            videoList: [],
            author:this.$route.params.author,
        }
    },
    methods: {
        // 获取视频数据
        async getData() {
            // let { data: res }  = await this.$http.get('/movie/getVideoLike/1')
            let { data: res }  = await this.$http.get(`/movie/getAuthor/${this.author}`)
            this.videoList = res.data
            localStorage.setItem('videoList',JSON.stringify(this.videoList))

        },
    }
}
</script>

<style lang="less" scoped>
 .author{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
 }
h2{
    text-align: center;
    font-weight: 400;
    color: red;
    font-size: 16px;
}
</style>