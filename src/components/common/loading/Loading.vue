<template>
 <div class="page">
  <div id="loading" >
    <div class="loader-inner ball-beat">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="text">努力加载中...</div>
  </div>
 </div>
</template>

<style lang="scss" scoped>
  .page{
    position: absolute;
    top: 0;
    z-index:100;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  #loading {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
  
    ;
  }

  @keyframes ball-beat {
    50% {
      opacity: .2;
      transform: scale(.75);
    }

    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .ball-beat>div {
    background-color: #FC4B4C;
    width: 10px;
    height: 10px;
    border-radius: 100% !important;
    margin: 2px;
    animation-fill-mode: both;
    display: inline-block;
    animation: ball-beat .7s 0s infinite linear;
  }
  .ball-beat>div:nth-child(2n-1){
    animation-delay: .35s !important;
  }
  .text{
    font-size: 12px;
    text-align: center;
    color: #aaa;
  }
</style>