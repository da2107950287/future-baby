<template>
  <div class="outlets">
    <header>
      <img :src="logo" alt="">
      <div>{{mobile}}</div>
    </header>
    <div class="content">

      <van-swipe class="my-swipe cover" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in banners" :key="item.banId"
          @click=" $router.push({path:'/details',query:{banId:item.banId}})">
          <img :src="item.purl" alt="">
        </van-swipe-item>
      </van-swipe>
      <div>
        <div class="outlets-title">
          <div class="title">全部网点</div>
          <div class="city-box" @click="showPicker=true">
            <span class="city">
              <span v-if="!city">请选择您所在的城市</span>
              <span v-else>{{city}}</span>
            </span>
            <span class="iconfont icon-fanhui2 icon"></span>
          </div>

        </div>
        <van-action-sheet v-model="showPicker" title="请选择您所在城市">
          <div class="city-content">
            <div v-if="!province">
              <div class="title">热门城市</div>
              <div class="hot-cities">
                <div class="city" v-for="item in cities" @click="selectCity(item)">{{item}}</div>
              </div>
            </div>
            <div v-else>
              <div class="step" style="display: inline-block;">
                <div class="circle"></div>
                <div class="line"></div>
                <div class="circle"></div>
              </div>
              <div style="display: inline-block;">
                <van-field readonly clickable @click="isShow=1" v-model="province" placeholder="请选择省份" />
                <van-field readonly clickable @click="isShow=2" v-model="city" placeholder="请选择城市" />
              </div>
            </div>
            <div class="title">选择省份/城市</div>
            <div class="cities">
              <div v-if="isShow==1">
                <div v-for="item in provinceList" @click="getCityList(item.value,item.id)">
                  <span>{{item.letter}}</span>{{item.value}}
                </div>
              </div>
              <div v-else-if="isShow==2">
                <div v-for="item in cityList" @click="selectCity(item.value)">
                  <span>{{item.letter}}</span>
                  {{item.value}}
                </div>
              </div>

            </div>
          </div>
        </van-action-sheet>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="暂无更多数据">
            <div v-for="item in list" :key="item.olsId" class="item" @click="toNewworkDetail(item.state,item.olsId)">
              <div class="item-top">
                <div class="item-top-img">
                  <img :src="item.image" alt="">
                  <span v-if="item.state!=1" class="item-top-text">筹备中</span>
                </div>
                <div class="item-top-right">
                  <div class="name">{{item.olsName}}</div>
                  <div class="btn">
                    <img src="~assets/img/icon_jli.png" alt="">
                    <span>{{item.distance}}km</span>
                  </div>
                </div>
              </div>
              <div class="icon-box">
                <span class="iconfont icon-weizhi icon"></span>
                <div class="location">{{item.province}}{{item.city}}{{item.area}}{{item.address}}</div>
              </div>
              <div class="icon-box">
                <span class="iconfont icon-dianhua icon"></span>
                <div v-if="item.mobile" class="tel">{{item.mobile}}</div>
                <div v-else>暂无</div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>

      </div>
    </div>
    <PopUp :show="showToast">
      <div slot="title">提示</div>
      <div slot="dec">该网点筹备中，暂无信息展示，尽情期待！</div>
      <div slot="redBtn" @click="showToast=false">确认</div>
    </PopUp>
    <MainTabBar></MainTabBar>
    <div id='allmap'></div>

  </div>
  </div>
