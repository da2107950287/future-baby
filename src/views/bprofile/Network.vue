<template>
	<div class="c-order">
		<NavBar>
			<div slot="center">网点资料</div>
		</NavBar>
		<div class="order-detail">
			<van-form class="form" scroll-to-error label-width="3.1rem">
				<van-field v-model="query.olsName" name="网点名称" label="网点名称" placeholder="请输入网点名称"
					:error-message="verification.olsName" @blur="VerifyCellOlsName" />
				<van-field v-model="fieldValue" is-link readonly label="地区" placeholder="请选择所在地区" @click="showPicker = true" />
				<van-popup v-model="showPicker" round position="bottom">
					<van-cascader v-model="cascaderValue" title="请选择所在地区" :options="options" @close="showPicker = false"
						@finish="onFinish" />
				</van-popup>
				<van-field v-model="query.address" name="地址" label="地址" placeholder="请输入地址"
					:error-message="verification.address" @blur="VerifyCellAddress" />
				<van-field v-model="query.mobile" type="tel" name="联系电话" label="联系电话" placeholder="请输入网点联系电话"
					:error-message="verification.mobile" @blur="VerifyCellMobile" required />
				<div>
					<div class="title" style="padding-left: 20px;">简介<span class="modify">（可修改）</span></div>
				</div>
				<div class="padding20">
					<van-field class="textarea" v-model="query.intro" type="textarea" autosize placeholder="请输入网点联系电话"
						:error-message="verification.intro" @blur="VerifyCellIntro" />
				</div>
				<div class="pic">
					<div class="title"><span class="require">*</span>形象图<span class="modify">（可修改）</span></div>
					<div class="mark">只显示1张，图片建议尺寸500*500，大小不超过2M</div>
					<!-- <van-uploader class="padding20" v-model="fileList" @delete="query.image=''" :after-read="afterRead"
						max-count=1>
						<template #preview-cover="{ file }">
							<div class="preview-cover van-ellipsis">更改形象图</div>
						</template>
					</van-uploader> -->
					<van-uploader class="padding20" preview-size="160px" :after-read="afterRead">
						<div v-if="!query.image" class="image">
							<div class="iconfont icon-jia icon"></div>
							<span>上传形象图</span>
						
						</div>
						<div v-else>
							<img  :src="query.image" alt="" class="image">
							<div class="preview-cover image"  >更改形象图</div>


						</div>
					</van-uploader>
					<div class="error-image padding20">{{verification.image}}</div>
				</div>
			</van-form>
			<van-button class="btn" round block color="#FC4B4C" @click="submit">确认保存</van-button>
		</div>
	</div>
