<template>
  <div class="c-order">
    <NavBar>
      <div slot="center">订单详情</div>
    </NavBar>
    <div class="order-detail">
      <div class="order">
        <div class="top">
          <div class="top-left">
            <img src="" alt="">
            <span class="name">未来宝贝高新区灵溪中心</span>
          </div>
          <div class="top-right">新订单</div>
        </div>
        <div class="center">
          <img src="../../assets/img/icon_ka.png" alt="">
          <div>
            <div>蒙台梭利托育课程</div>
            <div>单月卡</div>
          </div>
        </div>
        <div class="price">
          <div class="total-price common">
            <span class="font6">总价</span>
            <div>
              <span class="font4">&yen;</span><span class="font6">2580.</span><span class="font4">00</span>
            </div>
          </div>
          <div class="deduction common">
            <span class="font6">抵扣</span>
            <div>
              <span class="font4">&yen;</span><span class="font6">2580.</span><span class="font4">00</span>
            </div>

          </div>
          <div class="real-payment common">
            <span class="font6">实付额</span>
            <div>
              <span class="font4">&yen;</span><span class="font6">2580.</span><span class="font4">00</span>
            </div>
          </div>

        </div>
      </div>
      <OrderInfo></OrderInfo>
      <div class="btns">
        <div @click="show=true">学习打卡</div>
        <div>返回上一页</div>
      </div>
    </div>
    <van-overlay :show="show" @click="show=false">
      <div class="wrapper">
        <div class="block">
          <img src="" alt="">
          <div class="title">确认打卡</div>
          <div class="dec">您本次打卡后，即开始扣课时，课时有效期1个月。是否继续打卡？</div>
        </div>
      </div>
    </van-overlay>


  </div>


  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';
  import OrderInfo from 'components/page/OrderInfo'

  export default {
    data() {
      return {
        show: false
      }
    },
    components: {
      NavBar,
      OrderInfo
    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .c-order {
    @include wh(100%, 100%);


  }



  .order-detail {
    height: calc(100% - 44px);
    padding: 1rem;
    overflow-y: scroll;
    background: #F7F7F7;

    .order {

      margin-bottom: .5rem;
      padding: 1rem;
      background: $fc;
      box-shadow: 0rem 0.1rem 0.2rem 0rem rgba(230, 230, 230, 0.4);
      border-radius: 0.5rem;
      font-family: PingFangSC-Regular, PingFang SC;

      .top {
        @include fj();
        align-items: center;
        font-size: .6rem;


        .top-left {
          @include fj();
          align-items: center;

          img {
            @include wh(1.5rem, 1.5rem);
            background: #000;
            border-radius: 0.2rem;
            margin-right: .5rem;
          }

          .name {
            color: #333;
          }
        }

        .top-right {
          color: #FC4B4C;
        }

        .expire {
          color: #FCA64B;
        }
      }

      .center {
        @include fj(flex-start);
        align-items: center;
        margin-top: 1rem;

        img {
          @include wh(4rem, 2.25rem);
          margin-right: .5rem;

        }

        >div {
          @include sc(.7rem, #333);
          @include fj();
          flex-direction: column;

        }
      }

      .price {
        /* @include fj(flex-end);
        align-items: center; */
        margin-top: 1rem;

        .common {

          @include fj();
          margin-top: .5rem;
          align-items: center;
          color: #333;

          font-family: PingFangSC-Regular, PingFang SC;
          letter-spacing: 0;

          >div {
            @include fj(flex-start);
          }

          .font6 {
            font-size: .6rem;

          }

          .font4 {
            font-size: .6rem;

            -webkit-transform: scale(.67);
            *font-size: 10px;
          }


        }




      }
    }

    .btns {
      @include fj(flex-end);
      margin-top: 2rem;

      >div {
        @include wh(6rem, 2rem);
        line-height: 2rem;
        text-align: center;
        margin-left: .5rem;
        border-radius: 1.1rem;
        font-size: 0.75rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 500;

      }

      div:first-child {
        color: $fc;
        background: #FC4B4C;

        box-shadow: 0rem 0.1rem 0.2rem 0rem #E65354;
      }

      div:last-child {
        color: #FC4B4C;
        background: $fc;
        box-shadow: 0rem 0.1rem 0.2rem 0rem #e6e6e6;
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
        background: #000;
        border: 0.1rem solid #FFFFFF;
      }
      .title{
        text-align: center;
font-size: 0.8rem;
font-family: PingFangSC-Medium, PingFang SC;
font-weight: 500;
color: #333333;
line-height: 1.1rem;
margin-top: 2.7rem;
      }
      .dec{
        margin-top: .75rem;
font-size: 0.7rem;
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #AAAAAA;
line-height: 1.1rem;
      }





    }
  }
</style>