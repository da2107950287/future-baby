<template>
	<div class="order">
		<div class="order-item">
			<div class="order-item-title">
				<div class="order-num">订单编号：{{item.olId}}</div>
				<div class="order-tag-new">
					<span v-if="item.status==1">进行中</span>
					<span v-else-if="item.status==2">即将过期</span>
					<span v-else-if="item.status==3">即将失效</span>
					<span v-else-if="item.status==4">未付款</span>
				</div>
			</div>
			<div class="order-item-info">
				<div class="top-info-head">
					<img :src="item.headportrait" alt="">
				</div>
				<div class="top-info-intro">
					<div class="top-info-intro-content">
						昵称：{{item.nickname}} {{item.account}}
					</div>
					<!-- <div class="top-info-intro-content">
						宝宝名：小七
					</div> -->
				</div>
			</div>
			<div class="item-card" @click="$router.push({path:'/borderDetail',query:{olId:item.olId}})">
				<div class="item-card-img">
					<!-- <img src="../../assets/img/icon_ka.png" alt=""> -->
					<div class="img">
						<div class="card-name">{{item.commodity.comName}}</div>
						<div class="course-name">{{item.commodity.courseName}}</div>
						<div class="course-english-name">{{item.commodity.courseEnglishName}}</div>
					</div>
				</div>
				<div class="item-card-content">
					<div>{{item.commodity.courseName}}</div>
					<div>{{item.commodity.comName}}</div>
				</div>
			</div>
			<div class="price">
				<span>总价 <i>¥</i>{{item.orderPrice | formatPrice}}</span><span>抵扣 <i>¥</i>{{item.dtnPrice |
					formatPrice}}</span><span class="fact">实付额 <i>¥</i>{{item.orderPrice | formatPrice}}</span>
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
			formatPrice(val) {
				return val.toFixed(2)
			}
		},
		methods: {

		}
	}
</script>
<style lang="scss" scoped>
	@import '~assets/css/mixin.scss';

	.order {
		padding: 0 1rem;
		background: #F7F7F7;
		color: #333;



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

	.order-num {}

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
		margin-top: 15px;
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

	.item-card {
		width: 100%;
		/* height: 45px; */
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.item-card-img {
		width: 80px;
		height: 100%;
		margin-right: 10px;

		.img {
			@include wh(4rem, 2.25rem);
			@include fj(flex-start);

			align-items: center;

			flex-direction: column;
			margin-right: .5rem;

			background: linear-gradient(225deg, #F2D197 0%, #DAB074 100%);
			border-radius: 0.2rem;



			>div {
				color: $fc;
				/* text-align: center; */
			}

			.card-name {
				font-size: .6rem;
			}

			.course-name {
				width: 120%;
				font-size: .6rem;
				-webkit-transform: scale(0.60);

			}

			.course-english-name {
				margin-top: -10px;
				font-size: .6rem;
				width: 200%;
				-webkit-transform: scale(0.40);
			}

		}

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

	.price {
		width: 100%;
		height: 20px;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		margin-top: 20px;
	}

	.price>span {
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #AAAAAA;
		line-height: 17px;
		margin-left: 10px;
	}

	.fact {
		color: #333333 !important;
	}
</style>