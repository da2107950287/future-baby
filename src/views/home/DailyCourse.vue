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
          <GuideItem></GuideItem>
          <GuideItem></GuideItem>
          <GuideItem></GuideItem>
          <GuideItem></GuideItem>

          <!-- <div class="item">
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
          </div> -->
        </div>
       
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';
  import LogoTel from 'components/page/LogoTel.vue';
  import GuideItem from 'components/page/GuideItem.vue';
  export default {
    data() {
      return {

      }
    },
    components: {
      NavBar,
      LogoTel,
      GuideItem
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


     
    }
  }
</style>