<template>
	<div class="c-profile" style="background: #F7F7F7;">
		<div class="top">
			<div class="log-tab">
				<img :src="logo" alt="">
			</div>
			<div class="top-info">
				<div class="top-info-head">
					<img :src="info.image" alt="">
				</div>
				<div class="top-info-intro">
					<div class="top-info-intro-content">{{info.olsName}}</div>
					<div class="top-info-intro-status" @click="show=true">
						<div class="status-show">
							<span v-if="info.state==1">开园中</span>
							<span v-else-if="info.state==2">筹备中</span>

						</div>
						<div class="status-button"><img src="~assets/img/bprofile/btn_enter_b.png" alt=""></div>
					</div>
				</div>
				<div class="top-info-go-detail" @click="$router.push('/network')">
					<img src="~assets/img/bprofile/btn_enter_b.png" alt="">
				</div>
			</div>
		</div>
		<div class="function-tab">
			<div class="account">
				<!-- <div @click="goUrl('/account_info')">
					<div><img src="~assets/img/bprofile/icon_cash_b.png" alt=""></div>
					<div class="account-title">账户余额</div>
					<div class="pointer"><i class="right"></i></div>
				</div> -->
				<!-- <div @click="$router.push({path:'voucher',query:{olsId:info.olsId}})"> -->
				<div @click="$router.push({path:'/voucher_list',query:{olsId:info.olsId}})">
					<div><img src="~assets/img/bprofile/icon_quan_b.png" alt=""></div>
					<div class="account-title">抵扣券</div>
					<div class="pointer"><i class="right"></i></div>
				</div>
			</div>
			<div v-if="role==2 || role==3" class="list">
				<div class="list-title">
					<div class="list-title-name">订单管理</div>
					<div class="all" @click="$router.push({path:'/border',query:{olsId:info.olsId,activeName:'0'}})">
						<div class="icon-all">全部</div>
						<div class="pointer"><i class="right"></i></div>
					</div>
				</div>
				<div class="list-content">
					<div @click="$router.push({path:'/border',query:{olsId:info.olsId,activeName:'4'}})">
						<div class="icon"><img src="~assets/img/bprofile/icon_wwc.png" alt=""></div>
						<div>未付款</div>
					</div>
					<div @click="$router.push({path:'/border',query:{olsId:info.olsId,activeName:'1'}})">
						<div class="icon"><img src="~assets/img/bprofile/icon_ing.png" alt=""></div>
						<div>进行中</div>
					</div>
				
					<div @click="$router.push({path:'/border',query:{olsId:info.olsId,activeName:'2'}})">
						<div class="icon"><img src="~assets/img/bprofile/icon_outdate.png" alt=""></div>
						<div>即将过期</div>
					</div>
					<div @click="$router.push({path:'/border',query:{olsId:info.olsId,activeName:'3'}})">
						<div class="icon"><img src="~assets/img/bprofile/icon_gq.png" alt=""></div>
						<div>已过期</div>
					</div>
				</div>
			</div>
			<div v-if="role==2 || role==4"  class="list">
				<div class="list-title">
					<div class="list-title-name">会员管理</div>
					<div class="all" @click="$router.push({path:'/member',query:{olsId:info.olsId,activeName:'0'}})">
						<div class="icon-all">全部</div>
						<div class="pointer"><i class="right"></i></div>
					</div>
				</div>
				<div class="list-content">
					<div @click="$router.push({path:'/member',query:{olsId:info.olsId,activeName:'2'}})">
						<div class="icon"><img src="~assets/img/bprofile/icon_youx_vip.png" alt=""></div>
						<div>有效会员</div>
					</div>
					<div @click="$router.push({path:'/member',query:{olsId:info.olsId,activeName:'1'}})">
						<div class="icon"><img src="~assets/img/bprofile/icon_yx.png" alt=""></div>
						<div>意向会员</div>
					</div>
					<div @click="$router.push({path:'/member',query:{olsId:info.olsId,activeName:'3'}})">
						<div class="icon"><img src="~assets/img/bprofile/icon_gq_vip.png" alt=""></div>
						<div>过期会员</div>
					</div>
				</div>
			</div>
			<div class="list" >
				<div class="list-title">
					<div class="list-title-name">网点管理</div>
				
				</div>
				<div class="list-content">
					<div @click="goUrl('/bussiness')">
						<div class="icon"><img src="~assets/img/bprofile/icon_sh.png" alt=""></div>
						<div>商户信息</div>
					</div>
					<div v-if="role==2" @click="$router.push({path:'/staff',query:{olsId:info.olsId}})">
						<div class="icon"><img src="~assets/img/bprofile/icon_yg.png" alt=""></div>
						<div>员工管理</div>
					</div>
					<div @click="goUrl('/teach_plan')">
						<div class="icon"><img src="~assets/img/bprofile/icon_ja.png" alt=""></div>
						<div>教案管理</div>
					</div>
				</div>
			</div>
		
		</div>
		<div style="padding: .5rem 4rem 1rem;">
			<van-button plain round block type="danger" @click="exchange">切换到个人版</van-button>
		</div>
		<MainTabBar></MainTabBar>
		<van-overlay :show="show" @click="show=false">
			<div class="wrapper">
				<div class="block">
					<img src="~assets/img/popup.png" alt="">
					<div class="title">联系总部客服</div>
					<div class="tel">电话：{{mobile}}</div>
					<div class="confirm-btn">确定</div>
					<div class="cancle-btn">取消</div>
				</div>
			</div>
		</van-overlay>
	</div>
	</div>
