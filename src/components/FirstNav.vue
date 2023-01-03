<template>
	<div class="firstNav" >
		<div class="iconfont icon-sousuo icon">
			
		</div>
		<div class="middle">
			<div class="text">
				推荐
			</div>
			<div class="text">
				同城
			</div>
		</div>
	</div>
</template>

<script>
	export default {
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
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.icon-jiahao_o:before {
  content: "\eb78";
}

.icon-sousuo:before {
  content: "\e651";
}

.icon-fanhui:before {
  content: "\e624";
}
.firstNav{
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	height: 35px;
	line-height: 35px;
	margin: 0 auto;
	z-index: 20;
    // background-color: black;
}

.icon{
	position: absolute;
	top: 0;
	left: 0;color: white;
	width: 20%;
	text-align: center;font-size: 20px;
}

.middle{
	text-align: center;
}
.text{
	display: inline;
	color: #FFF;
	margin: 0 10px;
}
</style>
