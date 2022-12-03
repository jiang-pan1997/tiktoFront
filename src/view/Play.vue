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
        this.videoList = result
    },
    data() {
        return {
            videoList: [],
            pageIndex: this.$route.params.index
        }
    },
    methods: {
    
    },
}
</script>

<style lang="less" scoped>
.play {
    height: 100%;
    width: 100%;
}
</style>