<template>
  <div class="c-vouchers">
    <NavBar>
      <div slot="center">网点抵用券</div>
    </NavBar>
    <div class="vouchers-list">
    
          <div class="content">
            <div class="total">抵用券：{{totalNum}}张</div>
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" finished-text="">
                <div class="item" v-for="item in list" :key="item.dtnId" @click="$router.push({path:'/orderPayment',query:{dtnId:item.dtnId,price:item.price,olsId:$route.query.olsId}})">
                  <div class="clock">
                    <div class="top">
                      <div class="top-left">
                        <div class="title">{{item.courseName}}</div>
                        <div class="name">网点中心：{{item.olsName}}</div>
                      </div>
                      <div class="top-right">
                        <span>￥</span>
                        <span>{{item.price}}</span>
                      </div>
                    </div>
                    <div class="bottom">
                      <div class="bottom-left">有效期 {{item.endTime}}</div>
                      <!-- <div v-if="item.state==1" class="bottom-right" @click="$router.push({path:'/networkDetail',query:{olsId:item.olsId}})">去使用</div> -->
                    </div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
            <div v-if="isEmpty==1" style="position: fixed;top: 50%;left: 50%;transform: translate(-50%,-50%);">
              <img src="../../assets/img/empty.png" alt="">
            </div>
            <div v-if="isEmpty==2" style="text-align: center;color: #aaa;font-size: 14px;padding: 10px">暂无更多数据</div>
          </div>
    </div>
  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';
  import { getStore } from 'assets/js/utils.js'
  export default {
    data() {
      return {
  
        clock: 0,
        isEmpty:0,
        PageNumber: 1,//当前页数
        PageSize: 10,//每页显示多少条
        isLoading: false,// 是否处于加载中状态
        loading: false,// 是否处于加载状态
        finished: false,// 是否已加载完成
        isEmpt: 0,
        list: [],
      }
    },
    computed: {
      totalNum() {
        return this.list.length;
      }
    },
    watch: {
      activeName() {
        this.finished = false;
        this.PageNumber = 1;
        this.list = [];
        this.getDeduction();
      },
    },
    created() {
      this.getDeduction();
    },
    methods: {
      getDeduction() {
        this.loading = true;
        this.$http('/orderlist/getDeduction', {
          state: 1,
          uid: getStore('uid'),
          olsId:this.$route.query.olsId,
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
            this.$http('/orderlist/getDeduction', {
              state: this.activeName,
              uid: getStore('uid'),
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
        this.getOfficial();
      },
    },
    components: {
      NavBar,
    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .c-vouchers {
    @include wh(100%, 100%);


  }

  .vouchers-list {
    height: calc(100% - 44px);
    overflow-y: scroll;
    background: #F7F7F7;

    .content {
      padding: .75rem 1rem;

      .total {
        @include sc(.7rem, #aaa);
        margin-bottom: 1rem;
      }

      .item {

        @include wh(16.75rem, 7rem);
        background-image: url(../../assets/img/quan_bg.png);
        background-position: center;
        margin-bottom: 10px;

        .clock {
          padding: .7rem 1rem 1.25rem;
        }

        .top,
        .bottom {
          @include fj();
          align-items: center;
        }

        .top {


          .top-left {
            .title {
              @include sc(.7rem, #FC4B4C);
              font-family: PingFangSC-Medium, PingFang SC;
              font-weight: 500;

            }

            .name {
              @include sc(.6rem, #FF9394)
            }
          }

          .top-right {
            color: #FC4B4C;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;

            span:first-child {
              font-size: .7rem;
            }

            span:last-child {
              font-size: 2rem;
            }
          }
        }

        .bottom {
          margin-top: 1rem;

          .bottom-left {
            @include sc(.6rem, #aaa);

          }

          .bottom-right {
            @include wh(4rem, 1.5rem);
            @include sc(.7rem, $fc);
            text-align: center;
            line-height: 1.5rem;
            background: #FC4B4C;
            border-radius: 0.75rem;
          }
        }


      }
    }


  }
</style>