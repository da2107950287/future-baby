<template>
  <div class="c-order">
    <NavBar>
      <div slot="center">我的订单</div>
    </NavBar>
    <div class="order-list">
      <!-- <van-tabs v-model="activeName" line-height="2px" title-active-color="#FF5246" title-inactive-color="#333"
        color="#FF5246">
        <van-tab v-for="item in tabs" :key="item.name" :title="item.title" :name="item.name"> -->

          <van-pull-refresh v-model="isLoading" @refresh="onRefresh" class="list">
            <van-list class="tab-list " v-model="loading" :finished="finished" finished-text="" @load="handleScroll">
              <div class="total">
                <div class="total-left">
                  <span>总订单：{{orderlistNumber}}</span>
                  <span>总金额：￥{{orderlistMoney}}</span>
                </div>
                <img @click="isShowCalendar" class="total-right" src="~assets/img/icon_clen.png" alt="">
                <van-calendar :minDate="new Date(1970,0,1)" :maxDate="new Date()" v-model="showCalendar"
                  @confirm="onConfirm" />
              </div>
              <Corder v-for="item1 in list" :key="item1.olId" :item="item1"
                @click.native="$router.push({path:'/COrderDetail',query:{olId:item1.olId}})">
              </Corder>
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
  import Corder from 'components/page/Corder.vue'
  import { getStore, formatDate } from 'assets/js/utils.js'
  export default {
    data() {
      return {
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
        isEmpty: 0,
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
          status: parseInt(this.activeName),
          uid: getStore("uid"),
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
        this.PageNumber = 1;
        this.isEmpty = 0;
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
              status: parseInt(this.activeName),
              uid: getStore("uid"),
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
      Corder

    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';



.tab-list {
    height: calc(100vh - 44px );
    overflow-y: scroll
  }

  /* /deep/.van-tabs {
    position: fixed;
    top: 44px;
    width: 100%;

  } */

  /* .list {
    height: 100% !important;

  } */

  .c-order {
    @include wh(100%, 100%);

    .navbar {
      @include fj(flex-start);
      @include wh(100%, 44px);
      align-items: center;

      .icon {
        width: 40px;
        text-align: center
      }

      .input {
        @include wh(15.15rem, 1.5rem);

        background: #EAEAEA;
        border-radius: 0.75rem;
      }

    }

  }

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

 

  .order-list {


    overflow-y: scroll;
    background: #F7F7F7;
  }
</style>