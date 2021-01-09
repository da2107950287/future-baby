<template>
  <div id="app">
    <keep-alive include="applyNetwork">
      <router-view></router-view>
    </keep-alive>
      
  </div>
</template>

<style lang="scss">
  @import '~assets/css/reset.scss';
  @import '~assets/css/iconfont.css';
  @import '~assets/css/mixin.scss';
 
</style>