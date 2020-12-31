<template>
	<div class="audition">
		<NavBar>
			<div slot="center">网点申请</div>
		</NavBar>
		<div class="content">
			{{show}}
			<div class="title" v-if="query.merId">审核状态：
				<span v-if="query.state==1">待审核</span>
				<span v-else-if="query.state==2">审核中</span>
				<span v-if="query.state==3">审核成功</span>
				<span v-if="query.state==4">审核失败</span>
			</div>
			<div class="title" v-if="query.state==4">失败原因：{{query.failReason}}</div>
			<div class="form-box">
				<van-form class="form" label-width="auto">
					<van-field @click="showregMerType=true" required readonly v-model="regMerType" label="注册类型"
						placeholder="小微商户（默认）" :error-message="verification.regMerType" @changet="VerifyCellRegMerType" />
					<van-action-sheet v-model="showregMerType" :actions="regMerTypeArr" @select="selectRegMerTypeArr" />
					<van-field required v-model="query.legalName" readonly label="法人身份证姓名" placeholder="请输入姓名"
						:error-message="verification.legalName" @blur="VerifyCellLegalName" />
					<van-field required v-model="query.legalIdcardNo" readonly label="法人身份证号码" placeholder="请输入身份证号码"
						:error-message="verification.legalIdcardNo" @blur="VerifyCelllegaLIdcardNo" />
					<van-field required v-model="query.legalMobile" readonly label="法人手机号" placeholder="请输入联系电话"
						:error-message="verification.legalMobile" readonly @blur="VerifyCellLegalMobile" />
					<van-field required v-model="query.legalEmail" label="法人邮箱" placeholder="请输入邮箱"
						:error-message="verification.legalEmail" readonly @blur="VerifyCelllegalEmail" />
					<van-field required v-model="query.shopName" label="商户营业名称" placeholder="请输入营业名称"
						:error-message="verification.shopName" readonly @blur="VerifyCellShopName" />
					<van-field required v-model="query.bankNo" label="开户行行号" placeholder="请输入开户行行号"
						:error-message="verification.bankNo" readonly @blur="VerifyCellBankNo" />
					<van-field required v-model="query.bankBranchName" label="	开户行支行名称" placeholder="请输入开户行支行名称"
						:error-message="verification.bankBranchName" readonly @blur="VerifyCellBankBranchName" />
					<van-field required v-model="query.bankAcctNo" label="开户行帐号" placeholder="请输入开户行帐号"
						:error-message="verification.bankAcctNo" readonly @blur="VerifyCellBankAcctNo" />
					<van-field required v-model="query.bankAcctName" label="	开户帐号姓名" placeholder="请输入开户帐号姓名"
						:error-message="verification.bankAcctName" readonly @blur="VerifyCellBankAcctName" />
				</van-form>
			</div>
			<div class="form">
				<van-form label-width="auto">
					<van-field required v-model="region" readonly label="所在地区" placeholder="请选择所在地区" @click="showPicker = true"
						:error-message="verification.region" readonly @blur="VerifyCellRegion" />
					<van-popup v-model="showPicker" round position="bottom">
						<van-cascader v-model="cascaderValue" title="请选择所在地区" :options="options" @close="showPicker = false"
							@finish="onFinish" />
					</van-popup>
					<van-field required v-model="query.shopRoad" label="营业地址路名" placeholder="请输入营业地址路名"
						:error-message="verification.shopRoad" readonly @blur="VerifyCellShopRoad" />
					<van-field required v-model="query.shopHouseNo" label="营业地址门牌" placeholder="请输入营业地址门牌"
						:error-message="verification.shopHouseNo" readonly @blur="VerifyCellShopHouseNo" />
					<van-field required v-model="query.shopAddrExt" readonly label="营业地址补充信" placeholder="请输入营业地址补充信"
						:error-message="verification.shopAddrExt" @blur="VerifyCellShopAddrExt" />

					<van-field required readonly v-model="licenseType" label="营业执照类型" placeholder="请选择"
						:error-message="verification.licenseType" @change="VerifyCellLicenseType" />
					<van-action-sheet v-model="showlicenseType" :actions="licenseTypeArr" @select="selectLicenseType" />

					<van-field required readonly v-model="bankAcctType" label="账户类型" placeholder="请选择"
						:error-message="verification.bankAcctType" @change="VerifyCellBankAcctType" />
					<van-action-sheet v-model="showbankAcctType" :actions="bankAcctTypeArr" @select="selectBankAcctType" />

					<van-field required readonly v-model="mccCode" label="行业类型编码" placeholder="请选择"
						:error-message="verification.mccCode" @change="VerifyCellMccCode" />
					<van-popup v-model="showmccCode" round position="bottom">
						<van-cascader title="请选择行业类型编码" :options="mccCodeArr" @close="showmccCode = false" @finish="finish" />
					</van-popup>
					<van-field required readonly v-model="legalOccupation" label="法人职业" placeholder="请选择"
						:error-message="verification.legalOccupation" @change="VerifyCellLegalOccupation" />
					<van-action-sheet v-model="showlegalOccupation" :actions="legalOccupationArr"
						@select="selectLegalOccupation" />
					<van-field v-if="isShow" v-model="query.legalOccupationDesc" rows="1" autosize label="法人职业详细描述"
						type="textarea" placeholder="请输入法人职业详细描述" />

				</van-form>
			</div>
			<div class="form-image">
				<van-form label-width="auto">
					<div class="card">
						<div class="card-title"><span style="color: #ee0a24;">*</span>法人身份证正反面</div>
						<div class="advice">建议尺寸500*500，大小不超过2M</div>
						<img :src="query.identityJust" alt="" class="image">
						<img :src="query.identityBack" alt="" class="image">
						<span class="err-msg">{{verification.identityBack}}</span>
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
						<img :src="query.leaseAgreement" alt="" class="image">
					</div>
					<div class="card">
						<div class="card-title">产权证明照片</div>
						<div class="advice">建议尺寸500*500，大小不超过2M</div>
						<img :src="query.securities" alt="" class="image">
					</div>
					<div class="card">
						<div class="card-title">执业资质证照片</div>
						<div class="advice">建议尺寸500*500，大小不超过2M</div>
						<img :src="query.praQuaCert" alt="" class="image">
					</div>
					<div class="card">
						<div class="card-title">第三方证明照片</div>
						<div class="advice">建议尺寸500*500，大小不超过2M</div>
						<img :src="query.thirdPartyCert" alt="" class="image">
					</div>
					<div class="card">
						<div class="card-title">其他小商户证明材料照片</div>
						<div class="advice">建议尺寸500*500，大小不超过2M</div>
						<img :src="query.otherMaterials" alt="" class="image">
					</div>
					<div class="card">
						<div class="card-title">经营商品照片</div>
						<div class="advice">建议尺寸500*500，大小不超过2M</div>
						<img :src="query.businessPhotos" alt="" class="image">
					</div>
					<div class="card">
						<div class="card-title">辅助证明料 1</div>
						<div class="advice">建议尺寸500*500，大小不超过2M</div>
						<img :src="query.auxiliaryPhoto1" alt="" class="image">
					</div>
					<div class="card">
						<div class="card-title">辅助证明料 2</div>
						<div class="advice">建议尺寸500*500，大小不超过2M</div>
						<img :src="query.auxiliaryPhoto1" alt="" class="image">
					</div>
					<div class="card">
						<div class="card-title">辅助证明料 3</div>
						<div class="advice">建议尺寸500*500，大小不超过2M</div>
						<img :src="query.auxiliaryPhoto3" alt="" class="image">
					</div>
				</van-form>
			</div>

		</div>
	</div>
	</div>