</template>
<script>
	import MainTabBar from "components/page/mainTabbar/MainTabBar.vue"
	import { setStore,getStore } from "assets/js/utils.js"

	export default {
		data() {
			return {
				show: false,
				mobile: "",
				logo: "",
				info: {},
				role:getStore('role')
			}
		},
		created() {
			this.getConfig();
			this.getOutletsInfo()
		},
		methods: {
			exchange() {
				setStore('link', '/cprofile')
				this.$router.push('/cprofile')
			},
			getConfig() {
				this.$http('/other/showConfig').then(res => {
					if (res.code == 200) {
						this.mobile = res.data.mobile;
						this.logo = res.data.logo;
					}
				})
			},
			getOutletsInfo() {
				this.$http('/outlets/showOutletsInfo').then(res => {
					if (res.code == 200) {
						this.info = res.data;
						setStore("olsId", this.info.olsId)
						setStore('image',this.info.image)
					} else if (res.code == 500) {
						this.$toast.success(res.msg)
					}
				})
			},
			goUrl(path) {
				this.$router.push(path);
			}
		},
		components: {
			MainTabBar
		}
	}
</script>
<style lang="scss" scoped>
	@import '~assets/css/mixin.scss';

	div {
		font-size: 12px;
	}

	.pointer {
		padding-top: 5px;
		margin-left: 5px;
	}

	.all {
		display: flex;
	}

	.icon-all {
		text-align: right;
		width: 40px;
		font-size: 12px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #AAAAAA;
		line-height: 17px;
	}

	.top {
		width: 100%;
		height: 11.0625rem;
		background: #F24142;
	}

	.log-tab {
		width: 100%;
		height: 2.75rem;
		text-align: center;
		line-height: 2.75rem;
	}

	.log-tab>img {
		padding-top: 0.75rem;
	}

	.top-info {
		display: flex;
		flex-direction: row;

		width: 100%;
		height: 100%;
		padding-top: 1.4375rem;
	}

	.top-info-head {
		width: 55px;
		height: 55px;
		border-radius: 6px;
		overflow: hidden;
		margin-left: 5%;
	}

	.top-info-head>img {
		width: 100%;
		height: 100%;
	}

	.top-info-intro {
		height: 60px;
		margin-left: 10px;
		margin-right: 10px;
	}

	.top-info-intro-content {
		width: 100%;
		height: 40px;
		font-size: 14px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 20px;
	}

	.top-info-intro-status {
		width: 100%;
		height: 20px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}

	.status-show {
		width: 60px;
		height: 20px;
		background: #36DD93;
		border: none;
		border-radius: 2px;
		font-size: 10px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 20px;
		text-align: center;
	}

	.top-info-go-detail {
		width: 10%;
		height: 60px;
		text-align: center;
		line-height: 60px;
		margin-right: 4px;
	}

	.function-tab {
		width: 90%;
		background: #F7F7F7;
		margin: 0 auto;
		margin-top: -30px;
		border-radius: 10px;
	}

	.function-tab>div {
		width: 100%;
		border-radius: 10px;
		background: #FFFFFF;
		padding: 0 20px;
	}

	.account {
		width: 100%;
		/* height: 110px; */
	}

	.account>div {
		height: 55px;
		border-bottom: 2px solid #EEEEEE;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		padding-top: 15px;
		font-size: 15px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 21px;
		text-align: left;
	}

	.account>div:last-child {
		border: none;
	}

	.account-title {
		width: 100%;
		margin-left: 10px;
	}

	i {
		border: solid #AAAAAA;
		border-width: 0 1px 1px 0;
		display: inline-block;
		padding: 3px;
	}

	.right {
		transform: rotate(-45deg);
		-webkit-transform: rotate(-45deg);
	}

	.list {
		width: 100%;
		height: 134px;
		background: #FFFFFF;
		box-shadow: 0px 2px 4px 0px rgba(230, 230, 230, 0.4);
		border-radius: 10px;
		margin-top: 10px;
	}

	.list-title {
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		height: 50px;
		padding-top: 15px;
	}

	.list-title-name {
		width: 100%;
		font-size: 15px;
		color: #333333;
		font-weight: bold;
	}

	.list-content {
		width: 100%;
		height: 60px;
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
	}

	.list-content>div {
		width: 25%;
		height: 100%;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.icon {

		display: flex;
		justify-content: center;
		align-items: center;
		width: 34px;
		height: 34px;

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
			
				border: 0.1rem solid #FFFFFF;
			}

			.title {
				text-align: center;
				font-size: 0.8rem;
				font-family: PingFangSC-Medium, PingFang SC;
				font-weight: bold;
				color: #333333;
				line-height: 1.1rem;
				margin-top: 1.25rem;
			}

			.tel {
				margin-top: .75rem;
				font-size: 0.7rem;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: #AAAAAA;
				line-height: 1.1rem;
				text-align: center;
				margin-bottom: 10px;
			}

			.confirm-btn {
				width: 100%;
				height: 40px;
				background: #FC4B4C;
				border-radius: 4px;
				font-size: 15px;
				font-weight: bold;
				color: #FFFFFF;
				line-height: 40px;
				text-align: center;
			}

			.cancle-btn {
				width: 100%;
				height: 40px;
				border-radius: 4px;
				font-size: 15px;
				font-weight: 400;
				color: #333333;
				line-height: 40px;
				text-align: center;
			}
		}
	}
</style>