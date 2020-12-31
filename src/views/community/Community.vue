<template>
  <div class="community">
    <header>
      <img :src="logo" alt="">
      <div>{{mobile}}</div>
    </header>
    <div class="content">
      <van-swipe class="my-swipe cover" :autoplay="3000" indicator-color="white">
        <van-swipe-item v-for="item in banners" :key="item.banId"  @click=" $router.push({path:'/details',query:{banId:item.banId}})">
          <img :src="item.purl" alt="">
        </van-swipe-item>

      </van-swipe>
      <div class="bars">
        <!-- <div>
          <img src="" alt="">
          <div>最新</div>
        </div> -->
        <div class="bar">
          <div class="img" @click="$router.push('/Newest')">
            <img src="../../assets/img/community/zx.png" alt="">
          </div>
          <div class="text">最新</div>
        </div>
        <div class="bar" @click="$router.push('/guide')">
          <div class="img">
            <img src="../../assets/img/community/jmzn.png" alt="">
          </div>
          <div class="text">加盟指南</div>
        </div>
        <div class="bar" @click="$router.push('/activity')">
          <div class="img">
            <img src="../../assets/img/community/wdhd.png" alt="">
          </div>
          <div class="text">网点活动</div>
        </div>
        <div class="bar" @click="$router.push('/notice')">
          <div class="img">
            <img src="../../assets/img/community/kdgg.png" alt="">
          </div>
          <div class="text">开店公告</div>
        </div>

      </div>
      <div>
        <div class="title">精选</div>
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="暂无更多数据">
            <NewsItem v-for="item in list" :key="item.oflId" :item="item"
              @click.native=" $router.push({path:'/details',query:{oflId:item.oflId}})">
              <div slot="tab">{{item.labels}}</div>
            </NewsItem>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
    <MainTabBar />
  </div>
</template>
<script>
  import MainTabBar from "components/page/mainTabbar/MainTabBar.vue";
  import NewsItem from 'components/page/NewsItem.vue';

  export default {
    data() {
      return {
        clock: 0,
        PageNumber: 1,//当前页数
        PageSize: 10,//每页显示多少条
        isLoading: false,// 是否处于加载中状态
        loading: false,// 是否处于加载状态
        finished: false,// 是否已加载完成
        banners: [],//banner列表
        list: [],
        logo: "",
        mobile: ""
      }
    },
    mounted() {
      this.getBanner();
      this.getOfficial();
      this.getConfig()
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
      // 获取banner列表
      getBanner() {
        this.$http('/other/getBanner', {
          positions: 3
        }).then(res => {
          if (res.code == 200) {
            this.banners = res.data;
          }
        })
      },
      //获取精选列表
      getOfficial() {
        this.loading = true;
        this.$http('/official/getOfficial', {
          rec: 1,
          oflType: 2,
          PageNumber: this.PageNumber,
          PageSize: this.PageSize
        }).then(res => {
          if (res.code == 200) {
            this.clock = 1;
            this.loading = false;
            this.list = res.data;
            if (this.PageSize == res.data.length) {
              window.addEventListener("scroll", this.handleScroll)
            } else {
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
            this.$http('/official/getOfficial', {
              rec: 1,
              oflType: 2,
              PageNumber: this.PageNumber,
              PageSize: this.PageSize
            }).then(res => {
              if (res.code == 200) {
                this.clock = 1;
                this.loading = false;
                this.list = [...this.list,...res.data];
                if (this.PageSize > res.data.length) {
                  this.finished = true;
                  window.removeEventListener("scroll", this.handleScroll)
                }
              }
            })
          }
        }
      },
      //下拉刷新
      onRefresh() {
        this.finished = false;
        this.isLoading = false;
        this.list = [];
        this.PageNumber = 1;
        this.getOfficial();
      },
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.handleScroll)
    },
    components: {
      MainTabBar,
      NewsItem
    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .community {
    position: relative;

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

    .content {
      padding: 1rem;

      .cover {
        @include wh(16.75rem, 7rem);
        border-radius: 0.5rem;
        position: absolute;
        top: 3.2rem;
        left: 50%;
        transform: translateX(-50%);

        img {
          @include wh(16.75rem, 7rem);

        }
      }

      .bars {
        @include fj();
        margin-top: 5rem;

        .bar {
          width: 25%;

          .img {

            height: 2.5rem;
            @include fj(center);
            align-items: center;

            img {
              width: 2.5rem;
            }

          }

          .text {
            @include sc(.7rem, #333)
          }

        }


      }

      .title {
        @include sc(.8rem, #333);
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        margin-top: 1rem;

      }
    }
  }
</style>