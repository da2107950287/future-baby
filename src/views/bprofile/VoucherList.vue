<template>
  <div class="vouch_list">
    <NavBar>
      <div slot="center">抵用券列表</div>
    </NavBar>
    <div class="content">

      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="">
          <div class="item" v-for="item in list" :key="item.dtnId">
            <div class="color3">月度课程名称：{{item.courseName}}</div>
            <div class="colora font65">生成时间：{{item.createTime | formatTime1}}</div>
            <div class="color3">抵用券金额 <span class="red">{{item.price}}</span></div>
            <div class="color3">有效时间 <span class="colora">{{item.createTime | formatTime}}-{{item.endTime |
                formatTime}}</span></div>
            <div :class="item.uid!=''?'active':''" class="label">
              <div v-if="item.uid==''">未领取</div>
              <div v-else>已领取</div>
              <div :class="item.uid!=''?'active1':''" class="arrow"></div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>
      <div v-if="isEmpty==1" style="position: fixed;top: 50%;left: 50%;transform: translate(-50%,-50%);">
        <img src="~assets/img/empty.png" alt="">
      </div>
      <div v-if="isEmpty==2" style="text-align: center;color: #aaa;font-size: 14px;padding: 10px">暂无更多数据</div>
    </div>
    <div class="fixed" @click="$router.push({path:'/voucher',query:{olsId:$route.query.olsId}})">创建优惠券</div>
  </div>
</template>
<script>
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
      formatTime(val) {
        return val.split(' ')[0].split('-').join('.')
      },
      formatTime1(val) {
        return val.split(' ')[0].split('-').join('.') + ' ' + val.split(' ')[1]
      }
    },
    created() {
      this.getDeduction()
    },
    methods: {
      getDeduction() {
        this.loading = true;
        this.$http('/orderlist/getDeduction', {
          state: "",
          olsId: this.$route.query.olsId,
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
              this.isEmpty = 2
            }
            this.finished = true;
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
              state: "",
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
        this.getDeduction();
      },
    },
    components: {
      NavBar
    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .vouch_list {
    height: 100%;
  }

  .fixed {
    @include sc(14px, #333);
    position: fixed;
    bottom: 0;
    height: 44px;
    width: 100%;
    line-height: 44px;

    background-color: $fc;
    text-align: center;

    border-top: 1px solid #ececec;

  }

  .content {
    height: auto;
    background: #F7F7F7;
    padding: .5rem 1rem;
    margin-bottom: 44px;
    min-height: calc(100% - 44px);

    .item {
      position: relative;
      padding: 1rem;
      background-color: $fc;
      margin-bottom: .5rem;

      box-shadow: 0rem 0.1rem 0.2rem 0rem rgba(230, 230, 230, 0.4);
      border-radius: 0.5rem;

      >div:nth-child(1) {
        margin-bottom: .5rem;
      }

      >div:nth-child(2) {
        margin-bottom: .8rem;
      }

      div:nth-child(3) {
        margin-bottom: 1rem;
      }

      div:nth-child(4) {
        margin-bottom: .6rem;
      }

      .color3 {

        font-size: 0.75rem;
        color: #333333;
      }

      .colora {
        font-size: 0.75rem;
        color: #aaa;
      }

      .font65 {
        font-size: .65rem;
      }

      .red {

        font-size: 0.9rem;

        color: #FC4B4C;
      }

      .label {
        position: absolute;
        right: 1.5rem;
        top: 0;
        width: 1rem;
        height: 2.65rem;
        color: $fc;
        font-size: .6rem;
        text-align: center;
        background: #aaa;

        border-bottom: 10px solid transparent;

        .arrow {
          border: .5rem solid #aaa;
          border-bottom-color: transparent;

        }

        .active1 {
          border-color: #FC4B4C;

          border-bottom-color: transparent;

        }
      }


      .active {
        background-color: #FC4B4C;
      }
    }

  }
</style>