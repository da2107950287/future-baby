<template>
  <div class="outlets">
    <header>
      <img :src="logo" alt="">
      <div @click="call(mobile)">{{mobile}}</div>
    </header>
    <div class="content">
      <van-swipe class="my-swipe cover" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in banners" :key="item.banId"
          @click=" $router.push({path:'/details',query:{banId:item.banId}})">
          <img :src="item.purl" alt="">
        </van-swipe-item>
      </van-swipe>
      <div class="outlets-box">
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
            <div>
              <div class="title">热门城市</div>
              <div class="hot-cities">
                <div class="city" v-for="item in cities" @click="selectCity1(item)">{{item}}</div>
              </div>
            </div>
            <div>
              <div class="step" style="display: inline-block;">
                <div class="circle"></div>
                <div class="line"></div>
                <div class="circle"></div>
              </div>
              <div style="display: inline-block;">
                <van-field readonly clickable @click="isShow=1" v-model="province" placeholder="请选择省份" />
                <van-field readonly clickable @click="isShow=2;" v-model="city1" placeholder="请选择城市" />
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
        <van-pull-refresh class="tablist" v-model="isLoading" @refresh="onRefresh">
          <van-list @load="handleScroll" v-model="loading" :finished="finished" finished-text="">
            <div v-for="item in list" :key="item.olsId" class="item">
              <div class="item-top" @click="toNewworkDetail(item.state,item.olsId)">
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
              <div class="icon-box1">
                <div class="icon-box">
                  <span class="iconfont icon-dianhua icon"></span>
                  <div v-if="item.mobile" class="tel" @click="call(item.mobile)">{{item.mobile}}</div>
                  <div v-else>暂无</div>

                </div>
                <div class="audition"
                  @click="$router.push({path:'/audition',query:{cover:item.image,olsId:item.olsId}})">预约试学</div>
              </div>
            </div>
            <slot name="finished">

              <div v-if="isEmpty==1" class="empty"
                style="position: fixed;top: 70%;left: 50%;transform: translate(-50%,-50%);">
                <img class="img1" src="~assets/img/empty-logo.png" alt="">
                <img class="img2" src="~assets/img/outlet.png" alt="">
                <div class="more">
                  <span @click="$router.push('/community')">诚邀您加盟创业</span>
                </div>
              </div>
              <div v-if="isEmpty==2" class="more">
                <span @click="$router.push('/community')">诚邀您加盟创业</span>
              </div>
            </slot>

          </van-list>
        </van-pull-refresh>

      </div>
    </div>
    <PopUp :show="showToast">
      <div slot="title">提示</div>
      <div slot="dec">该网点筹备中，暂无信息展示，尽情期待！</div>
      <div slot="btn" class="red btn" @click="showToast=false">确认</div>
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
  import { chineseLetter, getStore, setStore } from "assets/js/utils.js";
  import { getLocation } from "assets/js/wx.js";

  export default {
    data() {
      return {
        PageNumber: 1,//当前页数
        PageSize: 10,//每页显示多少条
        isShow: 1,
        isEmpty: 0,//0初始值 1没有数据 2数据加载完成
        showPicker: false,//是否显示位置选择框
        showToast: false,//是否显示网点筹备中
        isLoading: false,// 是否处于加载中状态
        loading: false,// 是否处于加载状态
        finished: false,// 是否已加载完成
        latitude: '',//经度
        longitude: '',//纬度
        city: '',//城市
        city1: '',
        province: '',//省份
        cityList: [],//城市列表
        provinceList: [],//省份列表
        banners: [],//banner列表
        list: [],//网点列表
        config: {},
        cities: ["全部", "北京", "上海", "杭州", "广州", "深圳", "南京", "成都", "天津", "武汉"],//热门城市
        mobile: "",//平台电话
        logo: "",//平台logo

      }
    },
    created() {
      if (getStore('latitude') && getStore('longitude') && getStore('city')) {
        this.latitude = getStore('latitude');
        this.longitude = getStore('longitude');
        this.city = getStore('city');
        this.province = getStore('province')
        this.city1 = getStore('city');
        this.getOutlets();
      } else {
        this.getAppConfig()
      }
    },
    mounted() {

      this.getBanner();
      // this.getOutlets();
      this.provinceList = chineseLetter(this.objToArr('86'), 'value');
      // this.getPoint();
      this.getConfig();
      // this.getLocationCity()

    },
    methods: {
      //电话咨询
      call(mobile) {
        window.location.href = `tel://${mobile}`;
      },
      getAppConfig() {
        this.$http('/userinfo/getConfig', {
          url: window.location.href.split('#')[0]
        }).then(res => {
          if (res.code == 200) {
            this.config = res.data;
            getLocation(this.config).then(result => {
              this.longitude = result.longitude;
              this.latitude = result.latitude;
              setStore('longitude', result.longitude);
              setStore('latitude', result.latitude);
              this.getLocationCity(this.longitude, this.latitude);
            }).catch(err => {
              // this.$toast.fail('获取地理位置失败')

              setStore('city', '全部')

            })
          }
        })
      },
      //指定经纬度获取地址
      getLocationCity(longitude, latitude) {
        var map = new BMapGL.Map("allmap");
        map.centerAndZoom(new BMapGL.Point(longitude, latitude), 12);
        // 创建地理编码实例      
        var myGeo = new BMapGL.Geocoder();
        // 根据坐标得到地址描述    
        myGeo.getLocation(new BMapGL.Point(longitude, latitude), (reslut) => {
          if (reslut) {
            this.province = reslut.addressComponents.province;
            this.city = reslut.addressComponents.city;
            this.city1 = reslut.addressComponents.city
            setStore('province', reslut.addressComponents.province)
            setStore('city', reslut.addressComponents.city)
            this.getOutlets()
          }
        });
      },

      getConfig() {
        this.$http('/other/showConfig').then(res => {
          if (res.code == 200) {
            this.mobile = res.data.mobile;
            this.logo = res.data.logo;
          }
        })
      },

      // //根据地址描述获得坐标信息
      // getPoint() {
      //   var map = new BMapGL.Map('allmap');
      //   //创建地址解析器实例
      //   var myGeo = new BMapGL.Geocoder();
      //   // 将地址解析结果显示在地图上，并调整地图视野
      //   myGeo.getPoint(this.city, point => {
      //     if (point) {
      //       this.latitude = point.lat;
      //       this.longitude = point.lng;
      //       this.getOutlets();
      //     } else {
      //       console.log("地址解析没有结果")
      //     }
      //   }, this.city)
      // },
      selectCity1(city) {
        this.isEmpty = 0;
        this.city = city;
        this.provinceId = ''
        this.province = '';
        this.city1 = ''
        this.showPicker = false;
        this.PageNumber = 1;
        this.list = [];
        this.getOutlets();
        setStore('province', this.province)
        setStore('city', this.city)

        // this.getPoint();

      },
      //选择城市
      selectCity(city) {
        this.city1 = city;
        this.city = city;
        this.showPicker = false;
        this.PageNumber = 1;
        this.list = [];
        this.getOutlets()
        setStore('province', this.province)
        setStore('city', this.city)

        // this.getPoint();

      },
      //获取城市列表
      getCityList(value, id) {
        this.province = value;
        this.city1 = "";
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
          latitude: this.latitude || '',
          longitude: this.longitude || '',
          city: this.city == '全部' ? "" : this.city,
          PageNumber: this.PageNumber,
          PageSize: this.PageSize,
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
          this.loading = true;
          this.$http('/outlets/getOutlets', {
            latitude: this.latitude,
            longitude: this.longitude,
            city: this.city == '全部' ? "" : this.city,
            PageNumber: this.PageNumber,
            PageSize: this.PageSize,
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
      },
      //下拉刷新
      onRefresh() {
        this.isEmpty = 0;
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
    components: {
      LogoTel,
      MainTabBar,
      PopUp,

    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';



  .empty {

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .img1 {

      width: 5rem;

    }

    .img2 {

      margin-top: .75rem;
      width: 7.2rem;

    }
  }

  .icon-box1 {
    display: flex;
    justify-content: space-between;
    align-items: center
  }

  .audition {
    @include wh(3.6rem, 1.2rem);
    text-align: center;
    line-height: 1.2rem;
    font-size: .6rem;
    color: #fff;
    background: linear-gradient(to bottom right, #FA7677, #F24142);
    border-radius: 2rem
  }

  .more {


    @include sc(.6rem, #F24142);
    text-align: center;
    margin: 1rem 0;

    span {
      border-bottom: 2px solid #FF5246;
    }

  }

  header {
    @include wh(100%, 4.5rem);
    @include fj();
    @include font(.75rem, 1.05rem);
    padding: .75rem;
    font-weight: 600;
    color: $fc;
    background-color: #F24142;
    border-radius: 100% 100% 100% 100% / 0% 0% 60% 60%;

    img {
      @include wh(4.7rem, 1.5rem)
    }
  }


  .btn {
    @include wh(10.5rem, 2rem);
    text-align: center;
    line-height: 2rem;
    font-size: .75rem;
    border-radius: 0.2rem;
  }

  .red {
    background: #FC4B4C;
    color: $fc;
    margin-top: 1rem;
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
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            .name {
              @include sc(.75rem, #333);
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;


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