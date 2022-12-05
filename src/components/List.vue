<template>
    <div class="list" ref="listRef" >
        <ul>
            <li v-for="(video, index) in videoList" :key="video.id" @click="goVideoPlay(index)" >
                <div class="imgContainer"><img class="img" :style="{ height: windowWidth / 3 * 1.33 + 'px' }" :src="video.imgUrl"
                        alt="">
                    <div class="iconfont  icon-aixin1 likes  ">&nbsp;{{(video.likes<10000? video.likes:video.likes/10000+'w')}}</div>
                </div>
                <p class="name">{{ video.name }}</p>

            </li>
        </ul>
    </div>
</template>

<script>
export default {
    name: '',
    props: ['videoList'],
    data() {
        return {
            windowsHeiht: window.innerHeight,
            windowWidth: window.innerWidth,
        }
    },
    methods:{
        goVideoPlay(index){
        this.$router.push({name:'play',params:{index}})
        },
        goPageTop(){
            console.log('goPageTop');
            document.documentElement.scrollTop =0
        },
    },
}
</script>

<style lang="less" scoped>
ul {
    box-sizing: border-box;
    width: 100%;
    padding-top: 6px;
    padding-left: 6px;
    padding-bottom: 50px;
}


li {
    
    box-sizing: border-box;
    display: inline-block;
    width: 33.3%;
    height: 100%;
    padding-right: 6px;
    padding-bottom: 6px;
}

.imgContainer{
    position: relative;
}

.likes {
    position: absolute;
    // font-weight: 700;
    font-size: 14px;
    color: #FFF;
    bottom: 0;
    left: 2px;
    z-index: 20;
}

.img {
    width: 100%;
    // height: 100%;
    vertical-align: top;
}

.name {
    width: 100%;
    height: 24px;
    margin-top: 4px;
    line-height: 24px;
    overflow: hidden;
    font-size: 12px;
    text-overflow: ellipsis;
}
</style>