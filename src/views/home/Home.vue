<template>
  <div class="home">

    <header>
      <img src="~assets/img/home/wlbb.png" alt="">
      <div>400-688-9577</div>
    </header>
    <van-swipe class="my-swipe" :autoplay="3000" :width="300" :show-indicators="false">
      <van-swipe-item>1</van-swipe-item>
      <van-swipe-item>2</van-swipe-item>
      <van-swipe-item>3</van-swipe-item>
      <van-swipe-item>4</van-swipe-item>
    </van-swipe>

    <van-notice-bar left-icon="bell" class="notice" scrollable color="#999" background="#fff"
      text="恭喜恭喜，有5家园区加入未来宝贝！！" />
    <div class="navbar">
      <router-link tag='div' to="/brandIntro">
        <img src="~assets/img/home/ppjs.png" alt="">
      </router-link>
     
      <router-link tag='div' to="/parenting">
        <img src="~assets/img/home/yezs.png" alt="">
      </router-link>
      <router-link tag='div' to="/brandIntro">
        <img src="~assets/img/home/cysq.png" alt="">
      </router-link>
      <router-link tag='div' to="/dailyCourse">
        <img src="~assets/img/home/mrkc.png" alt="">
      </router-link>

    </div>
    <div class="rec">
      <div class="title">推荐</div>
      <div class="rec-box">
        <div class="item">
          <img src="" alt="">
          <div class="dec">玩具国系列课程：把玩具送到你家</div>
          <label for="">儿童之家</label>
        </div>
        <div class="item">
          <img src="" alt="">
          <div class="dec">玩具国系列课程：把玩具送到你家</div>
          <label for="">儿童之家</label>
        </div>
        <div class="item">
          <img src="" alt="">
          <div class="dec">玩具国系列课程：把玩具送到你家玩具国系列课程：把玩具送到你家</div>
          <label for="">儿童之家</label>
        </div>
      </div>
    </div>
    <MainTabBar></MainTabBar>
  </div>
</template>
<script>
  import MainTabBar from "components/page/mainTabbar/MainTabBar.vue"
  export default {
    data() {
      return {

      }
    },
    components: {
      MainTabBar
    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';


  .home {
    @include wh(100%, 100%);
    background-color: $fc;
  }

  header {
    @include wh(100%, 5rem);
    @include fj();
    @include font(.75rem, 1.05rem) padding: .75rem;
    font-weight: 600;
    color: $fc;
    background-color: #F24142;
    border-radius: 100% 100% 100% 100% / 0% 0% 60% 60%;

    img {
      @include wh(4.7rem, 1.5rem)
    }
  }

  .my-swipe {
    @include wh(100%, 7rem);
    position: absolute;
    top: 3.1rem;
    left: 50%;
    transform: translateX(-50%);
    /* background-color: #000; */
    box-shadow: 0rem 0.2rem 0.4rem 0rem rgba(230, 230, 230, 0.5);
    border-radius: 0.5rem;

    .van-swipe-item {
      @include wh(16.25rem, 7rem)
    }
  }

  .notice {
    margin-top: 5.6rem;
  }

  .navbar {
    @include fj();

    div {
      @include wh(25%, 3.5rem);
       flex: 1;

      img {
        height: 100%;

      }

    }
  }

  .rec {
    padding: .2rem 1.05rem 0 1rem;

    .title {

      font-size: 0.8rem;
      font-weight: 600;
      color: #333;
      line-height: 1.1rem;
    }

    .rec-box {
      @include fj();
      flex-wrap: wrap;
      margin-top: 1rem;

      .item {
        width: 8.1rem;
        margin-bottom: 1rem;

        img {
          width: 8.1rem;
          height: 4.55rem;
          background-color: #000;
          border-radius: 0.5rem;
        }

        .dec {
          @include ellipse();
          font-size: 0.75rem;
          font-weight: 600;
          color: #333;
          line-height: 1.05rem;
        }

        label {

          font-size: 0.65rem;
          color: #FF7373;
          line-height: 0.9rem;
        }
      }
    }
  }
</style>