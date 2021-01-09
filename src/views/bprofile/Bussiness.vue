<template>
	<div class="audition">
		<NavBar>
			<div slot="center">网点申请</div>
		</NavBar>
		<div class="content">
			<div class="form-box">
				<van-form class="form" label-width="auto">
					<van-field required readonly v-model="regMerType" label="注册类型" />
					<van-field required v-model="query.legalName" readonly label="法人身份证姓名" />
					<van-field required v-model="query.legalIdcardNo" readonly label="法人身份证号码" />
					<van-field required v-model="query.legalMobile" readonly label="法人手机号" />
					<van-field required v-model="query.legalEmail" readonly label="法人邮箱" />
					<van-field required v-model="query.shopName" readonly label="商户营业名称" />
					<!-- <van-field required v-model="query.bankNo" label="开户行行号" /> -->
					<van-field required v-model="query.bankBranchName" readonly label="	开户行支行名称" />
					<van-field required v-model="query.bankAcctNo" readonly label="开户行帐号" />
					<van-field required v-model="query.bankAcctName" readonly label="	开户帐号姓名" />
				</van-form>
			</div>
			<div class="form">
				<van-form label-width="auto">
					<van-field required v-model="region" readonly label="所在地区" />
					<van-field required v-model="query.shopRoad" readonly label="营业地址路名" />
					<van-field required v-model="query.shopHouseNo" readonly label="营业地址门牌" />
					<van-field required v-model="query.shopAddrExt" readonly label="营业地址补充信" />
					<van-field required readonly v-model="licenseType" label="营业执照类型" />
					<van-field required readonly v-model="bankAcctType" label="账户类型" />
					<van-field required readonly v-model="mccCode" label="行业类型编码" />
					<van-field required readonly v-model="legalOccupation" label="法人职业" />
					<van-field v-if="query.legalOccupationDesc" v-model="query.legalOccupationDesc" rows="1" autosize label="法人职业详细描述"
						type="textarea" />
				</van-form>
			</div>
			<div class="form-image">
				<van-form label-width="auto">
					<div class="card">
						<div class="card-title"><span style="color: #ee0a24;">*</span>法人身份证正反面</div>
						<div class="advice">建议尺寸500*500，大小不超过2M</div>
						<img :src="query.identityJust" alt="" class="image">
						<img :src="query.identityBack" alt="" class="image">
					</div>
					<div class="card">
						<div class="card-title"><span style="color: #ee0a24;">*</span>自拍照（手持身份证）</div>
						<div class="advice">建议尺寸500*500，大小不超过2M</div>
						<img :src="query.holdIdentity" alt="" class="image">
					</div>
					<div class="card">
						<div class="card-title"><span style="color: #ee0a24;">*</span>门头照片</div>
						<div class="advice">建议尺寸500*500，大小不超过2M</div>
						<img :src="query.doorPhoto" alt="" class="image">
					</div>
					<div class="card">
						<div class="card-title"><span style="color: #ee0a24;">*</span>室内照片</div>
						<div class="advice">建议尺寸500*500，大小不超过2M</div>
						<img :src="query.indoorPhoto" alt="" class="image">
					</div>
					<div class="card">
						<div class="card-title">租赁协议照片</div>
						<div class="advice">建议尺寸500*500，大小不超过2M</div>
						<img v-if="query.leaseAgreement" :src="query.leaseAgreement" alt="" class="image">
						<div v-else class="image">
							<span style="font-size: 16px;">暂未上传图片</span>
						</div>
					</div>
					<div class="card">
						<div class="card-title">产权证明照片</div>
						<div class="advice">建议尺寸500*500，大小不超过2M</div>
						<img v-if="query.securities" :src="query.securities" alt="" class="image">
						<div v-else class="image">
							<span style="font-size: 16px;">暂未上传图片</span>
						</div>
					</div>
					<div class="card">
						<div class="card-title">执业资质证照片</div>
						<div class="advice">建议尺寸500*500，大小不超过2M</div>
						<img v-if="query.praQuaCert" :src="query.praQuaCert" alt="" class="image">
						<div v-else class="image">
							<span style="font-size: 16px;">暂未上传图片</span>
						</div>
					</div>
					<div class="card">
						<div class="card-title">第三方证明照片</div>
						<div class="advice">建议尺寸500*500，大小不超过2M</div>
						<img v-if="query.thirdPartyCert" :src="query.thirdPartyCert" alt="" class="image">
						<div v-else class="image">
							<span style="font-size: 16px;">暂未上传图片</span>
						</div>
					</div>
					<div class="card">
						<div class="card-title">其他小商户证明材料照片</div>
						<div class="advice">建议尺寸500*500，大小不超过2M</div>
						<img v-if="query.otherMaterials" :src="query.otherMaterials" alt="" class="image">
						<div v-else class="image">
							<span style="font-size: 16px;">暂未上传图片</span>
						</div>
					</div>
					<div class="card">
						<div class="card-title"><span style="color: #ee0a24;">*</span>经营商品照片</div>
						<div class="advice">建议尺寸500*500，大小不超过2M</div>
						<img :src="query.businessPhotos" alt="" class="image">
					</div>
					<div class="card">
						<div class="card-title"><span style="color: #ee0a24;">*</span>辅助证明料 1</div>
						<div class="advice">建议尺寸500*500，大小不超过2M</div>
						<img :src="query.auxiliaryPhoto1" alt="" class="image">
					</div>
					<div class="card">
						<div class="card-title">辅助证明料 2</div>
						<div class="advice">建议尺寸500*500，大小不超过2M</div>
						<img v-if="query.auxiliaryPhoto2" :src="query.auxiliaryPhoto1" alt="" class="image">
						<div v-else class="image">
							<span style="font-size: 16px;">暂未上传图片</span>
						</div>
					</div>
					<div class="card">
						<div class="card-title">辅助证明料 3</div>
						<div class="advice">建议尺寸500*500，大小不超过2M</div>
						<img v-if="query.auxiliaryPhoto3" :src="query.auxiliaryPhoto3" alt="" class="image">
						<div v-else class="image">
							<span style="font-size: 16px;">暂未上传图片</span>
						</div>
					</div>
				</van-form>
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
				regMerTypeArr: [
					{ name: '小微商户', id: '02' },
				],
				mccCodeArr: [
					{ "value": 1, "text": "综合零售", "children": [{ "value": 5331, "text": "各类杂货店、便利店零售" }, { "value": 5331, "text": "线下小零售" }] },
					{ "value": 2, "text": "餐饮业", "children": [{ "value": 5814, "text": "快餐店" }] },
					{ "value": 3, "text": "餐饮居民服务", "children": [{ "value": 7295, "text": "家政服务" }, { "value": 7299, "text": "未列入其他代码的个人服务" }, { "value": 7299, "text": "家教" }, { "value": 7299, "text": "美甲美容师" }] },
					{ "value": 4, "text": "交通运输、物流和仓储服务", "children": [{ "value": 4121, "text": "出租车服务" }] },
					{ "value": 5, "text": "批发商户", "children": [{ "value": 5998, "text": "其他批发商" }] }
				],
				licenseTypeArr: [{ name: '小微商户', id: "2" }],//营业执照类型
				bankAcctTypeArr: [{ name: '个人账户', id: '0' }],//账户类型
				legalOccupationArr: [
					{ name: '各类专业、技术人员', id: '0' },
					{ name: '国家机关、党群组织、企事业单位的负责人', id: '1' },
					{ name: '办事人员和有关人员', id: '2' },
					{ name: '商业工作人员', id: '3' },
					{ name: '服务性工作人员', id: '4' },
					{ name: '农林牧渔劳动者', id: '5' },
					{ name: '生产工作、运输工作和部分体力劳动者', id: '6' },
					{ name: '不便分类的其他劳动者', id: '7' },
				],//法人职业类型

				query: {},
				region: '',//地区
				regMerType: "",//注册类型 默认 02：小微商户
				licenseType: "",//营业执照类型 默认 小微商户 2 无营业执照
				bankAcctType: "",//账户类型 默认 0：个人账户
				mccCode: "",//行业类别编码
				legalOccupation: "",//法人职业 

			};
		},
		created() {
			this.showMerchants()
		},
		methods: {
			showMerchants() {
				this.$http('/orderlist/showMerchants').then(res => {
					if (res.code == 200) {
						this.query = res.data;
						this.regMerTypeArr.forEach(item => {
							if (this.query.regMerType == item.id) {
								this.regMerType = item.name;
							}
						})
						this.region = `${this.query.shopProvinceName}${this.query.shopCityName}${this.query.shopCountryName}`;
						this.mccCodeArr.forEach(item => {
							item.children.forEach(item1 => {
								if (item1.value == this.query.mccCode) {
									this.mccCode = item1.text;
								}
							})
						})
						this.bankAcctTypeArr.forEach(item => {
							if (this.query.bankAcctType == item.id) {
								this.bankAcctType = item.name;
							}
						})
						this.licenseTypeArr.forEach(item => {
							if (this.query.licenseType == item.id) {
								this.licenseType = item.name;
							}
						})
						this.legalOccupationArr.forEach(item => {
							if (this.query.legalOccupation == item.id) {
								this.legalOccupation = item.name;
							}
						})

					}
				})
			},


		},
		components: {
			NavBar,
		}
	}
