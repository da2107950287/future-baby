<template>
  <div>
    <NavBar>
      <div slot="center">最新</div>
    </NavBar>
    <div class="content">
     <NewsItem>
       <div slot="tab">儿童之家</div>
     </NewsItem>
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