<template>
  <div class="c-profile">
    <LogoTel class="logotel"></LogoTel>
    <div class="img-box">
      <div class="left">
        <img src="" alt="">
        <div>凌子就</div>
      </div>
      <div class="right">
        <span>查看</span>
        <div class="iconfont icon-fanhui2"></div>
      </div>
    </div>

  </div>
  </div>
</template>
<script>
  import LogoTel from 'components/page/LogoTel.vue';
  export default {
    data() {
      return {

      }
    },
    components: {
      LogoTel
    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .c-profile {

    .logotel {
      padding: 0 .75rem;
    }

    .img-box {
      @include fj();
      padding: 0 1rem;

      .left {
        @include fj();
        align-items: center;

        img {
          @include wh(2.5rem, 2.5rem);
          border-radius: 50%;
          background: #000;
          margin-right: .5rem;
        }

        div {
          @include sc(.75rem,#333);

          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;

        }
      }
      .right{
        @include fj();
        align-items: center;

font-size: 0.6rem;
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #AAAAAA;
line-height: 0.85rem;
div:last-child{
 
  transform:rotate(180deg);
  margin-left: .5rem;
  
}
      }
    }
  }
</style>