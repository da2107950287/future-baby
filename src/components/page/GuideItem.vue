<template>
  <div class="item">
    <img :src="item.purl" alt="">
    <div class="dec">{{item.title}}</div>
  </div>
</template>
<script>
  export default{
    props:{
      item:{
        type:Object,
        default(){
          return {};
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';
   .item {
        width: 8.1rem;
        margin-bottom: 1rem;
        font-size: 0.75rem;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #333333;
        line-height: 1.05rem;

        img {
          @include wh(8.1rem,8.1rem);
          background: #D8D8D8;
          border-radius: 0.5rem;
        }
        .dec{
          @include ellipsis();
        }
      }
</style>