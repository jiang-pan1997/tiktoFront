<template>
	<div class="listright">
		<div class="author-img">
			<img class="img" :src="videoData.headPortrait" mode="show"  @click="goAuthor(videoData.author)" />
			<div class="iconfont icon-jiahao_o add " v-show="show" @click="hide">

			</div>
		</div>
		<div class=" iconfont icon-aixin right-box" :style="{ color: videoData.videoLike == 1 ? 'red' : '' }"
			@click="changeColor(videoData.videoLike)"></div>
		<div class="number">{{ videoData.likes / 10000 > 1 ? videoData.likes / 10000 + 'w' : videoData.likes }}</div>
		<div class=" iconfont icon-shoucang1 right-box " :style="{color: videoData.videoCollected == 1 ? '#FBB70F' : '' }"  @click="changeCollected(videoData.videoCollected)"  ></div>
		<div class="around">
			<img class="img" src="../../public/images/2.png" alt="" />
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		videoData() {
		return this.detail || {}
	    
		}
	},
	props: ['detail'],
	data() {
		return {
			show: true,
			color: '',
			collectColor:''
		}
	},
	methods: {
		hide() {
			this.show = false
		},
		changeColor(like) {
			if (like == 1  ) {
				this.videoData.videoLike = 0
				this.setVideoLike(0)
			} else {
				this.videoData.videoLike = 1
				this.setVideoLike(1)
			}
		},
		change() {
			this.color = 'red'
		},
		changeCollected(collected){
			console.log(collected);
			if (collected == 1) {
				this.videoData.videoCollected = 0
				this.setVideoCollected(0)
			} else {
				this.videoData.videoCollected = 1
				this.setVideoCollected(1)
			}
		},
		// 修改视频喜欢状态
		async setVideoLike(like) {
			const { data: res } = await this.$http.post(`/movie/setVideoLike/${this.videoData.id}/${like}`)
			
		},

		// 修改视频收藏状态
				async setVideoCollected(collected) {
			const { data: res } = await this.$http.post(`/movie/setVideoCollected/${this.videoData.id}/${collected}`)
		},

		goAuthor(){
			// const {data:res}=this.$http.get(`/movie/author/${this.videoData.author}`)
			localStorage.removeItem('videoList')
          this.$router.push({name:'author',params:{
			author:this.videoData.author
		  }})
		}
	}
}
</script>

<style lang="less" scoped>
.listright {
	width: 50px;
	margin: 0 auto;
}

.author-img {
	height: 45px;
	width: 45px;
	border-radius: 50%;
	border: 2px solid #FFF;
	position: relative;
}

.around {
	height: 45px;
	width: 45px;
	border-radius: 50%;
	margin-top: 15px;
	animation: rotate 1.5s linear 0.2s infinite;

}

.right-box {
	width: 50px;
	height: 40px;
	margin-top: 13px;
	text-align: center;
	line-height: 40px;
	color: #FFF;
	font-size: 35px;
}

.number {
	font-size: 10px;
	text-align: center;
	color: #FFF;
}

.img {
	height: 45px;
	width: 45px;
	border-radius: 50%;
}

.add {
	position: absolute;
	width: 18px;
	height: 18px;
	border-radius: 50px;
	background-color: red;
	bottom: -9px;
	left: 16px;
	text-align: center;
	line-height: 18px;
	color: #FFF;
}

@keyframes rotate {
	0% {
		transform: rotate(0deg);
	}

	100% {
		transform: rotate(360deg);
	}
}
</style>
