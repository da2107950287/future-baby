<template>
  <div class="my-collection">
    <div class="navbar-box">
      <div class="navbar">
        <div class="nav-left" @click="$router.go(-1)">
          <span class="iconfont icon-fanhui2 icon"></span>
        </div>
        <div class="title">
          <span :class="{'active':active==1?true:false}" @click="handleClick(1)">赞</span>
          <span :class="{'active':active==2?true:false}" @click="handleClick(2)">收藏</span>
        </div>
      </div>
    </div>
    <div class="content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list @load="handleScroll" class="tab-list" v-model="loading" :finished="finished" finished-text="">
          <DynamicItem v-for="(item,index) in list" :item="item" :key="item.dyId" @updateClickState="updateClickState"
            @updateCollState="updateCollState">
            <img slot="headportrait" @click="$router.push({path:'/networkDetail',query:{olsId:item.olsId}})"
              class="head-portrait" :src="item.headportrait" alt="">
            <div slot="bname" class="bname" @click="$router.push({path:'/networkDetail',query:{olsId:item.olsId}})">
              {{item.nickname}}</div>
          </DynamicItem>
          <div v-if="isEmpty==1" style="position: fixed;top: 50%;left: 50%;transform: translate(-50%,-50%);">
            <img src="../../assets/img/empty.png" alt="">
          </div>
          <div v-if="isEmpty==2" style="text-align: center;color: #aaa;font-size: 14px;padding: 10px">暂无更多数据</div>

        </van-list>
      </van-pull-refresh>

    </div>
  </div>
  </div>
</template>
<script>
  import DynamicItem from 'components/page/DynamicItem.vue'
  import { mixin } from 'assets/js/mixin.js'
  export default {
    mixins: [mixin],
    data() {
      return {
        active: 1,
        PageNumber: 1,//当前页数
        PageSize: 10,//每页显示多少条
        isLoading: false,// 是否处于加载中状态
        loading: false,// 是否处于加载状态
        finished: false,// 是否已加载完成
        isEmpty: 0,
        list: [],//动态列表
        clock: 0,
      }
    },
    mounted() {
      this.getDynamic()
    },
    methods: {
      updateClickState(index) {
        this.PageNumber = 1;
        this.getDynamic()
      },
      updateCollState(index) {
        this.PageNumber = 1;
        this.getDynamic()
      },
      //切换菜单栏
      handleClick(index) {
        this.isEmpty = 0;
        this.active = index;
        this.PageNumber = 1;
        this.list = [];
        this.getDynamic()
      },
      //获取动态列表
      getDynamic() {
        this.loading = true;
        var url = "";
        if (this.active == 1) {
          url = '/outlets/getDynamicClick'
        } else if (this.active == 2) {
          url = '/outlets/getDynamicColl'
        }
        this.$http(url, {
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
          this.loading = true;
          var url = "";
          if (this.active == 1) {
            url = '/outlets/getDynamicClick'
          } else if (this.active == 2) {
            url = '/outlets/getDynamicColl'
          }
          this.$http(url, {
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

      },
      //下拉刷新
      onRefresh() {
        this.PageNumber = 1;
        this.isEmpty = 0;
        this.finished = false;
        this.isLoading = false;
        this.list = [];
        this.getDynamic();
      },
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.handleScroll)
    },
    components: {
      DynamicItem

    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .tab-list {
    height: calc(100vh - 44px);
    overflow-y: scroll
  }

  .my-collection {
    @include wh(100%, 100%);

    .navbar-box {
      height: 44px;

    }
  }

  .center {
    @include center;
  }

  .navbar {

    @include fj(flex-start);
    @include wh(100%, 44px);
    position: fixed;
    top: 0;
    align-items: center;
    background: $fc;
    z-index: 1;

    .nav-left {
      width: 40px;
      text-align: center;
    }

    .title {
      @include fj(space-evenly);
      width: 100%;

      span {
        @include sc(.7rem, #333);
        /* flex: 1; */
        text-align: center;

      }

      span.active {
        color: #FC4B4C;
        border-bottom: 2px solid #FC4B4C;
      }

    }
  }

  .content {

    padding: 1rem 1rem 0;
    box-sizing: border-box;

  }
</style>