<template>
  <div class="c-order">
    <NavBar>
      <div slot="center">会员管理</div>
    </NavBar>
    <div class="order-list">
      <!-- <van-tabs  v-model="activeName" line-height="2px" title-active-color="#FF5246"
        title-inactive-color="#333" color="#FF5246">
        <van-tab v-for="item in tabs" :key="item.name" :title="item.title" :name="item.name">
          -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list class="tab-list" v-model="loading" :finished="finished" finished-text="" @load="handleScroll">
          <div class="total">
            <div class="total-left">
              <span>共<b> {{memberNumber}} </b>名会员</span>
            </div>
            <!-- <img class="total-right" src="../../assets/img/icon_clen.png" alt=""> -->
          </div>
          <Member v-for="item1 in list" :item="item1" :key="item1.mebId"></Member>
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
  import Member from 'components/page/Member.vue'
  import NavBar from 'components/common/navbar/NavBar';

  export default {
    data() {
      return {
        isEmpty: 0,
        PageNumber: 1,//当前页数
        PageSize: 3,//每页显示多少条
        clock: 0,//1 可以请求数据
        isLoading: false,// 是否处于加载中状态
        loading: false,// 是否处于加载状态
        finished: false,// 是否已加载完成
        list: [],//列表数据
        activeName: this.$route.query.activeName,
        memberNumber: '',
        tabs: [
          { title: "全部", name: "0" },
          { title: "VIP会员", name: "2" },
          { title: "意向会员", name: "1" },
          { title: "过期会员", name: "3" },
        ]
      }
    },
    watch: {
      activeName() {
        this.isEmpty = 0;
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
        this.isEmpty = 0;
        this.PageNumber = 1;
        this.finished = false;
        this.isLoading = false;
        this.list = [];
        this.getMember();
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
            this.memberNumber = res.data.memberNumber;

            if (this.PageSize != res.data.member.length) {
              if (res.data.member.length == 0) {
                this.isEmpty = 1;
              } else {
                this.isEmpty = 2
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
          this.$http('/orderlist/getMember', {
            state: this.activeName,
            olsId: this.$route.query.olsId,
            PageNumber: this.PageNumber,
            PageSize: this.PageSize
          }).then(res => {
            if (res.code == 200) {

              this.clock = 1;
              this.loading = false;
              this.memberNumber = res.data.memberNumber
              this.list = [...this.list, ...res.data.member];
              if (this.PageSize > res.data.member.length) {
                this.isEmpty = 2;
                this.finished = true;

              }
            }
          })
        }
      }


    },
    components: {
      Member,
      NavBar

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
    background: #F7F7F7;
  }
</style>