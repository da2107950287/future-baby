<template>
  <div id="tab-bar-item" @click="itemClick">
    <div class="item-icon" v-show="!isActive">
      <slot name="icon"></slot>
    </div>
    <div class="item-active-icon" v-show="isActive">
      <slot name="active-icon"></slot>
    </div>
    <div class="item-text" :style="activeStyle">
      <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      link: {
        type: String,
        required: true
      }
    },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.link) !== -1
      },
      activeStyle() {
        return this.isActive ? { 'color': '#F24142','font-weight':500 } : {}
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.link)
      }
    }
  }
</script>

<style scoped>
  #tab-bar-item {
    flex: 1;
  }

  .item-icon img,
  .item-active-icon img {
    width: 1.2rem;
    height: 1.2rem;
    margin-top: .15rem;
    vertical-align: middle;
  }

  .item-text {
    font-size: 0.6rem;
    margin-top: 3px;
    color: #999;
  }
</style>