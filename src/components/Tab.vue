<template>
	<div  class="tab">
		<div class="tab-box">
			首页
		</div>
		<div class="tab-box" @click="goLikes" >
			关注
		</div>
		<div class="tab-box">
			<div class="iconfont icon-jiahao_o icon-box  ">
			</div>
		</div>
		
		<div class="tab-box" @click="clean" >
			消息
		</div>
		<div class="tab-box">
			我的
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			goLikes(){
				localStorage.removeItem('videoList')
				this.$router.push('/likes')
			},
			clean(){
				localStorage.removeItem('indexList')
			}
		}
	}
</script>

<style lang="less" scoped >
 .tab{
	 position: fixed;
	 left: 0;
	 bottom: 0;
	 height: 50px;
	 width: 100%;
	 z-index: 20;
    //  background: #000;
 
 }
 .tab-box{
	 float: left;
	 width: 20%;
	 height: 50px;
	 color: #FFFFFF;
	 text-align: center;
	 line-height: 50px;
	 
 }
@font-face {
  font-family: "iconfont"; /* Project id 3794773 */
  src: url('//at.alicdn.com/t/c/font_3794773_10j2kpke8b8e.woff2?t=1669533298738') format('woff2'),
       url('//at.alicdn.com/t/c/font_3794773_10j2kpke8b8e.woff?t=1669533298738') format('woff'),
       url('//at.alicdn.com/t/c/font_3794773_10j2kpke8b8e.ttf?t=1669533298738') format('truetype');
}

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


 
 .icon-box{
	 width: 70%;
	 height: 35px;
	 background-color: #FFFFFF;
	 color: #000;
	 margin: 7.5px 15%;
	 line-height: 35px;
	 border-radius: 10px;
	 font-size: 20px;
 }
 
</style>
