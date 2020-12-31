<template>
  <div class="c-order">

    <div class="order-list">
      <van-tabs v-model="activeName" line-height="2px" title-active-color="#FF5246" title-inactive-color="#333"
        color="#FF5246">
        <van-tab v-for="item in tabs" :key="item.name" :title="item.title" :name="item.name">
          <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="暂无更多数据">
              <div class="total">
                <div class="total-left">
                  <span>共<b>{{memberNumber}}</b>名会员</span>
                </div>
                <!-- <img class="total-right" src="../../assets/img/icon_clen.png" alt=""> -->
              </div>
              <Member v-for="item1 in list" :item="item1" :key="item1.mebId"></Member>
            </van-list>
          </van-pull-refresh>
        </van-tab>
      </van-tabs>

    </div>



  </div>
  </div>
</template>
<script>
  import Member from 'components/page/Member.vue'

  export default {
    data() {
      return {
        PageNumber: 1,//当前页数
        PageSize: 10,//每页显示多少条
        clock: 0,//1 可以请求数据
        isLoading: false,// 是否处于加载中状态
        loading: false,// 是否处于加载状态
        finished: false,// 是否已加载完成
        list: [],//列表数据
        activeName: this.$route.query.activeName,
        memberNumber:'',
        tabs: [
          { title: "全部", name: "0" },
          { title: "VIP会员", name: "1" },
          { title: "意向会员", name: "2" },
          { title: "过期会员", name: "3" },
        ]
      }
    },
    watch: {
      activeName() {
        this.finished = false;
        this.PageNumber = 1;
        this.list = [];
        this.getMember()
      },
    },
    created() {
      this.getMember()
    },
    methods: {
      //下拉刷新
      onRefresh() {
        this.PageNumber = 1;
        this.finished = false;
        this.isLoading = false;
        this.list = [];
        this.getOfficial();
      },
      //获取数据
      getMember() {
        this.loading = true;
        this.$http('/orderlist/getMember', {
          state: this.activeName,
          olsId: this.$route.query.olsId,
          PageNumber: this.PageNumber,
          PageSize: this.PageSize
        }).then(res => {
          if (res.code == 200) {
            this.clock = 1;
            this.loading = false;
            this.list = res.data.member;
            this.memberNumber=res.data.memberNumber
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
            this.loading = true
            this.$http('/orderlist/getMember', {
              state: this.activeName,
              olsId: this.$route.query.olsId,
              PageNumber: this.PageNumber,
              PageSize: this.PageSize
            }).then(res => {
              if (res.code == 200) {
                this.clock = 1;
                this.loading = false;
                this.memberNumber=res.data.memberNumber
                this.list = [...this.list, ...res.data.member];
                if (this.PageSize > res.data.length) {
                  this.finished = true;
                  window.removeEventListener("scroll", this.handleScroll)
                }
              }
            })
          }
        }
      }

    },
    components: {
      Member

    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

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
    height: calc(100% - 44px);
    overflow-y: scroll;
    background: #F7F7F7;
  }
</style>