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
    height: 49px;
  }
  #tab-bar {
    /* 本身的样式 */
    background-color: #fff;
    height: 49px;
    box-shadow: 0px -1px 1px #EDEDED;

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