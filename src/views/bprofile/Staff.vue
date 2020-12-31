<template>
	<div class="body">
		<NavBar>
			<div slot="center">员工管理</div>
		</NavBar>

				<div class="item">
					<div class="item-content">
						<div class="item-head"><img src="" alt=""></div>
						<div class="item-info">
							<div>
								<div class="item-name">周汉明</div>
								<div class="item-card">园区员工</div>
							</div>
							<div>
								<div class="item-phone-icon"><img src="" alt=""></div>
								<div class="item-phone-num">19954271652</div>
							</div>
						</div>
					</div>
					<div class="item-btn">
						<div class="btn-disabled">禁用</div>
						<div class="btn-delete">删除</div>
						<div class="btn-permission" @click="manageRight">权限</div>
						<div class="btn-exchange">转移管理员</div>
					</div>
				</div>

	</div>
</template>

<script>
	import NavBar from 'components/common/navbar/NavBar';
	export default {
		data() {
			return {
				PageNumber: 1,//当前页数
				PageSize: 10,//每页显示多少条
				clock: 0,//1 可以请求数据
				isLoading: false,// 是否处于加载中状态
				loading: false,// 是否处于加载状态
				finished: false,// 是否已加载完成
				list: [],//列表数据
			}
		},

		methods: {
		
			manageRight() {

			}
		},
		components: {
			NavBar,

		}
	}
</script>

<style lang="scss" scoped>
	@import '~assets/css/mixin.scss';

	.item {
		padding: 0 20px;
		width: 100%;
	}

	.item-content {
		width: 100%;
		height: 40px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
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
		width: 100%;
		height: 30px;
		margin-left: 10px;
	}

	.item-info>div {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		line-height: 20px;
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
		width: 12px;
		height: 12px;
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
</style>