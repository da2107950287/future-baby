<template>
  <div class="account-detail">
    <NavBar>
      <div slot="center">未来宝贝</div>
    </NavBar>
    <div v-html="content" class="content"></div>
    <div class="consult" @click="call">电话咨询</div>
  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';

  export default {
    data() {
      return {
        mobile:"",//手机号
        content: "",//内容
      }
    },
    mounted(){
      this.showAgreement();
      this.getConfig();
    },
    methods: {
      //获取协议
      showAgreement() {
        this.$http('/other/showAgreement', {
          type: 3
        }).then(res => {
          if (res.code == 200) {
            this.content = res.data.content;
          }
        })
      },
      //获取配置
      getConfig(){
        this.$http('/other/showConfig').then(res=>{
          if(res.code==200){
            this.mobile=res.data.mobile;
          }
        })
      },
      //电话咨询
      call(){
        window.location.href=`tel://${this.mobile}`;
      }
      
    },
    components: {
      NavBar,

    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .content {
    padding: 0 1rem;


  }

  .consult {
    @include wh(100%, 44px);
    @include sc(.75rem, $fc);
    position: fixed;
    bottom: 0;
    text-align: center;
    line-height: 44px;

    background: #FC4B4C;
  }
</style>