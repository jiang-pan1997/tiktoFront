<template>
    <div class="play">
        <video-list :videoList="videoList" :pageIndex="pageIndex"></video-list>
    </div>
</template>

<script>
import VideoList from '@/components/VideoList.vue';
export default {
    name: '',
    components: {
        VideoList
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
            pageIndex: this.$route.params.index
        }
    },
    methods: {
        // 获取视频数据
        async getData() {
            // let { data: res } = await this.$http.get('/movie/getVideoLike/1')
            let { data: res }  = await this.$http.get('/movie/geRandomData/50')
            this.videoList = res.data

        },
    },
}
</script>

<style lang="less" scoped>
.play {
    height: 100%;
    width: 100%;
}
</style>