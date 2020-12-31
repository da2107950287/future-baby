<template>
	<div>
		<NavBar>
		  <div slot="center">提现</div>
		</NavBar>
		<div class="body">
			<div class="bank">
				<div class="bank-icon"><img src="" alt=""></div>
				<div class="bank-title">中国建设银行（0985）</div>
				<div class="detauk-btn"></div>
			</div>
			<div class="money-title">提现金额</div>
			<div class="money">¥<input type="number"   value="30.00" placeholder=""></div>
			<div class="balance">当前账户余额7920.00元，<span>全部提现</span></div>
			<div class="withdraw-btn">提现</div>
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
	.bank-icon{
		width: 20px;
		height: 20px;
		background: #FC4B4C;
		margin-top: 15px;
		margin-right: 10px;
		overflow: hidden;
	}
	.bank-icon>img{
		width: 100%;
		height: 100%;
	}
	.bank{
		width: 100%;
		height: 50px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		line-height: 50px;
	}
	.bank-title{
		width: 100%;
		height: 100px;
		font-size: 15px;
		font-weight: 400;
		color: #333333;
	}
	.money-title{
		width: 100%;
		height: 30px;
		color: #AAAAAA;
		font-size: 14px;
		line-height: 30px;
	}
	.money{
		width: 100%;
		height: 40px;
		line-height: 40px;
		font-size: 15px;
		color: #333333;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}
	.money>input{
		margin-left: 10px;
		width: 100%;
		height: 40px;
	}
	.balance{
		width: 100%;
		height: 30px;
		color: #AAAAAA;
		font-size: 12px;
		line-height: 30px;
	}
	.balance>span{
		color: #41A1F2;
	}
	.withdraw-btn{
		width: 240px;
		height: 40px;
		background: #AAAAAA;
		border-radius: 20px;
		text-align: center;
		font-size: 15px;
		font-weight: bold;
		color: #FFFFFF;
		line-height: 40px;
		margin: 0 auto;
		margin-top: 20px;
	}
</style>
