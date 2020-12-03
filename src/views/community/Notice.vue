<template>
  <div>
    <NavBar>
      <div slot="center">开店公告</div>
    </NavBar>
    <div class="content">
     <NewsItem></NewsItem>
     <NewsItem></NewsItem>
    </div>
  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar.vue';
  import NewsItem from 'components/page/NewsItem.vue';
  export default {
    data() {
      return {

      }
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
    

   
  }
</style>