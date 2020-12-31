<template>
  <div class="height44">
    <div id="nav-bar">
      <div class="nav-left">
        <slot name="left"><span class="iconfont icon-fanhui2 icon" @click="$router.go(-1)"></span></slot>
      </div>
      <div class="nav-center">
        <slot name="center">标题</slot>
      </div>
      <div class="nav-right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavBar"
  }
</script>

<style scoped>
  .height44 {
    height: 44px;
    background: #fff;
  }

  #nav-bar {
    position: fixed;

    top: 0;
    display: flex;
z-index: 1;
    height: 44px;
    width: 100%;
    line-height: 44px;
    text-align: center;
    color: #333333;
    background-color: #fff;
  }

  .nav-left {
    position: absolute;
    left: 0;
    width: 40px;

  }

  .nav-center {
    flex: 1;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;

  }

  .nav-right {
    position: absolute;
    right: 0;
    font-size: 0.7rem;
    margin-right: 1rem;
  }
</style>