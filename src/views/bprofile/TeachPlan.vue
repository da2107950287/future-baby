<template>
	<div class="body">
		<NavBar>
			<div slot="center">教案中心</div>
		</NavBar>
		<div>
			<div v-for="item in list" :key="item.oflId" @click="$router.push({path:'/details',query:{oflId:item.oflId}})"  class="item">
				<div class="cover"><img :src="item.purl" alt=""></div>
				<div class="content">
					<div class="title">{{item.title}}</div>
					<div class="date">{{item.oflTime}}</div>
				</div>
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
				list: [],//教案列表
			}
		},
		created(){
this.getOfficial()
		},
		methods: {
			//获取教案列表
			getOfficial() {
				this.$toast.loading({
					duration: 0,
					message: '加载中...',
					forbidClick: true,
				});
				this.$http('/official/getOfficial', {
					oflSort: 8,
					oflType: 3,
					PageNumber: this.PageNumber,
					PageSize: this.PageSize
				}).then(res => {
					if (res.code == 200) {
						this.$toast.clear();
						this.clock = 1;
						this.list = res.data;
						if (this.PageSize == res.data) {
							window.addEventListener("scroll", this.handleScroll)
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
						this.$toast.loading({
							duration: 0,
							message: '加载中...',
							forbidClick: true,
						});
						this.$http('/official/getOfficial', {
							oflSort: 8,
							oflType: 3,
							PageNumber: this.PageNumber,
							PageSize: this.PageSize
						}).then(res => {
							if (res.code == 200) {
								this.$toast.clear();
								this.clock = 1;
								this.list = [...this.list, ...res.data];
								if (this.PageSize > res.data.length) {
									window.removeEventListener("scroll", this.handleScroll)
								}
							}
						})
					}
				}
			},
		
		},
		beforeDestroy() {
      window.removeEventListener("scroll", this.handleScroll)
    },

		components: {
			NavBar,

		},
		
	}
</script>

<style lang="scss" scoped>
	@import '~assets/css/mixin.scss';



	.item {
		width: 100%;

		border-bottom: 1px solid #EEEEEE;
		padding: 20px 20px;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.cover {
		width: 105px;
		height: 78px;
		margin-right: 10px;
		border-radius: 6px;
		overflow: hidden;
	}

	.cover>img {
		width: 100%;
		height: 100%;
	}

	.content {

		@include fj();
		flex-direction: column;
		width: 100%;
		height: 78px;
		line-height: 20px;
		font-size: 15px;
		font-weight: bold;

	}
	.title{
		@include ellipsis();
	}

	.date {

		width: 100%;
		font-size: 12px;
		color: #AAAAAA;
		
	}
</style>