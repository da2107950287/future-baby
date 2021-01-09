<template>
  <div class="logo-tel">
    <img :src="logo" alt="">
    <div @click="call">{{mobile}}</div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        logo: "",
        mobile: ""
      }
    },
    created() {
      this.getConfig()
    },
    methods: {
      getConfig() {
        this.$http('/other/showConfig').then(res => {
          if (res.code == 200) {
            this.mobile = res.data.mobile;
            this.logo = res.data.logo;
          }
        })
      },
      call() {
        window.location.href = `tel://${this.mobile}`;
      }
    }
  }
</script>
<style lang="scss">
  @import '~assets/css/mixin.scss';

  div.logo-tel {
    /* @include wh(100%, 2.2rem);
    @include fj();

    align-items: center;
    background-color: $fc;
    font-size: 0.75rem;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: $fc;
    background-color: #F24142;
    margin-bottom: 20px;
    padding:0 1rem */
    @include wh(100%, 2.5rem);
    @include fj();
    align-items: center;
    font-size: .75rem;

    /* @include font(.75rem, 1.05rem); */

    padding: 0 1rem;
    font-weight: 600;
    color: $fc;
    background-color: #F24142;
    border-radius: 100% 100% 100% 100% / 0% 0% 80% 80%;

    img {
      @include wh(4.7rem, 1.5rem)
    }

  }
</style>