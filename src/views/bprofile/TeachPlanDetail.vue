<template>
	<div >
		<NavBar>
		  <div slot="center">教案中心</div>
		</NavBar>
		<div class="body">
			<div class="title">玩具国系列课程：把玩具送回家</div>
			<div class="date">2020.11.20 14:52</div>
			<div class="content">现在很多宝贝都很幸福 生活中有许多的玩具 各式各样的汽车飞机 形态各异的娃娃 柔软可爱的动物们 还有百变益智的积木 哪些是宝贝们的最爱呢？</div>
			<div class="btn">
				<div class="like">
					<div class="btn-img"><img src="~assets/img/home/wlbb.png" alt=""></div>
					<div>点赞</div>
				</div>
				<div class="share">
					<div class="btn-img"><img src="~assets/img/home/wlbb.png" alt=""></div>
					<div>分享</div>
				</div>
				<div class="back">
					<div class="btn-img"><img src="~assets/img/home/wlbb.png" alt=""></div>
					<div>返回首页</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar';
	export default{
		data() {
		  return {
		
		  }
		},
		components: {
		  NavBar,
		
		},
		methods:{
			goUrl(path){
				this.$router.push(path);
			}
		}
	}
</script>

<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';
	.body{
		padding: 0 20px;
	}
	.title{
		width: 100%;
		margin-top: 20px;
		font-size: 16px;
		color: #333333;
		font-weight: bold;
		line-height: 20px;
	}
	.date{
		font-size: 12px;
		color: #AAAAAA;
		line-height: 12px;
		margin-top: 10px;
	}
	.content{
		margin-top: 20px;	
	}
	.btn{
		width: 100%;
		height: 44px;
		background: #FFFFFF;
		// box-shadow: 0px -2px 4px 0px #EDEDED;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
	}
	.btn>div{
		margin-left: 10px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		line-height: 44px;
		font-size: 13px;
		font-weight: 400;
		color: #AAAAAA;
	}
	.btn>div>div{
		margin-right: 4px;
	}
	.btn-img{
		width: 18px;
		height: 18px;
		background-color: red;
		margin-top: 13px;
	}
	.btn-img>img{
		width: 100%;
		height: 100%;
	}
</style>
