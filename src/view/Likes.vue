<template>
    <div class="likes">
        <h2>喜欢列表</h2>
        <List  :videoList="videoList"></List>
    </div>
</template>

<script>
import List from '@/components/List.vue'
import Tab from '@/components/Tab.vue'
    export default {
        name: 'Likes',
    components: {
        List,
        Tab
    },
    created() {
        // let result = JSON.parse(localStorage.getItem('videoList'))
        // console.log('result:'+result);
        // if (result == null) {
        //     this.getData()
        // }
        // else {
        //     this.videoList = result
        // }
        this.getData()
    },
    data() {
        return {
            videoList: [],
            padeIndex:0,
           
        }
    }, 
    methods:{
            // 获取视频数据
            async getData() {
            let { data: res }  = await this.$http.get('/movie/getVideoLike/1')
            this.videoList = res.data
            localStorage.setItem('videoList',JSON.stringify(res.data))
        },
    } 
    }
</script>

<style lang="less" scoped>
.list{
    margin-bottom: 50px;
}
h2{
    text-align: center;
    font-weight: 400;
    color: red;
    font-size: 16px;
}
</style>