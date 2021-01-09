<template>
  <div>
    <LogoTel></LogoTel>
    <div class="content">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
        <van-list v-model="loading" :finished="finished" finished-text="暂无更多数据">
          <DynamicItem v-for="(item,index) in list" :key="item.dyId" :item="item"
            @updateClickState="updateClickState(index)" @updateCollState="updateCollState(index)">
            <img slot="headportrait" @click="$router.push({path:'/networkDetail',query:{olsId:item.olsId}})"
              class="head-portrait" :src="item.headportrait" alt="">
            <div slot="bname" class="bname"  @click="$router.push({path:'/networkDetail',query:{olsId:item.olsId}})">{{item.nickname}}</div>
          </DynamicItem>
        </van-list>
      </van-pull-refresh>
    </div>
    <MainTabBar></MainTabBar>
  </div>
</template>
<script>
  import MainTabBar from "components/page/mainTabbar/MainTabBar.vue"
  import LogoTel from 'components/page/LogoTel.vue';
  import DynamicItem from 'components/page/DynamicItem.vue'
  export default {
    data() {
      return {
        PageNumber: 1,//当前页数
        PageSize: 10,//每页显示多少条
        clock: 0,//1 可以请求数据
        isLoading: false,// 是否处于加载中状态
        loading: false,// 是否处于加载状态
        finished: false,// 是否已加载完成
        list: [],//动态列表
      }
    },
    mounted() {
      this.getDynamic()
    },
    methods: {
      //下拉刷新
      onRefresh() {
        this.PageNumber = 1;
        this.finished = false;
        this.isLoading = false;
        this.list = [];
        this.getDynamic();
      },
      //获取动态
      getDynamic() {
        this.loading = true;
        this.$http('/outlets/getDynamic', {
          PageNumber: this.PageNumber,
          PageSize: this.PageSize
        }).then(res => {
          if (res.code == 200) {
            this.clock = 1;
            this.loading = false;
            this.list = res.data;
            if (res.data.length == this.PageSize) {
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
            this.$http('/outlets/getDynamic', {
              PageNumber: this.PageNumber,
              PageSize: this.PageSize
            }).then(res => {
              if (res.code == 200) {
                this.clock = 1;
                this.loading = false;
                this.list = [...this.list, ...res.data];
                if (res.data.length < this.PageSize) {
                  this.finished = true;
                  window.removeEventListener("scroll", this.handleScroll);
                }
              }
            })
          }
        }
      },
        //修改点赞状态
        updateClickState(index) {
        if (this.list[index].clickState == 0) {
          this.list[index].clickNumber++;
        } else {
          this.list[index].clickNumber--;
        }
        this.list[index].clickState = this.list[index].clickState ^ 1;
      },
      //修改收藏状态
      updateCollState(index) {
        if (this.list[index].collState == 0) {
          this.list[index].collNumber++;
        } else {
          this.list[index].collNumber--;
        }
        this.list[index].collState = this.list[index].collState ^ 1;
      },
    },
    beforeDestroy() {
      window.removeEventListener("scroll", this.handleScroll)
    },
    components: {
      MainTabBar,
      LogoTel,
      DynamicItem
    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .content {
    padding: 0 1rem;
  }
</style>