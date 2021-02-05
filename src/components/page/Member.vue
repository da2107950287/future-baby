<template>
	<div class="order">

		<div class="order-item">
			<div class="order-item-title">
				<div class="order-num">会员编号：{{item.mebId}}</div>
				<div class="order-tag-new">
					<span v-if="item.state==1">意向会员</span>
					<span v-else-if="item.state==2">VIP会员</span>
					<span v-else-if="item.state==3">过期会员</span>
				</div>
			</div>
			<div class="order-item-info" @click="$router.push({path:'/member_detail',query:{mebId:item.mebId}})">
				<div class="top-info-head">
					<img :src="item.headportrait" alt="">
				</div>
				<div class="top-info-intro">
					<div class="top-info-intro-content">
						昵称：{{item.nickname}}
					</div>
					<!-- <div class="top-info-intro-content gray">
						宝宝名：小七
					</div> -->
					<div class="top-info-intro-content gray">
						手机号：{{item.account}}
					</div>
				</div>
			</div>
			<div class="item-card">
				<div class="item-card-content" v-if="item.state!=1">
					<div>加入时间：{{item.joinTime | formatTime}}</div>
					<div>订单数/报名课程数：{{item.number}}</div>
				</div>
				<div  v-else-if="item.state==1" class="item-card-content">加入时间：无</div>
				<div class="item-edit" @click="call(item.account)">电话联系</div>

			</div>
		</div>

	</div>
	</div>
</template>
<script>
	export default {
		props: {
			item: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		filters: {
			formatTime(val) {
				return val.split(' ')[0];
			}
		},
		methods:{
			call(mobile){
				window.location.href=`tel://${mobile}`;
			}
		}
	
	}
</script>
<style lang="scss" scoped>
	@import '~assets/css/mixin.scss';

	.order {
		padding: 0 1rem;
		background: #F7F7F7;



		.order-item {


			@incldue wh(16.75rem, 9.1rem);
			margin-bottom: .5rem;
			padding: 1rem;
			background: $fc;
			box-shadow: 0rem 0.1rem 0.2rem 0rem rgba(230, 230, 230, 0.4);
			border-radius: 0.5rem;
			font-family: PingFangSC-Regular, PingFang SC;

			.top {
				@include fj();
				align-items: center;
				font-size: .6rem;


				.top-left {
					@include fj();
					align-items: center;

					img {
						@include wh(1.5rem, 1.5rem);
						background: #000;
						border-radius: 0.2rem;
						margin-right: .5rem;
					}

					.name {
						color: #333;
					}
				}

				.top-right {
					color: #FC4B4C;
				}

				.expire {
					color: #FCA64B;
				}
			}
		}
	}

	.order {
		padding: 0 1rem;
		background: #F7F7F7;
	}

	.order-item {
		padding: 20px;
	}

	.order-item-title {
		width: 100%;
		height: 18px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 12px;
		font-weight: 400;
		color: #333333;
		line-height: 17px;
	}

	.order-num {
		color: #aaa;
	}

	.order-tag-new {
		color: #DAB471;
	}

	.order-tag-outdate {
		color: #41A1F2;
	}

	.order-tag-expire {
		color: #AAAAAA;
		;
	}

	.order-item-info {
		width: 100%;
		height: 75px;
		padding: 0;
		margin-top: 15px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.top-info-head {
		width: 44px;
		height: 60px;

		overflow: hidden;
		margin-top: 10px;
	}

	.top-info-head>img {
		width: 100%;
		height: 35px;
		border-radius: 50%;
	}

	.top-info-intro {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		width: 100%;
		height: 60px;
		margin-left: 10px;
		margin-right: 10px;
	}

	.top-info-intro-content {
		width: 100%;
		height: 22px;
		font-size: 14px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		line-height: 22px;
	}

	.gray {
		font-size: 12px;
		color: #AAAAAA;
		line-height: 17px;
	}

	.item-card {
		width: 100%;
		height: 45px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.item-card-img {
		width: 80px;
		height: 100%;
		margin-right: 10px;
	}

	.item-card-img>img {
		width: 100%;
		height: 100%;
	}

	.item-card-content {

		height: 100%;
		font-size: 12px;
		color: #333333;
		line-height: 24px;
	}



	.item-edit {
		width: 80px;
		height: 30px;
		display: inline-block;
		border-radius: 14px;
		border: 1px solid #FC4B4C;
		color: #FC4B4C;
		font-size: 14px;
		text-align: center;
		line-height: 30px;
		margin-top: 11px;
	}
</style>