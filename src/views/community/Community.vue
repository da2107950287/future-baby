<template>
  <div class="community">
    <header>
      <img src="~assets/img/home/wlbb.png" alt="">
      <div>400-688-9577</div>
    </header>
    <div>

    </div>
    <div>
      <NewsItem></NewsItem>
    </div>
  </div>
</template>
<script>
    import NewsItem from 'components/page/NewsItem.vue';

  export default{
components:{
  NewsItem
}
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .community {
    header {
      @include wh(100%, 5rem);
      @include fj();
      @include font(.75rem, 1.05rem) padding: .75rem;
      font-weight: 600;
      color: $fc;
      background-color: #F24142;
      border-radius: 100% 100% 100% 100% / 0% 0% 60% 60%;

      img {
        @include wh(4.7rem, 1.5rem)
      }
    }
  }
</style>