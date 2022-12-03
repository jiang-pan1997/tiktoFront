<template>
	<div class="videoPlayer" @click="click">
		<video class="video" ref="videoList" :preload="preloadStatus" loop :src="videoList.videoUrl"></video>

	</div>
</template>

<script>
export default {
	name: '',
	created() {
	},
	computed:{
		preloadStatus(){
        return this.preloads>=this.page-2? 'auto' :'none'
		}
	},
	props: ['videoList','preloads','page'],
	data() {
		return {
			playStatus: false,
			dblclick: false,
		}
	},
	methods: {
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

		videoPlay() {
			let video = this.$refs.videoList
			video.currentTime = 0;
			video.play()
			this.playStatus = true
		},
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
	height: 100%;
	z-index: 19;
	/* margin-bottom: 50px; */
}

.video {
	width: 100%;
	height: 100%;
	/* object-fit: fill; */
	/* top: 0;
		left: 0; */
	z-index: 20;
}
</style>
