<template>
  <div class="item">
    <img src="" alt="">
    <div class="dec">玩具国系列课程：把玩具送到你家</div>
  </div>
</template>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';
   .item {
        width: 8.1rem;
        margin-bottom: 1rem;
        font-size: 0.75rem;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #333333;
        line-height: 1.05rem;

        img {
          @include wh(8.1rem,8.1rem);
          background: #D8D8D8;
          border-radius: 0.5rem;
        }
        .dec{
          @include ellipse();
        }
      }
</style>