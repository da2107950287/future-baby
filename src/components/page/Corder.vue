<template>
  <div class="order">
    <div class="total">
      <div class="total-left">
        <span>总订单：3</span>
        <span>总金额：￥75440</span>
      </div>
      <img class="total-right" src="../../assets/img/icon_clen.png" alt="">
    </div>
    <div class="order-item">
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
        <div class="total-price">
          <span class="font6">总价</span><span class="font4">&yen;</span><span class="font6">2580.</span><span
            class="font4">00</span>
        </div>
        <div class="deduction">
          <span class="font6">抵扣</span><span class="font4">&yen;</span><span class="font6">2580.</span><span
            class="font4">00</span>

        </div>
        <div class="real-payment">
          <span class="font6">实付额</span><span class="font4">&yen;</span><span class="font6">2580.</span><span
            class="font4">00</span>

        </div>
      </div>
    </div>
    <div class="order-item">
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
        <div class="total-price">
          <span class="font6">总价</span><span class="font4">&yen;</span><span class="font6">2580.</span><span class="font4">00</span>
        </div>
        <div class="deduction">
          <span class="font6">抵扣</span><span class="font4">&yen;</span><span class="font6">2580.</span><span class="font4">00</span>

        </div>
        <div class="real-payment">
          <span class="font6">实付额</span><span class="font4">&yen;</span><span class="font6">2580.</span><span class="font4">00</span>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {

  }
</script>
<style lang="scss" scopde>
  @import '~assets/css/mixin.scss';

  .order {
    padding: 0 1rem;
    background: #F7F7F7;

    .total {
      @include fj();
      align-items: center;
      margin: .75rem 0 .7rem;

      .total-left {
        span {
          @include sc(.6rem, #aaaaaa);
          font-family: PingFangSC-Regular, PingFang SC;

        }

        span:first-child {
          margin-right: 1.5rem;
        }
      }

      .total-right {
        @include wh(1rem, 1rem);
      }
    }

    .order-item {
      @incldue wh(16.75rem, 9.1rem);
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

      
    }
  }
</style>