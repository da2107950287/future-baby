<template>
  <div class="c-account">
    <NavBar>
      <div slot="center">账户信息</div>
      <div slot="right" @click="$router.push('/accountDetails')">账户明细</div>
    </NavBar>
    <div class="content">
      <div class="account">
        <div class="title">余额（元）</div>
        <div class="price">
          <span>￥</span>
          <span>0.00</span>
        </div>
      </div>
      <div class="block"></div>
      <div class="top-up">
        <div class="title">充值金额</div>
        <div class="top-up-price">
          <div class="price-item active">100元</div>
          <div class="price-item">500元</div>
          <div class="price-item">1000元</div>
          <div class="price-item">2000元</div>
          <div class="price-item">3000元</div>
        </div>
        <van-field class="price" v-model="price" name=" " label="" placeholder="请输入自定义充值金额"
          :rules="[{ required: true, message: '请填写用户名' }]" />
      </div>
      <div class="btns">
        <div class="price-btn">支付金额：<span>100.00元</span></div>
        <div class="pay-btn">预约试听</div>
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

      }
    },
    components: {
      NavBar,


    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .c-account {
    @include wh(100%, 100%);

    .content {

      background-color: $fc;

      .account {
        @include wh(100%, 7.4rem);
        text-align: center;

        .title {
          margin-top: 1.5rem;
          @include sc(.65rem, #aaa);
        }

        .price {
          margin-top: .5rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;

          span:first-child {
            font-size: 1rem
          }

          span:last-child {
            font-size: 1.8rem;
          }
        }


      }

      .block {
        @include wh(100%, 10px);

        background: #F7F7F7;
      }

      .top-up {
        padding: 1rem;

        .title {
          @include sc(.75rem, #333);
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;

        }

        .top-up-price {
          @include fj(flex-start);
          flex-wrap: wrap;
          margin-top: .75rem;

          .price-item {
            @include wh(5.3rem, 3.5rem);
            @include sc(.75rem, #333);
            background: #F4F4F4;
            margin-bottom: .5rem;
            margin-right: .4rem;
            text-align: center;
            line-height: 3.5rem;
            border-radius: 0.25rem;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;


            &:nth-child(3n) {
              margin-right: 0;
            }
          }

          .active {
            color: $fc;
            background: #FC4B4C;
          }
        }

        .price {
          margin-top: .5rem;
          background: #F4F4F4;
        }
      }

      .btns {
        @include fj();
        position: fixed;
        bottom: 0;
        line-height: 2.2rem;
        text-align: center;
        font-size: 0.75rem;
        box-shadow: 0rem -0.1rem 0.2rem 0rem #EDEDED;

        .price-btn {
          width: 9.6rem;

          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #aaa;
          span{
            color: #FC4B4C
          }
        }

        .pay-btn {
          @include wh(9.15rem, 2.2rem);
          background: #FC4B4C;
          color: $fc;
      
          font-family: PingFangSC-Regular, PingFang SC;

        }
      }
    }
  }
</style>