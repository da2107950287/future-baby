<template>
  <div class="brand-intro">
    <NavBar>
      <div slot="center">详情</div>
    </NavBar>
    <div class="content">
      <div v-if="!banId">
        <div class="title">{{title}}</div>
        <div class="box">
          <span v-if="!notId" class="label">{{labels}}</span>
          <span class="time">{{time | timeFormat}}</span>
        </div>
      </div>
      <div v-html="content"></div>
    </div>
    <div v-if="oflId" class="wrap">
      <div class="bottom-btns">
        <div @click="setOfficialClick" :style="{color:clickState == 0 ? '#aaa' : '#F24142'}">
          <span ref="dianzan" class="iconfont icon-dianzan"></span>
          <span>点赞</span>
        </div>
        <div @click="isShow=true">
          <span class="iconfont icon-fenxiang"></span> 分享
        </div>
        <div @click="$router.push('/home')">
          <span class="iconfont icon-shouye"></span> 返回首页
        </div>
      </div>
    </div>
    <van-overlay :show="isShow" @click="isShow = false">
      <div class="wrapper" @click.stop>
        <div class="share">
          <img class="arrow" src="../../assets/img/arrow.png" alt="">

          <img class="text" src="../../assets/img/share.png" alt="">
        </div>

      </div>
    </van-overlay>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';
  import LogoTel from 'components/page/LogoTel.vue';
  import { mixin } from 'assets/js/mixin.js';
  import { isEmpty } from 'assets/js/utils.js';
  import { wxShare } from "assets/js/wx.js";
  export default {
    mixins: [mixin],
    data() {
      return {
        oflId: "",
        notId: "",
        banId: "",
        content: "",//富文本内容
        clickState: '',//点赞状态
        title: "",//标题
        labels: "",//标签
        time: "",//时间
        purl: '',
        isShow: false,
      }
    },
    mounted() {
      this.oflId = this.$route.query.oflId;
      this.notId = this.$route.query.notId;
      this.banId = this.$route.query.banId;
      this.getDetails();
      this.getAppConfig()
    },
    methods: {
      getAppConfig() {
        this.$http('/userinfo/getConfig', {
          url: window.location.href
        }).then(res => {
          console.log(res)
          if (res.code == 200) {
            this.config = res.data;
            let obj = {
              title: '未来宝贝', // 分享标题
              desc: this.title,
              link: window.location.href, // 分享链接
              imgUrl: this.purl, // 分享图标
            }
            wxShare(this.config, obj, (msg) => {
              console.log(msg)
            })
          }
        })
      },
      //获取详情
      getDetails() {
        if (!isEmpty(this.oflId)) {
          this.$http('/official/showOfficial', {
            oflId: this.oflId
          }).then(res => {
            if (res.code == 200) {
              this.content = res.data.content;
              this.clickState = res.data.clickState;
              this.title = res.data.title;
              this.time = res.data.oflTime;
              this.labels = res.data.labels;
              this.purl = res.data.purl;
            }
          })
        } else if (!isEmpty(this.notId)) {
          this.$http('/official/showNotice', {
            notId: this.notId
          }).then(res => {
            if (res.code == 200) {
              this.title = res.data.title;
              this.time = res.data.notTime;
              this.content = res.data.content;
            }
          })
        } else if (!isEmpty(this.banId)) {
          this.$http('/other/showBanner', {
            banId: this.banId
          }).then(res => {
            if (res.code == 200) {
              this.content = res.data.content;
            }
          })
        }

      },
      //点赞/收藏
      setOfficialClick() {
        this.$http('/official/setOfficialClick', {
          oflId: this.oflId
        }).then(res => {
          if (res.code == 200) {
            this.clickState = this.clickState ^ 1;
          }
        })
      }
    },
    beforeDestroy() {
      this.content = "";
      this.clickState = '';
      this.title = "";
      this.labels = "";
      this.time = "";
      this.$http('/userinfo/getConfig', {
        url: window.location.href
      }).then(res => {
        console.log(res)
        if (res.code == 200) {
          this.config = res.data;
          let obj = {
            title: '未来宝贝', // 分享标题
            link: window.location.href, // 分享链接

          }
          wxShare(this.config, obj, (msg) => {
            console.log(msg)
          })
        }
      })
    },
    components: {
      NavBar,
      LogoTel
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
    padding: 1rem;

    .title {
      @include sc(.8rem, #333);
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
    }

    .box {
      .label {
        @include sc(.6rem, #FF7373);
        margin-right: 1rem;
      }

      .time {
        @include sc(.6rem, #aaa)
      }


    }
  }

  .wrap {
    height: 2.2rem;

    .bottom-btns {
      @include wh(100%, 2.2rem);
      @include fj(flex-end);

      background: $fc;
      box-shadow: 0rem -0.1rem 0.2rem 0rem #EDEDED;
      align-items: center;
      position: fixed;
      bottom: 0;

      div {
        margin-right: 1rem;

        font-size: .65rem;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #AAAAAA;

        span:first-child {
          font-size: .9rem;

        }

      }
    }
  }
</style>