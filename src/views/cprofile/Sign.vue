<template>
<div class="iframe">
  <!-- <iframe class="iframe"  src="$route.query.url" frameborder="0"></iframe>
   -->
   <!-- <div v-html="$route.query.url"></div> -->
</div>
</template>
<script>
  export default{
    data(){
      return{
        url:''
      }
    },
    mounted(){
     this.$nextTick(()=>{
      document.write(this.$route.query.url);
      document.close();
     })
    }
  }
</script>
<style lang="scss" scoped>
.iframe{
  width: 100%;
  height: 100%;
}
</style>