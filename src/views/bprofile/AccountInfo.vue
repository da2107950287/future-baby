<template>
	<div>
		<NavBar>
			<div slot="center">我的账户</div>
		</NavBar>
		<div class="top">
			<div class="money">¥7892.00</div>
			<div class="withdraw-btn" @click="goUrl('/withdraw')">提现</div>
		</div>
		<div class="info">
			<div class="title">账户信息</div>
			<van-pull-refresh v-model="isLoading" @refresh="onRefresh">
				<van-list v-model="loading" :finished="finished" finished-text="暂无更多数据">
					<div class="item" v-for="item in list" :key="item.tanId">
						<div class="item-info item-title">
							<div class="item-name">{{item.tanTitle}}</div>
							<div class="item-profit"><span v-if="item.tanSort==1">+</span><span v-else>-</span>{{item.tanMoney}}</div>
						</div>
						<div class="item-info">
							<div class="item-info-create">{{item.tanTime | formatTanDate}}</div>
							<div class="balance">余额 {{item.currBalance}}</div>
						</div>
					</div>
				</van-list>
			</van-pull-refresh>
		
		</div>
	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar';
  import { getStore } from 'assets/js/utils.js'

	export default {
		data() {
			return {
				clock: 0,
				PageNumber: 1,//当前页数
				PageSize: 10,//每页显示多少条
				isLoading: false,// 是否处于加载中状态
				loading: false,// 是否处于加载状态
				finished: false,// 是否已加载完成

				list: []
			}
		},
		filters: {
			formatTanDate(val) {
				var dateArr = val.split(" "),
					month = dateArr[0].split("-")[1],
					day = dateArr[0].split("-")[2];
				return `${month}月${day}日 ${dateArr[1].substr(0, dateArr[1].lastIndexOf(":"))}`;
			}
		},
		created() {
      this.getTransaction();
    },
		methods: {
			getTransaction() {
				this.loading = true;
				this.$http('/orderlist/getTransaction', {
					uid: getStore("uid"),
					PageNumber: this.PageNumber,
					PageSize: this.PageSize,
				}).then(res => {
					if (res.code == 200) {
						this.cloak = 1;
						this.loading = false;
						this.list = res.data.transaction;

          
						if (this.PageSize == res.data.transaction.length) {
							window.addEventListener("scroll", this.handleScroll)
						} else {
							this.finished = true;
						}
					}
				})
			},
			//瀑布流加载
			handleScroll() {
				//变量scrollTop是滚动条滚动时，距离顶部的距离
				var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				//变量windowHeight是可视区的高度
				var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
				//变量scrollHeight是滚动条的总高度
				var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
				//滚动到底部条件
				if ((scrollTop + clientHeight) > (scrollHeight - 50)) {
					if (this.clock == 1) {
						this.clock = 2;
						this.PageNumber++;
						this.loading = true
						this.$http('/orderlist/getTransaction', {
							uid: getStore("uid"),
							datatime: this.datatime,
							PageNumber: this.PageNumber,
							PageSize: this.PageSize,
						}).then(res => {
							if (res.code == 200) {
								this.clock = 1;
								this.loading = false;
								
                this.list = [...this.list, ...res.data.transaction];
               
								if (this.PageSize > res.data.transaction.length) {
									this.finished = true;
									window.removeEventListener("scroll", this.handleScroll)
								}
							}
						})
					}
				}
			},
			//下拉刷新
			onRefresh() {
				this.PageNumber = 1;
				this.finished = false;
				this.isLoading = false;
				this.list = [];
				this.getTransaction();
			},

			goUrl(path) {
				this.$router.push(path);
			}
		},
		components: {
			NavBar,
		},

	}
</script>

<style lang="scss" scoped>
	@import '~assets/css/mixin.scss';

	.top {
		width: 100%;
		height: 210px;
		padding-top: 40px;
		// background: red;
	}

	.money {
		width: 100%;
		height: 50px;
		line-height: 50px;
		text-align: center;
		font-size: 24px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #333333;
	}

	.withdraw-btn {
		width: 240px;
		height: 40px;
		margin: 0 auto;
		background: #FC4B4C;
		border-radius: 20px;
		text-align: center;
		line-height: 40px;
		margin-top: 20px;
		color: #FFFFFF;
		font-size: 15px;
	}

	.info {
		width: 100%;
		height: 600px;
		padding: 0 20px;
	}

	.title {
		font-size: 15px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: bold;
		color: #333333;
		margin-bottom: 10px;
	}

	.item {
		width: 100%;
		height: 70px;
		border-bottom: 1px solid #EEEEEE;
		margin-bottom: 10px;
	}

	.item-info {
		width: 100%;
		height: 30px;
		font-size: 15px;
		color: #AAAAAA;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		line-height: 30px;
	}

	.item-title {
		color: #333333;
	}
</style>