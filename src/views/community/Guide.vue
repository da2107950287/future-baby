<template>
  <div>
    <NavBar>
      <div slot="center">加盟指南</div>
    </NavBar>
    <div class="content">
     <GuideItem></GuideItem>
     <GuideItem></GuideItem>
     <GuideItem></GuideItem>

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

      }
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