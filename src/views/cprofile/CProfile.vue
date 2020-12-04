<template>
  <div class="c-profile">
    <LogoTel class="logotel"></LogoTel>
    <div class="img-box">
      <div class="left">
        <img src="" alt="">
        <div>凌子就</div>
      </div>
      <router-link tag="div" to="/PersonalInfo" class="right">
        <span>查看</span>
        <div class="iconfont icon-fanhui2"></div>
      </router-link>
    </div>
    <div class="card">
      <div class="card-left">
        <div>
          <span class="name">未来宝贝成都高新中心</span>
          <span class="status">在学</span>
        </div>
        <div class="date">有效期：2022年9月23日</div>
      </div>
      <div class="card-right">续费</div>
    </div>
    <div class="order">
      <div class="title">
        <span class="left">我的订单</span>
        <router-link tag="div" to="/corder" class="right">
          <span>全部订单</span>
          <div class="iconfont icon-fanhui2"></div>
        </router-link >
      </div>
      <div class="items">
        <div class="item">
          <img src="~assets/img/cprofile/icon_jinxinzhong.png" alt="">
          <div>进行中</div>
        </div>
        <div class="item">
          <img src="~assets/img/cprofile/icon_xindingdan.png" alt="">
          <div>新订单</div>
        </div>
        <div class="item">
          <img src="~assets/img/cprofile/icon_guoqi.png" alt="">
          <div>即将过期</div>
        </div>
        <div class="item">
          <img src="~assets/img/cprofile/icon_shixiao.png" alt="">
          <div>失效订单</div>
        </div>
      </div>
    </div>
    <img class="activity" src="" alt="">
    <div class="itembars">
      <div class="item">
        <img src="~assets/img/cprofile/icon_cash.png" alt="">
        <div>账号余额</div>
      </div>
      <div class="item">
        <img src="~assets/img/cprofile/icon_follows.png" alt="">
        <div>关注网点</div>
      </div>
      <div class="item">
        <img src="~assets/img/cprofile/icon_quan.png" alt="">
        <div>抵扣券</div>
      </div>
      <div class="item">
        <img src="~assets/img/cprofile/icon_collets.png" alt="">
        <div>收藏</div>
      </div>
      <div class="item">
        <img src="~assets/img/cprofile/icon_zix.png" alt="">
        <div>在线咨询</div>
      </div>
      <div class="item">
        <img src="~assets/img/cprofile/icon_about_us.png" alt="">
        <div>关于我们</div>
      </div>
      <div class="item">
        <img src="~assets/img/cprofile/icon_shez.png" alt="">
        <div>设置</div>
      </div>
    </div>
    <MainTabBar></MainTabBar>
  </div>
  </div>
</template>
<script>
  import LogoTel from 'components/page/LogoTel.vue';
  import MainTabBar from "components/page/mainTabbar/MainTabBar.vue"

  export default {
    data() {
      return {

      }
    },
    components: {
      LogoTel,
      MainTabBar
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
          @include sc(.75rem, #333);

          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;

        }
      }

      .right {
        @include fj();
        @include sc(.6rem, #aaa);
        align-items: center;
        font-family: PingFangSC-Regular, PingFang SC;


        div:last-child {

          transform: rotate(180deg);
          margin-left: .5rem;

        }
      }
    }

    .card {
      @include fj();
      align-items: center;
      margin: 1.5rem 1rem;
      padding: .8rem .85rem .8rem 1rem;
      background: #FFEFDB;
      border-radius: .5rem;
      border: .05rem solid #FFD3B0;

      .card-left {
        div:first-child {
          span {
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;

            &.name {
              @include sc(.75rem, #8B7054);
              margin-right: .5rem;
            }

            &.status {
              @include sc(.65rem, #F38A4A)
            }
          }


        }

        div.date {
          @include sc(.6rem, #8B7054);
          margin-top: .5rem;
          font-family: PingFangSC-Regular, PingFang SC;

        }
      }

      .card-right {
        @include wh(2.5rem, 2.5rem);
        @include sc(.65rem, #FFEFDB);
        border-radius: 50%;
        text-align: center;
        line-height: 2.5rem;
        background: #8B7154;
        box-shadow: 0rem 0.1rem 0.2rem 0rem #FFD7A5;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
      }
    }

    .order {
      padding: 0 1rem;

      .title {
        @include fj();
        align-items: center;

        .left {
          @include sc(.75rem, #333);
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;

        }

        .right {
          @include fj();
          @include sc(.6rem, #aaa);
          font-family: PingFangSC-Regular, PingFang SC;

          div:last-child {

            transform: rotate(180deg);
            margin-left: .5rem;

          }
        }
      }

      .items {
        @include fj(space-around);
        margin-top: .8rem;
        align-items: center;

        .item {
          text-align: center;

          img {
            @include wh(1.5rem, 1.5rem);
          }

          div {
            @include sc(.65rem, #999);
            font-family: PingFangSC-Regular, PingFang SC;

          }
        }
      }
    }

    .activity {
      @include wh(16.75rem, 3.5rem);
      margin: 1.5rem 1rem;
      border-radius: 0.3rem;
      background: #000;

    }

    .itembars {
      padding: 0 1rem;
      @include fj(flex-start);
      flex-wrap: wrap;

      .item {
        width: 25%;
        margin-bottom: 1.5rem;
        text-align: center;

        img {
          @include wh(1.5rem, 1.5rem);
        }

        div {
          @include sc(.65rem, #333);
          font-family: PingFangSC-Regular, PingFang SC;

        }
      }

    }
  }
</style>