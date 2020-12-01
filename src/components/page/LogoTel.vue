<template>
  <div class="logo-tel">
    <img src="~assets/img/home/wlbb.png" alt="">
    <div>400-688-9577</div>
  </div>
</template>
<style lang="scss">
  @import '~assets/css/mixin.scss';

  .logo-tel {
    @include wh(100%, 1.5rem);
    @include fj();
    margin: .75rem 0 1rem;
    align-items: center;
     background-color: $fc;
    font-size: 0.75rem;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: #333;
    
  }
</style>