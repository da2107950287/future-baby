<template>
  <div class="personal-info">
    <NavBar>
      <div slot="center">个人信息</div>
    </NavBar>
    <div class="form-box">
      <van-form class="form" scroll-to-error label-width="3.1rem">
        <van-field v-model="query.nickname" name=" 姓名" label="姓名" placeholder="请填写用户名"
          :error-message="verification.nickname" @blur="VerifyCellNickname" required />
        <van-field v-model="query.account" type="tel" name="手机" label="手机" placeholder="请填写手机号码"
          :error-message="verification.account" @blur="VerifyCellMobile" required />
        <van-field right-icon="arrow" readonly clickable name="calendar" :value="query.birthday" label="生日"
          placeholder="请选择您的生日" @click="showCalendar = true" :error-message="verification.birthday"
          @input="VerifyCellBirthday" required />
        <van-calendar :minDate="new Date(1970,1,1)" v-model="showCalendar" @confirm="onConfirm" />
        <van-field name="radio" label="性别" required>
          <template #input>
            <van-radio-group v-model="query.sex" direction="horizontal" :error-message="verification.sex"
               required>
              <van-radio checked-color="#FC4B4C" name="男">男</van-radio>
              <van-radio checked-color="#FC4B4C" name="女">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field right-icon="arrow" readonly clickable name="picker" :value="query.city" label="城市"
          placeholder="请选择城市" @click="showPicker = true" :error-message="verification.city" @input="VerifyCellCity"
          required />
        <van-action-sheet v-model="showPicker" title="请选择您所在城市">
          <div class="city-content">
            <div class="title">选择省份/城市</div>
            <div class="cities">
              <div v-if="!provinceId">
                <div v-for="item in provinceList" @click="getCityList(item.id)">
                  <span>{{item.letter}}</span>{{item.value}}
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
        <van-field v-model="query.address" name="详细地址" label="详细地址" placeholder="请填写详细的地址"
          :error-message="verification.address" @blur="VerifyCellAddress" required />
      </van-form>
      <van-button class="btn" round block color="#FC4B4C" @click="submit">保存</van-button>
    </div>
  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';
  import { isPhone, formatDate, chineseLetter, getStore } from "assets/js/utils.js";
  import region from "assets/js/region.js";
  export default {
    data() {
      return {
        showCalendar: false,//是否显示日历
        showPicker: false,//是否显示城市列表
        provinceId: "",//省份ID
        query: {
          nickname: "",//名称（网点名称）
          headportrait: "",//	头像
          sex: "",//性别 男女
          account: "",//手机号
          city: "",	//城市
          address: "",//地址
          birthday: "",//生日
        },
        verification: {
          nickname: "",//名称（网点名称）
          headportrait: "",//	头像
          sex: "",//性别 男女
          account: "",//手机号
          city: "",	//城市
          address: "",//地址
          birthday: "",//生日
        },//错误提示
      }
    },
    created() {
      this.showUserinfo();
      this.provinceList = chineseLetter(this.objToArr(86), 'value');
    },
    methods: {
      //获取用户信息
      showUserinfo() {
        this.$http('/userinfo/showUserinfo', {
          uid: getStore('uid')
        }).then(res => {
          if (res.code == 200) {
            if (res.data.sex == 1) {
              res.data.sex = '男'
            } else {
              res.data.sex = '女'
            }
            this.query = {
              nickname: res.data.nickname,//名称（网点名称）
              headportrait: res.data.headportrait,//	头像
              sex: res.data.sex,//性别 男女
              account: res.data.account,
              city: res.data.city,	//城市
              address: res.data.address,//地址
              birthday: res.data.birthday,//生日
            }
          }
        })
      },
      //对象转数组
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
      //保存
      submit() {
        if (!this.VerifyCellNickname()) return false;
        if (!this.VerifyCellMobile()) return false;
        if (!this.VerifyCellBirthday()) return false;
        if (this.query.sex == '') {
          this.verification.sex = '性别不能为空';
          return false;
        }
        if (!this.VerifyCellCity()) return false;
        if (!this.VerifyCellAddress()) return false;
        
       
      
        this.$http('/userinfo/updateUserinfo', this.query).then(res => {
          if (res.code == 200) {
            this.$toast.success(res.msg)
          } else if (code == 500) {
            this.$toast.fail(res.msg);
          }

        })
      },
      //验证昵称
      VerifyCellNickname() {
        if (this.query.nickname == '') {
          this.verification.nickname = '昵称不能为空';
          return false;
        } else {
          this.verification.nickname = '';
          return true;
        }
      },
     //验证手机号
      VerifyCellMobile() {
        if (this.query.account == '') {
          this.verification.account = '手机号不能为空';
          return false;
        } else if (!isPhone(this.query.account)) {
          this.verification.account = '手机号不正确';
          return false;
        } else {
          this.verification.account = '';
          return true;
        }
      },
      //验证生日
      VerifyCellBirthday() {
        if (this.query.birthday == '') {
          this.verification.birthday = '生日不能为空';
          return false;
        } else {
          this.verification.birthday = '';
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
      },
      //验证详细地址
      VerifyCellAddress() {
        if (this.query.address == '') {
          this.verification.address = '详细地址不能为空';
          return false;
        } else {
          this.verification.address = '';
          return true;
        }
      },
      //确认日期
      onConfirm(date) {
        this.showCalendar = false;
        this.query.birthday = formatDate(date);
      },
    },
    components: {
      NavBar,
    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .personal-info {
    @include wh(100%, 100%)
  }

  .form-box {
    @include wh(100%, calc(100% - 44px));
    padding: 1rem;

    background: #F7F7F7;

    .form {

      box-shadow: 0rem 0.1rem 0.2rem 0rem rgba(230, 230, 230, 0.4);
      border-radius: 0.5rem;


    }

    .btn {
      margin: 2rem auto 0;
      width: 14.7rem;
    }
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
</style>