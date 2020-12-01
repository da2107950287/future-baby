<template>
  <div class="brand-intro">
    <NavBar>
      <div slot="center">育儿知识</div>
    </NavBar>
    <div class="content">
      <LogoTel></LogoTel>
     
    </div>
  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';
  import LogoTel from 'components/page/LogoTel.vue';
  export default {
    data() {
      return {

      }
    },
    components: {
      NavBar,
      LogoTel
    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .content {
    padding: 0 1rem;

  
    
  }
</style>