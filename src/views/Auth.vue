<template></template>
<script>
  import { setStore, getStore } from "assets/js/utils.js"
  export default {
    created() {
      const w = window.location.href.indexOf('?');
      const j = window.location.href.indexOf('#');
      let href = window.location.href;
      // 处理微信回调url
      if (w !== -1 && j > w) {
        href = window.location.href.substr(0, w) + window.location.href.substr(j, window.location.href.length) + window.location.search;
        window.location.href = href;
      }
      this.login();
    },
    methods: {
      login() {
        if (this.$route.query.code) {
          this.$http('/userinfo/login', {
            code: this.$route.query.code
          }).then(res => {
            console.log(res)
            if (res.code == 200) {
              setStore("token", res.data.token);
              setStore("uid", res.data.uid);
              if (getStore('beforeUrl')) {
                this.$router.push('/home');
              } else {
                this.$router.push(getStore('beforeUrl'))
              }
            }
          })
        }
      }
    }
  }
</script>