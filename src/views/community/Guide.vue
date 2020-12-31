<template>
  <div>
    <NavBar>
      <div slot="center">加盟指南</div>
    </NavBar>
    <div class="content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" style="width: 100%">
        <van-list v-model="loading" :finished="finished" finished-text="暂无更多数据">
          <GuideItem v-for="item in list" :key="item.oflId" :item="item"
          @click.native=" $router.push({path:'/details',query:{oflId:item.oflId}})">
        </GuideItem>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar.vue';

  import GuideItem from 'components/page/GuideItem.vue';
  export default {
    data() {
      return {
        PageNumber: 1,//当前页数
        PageSize: 10,//每页显示多少条
        list: [],//加盟指南列表
        clock: 0,//1可以请求数据
        isLoading: false,// 是否处于加载中状态
        loading: false,// 是否处于加载状态
        finished: false,// 是否已加载完成
      }
    },
    mounted() {
      this.getOfficial();
    },
    methods: {
      //获取加盟指南
      getOfficial() {
        this.loading = true;
        this.$http('/official/getOfficial', {
          oflSort: 5,
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
              oflSort: 5,
              oflType: 2,
              PageNumber: this.PageNumber,
              PageSize: this.PageSize
            }).then(res => {
              if (res.code == 200) {
                this.loading = false;
                this.clock = 1;
                this.list = [...this.list, ...res.data];
                if (this.PageSize > res.data.length) {
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
        this.finished = false;
        this.isLoading = false;
        this.list = [];
        this.PageNumber = 1;
        this.getOfficial();
      },

    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.handleScroll)
    },
    components: {
      NavBar,
      GuideItem
    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .content {
    padding: .75rem 1rem 0;
    @include fj();

    flex-wrap: wrap;



  }
</style>