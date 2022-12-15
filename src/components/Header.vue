<template>
    <div class="headerContainer">

        <div class="header">
            <div class="return-header  ">&nbsp;<span class="iconfont icon-xiangzuojiantou return-header "></span></div>
            <div class="author">
                <div class="user-nav">
                    <div class="imgContainer"><img :src="authorInfo.headPortrait!=null?authorInfo.headPortrait:require('../../public/images/1.jpeg')"></div>
                </div>
                <div class="user-nav">
                    <span class="title">获赞</span>
                    <span class="num">20012</span>
                </div>
                <div class="user-nav" @click="goAuthorList" >
                    <span class="title">关注</span>
                    <span class="num">22345</span>
                </div>
                <div class="user-nav">
                    <span class="title">粉丝</span>
                    <span class="num">19976</span>
                </div>
            </div>
            <div class="name" >{{author}}</div>
            <div class="option">
                <div class="bar" ref="WorksRef" @click="getWorks">作品</div>
                <div class="bar" ref="likesRef" @click="getLikes">喜欢</div>
                <div class="bar" ref="collectedRef" @click="getcollected">收藏</div>
            </div>
        </div>

    </div>

</template>

<script>
export default {
    mounted() {
        this.$refs.WorksRef.style.borderBottom = "2px solid #000";
        this.getAuthorInfo()
    },
    props: ['author'],
    data() {
        return {
            videoList: [],
            authorInfo:{},
        }
    },
    methods: {
        onClickLeft() {
            this.$router.push('/index')
        },
        getWorks() {
            this.$refs.WorksRef.style.borderBottom = "2px solid #000";
            this.$refs.likesRef.style.borderBottom = "none";
            this.$refs.collectedRef.style.borderBottom = "none";
            this.$emit('getData')
        },
        getLikes() {
            this.$refs.WorksRef.style.borderBottom = "none";
            this.$refs.likesRef.style.borderBottom = "2px solid #000";
            this.$refs.collectedRef.style.borderBottom = " none";
            this.$emit('getAuthorLike')

        },
        getcollected() {
            this.$refs.WorksRef.style.borderBottom = "none";
            this.$refs.likesRef.style.borderBottom = "none";
            this.$refs.collectedRef.style.borderBottom = "2px solid #000";
            this.$emit('getAuthorCollected')
        },
      async  getAuthorInfo(){
         let {data:res}= await this.$http.get(`/movie/getSignalAuthor/${this.author}`)
         if(res.code==1){
            if(res.data==null){
                return
            }
            this.authorInfo=res.data
         }
        },
        goAuthorList(){
            this.$router.push('/authorList')
        }
    }
}
</script>

<style lang="less" scoped>
.headerContainer {
    width: 100%;
    height: 200px;
    background-color: #FFFFFF;
}

.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 200px;
    background-color: #FFFFFF;
    z-index: 100;
}

.return-header {
    height: 40px;
    font-size: 24px;
    line-height: 40px;
    // font-weight: 700;
    background-color: #222629;
    color: #FFF;
}


.author {
    display: flex;
    align-items: center;
    flex: 4;
    width: 100%;
    height: 80px;
}

.user-nav {
    flex: 1;
    display: flex;
    flex-direction: column;
    text-align: center;

    .imgContainer {
        height: 100%;
        width: 100%;
        padding: 5px;

        img {
            height: 90%;
            width: 90%;
            border-radius: 50%;
            vertical-align: middle;
        }
    }

    .title {
        font-size: 14px;
        color: rgba(22, 24, 35, .5);
    }

    .num {
        height: 30px;
        color: #161823;
        font-size: 18px;
        line-height: 30px;
        margin-top: 2px;
    }
}

.name {
    height: 40px;
    padding-top: 15px;
    padding-left: 10px;
    background-color: #FFFFFF;
    font-size: 20px;
    line-height: 40px;
    color: #161823;
    font-weight: 500;
}

.option {
    display: flex;
    justify-items: auto;
    height: 40px;
    padding-top: 10px;
    line-height: 40px;
    width: 100%;
    background-color: #FFF;

    .bar {
        flex: 1;
        text-align: center;
    }
}
</style>