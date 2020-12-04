<template>
  <div class="c-order">
    <NavBar>
      <div slot="center">
        <van-search v-model="value" shape="round" placeholder="请输入搜索关键词" />
      </div>
    </NavBar>
    <div class="order-list">
      <van-tabs  v-model="active" color="#FC4B4C" title-active-color="#FC4B4C" title-inactive-color="#333">
        <van-tab title="全部">
          <Corder></Corder>
        </van-tab>
        <van-tab title="新订单">新订单</van-tab>
        <van-tab title="进行中">进行中</van-tab>
        <van-tab title="即将过期">即将过期</van-tab>
        <van-tab title="已失效">已失效</van-tab>
  
      </van-tabs>
    </div>


  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';
  import Corder from 'components/page/Corder.vue'

  export default {
    data() {
      return {

      }
    },
    components: {
      NavBar,
      Corder

    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';
.c-order{
  @include wh(100%,100%);
  

}
  .van-search {
    padding: .3rem 0;
  }
  .order-list{
    height:calc(100% - 44px);
    overflow-y: scroll;
    background: #F7F7F7;
  }
</style>