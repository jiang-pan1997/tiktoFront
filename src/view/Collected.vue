<template>
    <div class="collected" >
        <Header :author="'收藏列表'"></Header>
        <List  :videoList="videoList"></List>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import List from '@/components/List.vue'
import Tab from '@/components/Tab.vue'
    export default {
        name: 'Collected',
    components: {
        List,
        Tab,
        Header
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
           
        }
    }, 
    methods:{
            // 获取视频数据
            async getData() {
            let { data: res }  = await this.$http.get('/movie/getVideoCollected/1')
            this.videoList = res.data
            localStorage.setItem('videoList',JSON.stringify(res.data))
        },
    } 
    }
</script>

<style lang="less" scoped>
.collected{
    margin-bottom: 50px;
}
h2{
    text-align: center;
    font-weight: 400;
    color: red;
    font-size: 16px;
}
</style>