<template>
	<div class="c-order">
		<NavBar>
			<div slot="center">会员详情</div>
		</NavBar>
		<div class="order-detail">
			<div class="order">
				<div class="member-number">会员编号：{{info.mebId}}</div>
				<div class="join-time">加入时间：{{info.joinTime | formatTime1}}</div>
				<div class="vip-status">
					<span v-if="info.state==1">意向会员</span>
					<span v-else-if="info.state==2">VIP会员</span>
					<span v-else-if="info.state==3">过期会员</span><span class="vip-title">会员状态</span>：<span class="tag-vip">
					</span v-if="info.state!=1">{{info.endTime | formatTime}} 止
				</div>
				<div class="info"><span>昵称</span>{{info.nickname}}</div>
				<!-- <div class="info"><span>宝宝名</span>小七</div> -->
				<div class="info"><span>手机</span>{{info.account}}</div>
				<div class="info ramark"><span>备注</span></div>
				<div class="remark-content"><textarea v-model="info.remarks" name="" id="" cols="30" rows="10"
						placeholder="请输入相关备注信息"></textarea></div>
			</div>
			<div class="btns">
				<div @click="submit">确认</div>
				<div @click="$router.go(-1)">返回上一页</div>
			</div>
			<div class="order-info-title">账户信息</div>
			<div class="order-info">
				<div class="order-item-title">
					<div>序号</div>
					<div>订单编号</div>
					<div>金额</div>
					<div>时间</div>
					<div>状态</div>
				</div>
				<div v-if="info.orderlist.length==0" style="text-align: center;color: #aaa;font-size: 12px;padding: 10px">暂无数据</div>
				<div v-else class="order-item" v-for="item in info.orderlist" :key="item.olId">
					<div>1</div>
					<div>{{item.olId}}</div>
					<div>¥{{item.orderPrice}}</div>
					<div>{{item.orderTime | formatTime}}</div>
					<div>
						<span v-if="item.status==1">进行中</span>
						<span v-else-if="item.status==2">即将过期</span>
						<span v-else-if="item.status==3">即将失效</span>
					</div>
				</div>
				
			</div>
		</div>
	</div>
	</div>
	</div>
</template>
<script>
	import NavBar from 'components/common/navbar/NavBar';
	import OrderInfo from 'components/page/OrderInfo'

	export default {
		data() {
			return {
				show: false,
				info: {},
			}
		},
		filters: {
			formatTime(val) {
				return val.split(' ')[0].split('-').join('.')
			},
			formatTime1(val) {
				return val.split(' ')[0].split('-').join('.') + ' ' + val.split(' ')[1]
			}
		},
		created() {
			this.showMember();
		},
		methods: {
			showMember() {
				this.$http('/orderlist/showMember', {
					mebId: this.$route.query.mebId
				}).then(res => {
					if (res.code == 200) {
						this.info = res.data;
					}
				})
			},
			submit() {
				if (this.info.remarks != '') {
					this.$http('/orderlist/updateMember', {
						mebId: this.info.mebId,
						remarks: this.info.remarks
					}).then(res => {
						if (res.code == 200) {
							this.$toast.success(res.msg)
						}
					})
				}

			}

		},
		components: {
			NavBar,
			OrderInfo
		}
	}
