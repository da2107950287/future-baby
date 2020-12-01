<template>

</template><template>
  <div class="brand-intro">
    <NavBar>
      <div slot="center">每日课程</div>
    </NavBar>
    <div class="content">
      <LogoTel></LogoTel>
      <div>
        <img class="cover" src="" alt="">
        <div class="other">
          <div class="item">
            <img src="" alt="">
            <div class="dec">玩具国系列课程：把玩具送到你家</div>
          </div>
          <div class="item">
            <img src="" alt="">
            <div class="dec">未来宝贝商标释义</div>
          </div>
          <div class="item">
            <img src="" alt="">
            <div class="dec">未来宝贝核心成员</div>
          </div>
          <div class="item">
            <img src="" alt="">
            <div class="dec">未来宝贝之歌</div>
          </div>
          <div class="item">
            <img src="" alt="">
            <div class="dec">发展历程</div>
          </div>
          <div class="item">
            <img src="" alt="">
            <div class="dec">加入我们</div>
          </div>
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

  .content {
    padding: 0 1rem;

    .cover {
      width: 16.75rem;
      height: 7.7rem;
      border-radius: 0.5rem;
      background-color: #000;
      margin-bottom: 1rem;

    }

    .other {
      @include fj();
      
      flex-wrap: wrap;


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
    }
  }
</style>