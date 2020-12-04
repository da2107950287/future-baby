<template>
  <div class="personal-info">
    <NavBar>
      <div slot="center">个人信息</div>
    </NavBar>

    <div class="form-box">
      <van-form class="form" @submit="onSubmit" scroll-to-error label-width="3.1rem">
        <van-field v-model="username" name=" 姓名" label="姓名" placeholder="请填写用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" required />
        <van-field v-model="password" type="password" name="手机" label="手机" placeholder="请填写手机号码"
          :rules="[{ required: true, message: '请填写手机号码' }]" required />
        <van-field readonly clickable name="calendar" :value="value" label="生日" placeholder="请选择您的生日"
          @click="showCalendar = true" required />
        <van-calendar v-model="showCalendar" @confirm="onConfirm" />
        <van-field name="radio" label="性别" required>
          <template #input>
            <van-radio-group v-model="radio" direction="horizontal">
              <van-radio checked-color="#FC4B4C" name="1">男</van-radio>
              <van-radio checked-color="#FC4B4C" name="2">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field readonly clickable name="picker" :value="value" label="城市" placeholder="请选择城市"
          @click="showPicker = true" required />
        <van-field v-model="username" name="详细地址" label="详细地址" placeholder="请填写详细的地址"
          :rules="[{ required: true, message: '请填写详细的地址' }]" />

      </van-form>
      <van-button class="btn" round block color="#FC4B4C" native-type="submit">保存</van-button>
    </div>


  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';

  export default {
    data() {
      return {

      }
    },
    components: {
      NavBar,

    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .form-box {
    padding: 1rem;

    background: #F7F7F7;

    .form {

      box-shadow: 0rem 0.1rem 0.2rem 0rem rgba(230, 230, 230, 0.4);
      border-radius: 0.5rem;

      
    }
    .btn {
        margin-top: 2rem;
      }
  }
</style>