</template>
<script>
	import NavBar from 'components/common/navbar/NavBar';
	import OrderInfo from 'components/page/OrderInfo'
	import { isPhone, formatDate, chineseLetter, getStore } from "assets/js/utils.js";
	import region from "assets/js/region.js";
	import { uploadPost } from 'assets/js/http.js'
	import { getLocation } from "assets/js/wx.js";

	export default {
		data() {
			return {
				showPicker: false,//是否显示省市区列表
				fileList: [],//图片列表
				verification: {
					olsName: '',//网点名称
					address: '',//详细地址
					mobile: '',//电话
					intro: '',//简介
					image: '',//星象图
					provinces: '',//区域
				},
				query: {
					olsId: '',//网点ID
					olsName: '',//网点名称
					province: '',//省份
					city: '',//城市
					area: '',//区域
					address: '',//详细地址
					latitude: '',//经度
					longitude: '',//纬度
					mobile: '',//电话
					intro: '',//简介
					image: ''//星象图
				},
				cascaderValue: '',
				options: this.getOption()
			}
		},
		computed: {
			fieldValue() {
				return this.query.province + this.query.city + this.query.area;
			}
		},
		created() {
			this.getOutletsInfo();
			this.getAppConfig()
		},
		methods: {
			//全部选项选择完成后触发
			onFinish({ selectedOptions }) {
				console.log(this.cascaderValue)
				this.showPicker = false;
				this.query.province = selectedOptions[0].text;
				this.query.city = selectedOptions[1].text;
				this.query.area = selectedOptions[2].text;
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
			//获取网点详细
			getOutletsInfo() {
				this.$http('/outlets/showOutletsInfo').then(res => {
					if (res.code == 200) {
						this.query = {
							olsId: res.data.olsId,
							olsName: res.data.olsName,
							province: res.data.province,
							city: res.data.city,
							area: res.data.area,
							address: res.data.address,
							latitude: res.data.latitude,
							longitude: res.data.longitude,
							mobile: res.data.mobile,
							intro: res.data.intro,
							image: res.data.image,
						};
						this.fileList.push({ url: this.query.image })
					} else if (res.code == 500) {
						this.$toast.success(res.msg)
					}
				})
			},
			//上传图片
			afterRead(file) {
				// 此时可以自行将文件上传至服务器
				let formData = new FormData()
				formData.append('myfiles', file.file)
				uploadPost('/upload/pictureOrVideo', formData).then(res => {
					if (res.code == 200) {
						this.query.image = res.data;
					}
				})
			},
			//获取定位
			getAppConfig() {
				this.$http('/userinfo/getConfig', {
					url: window.location.href.split('#')[0]
				}).then(res => {
					console.log(res)
					if (res.code == 200) {
						this.config = res.data;
						getLocation(this.config).then(result => {
							this.query.latitude = result.latitude;
							this.query.longitude = result.longitude;

						}).catch(err => {
							console.log(err)
						})
					}
				})
			},
			//提交保存
			submit() {
				if (!this.VerifyCellOlsName()) return false;
				if (this.query.province == "" || this.query.city == "" || this.query.area == "") {
					this.verification.provinces = '区域不能为空';
					return false;
				}
				if (!this.VerifyCellAddress()) return false;
				if (!this.VerifyCellMobile()) return false;
				if (!this.VerifyCellIntro()) return false;
				if (this.query.image == "") {

					this.verification.image = "请上传图片";
					return false;
				}
				console.log(this.query)
				this.$http('/outlets/updateOutlets', this.query).then(res => {
					if (res.code == 200) {
						this.$toast.success(res.msg)
					} else if (res.code == 500) {
						this.$toast.fail(res.msg)
					}
				})
			},
			VerifyCellOlsName() {
				if (this.query.olsName == '') {
					this.verification.olsName = '网点名称不能为空';
					return false;
				} else {
					this.verification.olsName = '';
					return true;
				}
			},
			VerifyCellAddress() {
				if (this.query.address == '') {
					this.verification.address = '地址不能为空';
					return false;
				} else {
					this.verification.address = '';
					return true;
				}
			},
			VerifyCellMobile() {
				if (this.query.mobile == '') {
					this.verification.mobile = '手机号不能为空';
					return false;
				} else if (!isPhone(this.query.mobile)) {
					this.verification.mobile = '手机号不正确';
					return false;
				} else {
					this.verification.mobile = '';
					return true;
				}
			},
			VerifyCellIntro() {
				if (this.query.intro == '') {
					this.verification.intro = '简介不能为空';
					return false;
				} else {
					this.verification.intro = '';
					return true;
				}
			},
		},
		components: {
			NavBar,
			OrderInfo
		}
	}
</script>
<style lang="scss" scoped>
	@import '~assets/css/mixin.scss';
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
	.c-order {
		@include wh(100%, 100%);


	}

	.require {
		color: #FC4B4C;
	}

	.error-image {
		color: #ee0a24;
		font-size: 12px;
		text-align: left;
	}

	.textarea,
	textarea {
		width: 100%;
		height: 173px;
		background: #EFEFEF;
		border-radius: 5px;
		resize: none;
		color: #AAAAAA;
		font-size: 14px;
		line-height: 20px;
		padding: 10px;
	}

	.order-detail {
		height: calc(100% - 44px);
		padding: 1rem;
		overflow-y: scroll;
		background: #F7F7F7;
	}

	.form {
		background: $fc;
		border-radius: 10px;
	}

	.btn {
		margin: .75rem auto 0;
		width: 14.7rem;
	}

	/deep/ .van-field__label {
		color: #333;
	}

	.title {
		width: 44%;
		font-size: 15px;
		line-height: 40px;
		color: #333333;
		padding-left: 10px;
	}

	.modify {
		font-size: 12px;
		color: #AAAAAA;
	}

	.padding20 {
		padding: 0 20px 5px;
	}

	.mark {
		font-size: 12px;
		color: #AAAAAA;
		padding-left: 20px;
	
	}

	.preview-cover {
		position: absolute;
		bottom: 0;
		box-sizing: border-box;
		border-radius: 5px;

		line-height: 80px;
		padding: 4px;
		color: #fff;
		font-size: 12px;
		text-align: center;
		background: rgba(0, 0, 0, 0.3);
	}
</style>