<template>
	<div class="tab" :style="{ backgroundColor: bgc}">
		<div class="tab-box" @click="goIndex" :style="{ color: select == 0 ? '#1989fa' : color }">
			首页
		</div>
		<div class="tab-box" @click="goLikes" :style="{ color: select == 1 ? '#1989fa' : color }">
			喜欢
		</div>
		<div class="tab-box" @click="goAdd">
			<div class="iconfont icon-jiahao_o icon-box " :style="{ backgroundColor: color, color: bgc }">
			</div>
		</div>

		<div class="tab-box" @click="goCollected" :style="{ color: select == 2 ? '#1989fa' : color }">
			收藏
		</div>
		<div class="tab-box" @click="goAuthor" :style="{ color: select == 3 ? '#1989fa' : color }">
			作者
		</div>
	</div>
</template>

<script>
export default {
	created() {
		this.$bus.$on('videoInfo', (videoInfo) => {
		this.videoInfo = videoInfo	
		
		})
	},
	props:['select'],
	data() {
		return {
			videoInfo: {},
			bgc: '#000',
			color: '#FFFFFF',
		}
	},
    updated(){
		console.log(this.select);
	},
	methods: {
		goIndex() {
			this.bgc = '#000'
			this.color = '#fff'
			this.$router.push('/index')
		},
		goLikes() {
			localStorage.removeItem('videoList')
			this.bgc = '#FFF'
			this.color = '#000'
			this.$router.push('/likes')
		},
		goAdd() {
			this.$router.push('/add')
		},
		goCollected() {
			this.bgc = '#FFF'
			this.color = '#000'
			localStorage.removeItem('videoList')
			this.$router.push('/collected')
		},
		goAuthor() {
			localStorage.removeItem('videoList')
			this.bgc = '#FFF'
			this.color = '#000'
			this.$router.push({
				name: 'author', params: {
					author: this.videoInfo.author
				}
			})
		},
	}
}
</script>

<style lang="less" scoped >
.tab {
	position: fixed;
	left: 0;
	bottom: 0;
	height: 60px;
	width: 100%;
	z-index: 20;
	border-top: 1px solid #777;
	//  background: #000;

}

.tab-box {
	float: left;
	width: 20%;
	height: 60px;
	text-align: center;
	line-height: 60px;

}

.icon-box {
	width: 70%;
	height: 40px;
	margin: auto;
	background-color: #FFFFFF;
	color: #000;
	margin: 7.5px 15%;
	line-height: 40px;
	border-radius: 10px;
	font-size: 30px;
}
</style>
