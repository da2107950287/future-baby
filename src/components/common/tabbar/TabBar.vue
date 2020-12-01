<template>
 <div class="wrap">
  <div id="tab-bar">
    <slot></slot>
  </div>
 </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  .wrap{
    height: 2.45rem;
  }
  #tab-bar {
    /* 本身的样式 */
    background-color: #fff;
    height: 2.45rem;
    box-shadow: 0rem -0.1rem 0.2rem 0rem #EDEDED;

    /* 定位相关 */
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;

    /* 利用flex进行布局 */
    display: flex;
    text-align: center;
  }
</style>