<template>
  <div class="home">
    <header>
      <img :src="logo" alt="">
      <div @click="call">{{mobile}}</div>
    </header>
    <!-- 轮播图 -->
    <div class="swiper-container my-swipe ">
      <div class="swiper-wrapper">
        <div v-for="(item, i) in banners" :key="i" class="swiper-slide"
          @click=" $router.push({path:'/details',query:{banId:item.banId}})">
          <img class="item" :src="item.purl" />
        </div>
      </div>
    </div>
    <!-- 通知栏 -->
    <van-notice-bar class="notice" :left-icon="tz" color="#999" background="#fff" :scrollable="false">
      <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false">
        <van-swipe-item v-for="item in notices" :key="item.notId"
          @click.native="$router.push({path:'/details',query:{notId:item.notId}})">{{item.title}}</van-swipe-item>
      </van-swipe>
    </van-notice-bar>
    <!-- tabs -->
    <van-tabs v-model="activeName" line-height="2px" title-active-color="#FF5246" title-inactive-color="#333"
      color="#FF5246">
      <van-tab v-for="item in tabs" :key="item.name" :title="item.title" :name="item.name">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list @load="handleScroll" v-model="loading" :finished="finished" finished-text="">
            <div class="rec-box">
              <div class="item" v-for="item in list" @click=" $router.push({path:'/details',query:{oflId:item.oflId}})">
                <img :src="item.purl" alt="" lazy-load>
                <div class="dec">{{item.title}}</div>
                <div class="label">{{item.labels}}</div>
              </div>
            </div>
            <slot name="finished">
              <div v-if="isEmpty==1" style="position: fixed;top: 70%;left: 50%;transform: translate(-50%,-50%);">
                <img src="../../assets/img/empty.png" alt="">
              </div>
              <div v-if="isEmpty==2" style="text-align: center;color: #aaa;font-size: 14px;padding: 10px">暂无更多数据</div>
            </slot>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <MainTabBar></MainTabBar>
    <div id='allmap'></div>
  </div>
