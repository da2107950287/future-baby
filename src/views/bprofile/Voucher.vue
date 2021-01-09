<template>
	<div>
		<NavBar>
			<div slot="center">创建抵用券</div>
		</NavBar>
		<div class="body">
			<div class="info">
				<div class="title">月度课程名称：{{courseName}}</div>
				<div class="money">抵用券金额 <input v-model="price" placeholder="请输入金额" @blur="VerifyCellPrice"></div>
				<div class="err-msg">{{priceErrMsg}}</div>
				<div class="money">选择时间<input v-model="endTime" @click="" readonly placeholder=""
						@change="VerifyCellEndTime"><span class="iconfont icon-fanhui2 icon" @click="isShowCalendar"></span>
				</div>
				<div class="err-msg">{{endTimeErrMsg}}</div>
				<van-calendar :minDate="new Date(1970,0,1)" :maxDate="new Date(2099,11,31)" v-model="showCalendar"
					@confirm="onConfirm" />
				<div class="create-btn" @click="insertDeduction">生成抵用券</div>
			</div>
			<div class="info">
				<div class="title">生成链接</div>
				<div class="url">{{link}}</div>
				<div class="copy-btn" :data-clipboard-text="link" @click="copy">复制链接并分享</div>
			</div>
		</div>
		<van-overlay :show="isShow" @click="isShow = false">
			<div class="wrapper" @click.stop>
				<div class="share">
					<img class="arrow" src="~assets/img/arrow.png" alt="">
					<img class="text" src="~assets/img/share.png" alt="">
				</div>
			</div>
		</van-overlay>

	</div>
</template>
<script>
	import NavBar from 'components/common/navbar/NavBar';
	import Clipboard from "clipboard";
	import { isPhone, formatDate, getStore } from "assets/js/utils.js";
	import { wxShare } from "assets/js/wx.js";

	export default {
		data() {
			return {
				isShow: false,
				dtnId: '',//优惠券ID
				link: '',//链接
				price: '',//金额
				endTime: '',//时间
				courseName: '',//课程名称
				priceErrMsg: '', //金额错误提示
				endTimeErrMsg: '',//时间错误提示
				showCalendar: false,//是否显示日历
				url: '',
				config: {},
			}
		},
		created() {
			this.showCommodity()
			this.getAppConfig()
		},
		methods: {
			isShowCalendar() {
				let valid = true;
				if (!valid) {
					return false;
				}
				valid = false;
				setTimeout(() => {
					this.showCalendar = true;
					valid = true;
				}, 500)
			},
			getAppConfig() {

				this.$http('/userinfo/getConfig', {
					url: window.location.href.split("#")[0]
				}).then(res => {
					if (res.code == 200) {
						this.config = res.data;

					}
				})
			},
			showCommodity() {
				this.$http('/outlets/showCommodity', {
					olsId: this.$route.query.olsId,
				}).then(res => {
					if (res.code == 200) {
						this.courseName = res.data.courseName
					}
				})
			},
			//复制链接
			copy() {
				let clipboard = new Clipboard('.copy-btn');
				clipboard.on("success", e => {
					this.isShow = true;
					this.url = e.text;

					let obj = {
						title: this.courseName, // 分享标题
						desc: '点击领取抵用券',
						link: this.link, // 分享链接
						imgurls: getStore('image')
					}
					wxShare(this.config, obj, (msg) => {
						console.log(msg)
					})
					clipboard.destroy();
				})
			},
			//生成优惠券
			insertDeduction() {
				if (!this.VerifyCellPrice()) return false;
				if (!this.VerifyCellEndTime()) return false;
				this.$http('/orderlist/insertDeduction', {
					olsId: this.$route.query.olsId,
					price: this.price,
					endTime: this.endTime + ' 23:59:59'
				}).then(res => {
					if (res.code == 200) {
						this.dtnId = res.data;
						this.link = `${window.location.origin}/futureBaby/index.html?#/receiveVouchers?dtnId=${this.dtnId}`
					}
				})
			},
			VerifyCellPrice() {
				if (this.price == '') {
					this.priceErrMsg = '抵用券金额不能为空';
					return false;
				} else {
					this.priceErrMsg = '';
					return true;
				}
			},
			VerifyCellEndTime() {
				if (this.endTime == '') {
					this.endTimeErrMsg = '时间不能为空';
					return false;
				} else {
					this.endTimeErrMsg = '';
					return true;
				}
			},
			onConfirm(date) {
				this.showCalendar = false;
				this.endTime = formatDate(date);
			},
		},
		destroyed() {
			this.$http('/userinfo/getConfig', {
				url: window.location.href.split('#')[0]
			}).then(res => {
				if (res.code == 200) {
					this.config = res.data;
					let obj = {
						title: '未来宝贝', // 分享标题
						link: `${window.location.origin}/futureBaby/index.html?#/home`, // 分享链接
            imgurls: require('../../assets/img/logoShare.jpg')

					}
					wxShare(this.config, obj, (msg) => {
						console.log(msg)
					})
				}
			})
		},
		components: {
			NavBar,
		},

	}
</script>

<style lang="scss" scoped>
	@import '~assets/css/mixin.scss';

	.share {
		width: 100%;
		padding: 0 1rem;
		position: absolute;
		left: 50%;
		top: 10px;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: flex-end;

		.arrow {

			height: 60px;
			width: 60px
		}

		.text {
			margin-top: 10px;
			margin-right: 60px;
			width: 60vw;
		}
	}

	.err-msg {
		@include sc(.6rem, #FC4B4C)
	}

	.info {
		width: 100%;
		background: #FFFFFF;
		box-shadow: 0px 2px 4px 0px rgba(230, 230, 230, 0.4);
		border-radius: 10px;
		margin-top: 20px;
		padding: 20px;
	}

	.title {
		font-size: 15px;
		color: #333333;
		font-weight: bold;
		line-height: 30px;
	}

	.create {
		font-size: 13px;
		font-weight: 400;
		color: #AAAAAA;
		line-height: 30px;
	}

	.money {
		width: 100%;
		height: 40px;
		font-size: 15px;
		color: #333333;
		font-weight: bold;
		line-height: 30px;

		margin-top: 10px;
		position: relative;

	}

	.money>input {

		width: 60%;
		height: 100%;
		font-size: 15px;
		font-family: PingFangSC-Regular, PingFang SC;
		color: #AAAAAA;
		padding-left: 10px;



	}

	.icon {
		display: inline-block;
		color: #aaa;
		transform: rotate(180deg);
		position: absolute;
		right: 0;
	}

	.create-btn {
		width: 240px;
		height: 40px;
		background: #FC4B4C;
		border-radius: 20px;
		margin: 0 auto;
		margin-top: 20px;
		text-align: center;
		font-size: 15px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FFFFFF;
		line-height: 40px;
	}

	.url {
		width: 100%;
		height: 40px;
		background: #F2F2F2;
		border-radius: 5px;
		font-size: 15px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 40px;
		padding: 0 10px;
		margin-top: 20px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.copy-btn {
		width: 240px;
		height: 40px;
		background: #FFE5E5;
		border-radius: 20px;
		font-size: 15px;
		font-family: PingFangSC-Semibold, PingFang SC;
		font-weight: 600;
		color: #FC4B4C;
		text-align: center;
		line-height: 40px;
		margin: 0 auto;
		margin-top: 20px;
	}
</style>