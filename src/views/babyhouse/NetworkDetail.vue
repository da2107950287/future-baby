<template>
  <div class="brand-intro">
    <NavBar>
      <div slot="center">网点详情</div>
    </NavBar>
    <div class="content">
      <div class="top">
        <img class="cover" src="" alt="">
        <div class="network-intro">
          <div class="network-name-box">
            <div class="name">未来宝贝成都高新中心</div>
            <div class="attention">关注</div>
          </div>
          <div class="icon-box">
            <span class="iconfont icon-weizhi icon"></span>
            <div class="location">四川省成都市双流区华阳华府大道一段655号</div>
          </div>
          <div class="icon-box">
            <span class="iconfont icon-dianhua icon"></span>
            <div class="tel">19954271652</div>
          </div>
        </div>
        <div class="qrcode">
          <div class="left-text">网点扫码</div>
          <div class="right" @click="getQrcode">
            <span class="right-text">点击获取</span>
            <span class="iconfont icon-erweima icon"></span>
          </div>
        </div>
      </div>
      <div class="blank"></div>
      <div class="center">
        <div class="card">
          <div class="name">
            <div>蒙台梭利托育课程</div>
            <div>MONTESSORI EDUCATION </div>
          </div>
          <div class="card-type">单月卡</div>
          <div class="detail">
            <div>
              <span>查看详情</span>
              <span></span>
            </div>
            <div class="price">
              ￥<span>2500</span>
              <span>购买</span>
            </div>
          </div>
        </div>
        <div class="intro">
          <div class="title">园区介绍</div>
          <div>高新区灵溪中心于2015年8月开园，致力于将未来宝贝的教育理念和课程带给成都高新的宝宝们，让宝宝们在爱与自由的环境中快乐成长。</div>
        </div>
        <div class="intro">
          <div class="title">园区动态</div>
          <!-- <div>
            <DynamicItem></DynamicItem>
          </div> -->
          <div class="not-vip">
            <img src="../../assets/img/icon_suo.png" alt="">
            <div>点击开通VIP后查看园区动态 >></div>
          </div>
        </div>

      </div>
      <div class="wrap">
        <div class="bottom">
          <div class="bottom-left">
            <div>
              <span class="iconfont icon-fanhui icon"></span>
              <span>&nbsp;返回</span>
            </div>
            <div>
              <span class="iconfont icon-shouye icon"></span>
              <span>&nbsp;返回首页</span>
            </div>
          </div>
          <div class="btn">预约试听</div>
        </div>
      </div>

    </div>
    <van-overlay :show="show" @click="close">
      <div class="wrapper">
        <div class="block">
          <img src="" alt="">
          <div class="content">
            <div class="network-intro">
              <div class="network-name-box">
                <div class="name">未来宝贝成都高新中心</div>
              </div>
              <div class="icon-box">
                <span class="iconfont icon-weizhi icon"></span>
                <div class="location">四川省成都市双流区华阳华府大道一段655号</div>
              </div>
              <div class="icon-box">
                <span class="iconfont icon-dianhua icon"></span>
                <div class="tel">19954271652</div>
              </div>
            </div>
            <div class="qrcode">

            </div>


          </div>
          <div class="btns">
            <div>
              <img src="~assets/img/icon_friend.png" alt="">
              <div>发送给朋友</div>
            </div>
            <div>
              <img src="~assets/img/icon_photo.png" alt="">
              <div>保存到相册</div>
            </div>
          </div>
        </div>
      </div>
    </van-overlay>

  </div>
  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';
  import LogoTel from 'components/page/LogoTel.vue';
  import DynamicItem from 'components/page/DynamicItem.vue'

  export default {
    data() {
      return {
        show: false,
      }
    },
    methods: {
      getQrcode() {
        this.show = true;
      },
      close() {
        this.show = false
        console.log(this.show)
      }
    },
    components: {
      NavBar,
      LogoTel, DynamicItem

    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .content {


    .top {
      padding: 0 1rem;

      .cover {
        @include wh(16.75rem, 7.7rem);
        border-radius: 0.5rem;
        background-color: #000;

      }

      .qrcode {
        @include fj();
        @include wh(100%, 2.5rem);
        line-height: 2.5rem;

        .left-text {
          @include sc(.75rem, #333);
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;

        }

        .right {
          display: flex;
          align-items: center;

          .right-text {
            @include sc(.6rem, #aaa);
            font-family: PingFangSC-Regular, PingFang SC;


          }

          .icon {
            color: #aaa;
            margin-left: .45rem;
          }
        }


      }


    }



    .blank {
      @include wh(100%, 10px);
      background: #F7F7F7;
    }

    .center {
      padding: .95rem 1rem 0;

      .card {
        @include fj();
        @include wh(16.7rem, 9.4rem);

        flex-direction: column;
        position: relative;
        padding: 1rem;
        border-radius: .5rem;
        background: linear-gradient(245deg, #F4D7A4 0%, #DAB074 100%);

        .name {
          div {
            font-weight: 600;
            font-family: PingFangSC-Semibold, PingFang SC;

            color: $fc;
          }

          div:first-child {
            font-size: 0.85rem;
          }

          div:last-child {
            font-size: 0.5rem;

          }
        }

        .card-type {
          @include center();
          @include sc(1.5rem, $fc) font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;

        }

        .detail {
          @include fj();
          align-items: center;

          div {
            @include sc(.6rem, $fc);
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;

            &.price {
              @include wh(5.35rem, 1.5rem);

              background: #B08E5B;
              border-radius: 0.75rem;
              text-align: center;
              line-height: 1.5rem;

              span:first-child {
                font-size: .8rem;
              }

              span:last-child {
                font-size: .7rem;
                margin-left: .25rem;
              }
            }
          }
        }
      }

      .intro {
        margin-top: 1rem;

        .title::before {
          content: "";
          @include wh(.2rem, .75rem);
          position: absolute;
          left: -.5rem;
          top: .1rem;
          display: block;
          background: #F24142;
        }

        .title {

          @include sc(.75rem, #333);
          position: relative;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          margin-left: .5rem;
          margin-bottom: .6rem;

        }

        .not-vip {

          padding: 2.5rem 0 2.5rem;
          @include fj();
          flex-direction: column;
          align-items: center;

          img {
            @include wh(2.2rem, 2.2rem);

          }

          div {
            @include sc(.65rem, #FC4B4C);
            margin-top: .5rem;

            font-family: PingFangSC-Regular, PingFang SC;

          }
        }
      }

    }

    .wrap {
      height: 2.2rem
    }

    .bottom {

      @include wh(100%, 2.2rem);
      @include fj();
      background: $fc;
      box-shadow: 0rem -0.1rem 0.2rem 0rem #EDEDED;
      position: fixed;
      bottom: 0;

      .bottom-left {
        @include fj();
        @include wh(9.6rem, 100%);


        div {
          width: 50%;
          text-align: center;
          line-height: 2.2rem;

          span {
            @include sc(.65rem, #aaa);
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;

          }

          span.icon {
            font-size: .9rem;
          }
        }

      }

      .btn {
        @include wh(9.15rem, 2.2rem);
        @include sc(.75rem, $fc);
        text-align: center;
        line-height: 2.2rem;
        background: #FC4B4C;
        font-family: PingFangSC-Regular, PingFang SC;


      }


    }




  }

  .network-intro {
    padding: .95rem 0;
    border-bottom: 1px solid #EEEEEE;

    .network-name-box {
      @include fj();
      align-item: center;

      .name {
        font-size: 0.75rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
      }

      .attention {
        @include wh(2.5rem, 1.2rem);
        @include font(.5rem, 1.2rem, PingFangSC-Regula);
        background: #F24142;
        border-radius: 0.2rem;
        color: $fc;
        text-align: center;

      }

    }

    .icon-box {
      @include fj(flex-start);
      margin-top: .5rem;
      align-items: center;
      font-family: PingFangSC-Regular, PingFang SC;

      .icon {
        @include sc(.64rem, #aaa) margin-right: .55rem;
      }

      .location {
        @include sc(.65rem, #333);
        font-family: PingFangSC-Regular, PingFang SC;
      }

      .tel {
        @include sc(.65rem, #41A1F2);
        font-family: PingFangSC-Regular, PingFang SC;
      }
    }


  }

  .wrapper {
    @include fj(center);
    align-items: center;
    height: 100%;

    .block {
      @include wh(14.75rem, 23.75rem);
      background: $fc;

      border-radius: 0.5rem;

      >img {
        @include wh(100%, 6.7rem) border-radius: 0.5rem 0.5rem 0rem 0rem;
        background-color: #000;
      }

      .content {
        padding-left: 1rem;
        padding-right: 1rem;

        .qrcode {
          @include wh(7rem, 7rem)
          margin: 0 auto;
        }


      }

      .btns {
        @include wh(100%, 3rem);
        @include fj(flex-start);
        background: #F3F3F3;
        padding: 0 1rem;
        border-radius: 0rem 0rem 0.5rem 0.5rem;

        >div {
          margin-right: 1.5rem;
          margin-top: .3rem;
          text-align: center;

          img {
            @include wh(1.1rem, 1.1rem)
          }

          div {
            @include sc(.6rem, #aaa);
            font-family: PingFangSC-Regular, PingFang SC;

          }
        }
      }
    }
  }
</style>