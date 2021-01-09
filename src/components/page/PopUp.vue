<template>
  <van-overlay :show="show" >
    <div class="wrapper">
      <div class="block">
        <img src="../../assets/img/popup.png" alt="">
        <div class="title">
          <slot name="title"></slot>
        </div>
        <div class="dec">
          <slot name="dec"></slot>
        </div>
        <div>
          <slot name="btn"></slot>
          <!-- <div class="btn red">
            <slot name="redBtn"></slot>
          </div> -->
          <!-- <div class="btn white">
            <slot name="whiteBtn"></slot>
          </div> -->
        </div>
      </div>
    </div>
  </van-overlay>
</template>
<script>
  export default {
    props: ["show"],
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .wrapper {
    @include fj(center);
    align-items: center;
    height: 100%;

    
  }
  .block {
      position: relative;
      width: 12.5rem;
      padding: 1rem;
      text-align: center;
      border-radius: 1rem;
      background: $fc;
      font-family: PingFangSC-Regular, PingFang SC;

     
    }
    img {
        @include wh(3rem, 3rem);
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        border: 0.1rem solid #FFFFFF;
      }

      .title {
        font-size: 0.8rem;
        font-weight: 500;
        color: #333333;
        margin-top: 2rem;
      }

      .dec {
        margin-top: .75rem;
        font-size: 0.7rem;

        color: #AAAAAA;
        line-height: 1.1rem;
      }

      .btn {
        @include wh(10.5rem, 2rem);
        text-align: center;
        line-height: 2rem;
        font-size: .75rem;
        border-radius: 0.2rem;
      }

      .red {
        background: #FC4B4C;
        color: $fc;
        margin-top: 1rem;
      }

      .white {
        color: #333;
      }
</style>