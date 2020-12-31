<template>
  <tab-bar>
    <tab-bar-item link="/home">
      <img slot="icon" src="~assets/img/home/gx.png" alt="">
      <img slot="active-icon" src="~assets/img/home/gx_a.png" alt="">
      <div slot="text">官宣</div>
    </tab-bar-item>
    <tab-bar-item link="/babyHouse">
      <img slot="icon" src="~assets/img/home/bbzj.png" alt="">
      <img slot="active-icon" src="~assets/img/home/bbzj_a.png" alt="">
      <div slot="text">宝贝之家</div>
    </tab-bar-item>
    <tab-bar-item link="/outlets">
      <img slot="icon" src="~assets/img/home/wd.png" alt="">
      <img slot="active-icon" src="~assets/img/home/wd_a.png" alt="">
      <div slot="text">网点</div>
    </tab-bar-item>
    <tab-bar-item link="/community">
      <img slot="icon" src="~assets/img/home/cyzx.png" alt="">
      <img slot="active-icon" src="~assets/img/home/cyzx_a.png" alt="">
      <div slot="text">创业中心</div>
    </tab-bar-item>
    <tab-bar-item  :link="link">
      <img slot="icon" src="~assets/img/home/my.png" alt="">
      <img slot="active-icon" src="~assets/img/home/my_a.png" alt="">
      <div slot="text">我的</div>
    </tab-bar-item>
    <!-- <tab-bar-item v-else link="/bprofile">
      <img slot="icon" src="~assets/img/home/my.png" alt="">
      <img slot="active-icon" src="~assets/img/home/my_a.png" alt="">
      <div slot="text">我的</div>
    </tab-bar-item> -->

  </tab-bar>
</template>

<script>
  import TabBar from '../../common/tabbar/TabBar.vue'
  import TabBarItem from '../../common/tabbar/TabBarItem'
  import { getStore } from 'assets/js/utils.js'
  export default {
    name: "MainTabBar",
    computed: {
      link(){
        return getStore('link') || '/cprofile'
      }
    },
    components: {
      TabBar,
      TabBarItem
    }
  }
</script>

<style scoped>

</style>