</template>
<script>
	import NavBar from 'components/common/navbar/NavBar';
	import { isPhone, isEmail, formatDate } from "assets/js/utils.js";
	import region from "assets/js/region.js";
	import { wxUpload } from "assets/js/wx.js"
	import { uploadPost } from 'assets/js/http.js'

	export default {
		data() {
			return {
				isShow: false,
				showregMerType: false,
				showPicker: false,//是否显示地区选择器
				showmccCode: false,//是否显示行业编号
				showlicenseType: false,//是否显示营业执照类型选项
				showbankAcctType: false,//是否显示账户类型选项
				showlegalOccupation: false,//是否显示法人职业类型选项
				cascaderValue: '',
				fileList: [],//图片列表
				regMerTypeArr: [
					{ name: '小微商户', id: '2' },
				],
				mccCodeArr: [
					{ "value": 1, "text": "综合零售", "children": [{ "value": 5331, "text": "各类杂货店、便利店零售" }, { "value": 5331, "text": "线下小零售" }] },
					{ "value": 2, "text": "餐饮业", "children": [{ "value": 5814, "text": "快餐店" }] },
					{ "value": 3, "text": "餐饮居民服务", "children": [{ "value": 7295, "text": "家政服务" }, { "value": 7299, "text": "未列入其他代码的个人服务" }, { "value": 7299, "text": "家教" }, { "value": 7299, "text": "美甲美容师" }] },
					{ "value": 4, "text": "交通运输、物流和仓储服务", "children": [{ "value": 4121, "text": "出租车服务" }] },
					{ "value": 5, "text": "批发商户", "children": [{ "value": 5998, "text": "其他批发商" }] }
				],
				licenseTypeArr: [{ name: '小微商户', id: "" }, { name: '无营业执照', id: "2" },],//营业执照类型
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

				query: {
					regMerType: "",//注册类型 默认 02：小微商户
					legalName: "",//法人身份证姓名
					legalIdcardNo: "",//法人身份证号
					legalMobile: "",//法人手机号
					legalEmail: "",//法人邮箱
					shopName: "",//商户营业名称
					bankNo: "",//开户行行号
					bankBranchName: "",//开户行支行名称
					bankAcctNo: "",//开户行帐号
					bankAcctName: "",//开户帐号姓名
					shopProvinceId: "",//营业省份 id
					shopProvinceName: "",//营业省份名称
					shopCityId: "",//营业市 id
					shopCityName: "",//营业市名称
					shopCountryId: "",//营业区 id
					shopCountryName: "",//营业区名称
					shopRoad: "",//营业地址路名
					shopHouseNo: "",//营业地址门牌
					shopAddrExt: "",//营业地址补充信
					licenseType: "",//营业执照类型 默认 小微商户 2 无营业执照
					bankAcctType: "",//账户类型 默认 0：个人账户
					mccCode: "",//行业类别编码
					legalOccupation: "",//法人职业 0-各类专业、技术人员 1-国家机关、党群组织、企事业单位的负责人 2-办事人员和有关人员 3-商业工作人员 4-服务性工作人员 5-农林牧渔劳动者 6-生产工作、运输工作和部分体力劳动者 7-不便分类的其他劳动者
					legalOccupationDesc: "",//法人职业详细描 当 legalOccupation 为 7-不便分类的其他劳动者时必填
					identityJust: "",//法人身份证正面
					identityBack: "",//法人身份证反面
					holdIdentity: "",//自拍照（手持身份证）
					doorPhoto: "",//门头照片
					indoorPhoto: "",//室内照片
					leaseAgreement: "",//租赁协议 0016
					securities: "",//产权证明 0017
					praQuaCert: "",//执业资质证照 0018
					thirdPartyCert: "",//第三方证明 0019
					otherMaterials: "",//其他小微商户证明材料 0020（0016-0020 小微商户必传其一）
					businessPhotos: "",//经营商品照片
					auxiliaryPhoto1: "",//辅助证明材料1
					auxiliaryPhoto2: "",//辅助证明材料2
					auxiliaryPhoto3: "",//辅助证明材料3
				},
				verification: {
					regMerType: "",//注册类型 默认 02：小微商户
					legalName: "",//法人身份证姓名
					legalIdcardNo: "",//法人身份证号
					legalMobile: "",//法人手机号
					legalEmail: "",//法人邮箱
					shopName: "",//商户营业名称
					bankNo: "",//开户行行号
					bankBranchName: "",//开户行支行名称
					bankAcctNo: "",//开户行帐号
					bankAcctName: "",//开户帐号姓名
					region: "",
					shopCountryName: "",//营业区名称
					shopRoad: "",//营业地址路名
					shopHouseNo: "",//营业地址门牌
					shopAddrExt: "",//营业地址补充信
					licenseType: "",//营业执照类型 默认 小微商户 2 无营业执照
					bankAcctType: "",//账户类型 默认 0：个人账户
					mccCode: "",//行业类别编码
					legalOccupation: "",//法人职业 0-各类专业、技术人员 1-国家机关、党群组织、企事业单位的负责人 2-办事人员和有关人员 3-商业工作人员 4-服务性工作人员 5-农林牧渔劳动者 6-生产工作、运输工作和部分体力劳动者 7-不便分类的其他劳动者
					legalOccupationDesc: "",//法人职业详细描 当 legalOccupation 为 7-不便分类的其他劳动者时必填
					identityJust: "",//法人身份证正面
					identityBack: "",//法人身份证反面
					holdIdentity: "",//自拍照（手持身份证）
					doorPhoto: "",//门头照片
					indoorPhoto: "",//室内照片
				},//错误提示
				options: this.getOption(),

				config: {},
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
						if (Object.keys(res.data).length !== 0) {
							this.query = res.data;
							this.region = this.query.shopProvinceName + this.query.shopCityName + this.query.shopCountryName;
							this.regMerType = this.query.regMerType;
							this.licenseType = this.query.licenseType;
							this.bankAcctType = this.query.bankAcctType;
							this.mccCode = this.query.mccCode;
							this.legalOccupation = this.query.legalOccupation;

						} else {

						}
					}
				})
			},
			selectRegMerTypeArr(item) {
				this.showregMerType = false;
				this.query.regMerType = item.id;
				this.regMerType = item.name;
			},
			//选择营业执照类型
			selectLicenseType(item) {
				this.showlicenseType = false;
				this.query.licenseType = item.id;
				this.licenseType = item.name
			},
			selectBankAcctType(item) {
				this.showbankAcctType = false;
				this.query.bankAcctType = item.id;
				this.bankAcctType = item.name;
			},
			selectLegalOccupation(item) {
				this.showlegalOccupation = false;
				this.query.legalOccupation = item.id;
				this.legalOccupation = item.name;
				if (item.id == 7) {
					this.isShow = true;
				}
			},
			//全部选项选择完成后触发
			onFinish({ selectedOptions }) {
				this.showPicker = false;
				this.query.shopProvinceName = selectedOptions[0].text;
				this.query.shopCityName = selectedOptions[1].text;
				this.query.shopCountryName = selectedOptions[2].text;
				this.query.shopProvinceId = selectedOptions[0].value;
				this.query.shopCityId = selectedOptions[1].value;
				this.query.shopCountryId = selectedOptions[2].value;
				this.region = selectedOptions[0].text + selectedOptions[1].text + selectedOptions[2].text
			},
			finish({ selectedOptions }) {
				this.showmccCode = false;
				this.query.mccCode = selectedOptions[0].value;
				selectedOptions.forEach(item => {
					this.mccCode = this.mccCode + ' ' + item.text;
				})
			},
			afterRead(e, name) {
				// 此时可以自行将文件上传至服务器
				let file = e.target.files[0];
				let formData = new FormData()
				formData.append('myfiles', file)
				uploadPost('/upload/pictureOrVideo', formData).then(res => {
					if (res.code == 200) {
						this.query[name] = res.data;
						console.log(this.query)
					}
				})
			},
			//获取省市区列表
			getOption() {
				let arr = [];
				for (const key1 in region['86']) {
					if (region['86'].hasOwnProperty.call(region['86'], key1)) {
						let a = { value: key1, text: region['86'][key1], children: [] }
						arr.push(a)
						for (const key2 in region[key1]) {
							if (region[key1].hasOwnProperty.call(region[key1], key2)) {
								let b = { value: key2, text: region[key1][key2], children: [] }
								let bChildren = arr.find((item => {
									return item.value == key1
								})).children
								bChildren.push(b)
								for (const key3 in region[key2]) {
									if (region[key2].hasOwnProperty.call(region[key2], key3)) {
										let c = { value: key3, text: region[key2][key3] }
										bChildren.find((item => {
											return item.value == key2
										})).children.push(c)
									}
								}
							}
						}
					}
				}
				return arr;
			},

			//确认保存
			submit() {
				if (!this.VerifyCellRegMerType()) return false;
				if (!this.VerifyCellLegalName()) return false;
				if (!this.VerifyCelllegaLIdcardNo()) return false;
				if (!this.VerifyCellLegalMobile()) return false;
				if (!this.VerifyCelllegalEmail()) return false;
				if (!this.VerifyCellShopName()) return false;
				if (!this.VerifyCellBankNo()) return false;
				if (!this.VerifyCellBankBranchName()) return false;
				if (!this.VerifyCellBankAcctNo()) return false;
				if (!this.VerifyCellBankAcctName()) return false;
				if (!this.VerifyCellRegion()) return false;
				if (!this.VerifyCellShopRoad()) return false;
				if (!this.VerifyCellShopHouseNo()) return false;
				if (!this.VerifyCellShopAddrExt()) return false;
				if (!this.VerifyCellLicenseType()) return false;
				if (!this.VerifyCellBankAcctType()) return false;
				if (!this.VerifyCellMccCode()) return false;
				if (!this.VerifyCellLegalOccupation()) return false;
				if (this.query.identityJust == '') {
					this.verification.identityJust = '请上传身份证正面';
					return false;
				} else {
					this.verification.identityJust = '';
				}
				if (this.query.identityBack == '') {
					this.verification.identityBack = '请上传身份证反面';
					return false;
				} else {
					this.verification.identityBack = '';
				}
				if (this.query.holdIdentity == '') {
					this.verification.holdIdentity = '请上传自拍照';
					return false;
				} else {
					this.verification.holdIdentity = '';
				}
				if (this.query.doorPhoto == '') {
					this.verification.doorPhoto = '请上传门头照片';
					return false;
				} else {
					this.verification.doorPhoto = '';
				}
				if (this.query.indoorPhoto == '') {
					this.verification.indoorPhoto = '请上传室内照片';
					return false;
				} else {
					this.verification.indoorPhoto = '';
				}
				this.$http('/orderlist/insertMerchants', this.query).then(res => {
					if (res.code == 200) {
						this.$toast.success(res.msg)
					} else if (code == 500) {
						this.$toast.fail(res.msg);
					}
				})
			},

			submitAgain() {
				this.$http('/orderlist/submitMerchants', {
					merId: this.query.merId
				}).then(res => {
					if (res.code == 200) {

					}
				})
			},
			VerifyCellRegMerType() {
				console.log(this.regMerType);
				if (this.regMerType == '') {
					this.verification.regMerType = '注册类型不能为空';
					console.log(this.verification.regMerType)
					return false;
				} else {
					this.verification.regMerType = "";
					return true;
				}
			},
			VerifyCellLegalName() {

				console.log(this.query.legalName)
				if (this.query.legalName == '') {
					this.verification.legalName = '法人身份证姓名不能为空';
					console.log(this.verification.legalName)

					return false;
				} else {
					this.verification.legalName = "";
					return true;
				}
			},
			VerifyCelllegaLIdcardNo() {
				if (this.query.legalIdcardNo == '') {
					this.verification.legalIdcardNo = '法人身份证号不能为空';
					return false;
				} else {
					this.verification.legalIdcardNo = "";
					return true;
				}
			},
			VerifyCellLegalMobile() {
				if (this.query.legalMobile == '') {
					this.verification.legalMobile = '法人手机号不能为空';
					return false;
				} else if (!isPhone(this.query.legalMobile)) {
					this.verification.legalMobile = '法人手机号不正确';
					return false;
				} else {
					this.verification.legalMobile = '';
					return true;
				}
			},
			VerifyCelllegalEmail() {
				if (this.query.legalEmail == '') {
					this.verification.legalEmail = '法人邮箱不能为空';
					return false;
				} else if (!isEmail(this.query.legalEmail)) {
					this.verification.legalEmail = '法人邮箱不正确';
					return false;
				} else {
					this.verification.legalEmail = '';
					return true;
				}
			},
			VerifyCellShopName() {
				if (this.query.shopName == '') {
					this.verification.shopName = '商户营业名称不能为空';
					return false;
				} else {
					this.verification.shopName = "";
					return true;
				}
			},
			VerifyCellBankNo() {
				if (this.query.bankNo == '') {
					this.verification.bankNo = '开户行行号不能为空';
					return false;
				} else {
					this.verification.bankNo = "";
					return true;
				}
			},
			VerifyCellBankBranchName() {
				if (this.query.bankBranchName == '') {
					this.verification.bankBranchName = '开户行支行名称不能为空';
					return false;
				} else {
					this.verification.bankBranchName = "";
					return true;
				}
			},
			VerifyCellBankAcctNo() {
				if (this.query.bankAcctNo == '') {
					this.verification.bankAcctNo = '开户行账号不能为空';
					return false;
				} else {
					this.verification.bankAcctNo = "";
					return true;
				}
			},
			VerifyCellBankAcctName() {
				if (this.query.bankAcctName == '') {
					this.verification.bankAcctName = '开户行账号姓名不能为空';
					return false;
				} else {
					this.verification.bankAcctName = "";
					return true;
				}
			},
			VerifyCellRegion() {
				if (this.region == '') {
					this.verification.region = '所在地区不能为空';
					return false;
				} else {
					this.verification.region = "";
					return true;
				}
			},
			VerifyCellShopRoad() {
				if (this.query.shopRoad == '') {
					this.verification.shopRoad = '营业地址路名不能为空';
					return false;
				} else {
					this.verification.shopRoad = "";
					return true;
				}
			},
			VerifyCellShopHouseNo() {
				if (this.query.shopHouseNo == '') {
					this.verification.shopHouseNo = '营业地址门牌不能为空';
					return false;
				} else {
					this.verification.shopHouseNo = "";
					return true;
				}
			},
			VerifyCellShopAddrExt() {
				if (this.query.shopAddrExt == '') {
					this.verification.shopAddrExt = '营业地址补充信不能为空';
					return false;
				} else {
					this.verification.shopAddrExt = "";
					return true;
				}
			},
			VerifyCellLicenseType() {
				if (this.query.licenseType == '') {
					this.verification.licenseType = '营业执照类型不能为空';
					return false;
				} else {
					this.verification.licenseType = '';
					return true;
				}
			},
			VerifyCellBankAcctType() {
				if (this.query.bankAcctType == '') {
					this.verification.bankAcctType = '账户类型不能为空';
					return false;
				} else {
					this.verification.bankAcctType = '';
					return true;
				}
			},
			VerifyCellMccCode() {
				if (this.query.mccCode == '') {
					this.verification.mccCode = '行业类别编码不能为空';
					return false;
				} else {
					this.verification.mccCode = '';
					return true;
				}
			},
			VerifyCellLegalOccupation() {
				if (this.query.legalOccupation == '') {
					this.verification.legalOccupation = '法人职业 不能为空';
					return false;
				} else {
					this.verification.legalOccupation = '';
					return true;
				}
			}



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