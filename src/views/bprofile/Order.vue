<template>
  <div class="c-order">
    <NavBar>
      <div slot="center">我的订单</div>
    </NavBar>
    <div class="order-list">
      <!-- <van-tabs :sticky="true" v-model="activeName" line-height="2px" title-active-color="#FF5246"
        title-inactive-color="#333" color="#FF5246">
        <van-tab v-for="item in tabs" :key="item.name" :title="item.title" :name="item.name">
         -->
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list class="tab-list" v-model="loading" :finished="finished" @load="handleScroll">
              <div class="total">
                <div class="total-left">
                  <span>共<b> {{orderlistNumber}} </b>笔订单，金额<b> {{orderlistMoney}} </b>元</span>
                </div>
                <img @click="isShowCalendar" class="total-right" src="~assets/img/icon_clen.png" alt="">
                <van-calendar :minDate="new Date(1970,0,1)" :maxDate="new Date()" v-model="showCalendar"
                  @confirm="onConfirm" />
              </div>
              <Border v-for="item1 in list" :key="item1.olId" :item="item1"></Border>
              <div v-if="isEmpty==1" style="position: fixed;top: 50%;left: 50%;transform: translate(-50%,-50%);">
                <img src="~assets/img/empty.png" alt="">
              </div>
              <div v-if="isEmpty==2" style="text-align: center;color: #aaa;font-size: 14px;padding: 10px">暂无更多数据</div>    
            </van-list>
          </van-pull-refresh>
        
        <!-- </van-tab>
      </van-tabs> -->
    </div>
  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';
  import Border from 'components/page/Border.vue'
  import { getStore, formatDate } from 'assets/js/utils.js'

  export default {
    data() {
      return {
        isEmpty: 0,
        PageNumber: 1,//当前页数
        PageSize: 10,//每页显示多少条
        clock: 0,//1 可以请求数据
        activeName: this.$route.query.activeName,
        orderlistMoney: "",//总金额
        orderlistNumber: "",//订单数量
        isLoading: false,// 是否处于加载中状态
        loading: false,// 是否处于加载状态
        finished: false,// 是否已加载完成
        showCalendar: false,//是否显示日历
        list: [],
        tabs: [
          { title: "全部", name: "0" },
          { title: "未付款", name: "4" },
          { title: "进行中", name: "1" },
          { title: "即将过期", name: "2" },
          { title: "已失效", name: "3" },
        ]
      }
    },
    watch: {
      activeName() {
        this.isEmpty = 0;
        this.finished = false;
        this.PageNumber = 1;
        this.list = [];
        this.getOrderlist()
      },
    },
    created() {
      this.getOrderlist()
    },
    methods: {
      isShowCalendar() {
        let valid = true;
        if (!valid) {
          return false;
        }
        valid = false;
        setTimeout(() => {
          this.showCalendar = true;
          valid = true;
        }, 500)

      },
      getOrderlist() {
        this.loading = true;
        this.$http('/orderlist/getOrderlist', {
          status: this.activeName,
          olsId:this.$route.query.olsId,
          datatime: this.datatime,
          PageNumber: this.PageNumber,
          PageSize: this.PageSize
        }).then(res => {
          this.clock = 1;
          this.loading = false;
          this.orderlistMoney = res.data.orderlistMoney || 0;
          this.orderlistNumber = res.data.orderlistNumber || 0;
          this.list = res.data.orderlist;
          if (this.PageSize != res.data.orderlist.length) {
            if (res.data.orderlist.length == 0) {
              this.isEmpty = 1;
            } else {
              this.isEmpty = 2;
            }
            this.finished = true;
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
        this.getOrderlist();
      },
      //瀑布流加载
      handleScroll() {
  
          if (this.clock == 1) {
            this.clock = 2;
            this.PageNumber++;
            this.loading = true
            this.$http('/orderlist/getOrderlist', {
              status: this.activeName,
              olsId:this.$route.query.olsId,
              datatime: this.datatime,
              PageNumber: this.PageNumber,
              PageSize: this.PageSize
            }).then(res => {
              if (res.code == 200) {
                this.clock = 1;
                this.loading = false;
                this.orderlistMoney = res.data.orderlistMoney;
                this.orderlistNumber = res.data.orderlistNumber;
                this.list = [...this.list, ...res.data.orderlist];
                if (this.PageSize > res.data.orderlist.length) {
                  this.isEmpty = 2;
                  this.finished = true;
                
                }
              }
            })
          }
      
      },
      //确认日期
      onConfirm(date) {
        this.showCalendar = false;
        this.datatime = formatDate(date);
        this.finished = false;
        this.PageNumber = 1;
        this.list = [];
        this.isEmpty = 0;
        this.getOrderlist()
      },
    },
    components: {
      NavBar,
      Border

    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';
  /deep/ .van-tabs {
    position: fixed;
    top: 44px;
    width: 100%;

  }

  .tab-list {
    height: calc(100vh - 44px);
    overflow-y: scroll
  }

  .c-order {
    @include wh(100%, 100%);

    .total {
      @include fj();
      align-items: center;
      margin: .55rem 0 .5rem;
      padding: 0 1rem;

      .total-left {
        span {
          @include sc(.6rem, #aaaaaa);
          font-family: PingFangSC-Regular, PingFang SC;

        }

        span:first-child {
          margin-right: 1.5rem;
        }
      }

      .total-right {
        @include wh(1rem, 1rem);
      }
    }
  }

  .van-search {
    padding: .3rem 0;
  }

  .order-list {
    height: calc(100vh - 44px);
    overflow-y: scroll;
    background: #F7F7F7;
  }
</style>