</script>
<style lang="scss" scoped>
	@import '~assets/css/mixin.scss';

	.c-order {
		@include wh(100%, 100%);


	}

	.member-number {
		width: 100%;
		height: 30px;
		font-size: 12px;
		color: #AAAAAA;
		line-height: 30px;
	}

	.join-time {
		width: 100%;
		height: 30px;
		font-size: 12px;
		color: #333333;
	}

	.vip-status {
		width: 100%;
		height: 30px;
		font-size: 12px;
		color: #333333;
	}

	.tag-vip {
		color: #DAB471;
		margin-right: 10px;
	}

	.info {
		width: 100%;
		height: 100%;
		border-bottom: 1px solid #EEEEEE;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		line-height: 50px;
		font-size: 15px;
		color: #333333;
	}

	.info>span {
		display: block;
		width: 50px;
		font-size: 15px;
		color: #AAAAAA;
		margin-right: 10px;
	}

	.ramark {
		border: none;
	}

	.remark-content {

		border-radius: 5px;
		font-size: 14px;
		color: #AAAAAA;
		// line-height: 28px;
	}

	.remark-content>textarea {
		padding: 10px;
		width: 100%;
		height: 100px;
		background: #F2F2F2;
		resize: none
	}

	.order-item-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.order-item-title>div {
		width: 18%;
		font-size: 12px;
		color: #AAAAAA;
		margin-right: 5px;
		text-align: center;
		line-height: 24px;
	}

	.order-item {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		font-size: 12px;
		color: #333333;
		padding: 10px 0;
		border-bottom: 1px solid #EEEEEE;
	}

	.order-item>div {
		width: 18%;
		margin-right: 10px;
		overflow: hidden;
		text-align: center;
		line-height: 24px;
	}

	.order-detail {
		height: calc(100% - 44px);
		padding: 1rem;
		overflow-y: scroll;
		background: #F7F7F7;

		.order {

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

			.center {
				@include fj(flex-start);
				align-items: center;
				margin-top: 1rem;

				img {
					@include wh(4rem, 2.25rem);
					margin-right: .5rem;

				}

				>div {
					@include sc(.7rem, #333);
					@include fj();
					flex-direction: column;

				}
			}

			.prices {
				/* @include fj(flex-end);
        align-items: center; */
				margin-top: 1rem;

				.common {

					@include fj();
					margin-top: .5rem;
					align-items: center;
					color: #333;

					font-family: PingFangSC-Regular, PingFang SC;
					letter-spacing: 0;

					>div {
						@include fj(flex-start);
					}

					.font6 {
						font-size: .6rem;

					}

					.font4 {
						font-size: .6rem;

						-webkit-transform: scale(.67);
						*font-size: 10px;
					}


				}




			}
		}

		.order-tag-new {
			color: #FC4B4C;
		}

		.order-tag-outdate {
			color: #FEA740;
		}

		.order-tag-expire {
			color: #AAAAAA;
			;
		}

		.order-item-info {
			width: 100%;
			height: 100%;
			padding: 0;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
		}

		.top-info-head {
			width: 40px;
			height: 30px;
			border-radius: 50%;
			overflow: hidden;
			margin-top: 5px;
		}

		.top-info-head>img {
			width: 100%;
			height: 100%;
		}

		.top-info-intro {
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

		.order-status {
			width: 60px;
			height: 100%;
			font-size: 12px;
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
			width: 100%;
			height: 100%;
			font-size: 14px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: bold;
			color: #333333;
			line-height: 24px;
		}

		.item-card-content>div {
			font-weight: bold;
		}

		.order-info-title {
			width: 100%;
			height: 20px;
			font-size: 14px;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: bold;
			color: #333333;
			line-height: 20px;
			margin-bottom: 15px;
			
		}
		.order-info{
			background-color: #fff;
			border-radius: 5px;
			padding: 5px 0;
		}

		.order-info-item {
			width: 100%;
			height: 28px;
			display: flex;
			flex-direction: row;
			justify-content: flex-start;
		}

		.order-info-item>div {
			font-size: 12px;
			font-weight: 400;
			color: #333333;
		}

		.order-info-item-title {
			font-size: 12px;
			font-weight: 400;
			color: #333333;
			margin-right: 10px;
		}

		.btns {
			@include fj(space-around);
			margin: 1rem 0;

			>div {
				@include wh(6rem, 2rem);
				line-height: 2rem;
				text-align: center;
				margin-left: .5rem;
				border-radius: 1.1rem;
				font-size: 0.75rem;
				font-family: PingFangSC-Semibold, PingFang SC;
				font-weight: 500;
			}

			div:first-child {
				color: $fc;
				background: #FC4B4C;

				box-shadow: 0rem 0.1rem 0.2rem 0rem #E65354;
			}

			div:last-child {
				color: #FC4B4C;
				background: $fc;
				box-shadow: 0rem 0.1rem 0.2rem 0rem #e6e6e6;
			}
		}


	}

	.wrapper {
		@include fj(center);
		align-items: center;
		height: 100%;


		.block {
			position: relative;
			width: 12.5rem;
			padding: 1rem;

			border-radius: 1rem;
			background: $fc;

			img {
				position: absolute;
				top: 0;
				left: 50%;
				transform: translate(-50%, -50%);

				width: 3rem;
				height: 3rem;
				border-radius: 50%;
				background: #000;
				border: 0.1rem solid #FFFFFF;
			}

			.title {
				text-align: center;
				font-size: 0.8rem;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 1.1rem;
				margin-top: 2.7rem;
			}

			.dec {
				margin-top: .75rem;
				font-size: 0.7rem;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #AAAAAA;
				line-height: 1.1rem;
			}





		}
	}
</style>