</template>
<script>
  import MainTabBar from "components/page/mainTabbar/MainTabBar.vue";
  import Swiper from "swiper";
  import tz from 'assets/img/home/tz.png'
  import "swiper/dist/css/swiper.css"
  import { setStore, getStore, getRequest, is_wexin } from "assets/js/utils.js"
  import { getLocation } from "assets/js/wx.js"
  export default {
    data() {
      return {
        PageNumber: 1,//当前页数
        PageSize: 10,//每页显示多少条
        clock: 0,//1 可以请求数据
        activeName: '1',
        mobile: "",//平台电话
        logo: "",//平台logo
        banners: [],//baner列表
        notices: [],//通知列表
        list: [],//列表数据
        tz: tz,//通知图标
        isLoading: false,// 是否处于加载中状态
        loading: false,// 是否处于加载状态
        finished: false,// 是否已加载完成
        config: {},
        isEmpty: 0,
        tabs: [
          { title: "新闻", name: "1" },
          { title: "品牌", name: "2" },
          { title: "课程", name: "3" },
          { title: "育儿", name: "4" },
          { title: "创业", name: "4.1" },

        ]
      }
    },
    watch: {
      activeName() {
        this.isEmpty = 0
        this.finished = false;
        this.PageNumber = 1;
        this.list = [];
        this.getOfficial()
      },
    },
    mounted() {
      this.getConfig();
      this.getBanner();
      this.initSwiper();
      this.getNotice();
      this.getAppConfig();
      this.getOfficial()

    },
    methods: {
      //电话咨询
      call() {
        window.location.href = `tel://${this.mobile}`;
      },
      //获取定位
      getAppConfig() {
        this.$http('/userinfo/getConfig', {
          url: window.location.href.split('#')[0]
        }).then(res => {
          console.log(res)
          if (res.code == 200) {
            this.config = res.data;
            getLocation(this.config).then(result => {
              setStore('longitude', result.longitude);
              setStore('latitude', result.latitude)
              if (!getStore('city')) {
                this.getLocationCity(result.longitude, result.latitude);
              }
            }).catch(err => {
              // this.$toast.fail('获取地理位置失败')
            })
          }
        })
      },
      //指定经纬度获取地址
      getLocationCity(longitude, latitude) {
        console.log(longitude, latitude)
        var map = new BMapGL.Map("allmap");
        map.centerAndZoom(new BMapGL.Point(longitude, latitude), 12);
        // 创建地理编码实例      
        var myGeo = new BMapGL.Geocoder();
        // 根据坐标得到地址描述    
        myGeo.getLocation(new BMapGL.Point(longitude, latitude), (reslut) => {
          if (reslut) {
            setStore('province', reslut.addressComponents.province)
            setStore('city', reslut.addressComponents.city)
          }
        });
      },
      //获取配置信息
      getConfig() {
        this.$http('/other/showConfig').then(res => {
          if (res.code == 200) {
            this.mobile = res.data.mobile;
            this.logo = res.data.logo;
          }
        })
      },
      // 初始化轮播图
      initSwiper() {
        var mySwiper = new Swiper(".swiper-container", {
          direction: "horizontal",
          autoplay: true,
          // loop: true,
          speed: 500,
          slidesPerView: "auto",
          centeredSlides: true,
          spaceBetween: 10,
          observer: true,
          observeParents: true
        });

      },
      //获取banner图
      getBanner() {
        this.$http('/other/getBanner', {
          positions: 1
        }).then(res => {
          if (res.code == 200) {
            this.banners = res.data;
          }
        })
      },
      //获取通知
      getNotice() {
        this.$http('/official/getNotice').then(res => {
          if (res.code == 200) {
            this.notices = res.data;
          }
        })
      },
      //下拉刷新
      onRefresh() {
        this.isEmpty = 0;
        this.PageNumber = 1;
        this.finished = false;
        this.isLoading = false;
        this.list = [];
        this.getOfficial();
      },
      //获取数据
      getOfficial() {
        this.loading = true;
        this.$http('/official/getOfficial', {
          oflType: 1,
          oflSort: this.activeName,
          PageNumber: this.PageNumber,
          PageSize: this.PageSize
        }).then(res => {
          if (res.code == 200) {
            this.clock = 1;
            this.loading = false;
            this.list = res.data;
            if (this.PageSize != res.data.length) {
              if (res.data.length == 0) {
                this.isEmpty = 1;
              } else {
                this.isEmpty = 2;
              }
              this.finished = true;
            }

          }
        })
      },
      //瀑布流加载
      handleScroll() {

        if (this.clock == 1) {
          this.clock = 2;
          this.PageNumber++;
          this.loading = true
          this.$http('/official/getOfficial', {
            oflType: 1,
            oflSort: this.activeName,
            PageNumber: this.PageNumber,
            PageSize: this.PageSize
          }).then(res => {
            if (res.code == 200) {
              this.clock = 1;
              this.loading = false;
              this.list = [...this.list, ...res.data];
              if (this.PageSize > res.data.length) {

                this.isEmpty = 2;
                this.finished = true;
              }
            }
          })
        }

      }
    },

    components: {
      MainTabBar,
    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .swiper-container {
    width: 100%;
    height: 7rem;

    .swiper-slide {
      width: 87%;
      height: 7rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .swiper-slide-duplicate-prev>.item,
  .swiper-slide-prev>.item,
  .swiper-slide-next>.item,
  .swiper-slide-duplicate-next>.item {
    transform: scaleY(.89);
  }

  .home {
    @include wh(100%, 100%);
    background-color: $fc;
  }

  header {
    @include wh(100%, 4.5rem);
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

    border-radius: 0.5rem;

    .item {
      @include wh(16.25rem, 7rem);
      border-radius: .5rem
    }
  }

  .notice {
    margin-top: 5.6rem;

    .notice-swipe {
      height: 40px;
      line-height: 40px;
    }

  }


  .rec-box {
    @include fj();
    flex-wrap: wrap;
    padding: 1rem 1rem 0 1rem;

    .item {
      width: 8.1rem;
      margin-bottom: 1rem;

      img {
        @include wh(8.1rem, 4.55rem);
        border-radius: 0.5rem;
      }

      .dec {
        @include ellipsis();
        @include sc(.75rem, #333);
        font-weight: 600;
        font-family: PingFangSC-Semibold, PingFang SC;

      }

      .label {

        font-size: 0.65rem;
        color: #FF7373;
        line-height: 0.9rem;
      }
    }
  }
</style>