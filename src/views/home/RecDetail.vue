<template>
  <div class="brand-intro">
    <NavBar>
      <div slot="center">详情</div>
    </NavBar>
    <div class="content">

    </div>
  <div class="wrap">
    <div class="bottom-btns">
      <div>
        <span class="iconfont icon-dianzan"></span> 点赞
      </div>
      <div>
        <span class="iconfont icon-fenxiang"></span> 分享
      </div>
      <div>
        <span class="iconfont icon-shouye"></span> 返回首页
      </div>
    </div>
  </div>
  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';
  import LogoTel from 'components/page/LogoTel.vue';
  export default {
    data() {
      return {

      }
    },
    components: {
      NavBar,
      LogoTel
    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

.wrap{
  height:2.2rem
}
  .bottom-btns {
    @include wh(100%, 2.2rem);
    @include fj(flex-end);

    background: $fc;
    box-shadow: 0rem -0.1rem 0.2rem 0rem #EDEDED;
    align-items: center;
    position:fixed;
    bottom:0;

    div {
      margin-right: 1rem;

      font-size: .65rem;
      font-family: PingFangSC-Regular, PingFang SC;
      color: #AAAAAA;

      span {
        font-size: .9rem;
      }

    }
  }
</style>