<template>
	<div class="videoPlayer" @click="click">
		<video class="video" ref="videoList" :style="{height:windowsHeight-60+'px'}" :preload="preloadStatus"   x5-video-player-type="h5"  
		:poster="videoList.imgUrl" webkit-playsinline="true" :autoplay="autoplayStatus" loop
    x-webkit-airplay="true"
    playsinline="true"
    x5-video-player-fullscreen="false" :src="videoList.videoUrl"></video>

	</div>
</template>

<script>
export default {
	name: '',
	created() {

	},
	mounted() {


	},
	computed: {
		preloadStatus() {
			if (this.preloadStatusFlag == 'metadata') {
				return this.preloadStatusFlag
			} else {
				this.preloadStatusFlag = this.preloads <= this.page&& this.preloads >= this.page ? 'none' : 'none'
				return this.preloadStatusFlag
			}
		},
		autoplayStatus() {
			if (this.page == this.preloads) {
				this.playStatus = true
				// console.log('autoplayStatus');
				setTimeout(() => {
					this.$bus.$emit('videoInfo', this.videoList)
				}, 50)
				return true
			} else {
				this.playStatus = false
				return false
			}
		},

	},
	props: ['videoList', 'preloads', 'page','windowsHeight'],
	data() {
		return {
			playStatus: false,
			dblclick: false,
			preloadStatusFlag: 'none',
		}
	},
	methods: {
		// 单击事件
		singleClick() {
			console.log('singleClick');
			let video = this.$refs.videoList
			if (!this.playStatus) {
				video.play()
				this.playStatus = true
			} else {
				video.pause()
				this.playStatus = false
			}

		},
		// 单击与双击事件判断
		click() {
			this.dblclick = !this.dblclick
			setTimeout(() => {
				if (this.dblclick) {
					// 单击
					console.log('singleClick');
					let video = this.$refs.videoList
					if (!this.playStatus) {
						video.play()
						this.playStatus = true
					} else {
						video.pause()
						this.playStatus = false
					}
				} else {
					console.log('doubleClick');
					this.$emit('doubleClick')
				}
				this.dblclick = false
			}, 300)

		},
		//    播放函数
		videoPlay() {
			let video = this.$refs.videoList
			video.currentTime = 0;
			video.play()
			this.playStatus = true
		},
		// 暂停函数
		videoPause() {
			let video = this.$refs.videoList
			video.pause()
			this.playStatus = false
		}
	}
}
</script>

<style>
.videoPlayer {
	position: relative;
	width: 100%;
	height:100%;
	z-index: 19;
	/* margin-bottom: 50px; */
}

.video {
	width: 100%;
	/* height: 98%; */
	object-fit: cover;
	/* object-fit: fill; */
	/* top: 0;
		left: 0; */
	z-index: 20;
}
</style>
