<template>
  <div class="brand-intro">
    <NavBar>
      <div slot="center">网点详情</div>
    </NavBar>
    <div class="content">
      <div class="top">
        <img class="cover" :src="info.image" alt="">
        <NetworkIntro :olsName="info.olsName" :address="address" :mobile="info.mobile">
          <div @click="setOutletsFollow" slot='btn' class="attention">
            <span v-if="info.followState==0">关注</span>
            <span v-else>已关注</span>
          </div>
        </NetworkIntro>
        <div style="height:1px;background: #eee;"></div>
        <div class="qrcode">
          <div class="left-text">网点扫码</div>
          <div class="right" @click="show=true">
            <span class="right-text">点击获取</span>
            <span class="iconfont icon-erweima icon"></span>
          </div>
        </div>
      </div>
      <div class="blank"></div>
      <div class="center">
        <Card :card="info.commodityEntity" :olsId="olsId"></Card>
        <div class="intro">
          <div class="title">园区介绍</div>
          <div class="intro-info">{{info.intro}}</div>
        </div>
        <div class="intro">
          <div class="title">园区动态</div>
          <div v-if="info.vipState==0" class="not-vip"
            @click="$router.push({path:'/orderPayment',query:{olsId:info.olsId}})">
            <img src="~assets/img/icon_suo.png" alt="">
            <div>点击开通VIP后查看园区动态 >></div>
          </div>
          <div v-else>
            <DynamicItem v-for="(item,index) in list" :item="item" :key="index"
              @updateClickState="updateClickState(index)" @updateCollState="updateCollState(index)">
            </DynamicItem>
          </div>
          <div>
          </div>
        </div>
      </div>
      <div class="wrap">
        <div class="bottom">
          <div class="bottom-left">
            <div @click="$router.go(-1)">
              <span class="iconfont icon-fanhui icon"></span>
              <span>&nbsp;返回</span>
            </div>
            <div @click="$router.push('/home')">
              <span class="iconfont icon-shouye icon"></span>
              <span>&nbsp;返回首页</span>
            </div>
          </div>
          <div class="btn" @click="$router.push({path:'/audition',query:{cover:info.image,olsId:info.olsId}})">预约试听
          </div>
        </div>
      </div>

    </div>
    <van-overlay :show="show" @click="show=false">
      <div class="wrapper">
        <!-- 合成图部分 -->
        <div class="block">
          <!-- 生成的分享图 -->
          <img class="share-img" ref="shareImg" :src="shareImg">
          <!-- </div> -->
          <div class="box" ref="box">
            <img class="purl" @load="imgload = true" :src="logo" alt="">
            <div class="content">
              <NetworkIntro :olsName="info.olsName" :address="address" :mobile="info.mobile"></NetworkIntro>
              <div class="qrcode" id="qrcode" ref="qrcode">
              </div>
            </div>
          </div>
          <div class="btns">
            <div class="btn" @click="isShow=true">
              <img src="~assets/img/icon_friend.png" alt="">
              <div>发送给朋友</div>
            </div>
            <a class="btn">
              <img src="~assets/img/icon_photo.png" alt="">
              <div>长按图片保存到相册</div>
            </a>
          </div>
        </div>
      </div>
    </van-overlay>
    <van-overlay :show="isShow" @click="close">
      <div class="wrapper">
        <div class="share">
          <img class="arrow" src="~assets/img/arrow.png" alt="">

          <img class="text" src="~assets/img/share.png" alt="">
        </div>

      </div>
    </van-overlay>
  </div>
  </div>
  </div>
