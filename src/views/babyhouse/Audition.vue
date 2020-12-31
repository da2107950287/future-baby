<template>
  <div class="audition">
    <NavBar>
      <div slot="center">预约试听</div>
    </NavBar>
    <div class="content">
      <img class="cover" :src="$route.query.cover" alt="">
      <div class="form-box">
        <van-form class="form">
          <van-field v-model="query.fullname" name="姓名" label="姓名" placeholder="请填写姓名"
            :error-message="verification.fullname" @blur="VerifyCellFullName" />
          <van-field v-model="query.mobile" type="tel" name="手机" label="手机" placeholder="请填写手机号码"
            :error-message="verification.mobile" @blur="VerifyCellMobile" />
          <van-field name="radio" label="宝宝性别" :error-message="verification.sex">
            <template #input>
              <van-radio-group v-model="query.sex" direction="horizontal" >
                <van-radio checked-color="#FC4B4C" name="男">男</van-radio>
                <van-radio checked-color="#FC4B4C" name="女">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field readonly is-link name="calendar" v-model="query.birthday" label="宝宝生日" placeholder="请选择宝宝生日"
            @click="showCalendar = true" :error-message="verification.birthday" @input="VerifyCellBirthday" />
          <van-calendar v-model="showCalendar" @confirm="onConfirm" />
        </van-form>
        <van-button class="btn" round block color="#FC4B4C" native-type="submit" @click="submit">立即预约</van-button>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';
  import { isPhone, formatDate } from "assets/js/utils.js";
  export default {
    data() {
      return {
        query: {
          olsId: '',//网点ID
          fullname: '',//昵称
          mobile: '',//手机号
          sex: '',//性别
          birthday: '',//生日
        },
        verification: {
          fullname: '',
          mobile: '',
          sex: '',
          birthday: '',
        },//错误提示
        showCalendar: false,//是否显示日历
      };
    },
    created() {
      this.query.olsId = this.$route.query.olsId;
    },
    methods: {
      //立即预约
      submit(values) {
        if (!this.VerifyCellFullName()) return false;
        if (!this.VerifyCellMobile()) return false;
        if (this.query.sex == '') {
          this.verification.sex = '性别不能为空';
          return false;
        }
        if (!this.VerifyCellBirthday()) return false;
        this.$http('/outlets/insertSubscribe', this.query).then(res => {
          if (res.code == 200) {
            this.$toast.success(res.msg);
            this.$router.go(-1)
          } else if (code == 500) {
            this.$toast.fail(res.msg);
          }
        })
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
      //验证生日
      VerifyCellBirthday() {
        if (this.query.birthday == '') {
          this.verification.birthday = '宝宝生日不能为空';
          return false;
        } else {
          this.verification.birthday = '';
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

  .audition {
    @include wh(100%, 100%);
  }

  .content {
    @include wh(100%, 100%);
    background: #f7f7f7;
    padding: 1rem;


    .cover {
      @include wh(100%, 9.4rem);

      border-radius: 0.5rem;
    }

    .form-box {
      margin-top: 1rem;

      .form {
        background: $fc;

        box-shadow: 0rem 0.1rem 0.2rem 0rem rgba(230, 230, 230, 0.4);
        border-radius: 0.5rem;

      }

      .btn {
        margin-top: 2rem;
      }
    }
  }
</style>