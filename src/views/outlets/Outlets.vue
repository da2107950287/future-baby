<template>
  <div class="brand-intro">
  
    <div class="content">
      <LogoTel></LogoTel>
      <div>
        <img class="cover" src="" alt="">
        
       
      </div>
    </div>
  </div>
  </div>
</template>
<script>

  import LogoTel from 'components/page/LogoTel.vue';
  export default {
    data() {
      return {

      }
    },
    components: {
      LogoTel
    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .content {
    padding: 0 1rem;
    .cover {
      width: 16.75rem;
      height: 7.7rem;
      border-radius: 0.5rem;
      background-color: #000;
      margin-bottom: 1rem;
    }
  }
</style>