</script>
<style lang="scss" scoped>
	@import '~assets/css/mixin.scss';

	.audition {
		@include wh(100%, auto);

	}

	.content {
		@include wh(100%, 100%);
		background: #f7f7f7;
		padding: 1rem;

		.title {
			@include sc(.7rem, #333);
			padding: 0 .5rem .5rem;
		}

		.err-msg {
			@include sc(.6rem, #ee0a24);
		}

		.cover {
			@include wh(100%, 9.4rem);

			border-radius: 0.5rem;
		}




		.form {
			background: $fc;
			margin-bottom: .5rem;

			box-shadow: 0rem 0.1rem 0.2rem 0rem rgba(230, 230, 230, 0.4);
			border-radius: 10px;

		}

		.btn {
			margin-top: 2rem;
		}


		.form-image {
			padding: 1rem;
			background-color: $fc;
		}

		.card-title {
			line-height: 30px;
			font-size: 15px;
			color: #333333;
		}

		.advice {
			@include sc(.6rem, #aaa);

		}

		.image {
			width: 8rem;
			height: 8rem;
			background: #EFEFEF;
			border-radius: 5px;
			position: relative;
			margin-top: 10px;
			text-align: center;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

			.icon {
				@include sc(2rem, #aaa);

			}

			span {

				@include sc(.6rem, #aaa)
			}
		}




	}
</style>