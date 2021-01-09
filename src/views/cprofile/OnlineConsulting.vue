<template>
  <div class="account-detail">
    <NavBar>
      <div slot="center">在线咨询</div>
    </NavBar>
    <div class="content">
      <div class="wlbb">未来宝贝</div>
      <div class="tel" @click="show=true">
        <span class="iconfont icon-dianhua icon"></span>
        <span>{{tel}}</span>
      </div>
      <div class="text">当前没有客服在线，请留言</div>
      <div class="title1">留言内容</div>
      <van-field class="c-textarea" v-model="query.content" autosize type="textarea" placeholder="请输入留言内容，我们会尽快与您联系。"
        :error-message="verification.content" @blur="VerifyCellContent" />
      <van-field class="c-input" v-model="query.fullname" placeholder="姓名（必填）" :error-message="verification.fullname"
        @blur="VerifyCellFullName" />
      <van-field class="c-input" v-model="query.mobile" type="tel" placeholder="电话（必填）"
        :error-message="verification.mobile" @blur="VerifyCellMobile" />
      <van-field right-icon="arrow" class="c-input" v-model="query.city" placeholder="所在城市（必填）"
        @click="showPicker = true" :error-message="verification.city" @input="VerifyCellCity" />
      <van-action-sheet v-model="showPicker" title="请选择您所在城市">
        <div class="city-content">
          <div class="title">选择省份/城市</div>
          <div class="cities">
            <div v-if="!provinceId">
              <div v-for="item in provinceList" @click="getCityList(item.id)"><span>{{item.letter}}</span>{{item.value}}
              </div>
            </div>
            <div v-else>
              <div v-for="item in cityList" @click="query.city=item.value;showPicker=false;provinceId=''">
                <span>{{item.letter}}</span>
                {{item.value}}
              </div>
            </div>

          </div>
        </div>
      </van-action-sheet>
      <van-button class="btn" round color="#FC4B4C" @click="submit" block>发送</van-button>
    </div>
    <van-overlay :show="show" @click="show=false">
			<div class="wrapper">
				<div class="block">
					<img src="~assets/img/popup.png" alt="">
					<div class="title">联系总部客服</div>
					<div class="tel">电话：{{tel}}</div>
					<div class="confirm-btn" @click="call">确定</div>
					<div class="cancle-btn">取消</div>
				</div>
			</div>
		</van-overlay>
  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';
  import region from "assets/js/region.js";
  import { isPhone, chineseLetter } from "assets/js/utils.js";
  export default {
    data() {
      return {
        show:false,
        tel: "",//平台电话
        query: {
          fullname: "",//姓名
          mobile: "",//电话
          city: "",	//城市
          content: "",//内容
        },
        showPicker: false,//是否显示城市列表
        provinceId: "",//省份ID
        verification: {
          fullname: "",
          mobile: "",
          city: "",
          content: "",
        },//错误提示信息
        provinceList: [],
        cityList: []
      }
    },
    created() {
      this.getConfig();
      this.provinceList = chineseLetter(this.objToArr('86'), 'value');
    },
    methods: {
      call(){
        window.location.href=`tel://${this.tel}`;
      },
      objToArr(provinceId) {
        let arr = [];
        for (const key in region[provinceId]) {
          if (region[provinceId].hasOwnProperty.call(region[provinceId], key)) {
            arr.push({ id: key, value: region[provinceId][key] });
          }
        }
        return arr;
      },
      //获取城市列表
      getCityList(id) {
        this.provinceId = id
        this.cityList = chineseLetter(this.objToArr(id), 'value');
      },
      //查询基本信息配置
      getConfig() {
        this.$http('/other/showConfig').then(res => {
          if (res.code == 200) {
            this.tel = res.data.mobile;
          }
        })
      },
      //发送
      submit() {
        if (!this.VerifyCellContent()) return false;
        if (!this.VerifyCellFullName()) return false;
        if (!this.VerifyCellMobile()) return false;
        if (!this.VerifyCellCity()) return false;
        this.$http('/other/insertConsult',
          this.query
        ).then(res => {
          if (res.code == 200) {
            this.$toast.success(res.msg);
            this.$router.go(-1)
          } else if (code == 500) {
            this.$toast.fail(res.msg);
          }
        })
      },
      //验证留言
      VerifyCellContent() {
        if (this.query.content == '') {
          this.verification.content = '留言内容不能为空';
          return false;
        } else {
          this.verification.content = '';
          return true;
        }
      },
      //验证姓名
      VerifyCellFullName() {
        if (this.query.fullname == '') {
          this.verification.fullname = '姓名不能为空';
          return false;
        } else {
          this.verification.fullname = "";
          return true;
        }
      },
      //验证手机号
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
      //验证城市
      VerifyCellCity() {
        if (this.query.city == '') {
          this.verification.city = '城市不能为空';
          return false;
        } else {
          this.verification.city = '';
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

  .content {


    padding: .75rem 1rem;

    .wlbb {
      @include sc(.8rem, #333);
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;

    }

    .tel {
      @include sc(.65rem, #41A1F2);
      padding: .25rem 0 .5rem;
      border-bottom: 1px solid #eee;

      .icon {
        @include sc(.62rem, #aaa);
        margin-right: .55rem;

      }
    }

    .text {
      @include sc(.6rem, #aaa);
      margin-top: .7rem;

    }

    .title1 {
      @include sc(.7rem, #333);
      margin-top: 1rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;

    }

    .c-textarea {
      margin: .7rem 0 .5rem;
      height: 8.85rem;
      background: #F2F2F2;
      border-radius: 0.5rem;
    }

    .c-input {
      margin-top: .5rem;

      background: #F2F2F2;
      border-radius: 0.5rem;
    }

    .btn {
      @include wh(14.7rem, 2.2rem);
      margin: 2rem auto 0;

    }

    .city-content {
      padding: 0 1rem 1rem;
      height: 20rem;
      background: #FFFFFF;
      border-radius: 0.5rem 0.5rem 0rem 0rem;

      .title {
        @include sc(.6rem, #aaa);

      }



      .province,
      .city {
        @include sc(.7rem, #333);
      }

      .cities {
        /* margin-top: .85rem; */

        div {
          @include sc(.7rem, #333);
          line-height: 1.7rem;

          span {
            @include sc(.6rem, #aaa);
            margin-right: .5rem;
            width: .4rem;
            display: inline-block;

          }
        }
      }
    }
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