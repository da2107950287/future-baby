<template>
  <div class="audition">
    <NavBar>
      <div slot="center">预约一周免费试听课</div>
    </NavBar>
    <div class="content">
      <img class="cover" :src="$route.query.cover" alt="">
      <div class="form-box">
        <van-form class="form">
          <van-field v-model="query.fullname" name="宝宝姓名" label="宝宝姓名" placeholder="请填写"
            :error-message="verification.fullname" @blur="VerifyCellFullName" required />
          <van-field name="radio" label="宝宝性别" :error-message="verification.sex">
            <template #input>
              <van-radio-group v-model="query.sex" direction="horizontal">
                <van-radio checked-color="#FC4B4C" name="男">男</van-radio>
                <van-radio checked-color="#FC4B4C" name="女">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field readonly is-link name="calendar" v-model="query.birthday" label="宝宝生日" placeholder="请选择宝宝生日"
            @click="showCalendar = true" :error-message="verification.birthday" />
          <van-popup v-model="showCalendar" position="bottom">
            <van-datetime-picker v-model="currentDate" type="date" :minDate="minDate" :maxDate="maxDate"
              @confirm="onConfirm" @cancel="showCalendar = false" />
          </van-popup>
          <van-field is-link @click="showIndentity = true" v-model="query.parentIdentity" name="家长身份" label="家长身份"
            placeholder="请填写" :error-message="verification.parentIdentity" required @input="VerifyCellParentIdentity" />
          <van-action-sheet v-model="showIndentity" :actions="actions" @select="onSelect" />
          <van-field v-model="query.parentFullname" name="家长姓名" label="家长姓名" placeholder="请填写"
            :error-message="verification.parentFullname" />
          <van-field v-model="query.mobile" name="家长手机" type="tel" maxlength=11 label="家长手机" placeholder="请填写"
            :error-message="verification.mobile" @blur="VerifyCellMobile" required />
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
        currentDate: new Date(),
        minDate: new Date(1970, 0, 1),
        maxDate: new Date(2099, 11, 31),
        query: {
          olsId: '',//网点ID
          fullname: '',//昵称
          mobile: '',//手机号
          sex: '男',//性别
          birthday: '',//生日
          parentFullname: '',//家长姓名
          parentIdentity: '',//家长身份
        },
        verification: {
          fullname: '',
          mobile: '',
          parentIdentity: ''
        },//错误提示
        showCalendar: false,//是否显示日历
        showIndentity: false,
        actions: [{ name: '父亲' }, { name: '母亲' }],

      };
    },
   

    created() {
      this.query.olsId = this.$route.query.olsId;
    },
    methods: {
      onSelect(item) {
        this.showIndentity = false;
        this.query.parentIdentity = item.name

      },
      //立即预约
      submit() {
        if (!this.VerifyCellFullName()) return false;
        if (!this.VerifyCellMobile()) return false;
        if (!this.VerifyCellParentIdentity()) return false;
        this.$http('/outlets/insertSubscribe', this.query).then(res => {
          if (res.code == 200) {
            this.$toast.success(res.msg);
            this.$router.push({path:'/networkDetail',query:{olsId:this.query.olsId }})
          } else if (code == 500) {
            this.$toast.fail(res.msg);
          }
        })

      },
      //验证姓名
      VerifyCellFullName() {
        this.query.fullname = this.query.fullname.replace(/[ ]/g, "").replace(/[\r\n]/g, "").replace(/\u2006/g, "")
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
        this.query.mobile = this.query.mobile.replace(/[ ]/g, "").replace(/[\r\n]/g, "").replace(/\u2006/g, "")

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
      //家长身份
      VerifyCellParentIdentity() {
        if (this.query.parentIdentity == '') {
          this.verification.parentIdentity = '家长身份不能为空';
          return false;
        } else {
          this.verification.parentIdentity = '';
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