<template>
  <div class="account-detail">
    <NavBar>
      <div slot="center">关注网点</div>

    </NavBar>
    <div class="content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="">

          <div class="item" v-for="(item,index) in list" :key="item.olsId">
            <div class="item-top">
              <img @click="$router.push({path:'/networkDetail',query:{olsId:item.olsId}})" class="item-top-img"
                :src="item.image" alt="">
              <div class="item-top-right">
                <div class="name">{{item.olsName}}</div>
                <div class="btn" @click="setOutletsFollow(item.olsId,index)">已关注</div>
              </div>
            </div>
            <div class="icon-box">
              <span class="iconfont icon-weizhi icon"></span>
              <div class="location">{{item.province}}{{item.city}}{{item.area}}{{item.address}}</div>
            </div>
            <div class="icon-box">
              <span class="iconfont icon-dianhua icon"></span>
              <div class="tel">{{item.mobile}}</div>
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
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';
  import { Dialog } from 'vant'
  export default {
    data() {
      return {
        isLoading: false,// 是否处于加载中状态
        loading: false,// 是否处于加载状态
        finished: false,// 是否已加载完成
        isEmpty: 0,
        PageNumber: 1,//当前页数
        PageSize: 10,//每页显示多少条
        list: [],//动态列表
      }
    },
    mounted() {
      this.getOutletsFollow();
    },
    methods: {
      getOutletsFollow() {
        this.loading = true;
        this.$http('/outlets/getOutletsFollow', {
          PageNumber: this.PageNumber,
          PageSize: this.PageSize
        }).then(res => {
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
        })
      },
      //下拉刷新
      onRefresh() {
        this.PageNumber = 1;
        this.isEmpty = 0;
        this.finished = false;
        this.isLoading = false;
        this.list = [];
        this.getOutletsFollow();
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
            this.$http('/outlets/getOutletsFollow', {
              PageNumber: this.PageNumber,
              PageSize: this.PageSize
            }).then(res => {
              if (res.code == 200) {
                this.$toast.clear();
                this.list = [...this.list, ...res.data];
                this.clock = 1;
                this.loading = false;
                if (this.PageSize > res.data.length) {
                  this.isEmpty = 2;
                  this.finished = true;
                  window.removeEventListener('scroll', this.handleScroll)
                }
              }
            })
          }
        }
      },
      setOutletsFollow(olsId, index) {
        Dialog.confirm({
          title: '提示',
          message: '确认取消关注该网点？',
        })
          .then(() => {
            this.$http('/outlets/setOutletsFollow', {
              olsId
            }).then(res => {
              if (res.code == 200) {
                this.$toast.success(res.msg)
                this.list.splice(index, 1);
                if (this.list.length == 0) {
                  this.isEmpty = 1;
                }
              }
            })
          })
          .catch(() => {
            // on cancel
          });

      },
    },
    components: {
      NavBar,

    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .content {
    padding: 0 1rem;

    .item {
      border-bottom: 1px solid #eee;
      padding: .75rem 0 .7rem;

      .item-top {
        @include fj(flex-start);
        margin-bottom: .75rem;

        .item-top-img {
          @include wh(3.7rem, 3.7rem);
          border-radius: 0.25rem;
          margin-right: .5rem;
        }

        .item-top-right {
          @include fj();
          flex-direction: column;

          .name {
            @include sc(.75rem, #333);

          }

          .btn {

            @include wh(4rem, 1.5rem);
            @include sc(.75rem, #aaa);
            text-align: center;
            line-height: 1.5rem;
            border-radius: 0.75rem;
            border: 0.05rem solid #AAAAAA;
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
  }
</style>