<template>
  <div class="c-order">
    <NavBar>
      <div slot="center">预约试学</div>
    </NavBar>
    <div class="order-list">
      <!-- <van-tabs  v-model="activeName" line-height="2px" title-active-color="#FF5246"
        title-inactive-color="#333" color="#FF5246">
        <van-tab v-for="item in tabs" :key="item.name" :title="item.title" :name="item.name">
          -->
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list class="tab-list" v-model="loading" :finished="finished" finished-text="" @load="handleScroll">
          <!-- <div class="total">
                <div class="total-left">
                  <span>共<b> {{memberNumber}} </b>名会员</span>
                </div>
                <img class="total-right" src="../../assets/img/icon_clen.png" alt="">
              </div> -->
          <div class="item" v-for="item in list" :key="item.subId">
            <div class="num">预约编号：{{item.subId}}</div>
            <div class="center">
              <img class="cover" :src="item.headportrait" alt="">
              <div>
                <div class="nickname">昵称：{{item.nickname}}</div>
                <div class="flex">
                  <div class="flex-left">
                    <div class="item-common">宝宝姓名：{{item.fullname}}</div>
                    <div class="item-common">宝宝性别：{{item.sex}}</div>
                    <div class="item-common">宝宝生日：{{item.birthday | formateBirthday}}</div>
                  </div>
                  <div class="flex-right">
                    <div class="item-common">家长身份：{{item.parentIdentity}}</div>
                    <div class="item-common">家长姓名：{{item.parentFullname}}</div>
                    <div class="item-common">家长手机号：{{item.mobile}}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex btns">
              <div class="nickname">预约时间：{{item.subTime | formateBirthday}}</div>
              <van-button class="btn" size="small " type="danger" color="#FC4B4C" plain round
                @click="call(item.mobile)">电话联系</van-button>
            </div>
          </div>
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
        PageSize: 10,//每页显示多少条
        clock: 0,//1 可以请求数据
        isLoading: false,// 是否处于加载中状态
        loading: false,// 是否处于加载状态
        finished: false,// 是否已加载完成
        list: [],//列表数据
      }
    },
    filters: {
      formateBirthday(value) {
        return value.split(' ')[0].replace(/-/g, '.');
      }
    },
    created() {
      this.getSubscribe()
    },
    methods: {
      call(mobile) {
        window.location.href = `tel://${mobile}`;
      },
      //下拉刷新
      onRefresh() {
        this.isEmpty = 0;
        this.PageNumber = 1;
        this.finished = false;
        this.isLoading = false;
        this.list = [];
        this.getSubscribe();
      },
      //获取数据
      getSubscribe() {
        this.loading = true;
        this.$http('/outlets/getSubscribe', {
          olsId: this.$route.query.olsId,
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
          this.$http('/outlets/getSubscribe', {
            olsId: this.$route.query.olsId,
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
    overflow-y: scroll;
    padding: .75rem 1rem;
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

  .item {
    margin-bottom: .5rem;
    padding: 1rem .5rem;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 0px rgba(230, 230, 230, 0.4);
    border-radius: 10px;

    .center {
      display: flex;
      margin-top: .75rem;
      align-items: center
    }

    .flex {
      display: flex;
      justify-content: space-between;

    }

    .flex-left {
      margin-right: .5rem;
    }


    .num {

      @include sc(.6rem, #aaa);
    }

    .item-common {

      @include sc(.55rem, #aaa);
      line-height: 1.1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .cover {
      @include wh(2.2rem, 2.2rem);
      border-radius: 50%;
      margin-right: .5rem;
    }

    .nickname {
      @include sc(.6rem, #333);

    }

  }

  .btns {
    margin-top: .5rem;

    .btn {
      width: 4rem;
      height: 1.5rem;
    }
  }
</style>