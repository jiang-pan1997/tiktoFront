<template>
	<div class="listLeft">
		<div class="author">
			@{{videoData.author}}
		</div>
		<div class="title">
			<span>{{videoData.name}}</span>
		</div>
	</div>
</template>

<script>
	export default {
		props:['detail'],
		computed:{
         videoData(){
			return this.detail || {}
		 }
		},
		data() {
			return {

			}
		},
		created() {
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.listLeft {
		// max-height: 140px;
		margin-left: 10px;
		color: #FFF;
		width: 150px;
	}

	.author {
		height: 35px;
		width: 100%;
		line-height: 35px;
		font-size: 15px;

	}

	.title {
		// height: 36px;
		width: 100%;
		line-height: 22px;
		font-size: 12px;
		span{
            margin: 0;
			height: 100%;
		}
	}
	@keyframes music {
		0% {
			transform: translate3d(80%, 0, 0);
		}

		100% {
			transform: translate3d(-80%, 0, 0);
		}
	}
</style>