</template>
<script>
  //生成二维码，不带logo
  import QRCode from 'qrcodejs2';
  //将html DOM元素或页面利用canvas画布生成图片
  import html2canvas from 'html2canvas';
  import NavBar from 'components/common/navbar/NavBar';
  import LogoTel from 'components/page/LogoTel.vue';
  import DynamicItem from 'components/page/DynamicItem.vue';
  import NetworkIntro from "components/page/NetworkIntro.vue";
  import Card from "components/page/Card.vue";
  import { wxShare } from "assets/js/wx.js";

  export default {
    data() {
      return {
        isShow: false,
        show: false,
        qrcode: null, //二维码实例
        canCanvas: 0, //是否可以开始进行canvas转换   2-可以
        shareImg: "",//分享图片的src
        imgload: false,//图片是否有加载完成
        olsId: '',//网点id
        info: {
          province: '',
          city: '',
          area: '',
          address: ''
        },//网点详情
        PageNumber: 1,//当前页数
        PageSize: 10,//每页显示多少条
        list: [],//动态列表
        logo: ""
      }
    },
    computed: {
      address() {
        return `${this.info.province}${this.info.city}${this.info.area}${this.info.address}` || '';
      }
    },
    watch: {
      imgload(newV) {
        //生成的图片加载完成
        this.canCanvas++;
      },
      canCanvas(val) {
        if (this.val == 2) {
          this.$nextTick(() => {
            html2canvas(this.$refs.box).then((canvas) => {
              let tu = canvas.toDataURL();
              console.log(tu)
              this.shareImg = tu;
              this.$refs.shareImg.style = "display: block";
              this.$refs.box.style = "display: none";
            })
          })
        }

      }
    },
    mounted() {
      this.olsId = this.$route.query.olsId;
      this.showOutlets();
      // this.getDynamic();
      this.getAppConfig()
    },
    methods: {
      close() {
        this.isShow = false;
        this.show = false;
      },
      getAppConfig() {
        this.$http('/userinfo/getConfig', {
          url: window.location.href.split('#')[0]
        }).then(res => {
          if (res.code == 200) {
            this.config = res.data;
            let obj = {
              title: this.info.olsName, // 分享标题
              desc: this.info.province + this.info.city + this.info.area + this.info.address, // 分享描述
              link: window.location.href, // 分享链接
              imgUrl: this.info.image, // 分享图标
            }
            console.log(obj)
            wxShare(this.config, obj, (msg) => {
              console.log(msg)
            })
          }
        })
      },

      //查询网点信息
      showOutlets() {
        this.$http('/outlets/showOutlets', {
          olsId: this.olsId
        }).then(res => {
          if (res.code == 200) {
            this.info = res.data;
            if (this.info.vipState == 1) {
              this.getDynamic()
            }
            this.getBase64Image(this.info.image, this.$refs.tuBox).then(res => {
              this.logo = res;
              this.$nextTick(() => {
                this.initQrcode()
              })
            })
          }
        })
      },
      //获取动态列表
      getDynamic() {
        this.$toast.loading({
          duration: 0,
          message: '加载中...',
          forbidClick: true,
        });
        this.$http('/outlets/getDynamic', {
          olsId: this.olsId,
          PageNumber: this.PageNumber,
          PageSize: this.PageSize
        }).then(res => {
          if (res.code == 200) {
            this.$toast.clear();
            this.clock = 1;
            this.list = res.data;
            if (this.PageSize == res.data.length) {
              window.addEventListener("scroll", this.handleScroll)
            }
          }
        })
      },
      //瀑布流加载
      handleScroll() {
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        //变量windowHeight是可视区的高度
        var clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        //滚动到底部条件
        if ((scrollTop + clientHeight) > (scrollHeight - 50)) {
          if (this.clock == 1) {
            this.clock = 2;
            this.PageNumber++;
            this.$toast.loading({
              duration: 0,
              message: '加载中...',
              forbidClick: true,
            });
            this.$http('/outlets/getDynamic', {
              olsId: this.olsId,
              PageNumber: this.PageNumber,
              PageSize: this.PageSize
            }).then(res => {
              if (res.code == 200) {
                this.$toast.clear();
                this.clock = 1;
                this.list = [...this.list, ...res.data];
                if (this.PageSize > res.data.length) {
                  window.removeEventListener("scroll", this.handleScroll);
                }
              }
            })
          }
        }
      },
      //关注网点
      setOutletsFollow() {
        this.$http('/outlets/setOutletsFollow', {
          olsId: this.olsId
        }).then(res => {
          if (res.code == 200) {
            this.info.followState = this.info.followState ^ 1;
          }
        })
      },
      //修改点赞状态
      updateClickState(index) {
        if (this.list[index].clickState == 0) {
          this.list[index].clickNumber++;
        } else {
          this.list[index].clickNumber--;
        }
        this.list[index].clickState = this.list[index].clickState ^ 1;
      },


      //修改收藏状态
      updateCollState(index) {
        if (this.list[index].collState == 0) {
          this.list[index].collNumber++;
        } else {
          this.list[index].collNumber--;
        }
        this.list[index].collState = this.list[index].collState ^ 1;
      },

      initQrcode() {
        //生成二维码
        this.qrcode = new QRCode('qrcode', {
          width: 140,//设置宽度
          height: 140,//设置高度
          text: window.location.href
        })
        this.canCanvas++;
      },
      getBase64Image(url, ele) {
        return new Promise((resolve, reject) => {
          var img = new Image();
          img.setAttribute('crossOrigin', 'anonymous')//解决跨域
          img.src = url;
          img.onload = () => {
            const c = document.createElement("canvas");
            const ctx = c.getContext("2d");
            c.width = img.width;
            c.height = img.height;
            ctx.drawImage(img, 0, 0, c.width, c.height);
            resolve(c.toDataURL())
          }
        })
      },
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.handleScroll)

    },
    destroyed() {
      this.$http('/userinfo/getConfig', {
        url: window.location.href.split('#')[0]
      }).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.config = res.data;
          let obj = {
            title: "未来宝贝", // 分享标题
            link: `${window.location.href.split('#')[0]}?#/home`, // 分享链接
            imgurls: require('../../assets/img/logoShare.jpg')
          }
          wxShare(this.config, obj, (msg) => {
            console.log(msg)
          })
        }
      })
    },
    components: {
      NavBar,
      LogoTel,
      DynamicItem,
      NetworkIntro,
      Card,
    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .share {
    width: 100%;
    padding: 0 1rem;
    position: absolute;
    left: 50%;
    top: 10px;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .arrow {

      height: 60px;
      width: 60px
    }

    .text {
      margin-top: 10px;
      margin-right: 60px;
      width: 60vw;
    }
  }

  .content {


    .top {
      padding: 0 1rem;

      .cover {
        @include wh(16.75rem, 7.7rem);
        border-radius: 0.5rem;


      }

      .attention {
        @include wh(2.5rem, 1.2rem);
        @include font(.5rem, 1.2rem, PingFangSC-Regula);
        background: #F24142;
        border-radius: 0.2rem;
        color: $fc;
        text-align: center;

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

    .intro-info {
      @include sc(.75rem, #333)
    }


    .blank {
      @include wh(100%, 10px);
      background: #F7F7F7;
    }

    .center {
      padding: .95rem 1rem 0;



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
          @include fj(center);
          align-items: center;
          width: 50%;


          span {
            @include sc(.65rem, #aaa);
          }

          span.icon {
            font-size: .9rem;
            margin-right: .25rem;
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


  .wrapper {
    @include fj(center);
    align-items: center;
    height: 100%;

    .share-img {
      width: 100%;
      height: calc(23.75rem - 3rem);
      border-radius: 10px;

      display: none;

      img {
        @include wh(100%, 100%);
      }
    }

    .box {
      width: 100%;
      height: calc(23.75rem - 3rem);
    }

    .block {
      @include wh(14.75rem, 23.75rem);
      background: $fc;

      border-radius: 10px;

      .purl {
        @include wh(100%, 6.7rem);
        border-radius: 0.5rem 0.5rem 0rem 0rem;

      }

      .content {
        padding-left: 1rem;
        padding-right: 1rem;

        .qrcode {
          @include wh(7rem, 7rem) margin: 0 auto;
        }


      }

      .btns {
        @include wh(100%, 3rem);
        @include fj(flex-start);
        background: #F3F3F3;
        padding: 0 1rem;
        border-radius: 0rem 0rem 0.5rem 0.5rem;

        .btn {
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