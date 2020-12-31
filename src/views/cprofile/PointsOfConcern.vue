<template>
  <div class="account-detail">
    <NavBar>
      <div slot="center">关注网点</div>

    </NavBar>
    <div class="content">
      <div>
        <div class="item" v-for="(item,index) in list" :key="item.olsId" @click="$router.push({path:'/networkDetail',query:{olsId:item.olsId}})">
          <div class="item-top">
            <img class="item-top-img" :src="item.image" alt="">
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

      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';

  export default {
    data() {
      return {
        PageNumber: 1,//当前页数
        PageSize: 4,//每页显示多少条
        list: [],//动态列表
      }
    },
    mounted() {
      this.getOutletsFollow();
    },
    methods: {
      getOutletsFollow() {
        this.$toast.loading({
          duration: 0,
          message: '加载中...',
          forbidClick: true,
        });
        this.$http('/outlets/getOutletsFollow', {
          PageNumber: this.PageNumber,
          PageSize: this.PageSize
        }).then(res => {
          if (res.code == 200) {
            this.$toast.clear();
            this.list = res.data;
            this.clock = 1;
            if (this.PageSize == res.data.length) {
              window.addEventListener('scroll', this.handleScroll)
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
            this.$toast.loading({
              duration: 0,
              message: '加载中...',
              forbidClick: true,
            });
            this.$http('/outlets/getOutletsFollow', {
              PageNumber: this.PageNumber,
              PageSize: this.PageSize
            }).then(res => {
              if (res.code == 200) {
                this.$toast.clear();
                this.list = [...this.list, ...res.data];
                this.clock = 1;
                if (this.PageSize > res.data.length) {
                  window.removeEventListener('scroll', this.handleScroll)
                }
              }
            })
          }
        }
      },
      setOutletsFollow(olsId, index) {
        this.$http('/outlets/setOutletsFollow', {
          olsId
        }).then(res => {
          if (res.code == 200) {
            this.list.splice(index, 1);
          }
        })
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