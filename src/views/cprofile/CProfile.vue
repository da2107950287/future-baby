<template>
  <div class="c-profile">
    <LogoTel class="logotel"></LogoTel>
    <div class="img-box">
      <div class="info-left">
        <img :src="headportrait" alt="">
        <div>{{nickname}}</div>
      </div>
      <router-link tag="div" to="/PersonalInfo" class="info-right">
        <span>查看</span>
        <div class="iconfont icon-fanhui2"></div>
      </router-link>
    </div>
    <div class="card" v-for="item in list" :key="item.mebId">
      <div class="card-left">
        <div>
          <span class="name">{{item.olsName}}</span>
          <span class="status">在学</span>
        </div>
        <div class="date">有效期：{{item.endTime | formatTime}}</div>
      </div>
      <div class="card-right" @click="$router.push({path:'/orderPayment',query:{olsId:item.olsId}})">续费</div>
    </div>
    <div class="order">
      <div class="title">
        <span class="left">我的订单</span>
        <div tag="div" @click="$router.push({path:'/corder',query:{activeName:'0'}})" class="right">
          <span>全部订单</span>
          <div class="iconfont icon-fanhui2"></div>
        </div>
      </div>
      <div class="items">
        <div class="item" @click="$router.push({path:'/corder',query:{activeName:'1'}})">
          <img src="~assets/img/cprofile/icon_jinxinzhong.png" alt="">
          <div>进行中</div>
        </div>
        <!-- <div class="item"@click="$router.push({path:'/corder',query:{account-title:'0'}})">
          <img src="~assets/img/cprofile/icon_xindingdan.png" alt="">
          <div>新订单</div>
        </div> -->
        <div class="item" @click="$router.push({path:'/corder',query:{activeName:'2'}})">
          <img src="~assets/img/cprofile/icon_guoqi.png" alt="">
          <div>即将过期</div>
        </div>
        <div class="item" @click="$router.push({path:'/corder',query:{activeName:'3'}})">
          <img src="~assets/img/cprofile/icon_shixiao.png" alt="">
          <div>失效订单</div>
        </div>
      </div>
    </div>
    <van-swipe class="my-swipe activity" :autoplay="3000" indicator-color="white">
      <van-swipe-item  v-for="item in banners" :key="item.banId"   @click=" $router.push({path:'/details',query:{banId:item.banId}})">
        <img :src="item.purl" alt="">
      </van-swipe-item>

    </van-swipe>
    <div class="itembars">
      <!-- <div class="item1" @click="$router.push('/cAccountInfo')">
        <img src="~assets/img/cprofile/icon_cash.png" alt="">
        <div>账号余额</div>
      </div> -->
      <div class="item1" @click="$router.push('/pointsOfConcern')">
        <div class="img-box">
          <img src="~assets/img/cprofile/icon_follows.png" alt="">
        </div>
        <div>关注网点</div>
      </div>
      <div class="item1" @click="$router.push('/cVouchers')">

        <div class="img-box">
          <img src="~assets/img/cprofile/icon_quan.png" alt="">

        </div>
        <div>抵扣券</div>
      </div>
      <div class="item1" @click="$router.push('/MyCollection')">
        <div class="img-box">
          <img src="~assets/img/cprofile/icon_collets.png" alt="">

        </div>
        <div>收藏</div>
      </div>
      <div class="item1" @click="$router.push('/onlineConsulting')">
        <div class="img-box">
          <img src="~assets/img/cprofile/icon_zix.png" alt="">


        </div>
        <div>在线咨询</div>
      </div>
      <div class="item1" @click="$router.push('/aboutUs')">
        <div class="img-box">
          <img src="~assets/img/cprofile/icon_about_us.png" alt="">

        </div>
        <div>关于我们</div>
      </div>

      <div class="item1" @click="$router.push('/setting')">
        <div class="img-box">
          <img src="~assets/img/cprofile/icon_shez.png" alt="">

        </div>
        <div>设置</div>
      </div>
      <div class="item1" @click="$router.push('/applyNetwork')">
        <div class="img-box">
          <img src="~assets/img/cprofile/apply.png" alt="">

        </div>
        <div>申请商户</div>
      </div>
    </div>
    <div v-if="role==2" style="padding: .5rem 5rem 1rem;">
      <van-button plain round block type="danger" @click="exchange">切换至商户端</van-button>
    </div>
    <MainTabBar></MainTabBar>
  </div>
  </div>
</template>
<script>
  import LogoTel from 'components/page/LogoTel.vue';
  import MainTabBar from "components/page/mainTabbar/MainTabBar.vue"
  import { getStore, setStore } from "assets/js/utils.js"

  export default {
    data() {
      return {
        banners: [],//banner列表
        list: [],
        nickname: '',//昵称
        headportrait: '',//头像
        role: '',//角色
      }
    },
    filters: {
      formatTime(val) {
        let arr = val.split(' ')[0].split('-')
        return arr[0] + '年' + arr[1] + '月' + arr[2] + '日'
      }
    },
    mounted() {
      this.showUserinfo();
      this.getUserMember();
      this.getBanner();

    },
    methods: {
      //获取banner列表
      getBanner() {
        this.$http('/other/getBanner', {
          positions: 4
        }).then(res => {
          if (res.code == 200) {
            this.banners = res.data;
          }
        })
      },
      getUserMember() {
        this.$http('/orderlist/getUserMember').then(res => {
          if (res.code == 200) {
            this.list = res.data;
          }
        })
      },
      showUserinfo() {
        this.$http('/userinfo/showUserinfo', {
          uid: getStore('uid')
        }).then(res => {
          if (res.code == 200) {
            this.nickname = res.data.nickname;
            this.headportrait = res.data.headportrait;
            this.role = res.data.role;
          }
        })
      },
      exchange() {
        setStore('link', '/bprofile');
        this.$router.push('/bprofile')
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

      .info-left {
        @include fj();
        align-items: center;

        img {
          @include wh(2.5rem, 2.5rem);
          border-radius: 50%;
          margin-right: .5rem;
        }

        div {
          @include sc(.75rem, #333);

          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;

        }
      }

      .info-right {
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
      margin: 1.5rem 1rem 0;
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
      background: $fc;
      margin-top: 1.5rem;

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
          cursor: pointer;

          div:last-child {

            transform: rotate(180deg);
            margin-left: .5rem;

          }
        }
      }

      .items {
        @include fj(flex-start);
        margin-top: .8rem;
        align-items: center;


        .item {
          @include fj();
          flex-direction: column;
          align-items: center;
          width: 25%;
          cursor: pointer;

          img {
            @include wh(1.5rem, 1.5rem);
            margin-bottom: .25rem
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

      img {
        @include wh(16.75rem, 3.5rem);

      }


    }

    .itembars {
      padding: 0 1rem;
      @include fj(flex-start);
      flex-wrap: wrap;

      .item1 {
        width: 25%;
        margin-bottom: 1.5rem;
        text-align: center;

        .img-box {
          @include wh(100%, 1.5rem);
          @include fj(center);
          align-items: center;
        }

        div {
          @include sc(.65rem, #333);
          font-family: PingFangSC-Regular, PingFang SC;

        }
      }

    }
  }
</style>