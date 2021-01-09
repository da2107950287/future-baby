<template>
  <div>
    <NavBar>
      <div slot="center">{{title}}</div>
    </NavBar>
    <div class="content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="">
          <NewsItem v-for="item in list" :key="item.oflId" :item="item"
            @click.native=" $router.push({path:'/details',query:{oflId:item.oflId}})">
            <div v-if="oflSort!=7" slot="tab">{{item.labels}}</div>
          </NewsItem>
        </van-list>
      </van-pull-refresh>
      <div v-if="isEmpty==1" style="position: fixed;top: 50%;left: 50%;transform: translate(-50%,-50%);">
        <img src="~assets/img/empty.png" alt="">
      </div>
      <div v-if="isEmpty==2" style="text-align: center;color: #aaa;font-size: 14px;padding: 10px">暂无更多数据</div>
    </div>
  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar.vue';
  import NewsItem from 'components/page/NewsItem.vue';
  export default {
    props: {
      title: {
        type: String,
        default() {
          return '';
        }
      },
      oflSort: {
        type: String,
        default() {
          return '';
        }
      }
    },
    data() {
      return {
        PageNumber: 1,//当前页数
        PageSize: 10,//每页显示多少条
        clock: 0,
        isLoading: false,// 是否处于加载中状态
        loading: false,// 是否处于加载状态
        finished: false,// 是否已加载完成
        list: [],//最新列表
        isEmpty: 0,

      }
    },
    mounted() {
      this.getOfficial()
    },
    methods: {
      //获取最新列表
      getOfficial() {
        this.loading = true;
        this.$http('/official/getOfficial', {
          oflSort: this.oflSort,
          oflType: 2,
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
            this.loading = true;
            this.$http('/official/getOfficial', {
              oflSort: "",
              oflType: 2,
              PageNumber: this.PageNumber,
              PageSize: this.PageSize
            }).then(res => {
              if (res.code == 200) {
                this.clock = 1;
                this.loading = false;
                this.list = [...this.list, ...res.data];
                if (this.PageSize > res.data.length) {
                  this.finished = true;
                  this.isEmpty = 2;
                  window.removeEventListener("scroll", this.handleScroll)
                }
              }
            })
          }
        }
      },
      //下拉刷新
      onRefresh() {
        this.isEmpty = 0
        this.PageNumber = 1;
        this.finished = false;
        this.isLoading = false;
        this.list = [];
        this.getOfficial();
      },
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.handleScroll)
    },
    components: {
      NavBar,
      NewsItem
    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .content {
    padding: 0 1rem;

  }
</style>