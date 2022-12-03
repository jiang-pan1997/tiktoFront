<template>
    <div class="index">
        <first-nav></first-nav>
        <Tab></Tab>
        <VideoList :videoList="videoList" :pageIndex="pageIndex" ></VideoList>
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
        let result = JSON.parse(localStorage.getItem('indexList'))
        let pageIndexNum=localStorage.getItem('pageIndex')
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
            const { data: res } = await this.$http.get('/movie/geRandomData/50')
            this.videoList = res.data
            localStorage.setItem('indexList', JSON.stringify(this.videoList))

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