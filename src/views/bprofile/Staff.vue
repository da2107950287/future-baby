<template>
	<div>
		<NavBar>
			<div slot="center">员工管理</div>
			<div slot="right" class="navbar-right" @click="$router.push('/invite')">邀请</div>
		</NavBar>

		<div class="item" v-for="item in list" :key="item.staId">
			<div class="item-content">
				<div class="item-head"><img :src="item.headportrait" alt=""></div>
				<div class="item-info">
					<div>
						<div class="item-name">{{item.nickname}}</div>
						<div class="item-card">园区员工</div>
					</div>
					<div>
						<div class="item-phone-icon iconfont icon-dianhua"></div>
						<div class="item-phone-num">{{item.account}}</div>
					</div>
				</div>
			</div>
			<div class="item-btn">
				<div class="btn-disabled" @click="updateState(item.staId,item.state)">
					<span v-if="item.state==1">禁用</span>
					<span v-else-if="item.state==2">正常</span>
				</div>
				<div class="btn-delete" @click="deleteStaff(item.staId)">删除</div>
				<div class="btn-permission" @click="manageRight(item.staId,item.power)">权限</div>
				<div class="btn-exchange"
					@click="$router.push({path:'/transfer_manager',query:{staId:item.staId,power:item.power}})">转移管理员</div>
			</div>
		</div>
		<div v-if="isEmpty==1" style="position: fixed;top: 50%;left: 50%;transform: translate(-50%,-50%);">
			<img src="~assets/img/empty.png" alt="">
		</div>
		<div v-if="isEmpty==2" style="text-align: center;color: #aaa;font-size: 14px;padding: 10px">暂无更多数据</div>
	
		<PopUp :show="show">
			<div slot="title">权限管理</div>
			<div slot="dec">
				<van-radio-group v-model="power" class="radios">
					<van-radio checked-color="#FC4B4C" name="3" class="radio">订单管理员</van-radio>
					<van-radio checked-color="#FC4B4C" name="4" class="radio">会员管理员</van-radio>
				</van-radio-group>
			</div>
			<div class="btns" slot="btn">
				<div class="cancel" @click="show=false">取消</div>
				<div class="confirm" @click="updatePower">确认</div>
			</div>
		</PopUp>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar';
	import PopUp from 'components/page/PopUp';
	import { Dialog } from 'vant'
	export default {
		data() {
			return {
				show: false,
				power: '',
				staId: '',
				isEmpty:false,
				list: [],//列表数据
			}
		},
		created() {
			this.getStaff();
		},
		methods: {
			getStaff() {
				this.$toast.loading({
					duration: 0,
					message: '加载中...',
					forbidClick: true,
				});
				this.$http('/outlets/getStaff', {
					olsId: this.$route.query.olsId
				}).then(res => {
					if (res.code == 200) {
						this.list = res.data;
						this.$toast.clear();
						if(res.data.length==0){
							this.isEmpty=1;
						}else{
							this.isEmpty=2;
						}
					}
				})
			},

			manageRight(staId, power) {
				this.show = true;
				this.power = power;
				this.staId = staId;
			},
			//转移管理员
			transferManager() {

			},
			//修改员工状态
			updateState(staId, state) {
				Dialog.confirm({
					title: '提示',
					message: '确认修改该员工状态',
				}).then(() => {
					state = state ^ 3;
					this.$http('/outlets/updateStaff', {
						staId,
						state
					}).then(res => {
						if (res.code == 200) {
							this.getStaff()
							this.$toast.success(res.msg);
						} else {
							this.$toast.fail(res.msg);
						}
					})
				}).catch(() => {
				});

			},
			//权限管理
			updatePower() {
				this.show = false;
				this.$http('/outlets/updateStaff', {
					staId: this.staId,
					power: this.power
				}).then(res => {
					if (res.code == 200) {
						this.getStaff()
						this.$toast.success(res.msg);
					} else {
						this.$toast.fail(res.msg)
					}
				})
			},
			//删除员工
			deleteStaff(staId) {
				Dialog.confirm({
					title: '提示',
					message: '确认删除该员工？',
				})
					.then(() => {
						console.log("删除该员工")
						this.$http('/outlets/deleteStaff', {
							staId
						}).then(res => {
							if (res.code == 200) {
								this.getStaff()
								this.$toast.success();
							} else {
								this.$toast.fail();
							}
						})
					})
					.catch(() => {
						console.log("取消删除该员工")
					});


			}
		},
		components: {
			NavBar,
			PopUp,
		}
	}
</script>

<style lang="scss" scoped>
	@import '~assets/css/mixin.scss';

	.navbar-right {
		width: 60px;
		height: 30px;
		line-height: 30px;
		background: #FC4B4C;
		border-radius: 15px;
		color: $fc;
	}

	.item {
		padding: 0 20px;
	}

	.item-content {
		width: 100%;
		display: flex;
		justify-content: flex-start;
		margin-top: 20px;
	}

	.item-head {
		width: 40px;
		height: 40px;
		border-radius: 5px;
		overflow: hidden;
	}

	.item-head>img {
		width: 100%;
		height: 100%;
	}

	.item-info {
		@include fj();
		flex-direction: column;
		width: 100%;
		height: 40px;
		margin-left: 10px;

	}

	.item-info>div {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		white-space: nowrap;
	}

	.item-info>div>div {
		margin-right: 10px;
	}

	.item-name {
		color: #333333;
		font-size: 15px;
		font-weight: bold;
	}

	.item-card {
		color: #AAAAAA;
		font-size: 12px;
	}

	.item-phone-icon {

		color: #aaa;
		font-size: 13px;
	}

	.item-phone-icon>img {
		width: 100%;
		height: 100%;
	}

	.item-phone-num {
		color: #41A1F2;
		font-size: 13px;
	}

	.item-btn {
		width: 100%;
		height: 30px;
		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		margin-top: 10px;
	}

	.item-btn>div {
		margin-left: 10px;
		padding: 5px 12px;
		border-radius: 15px;
		font-size: 14px;
	}

	.btn-disabled {
		background: #EDEDED;
		color: #333333;
	}

	.btn-delete {
		background: #FFE7E7;
		color: #FC4B4C;
	}

	.btn-permission {
		background: #FFF4E7;
		color: #FF9445;
	}

	.btn-exchange {
		background: #E1EDFF;
		color: #4B91FC;
	}

	.radios {
		@include fj();
		flex-direction: column;
		align-items: center;
	}

	.radio {
		margin-top: 10px;
	}

	.btns {
		@include fj();
		margin-top: 40px;

		>div {
			width: 45%;
			@include sc(15px, $fc);
			border-radius: 4px;
			line-height: 34px;
		}

		.cancel {
			background: #aaa;
		}

		.confirm {
			background: #FC4B4C;
		}
	}
</style>