</template>
<script>
  import LogoTel from 'components/page/LogoTel.vue';
  import MainTabBar from "components/page/mainTabbar/MainTabBar.vue";
  import PopUp from "components/page/PopUp.vue"
  import region from "assets/js/region.js"
  import { chineseLetter,getStore } from "assets/js/utils.js";
  import { getLocation } from "assets/js/wx.js";

  export default {
    data() {
      return {
        PageNumber: 1,//当前页数
        PageSize: 10,//每页显示多少条
        isShow: 1,
        showPicker: false,//是否显示位置选择框
        showToast: false,//是否显示网点筹备中
        isLoading: false,// 是否处于加载中状态
        loading: false,// 是否处于加载状态
        finished: false,// 是否已加载完成
        latitude: getStore('latitude'),//经度
        longitude: getStore('longitude'),//纬度
        city: getStore("city"),//城市
        province: getStore('province'),//省份
        cityList: [],//城市列表
        provinceList: [],//省份列表
        banners: [],//banner列表
        list: [],//网点列表
        config: {},
        cities: ["北京", "上海", "广州", "深圳", "杭州", "成都"],//热门城市
        mobile: "",//平台电话
        logo: "",//平台logo
      }
    },
    mounted() {
      // this.getAppConfig()
      this.getBanner();
      // this.getOutlets();
      this.provinceList = chineseLetter(this.objToArr('86'), 'value');
      this.getPoint();
      this.getConfig();
      // this.getLocationCity()
      this.getOutlets();
    },
    methods: {
      getConfig() {
        this.$http('/other/showConfig').then(res => {
          if (res.code == 200) {
            this.mobile = res.data.mobile;
            this.logo = res.data.logo;
          }
        })
      },
     
      //根据地址描述获得坐标信息
      getPoint() {
        var map = new BMapGL.Map('allmap');
        //创建地址解析器实例
        var myGeo = new BMapGL.Geocoder();
        // 将地址解析结果显示在地图上，并调整地图视野
        myGeo.getPoint(this.city, point => {
          if (point) {
            this.latitude = point.lat;
            this.longitude = point.lng;
            this.getOutlets();
          } else {
            console.log("地址解析没有结果")
          }
        }, this.city)
      },
      //选择城市
      selectCity(city) {
        this.city = city;
        this.showPicker = false;
        this.PageNumber = 1;
        this.list = []
        this.getPoint();

      },
      //获取城市列表
      getCityList(value, id) {
        this.province = value;
        this.city = "";
        this.isShow = 2;
        this.cityList = chineseLetter(this.objToArr(id), 'value');
      },
      //对象转数组
      objToArr(id) {
        let arr = [];
        for (const key in region[id]) {
          if (region[id].hasOwnProperty.call(region[id], key)) {
            arr.push({ id: key, value: region[id][key] });
          }
        }
        return arr;
      },
      // 获取banner列表
      getBanner() {
        this.$http('/other/getBanner', {
          positions: 2
        }).then(res => {
          if (res.code == 200) {
            this.banners = res.data;
          }
        })
      },
      //获取网点列表
      getOutlets() {
        this.loading = true;
        this.$http('/outlets/getOutlets', {
          latitude: this.latitude,
          longitude: this.longitude,
          city: this.city,
          PageNumber: this.PageNumber,
          PageSize: this.PageSize,
        }).then(res => {
          if (res.code == 200) {
            this.clock = 1;
            this.loading = false;
            this.list = res.data;
            if (this.PageSize == res.data.length) {
              window.addEventListener("scroll", this.handleScroll)
            } else {
              console.log(789)
              this.finished = true;
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
            this.loading = true;
            this.$http('/outlets/getOutlets', {
              latitude: this.latitude,
              longitude: this.longitude,
              city: this.city,
              PageNumber: this.PageNumber,
              PageSize: this.PageSize,
            }).then(res => {
              if (res.code == 200) {
                this.clock = 1;
                this.loading = false;
                this.list = [...this.list, ...res.data];
                if (res.data.length < this.PageSize) {
                  this.finished = true;
                  window.removeEventListener("scroll", this.handleScroll);
                }
              }
            })
          }
        }
      },
      //下拉刷新
      onRefresh() {
        this.PageNumber = 1;
        this.finished = false;
        this.isLoading = false;
        this.list = [];
        this.getOutlets();
      },
      toNewworkDetail(state, olsId) {
        if (state == 1) {
          this.$router.push({ path: '/networkDetail', query: { olsId } })
        } else {
          this.showToast = true;
        }
      }
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.handleScroll)
    },
    components: {
      LogoTel,
      MainTabBar,
      PopUp,

    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

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

  .outlets {
    .content {
      padding: 0 1rem;
      margin-top: -30px;

      .cover {
        @include wh(16.75rem, 7.7rem);

        border-radius: 0.5rem;
        margin-bottom: 1rem;

        img {
          @include wh(16.75rem, 7.7rem);

        }
      }

      .outlets-title {
        @include fj();

        .title {
          @include sc(.75rem, #333);
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;

        }

        .city-box {
          @include fj();
          align-items: center;
          @include sc(.6rem, #aaa);

          .city {

            margin-right: .25rem;

          }

          .icon {
            display: block;

            transform: rotate(270deg);
          }
        }

      }

      .city-content {
        padding: 0 1rem 1rem;
        height: 20rem;
        background: #FFFFFF;
        border-radius: 0.5rem 0.5rem 0rem 0rem;

        .title {
          @include sc(.6rem, #aaa);

        }

        .hot-cities {
          @include fj(flex-start);
          padding-left: .5rem;
          flex-wrap: wrap;
          margin-bottom: 1rem;

          .city {
            @include wh(2.7rem, 1.5rem);
            @include sc(.65rem, #333);
            line-height: 1.5rem;
            text-align: center;
            background: #F1F1F1;
            border-radius: 0.75rem;
            margin: .75rem .5rem 0 0;
          }

          .city:nth-child(5n) {
            margin-right: 0;
          }
        }

        .step {
          .circle {
            @include wh(.3rem, .3rem);
            border-radius: 50%;
          }

          .line {
            @include wh(.1rem, 2rem);
            background: #F24142;
            margin-left: .1rem;
          }

          .circle:first-child {
            background: #F24142;
          }

          .circle:last-child {

            border: 0.05rem solid #F24142;
          }
        }

        .province,
        .city {
          @include sc(.7rem, #333);
        }

        .cities {
          /* margin-top: .85rem; */

          div {
            @include sc(.7rem, #333);
            line-height: 1.7rem;

            span {
              @include sc(.6rem, #aaa);
              margin-right: .5rem;
              display: inline-block;
              width: .4rem;

            }
          }
        }
      }

      .item {
        border-bottom: 1px solid #eee;
        padding: .75rem 0 .7rem;
        margin-bottom: .25rem;


        .item-top {
          @include fj(flex-start);
          margin-bottom: .75rem;

          .item-top-img {
            @include wh(4rem, 2.25rem);
            position: relative;

            margin-right: .5rem;

            img {
              @include wh(4rem, 2.25rem);
              border-radius: 0.2rem;
            }

            .item-top-text {
              @include wh(4rem, 2.25rem);
              @include sc(.6rem, $fc);
              border-radius: 0.2rem;
              position: absolute;
              top: 0;
              left: 0;
              text-align: center;
              line-height: 2.25rem;
              background: rgba(51, 51, 51, 0.5);

            }
          }

          .item-top-right {
            @include fj();
            flex-direction: column;

            .name {
              @include sc(.75rem, #333);

            }

            .btn {
              @include fj(flex-start);
              @include sc(.6rem, #aaa);
              align-items: center
            }

          }
        }

        .icon-box {
          @include fj(flex-start);
          margin-top: .55rem;
          align-items: center;
          font-family: PingFangSC-Regular, PingFang SC;

          .icon {
            @include sc(.64rem, #aaa);
            margin-right: .35rem;
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

      .no-more {
        @include sc(.6rem, #aaa);
        margin: 1rem 0;
        text-align: center
      }
    }
  }

  .van-action-sheet__header {
    @include sc(.7rem, #aaa);
  }
</style>