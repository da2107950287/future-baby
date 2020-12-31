<template>
  <div class="account-detail">
    <NavBar>
      <div slot="center">账户明细</div>

    </NavBar>
    <div class="content">
      <div class="total">
        <div class="total-left">总计：共{{transactionNumber}}笔，收入/充值{{income}}元，消费{{expenditure}}</div>
        <img @click="showCalendar = true" class="total-right" src="~assets/img/icon_clen.png" alt="">
        <van-calendar v-model="showCalendar" :min-date="minDate" @confirm="onConfirm" />
      </div>
      <div class="detail">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-list v-model="loading" :finished="finished" finished-text="暂无更多数据">
            <div class="item" v-for="item in list" :key="item.tanId">
              <div class="item-top">
                <div class="name">{{item.tanTitle}}</div>
                <div class="price"><span v-if="item.tanSort==1">+</span><span v-else>-</span>{{item.tanMoney}}</div>
              </div>
              <div class="item-bottom">
                <div class="detail-date">{{item.tanTime | formatTanDate}}</div>
                <div class="balance">余额 {{item.currBalance}}</div>
              </div>
            </div>
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';
  import { getStore, formatDate } from 'assets/js/utils.js'
  export default {
    data() {
      return {
        clock: 0,
        PageNumber: 1,//当前页数
        PageSize: 10,//每页显示多少条
        isLoading: false,// 是否处于加载中状态
        loading: false,// 是否处于加载状态
        finished: false,// 是否已加载完成
        showCalendar: false,//是否显示日历
        minDate: new Date(2010, 0, 1),
        datatime: "",
        income: "",//收入
        expenditure: "",//消费
        transactionNumber: "",//总订单数

        list: [],
      }
    },
    filters: {
      formatTanDate(val) {
        var dateArr = val.split(" "),
          month = dateArr[0].split("-")[1],
          day = dateArr[0].split("-")[2];
        return `${month}月${day}日 ${dateArr[1].substr(0, dateArr[1].lastIndexOf(":"))}`;
      }
    },
    created() {
      this.getTransaction();
    },
    methods: {
      getTransaction() {
        this.loading = true;
        this.$http('/orderlist/getTransaction', {
          uid: getStore("uid"),
          datatime: this.datatime,
          PageNumber: this.PageNumber,
          PageSize: this.PageSize,
        }).then(res => {
          if (res.code == 200) {
            this.cloak = 1;
            this.loading = false;
            this.income = res.data.income;
            this.expenditure = res.data.expenditure;
            this.transactionNumber = res.data.transactionNumber
            this.list = res.data.transaction;
            if (this.PageSize == res.data.transaction.length) {
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
            this.loading = true
            this.$http('/orderlist/getTransaction', {
              uid: getStore("uid"),
              datatime: this.datatime,
              PageNumber: this.PageNumber,
              PageSize: this.PageSize,
            }).then(res => {
              if (res.code == 200) {
                this.clock = 1;
                this.loading = false;
                this.income = res.data.income;
                this.expenditure = res.data.expenditure;
                this.transactionNumber = res.data.transactionNumber
                this.list = [...this.list, ...res.data.transaction];
                if (this.PageSize > res.data.transaction.length) {
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
        this.PageNumber = 1;
        this.finished = false;
        this.isLoading = false;
        this.list = [];
        this.getTransaction();
      },
      //确认日期
      onConfirm(date) {
        this.showCalendar = false;
        this.datatime = formatDate(date);
        this.PageNumber = 1;
        this.list = [];
        this.getTransaction()
      },

    },
    components: {
      NavBar,

    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .account-detail {
    .total {
      @include fj();
      align-items: center;
      height: 2.6rem;
      background: #F4F4F4;
      padding: 0 1rem;

      .total-left {
        @include sc(.6rem, #aaa);
        font-family: PingFangSC-Regular, PingFang SC;

      }
    }

    .detail {
      padding: 0 1rem;

      .item {
        padding: .75rem 0;
        border-bottom: 1px solid #eee;

        >div {
          @include fj();
        }

        .item-top {
          div {
            color: #333;

            &.name {
              font-size: .75rem;
            }

            &.price {
              font-size: 1.05rem;

            }
          }

        }

        .item-bottom {
          >div {
            @include sc(.7rem, #aaa)
          }
        }
      }
    }
  }
</style>