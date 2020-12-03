<template>
  <div class="order-payment">
    <NavBar>
      <div slot="center">订单支付</div>
    </NavBar>
    <div class="content">
      <div>
        <NetworkIntro></NetworkIntro>
        <Card style="margin-top: .25rem;"></Card>
      </div>
      <div class="btn">
        <van-button color="#FC4B4C" round block>微信支付</van-button>
      </div>
    

    </div>
  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';
  import NetworkIntro from "components/page/NetworkIntro.vue";
  import Card from "components/page/Card.vue";

  export default {
    data() {
      return {

      };
    },
    methods: {

    },
    components: {
      NavBar,
      NetworkIntro,
      Card
    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .order-payment {
    @include wh(100%, 100%);

    .content {
      padding: 0 1rem;
      .btn{
       
        padding: 3rem  1rem  0;
      }
    }

  }
</style>