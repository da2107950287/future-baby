<template>
  <div class="audition">
    <NavBar>
      <div slot="center">预约试听</div>
    </NavBar>
    <div class="content">
      <img class="cover" src="" alt="">
      <div class="form-box">
        <van-form class="form" @submit="onSubmit">
          <van-field v-model="username" name="姓名" label="姓名" placeholder="请填写姓名"
            :rules="[{ required: true, message: '请填写用户名' }]" />
          <van-field v-model="password" type="password" name="手机" label="手机" placeholder="请填写手机号码"
            :rules="[{ required: true, message: '请填写手机号码' }]" />
          <van-field name="radio" label="宝宝性别">
            <template #input>
              <van-radio-group v-model="radio" direction="horizontal">
                <van-radio checked-color="#FC4B4C" name="1">男</van-radio>
                <van-radio checked-color="#FC4B4C" name="2">女</van-radio>
              </van-radio-group>
            </template>
          </van-field>
          <van-field readonly clickable name="calendar" :value="value" label="宝宝生日" placeholder="请选择宝宝生日"
            @click="showCalendar = true" />
          <van-calendar v-model="showCalendar" @confirm="onConfirm" />
         
        </van-form>
        <van-button class="btn" round block color="#FC4B4C" native-type="submit">
          提交
        </van-button>
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
        username: '',
        password: '',
        radio: '1',
        date: '',
        showCalendar: false,
        value: ''
      };
    },
    methods: {
      onSubmit(values) {
        console.log('submit', values);
      },
      formatDate(date) {
        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
      },
      onConfirm(date) {
        this.showCalendar = false;
        this.value = this.formatDate(date);
      },
    },
    components: {
      NavBar,

    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';
.audition{
  @include wh(100%,100%);
}
  .content {
    @include wh(100%,100%);
    background: #f7f7f7;
    padding: 1rem;
  

    .cover {
      @include wh(100%, 9.4rem);

      border-radius: 0.5rem;
      background-color: #000;
    }

   .form-box{
    margin-top: 1rem;
    .form {
      background: $fc;
      
box-shadow: 0rem 0.1rem 0.2rem 0rem rgba(230, 230, 230, 0.4);
      border-radius: 0.5rem;
      
    }
    .btn{
        margin-top: 2rem;
      }
   }
  }
</style>