<template>
    <div class="index">
        <first-nav></first-nav>
        <VideoList :videoList="videoList" :indexActive="true" :pageIndex="pageIndex"></VideoList>
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
        let pageIndexNum = localStorage.getItem('indexPage')
        if (result == null || pageIndexNum == null) {
            this.getData()
            this.pageIndex = 0
        }
        else {
            this.videoList = result
            this.pageIndex = pageIndexNum
        }
        // this.getData()
        this.$bus.$on('getNewVideo', () => {
            console.log('getNewVideo...............................');
            this.getData()
        })

    },
    data() {
        return {
            videoList: [],
            pageIndex: 0,
        }
    },
    methods: {
        // 获取视频数据
        async getData() {
            const { data: res } = await this.$http.get('/movie/geRandomData/10')
            // let result = this.uniqueFunc(res.data)
            // console.log(result);
            let result = [...this.videoList, ...res.data]
            this.videoList = this.uniqueFunc(result)
            localStorage.setItem('indexList', JSON.stringify(this.videoList))

        },
        uniqueFunc(arr) {
            var temp=[]
                arr.forEach(function (a) {
                    var check = temp.every(function (b) {
                        return a.id !== b.id;
                    })
                    check ? temp.push(a) : ''
                })
                return temp;
            }
        }

}
</script>

<style lang="less" scoped>
.index {
    width: 100%;
    height: 100%;
}
</style>