<template>
	<div class="listright">
		<div class="author-img">
			<img class="img" src="../../public/images/1.jpeg" mode="show" />
			<div class="iconfont icon-jiahao_o add " v-show="show"  @click="hide">
				
			</div>
		</div>
		<div class=" iconfont icon-aixin right-box" :style="{color:color}" @click="changeColor"></div>
       <div class="number">123</div>
		<div class=" iconfont icon-pinglun right-box " ></div>
		<div class="number">123</div>
		<div class=" iconfont icon-fenxiang right-box "  >
		</div>
		<div class="number">123</div>
		<div class="around">
			<img class="img" src="../../public/images/2.png" alt="" />
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
           show:true,
		   color:''
			}
		},
		methods: {
          hide(){
			 this.show=false 
		  },
		  changeColor(){
			  this.color=this.color==''?'red':''
		  },
		  change(){
			 this.color='red'
		  },
		}
	}
</script>

<style lang="less" scoped>
	.listright {
		width: 50px;
		margin: 0 auto;
	}
    .author-img{
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
	.number{
		font-size: 10px;
		text-align: center;
		color: #FFF;
	}

	.img {
		height: 45px;
		width: 45px;
		border-radius: 50%;
	}
	
	.add{
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
	 	0%{
	 		transform: rotate(0deg);
	 	}
	 	100%{
	 		transform: rotate(360deg);
	 	}
	 }
	
	@font-face {
	  font-family: "iconfont"; /* Project id 3794773 */
	  src: url('//at.alicdn.com/t/c/font_3794773_bf2k3xykprw.woff2?t=1669547796791') format('woff2'),
	       url('//at.alicdn.com/t/c/font_3794773_bf2k3xykprw.woff?t=1669547796791') format('woff'),
	       url('//at.alicdn.com/t/c/font_3794773_bf2k3xykprw.ttf?t=1669547796791') format('truetype');
	}
	
	.iconfont {
	  font-family: "iconfont" !important;
	  font-style: normal;
	  -webkit-font-smoothing: antialiased;
	  -moz-osx-font-smoothing: grayscale;
	}
	

	
	.icon-fenxiang:before {
	  content: "\e739";
	}
	
	.icon-pinglun:before {
	  content: "\e891";
	}
	
	.icon-aixin:before {
	  content: "\e8c3";
	}
	.icon-jiahao_o:before {
	  content: "\eb78";
	}
	
</style>
