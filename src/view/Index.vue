<template>
    <div class="index">
        <first-nav></first-nav>
        <VideoList :videoList="videoList" :indexActive="true"  :pageIndex="pageIndex" ></VideoList>
    </div>
</template>

<script>
import FirstNav from '@/components/FirstNav.vue';
import Tab from '@/components/Tab.vue';
import VideoList from '@/components/VideoList.vue';
export default {
    name: 'index',
    components: {
        FirstNav,
        Tab,
        VideoList
    },
    created() {
        console.log('Index组件创建成功！');
        let result = JSON.parse(localStorage.getItem('indexList'))
        let pageIndexNum=localStorage.getItem('indexPage')
        console.log(pageIndexNum==null);
        if (result == null || pageIndexNum==null ) {
            this.getData()
            this.pageIndex=0
        }
        else {
            this.videoList = result
            this.pageIndex=pageIndexNum
        }
    },
    data() {
        return {
            videoList: [],
            pageIndex:0,
        }
    },
    methods: {
        // 获取视频数据
        async getData() {
            const { data: res } = await this.$http.get('/movie/geRandomData/10')
            this.videoList = res.data
            localStorage.setItem('indexList', JSON.stringify(res.data))

        },
    }

}
</script>

<style lang="less" scoped>
.index {
    width: 100%;
    height: 100%;
}
</style>