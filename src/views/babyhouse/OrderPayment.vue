<template>
  <div class="order-payment" v-cloak>
    <NavBar>
      <div slot="center">订单支付</div>
    </NavBar>
    <div class="content">
      <div>
        <NetworkIntro :olsName="info.olsName" :address="address" :mobile="info.mobile" :olsId="olsId"></NetworkIntro>
        <Card :card="info.commodityEntity" style="margin-top: .25rem;"></Card>
        <div class="voucher">
          <span>抵扣券</span>
          <span @click="$router.push({path:'/networkVouchers',query:{olsId:info.olsId}})">
            <span v-if="!price">选择抵扣券</span>
            <span v-else>￥{{price}}</span>
            <span class="iconfont icon-fanhui2 icon"></span></span>
        </div>
      </div>
      <div class="btn">
        <van-button color="#FC4B4C" round block @click="pay">微信支付</van-button>
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
        info: {},
        olsId: this.$route.query.olsId,
        address: "",
        price: '',
        dtnId: ''
      }
    },

    created() {
      this.showOutlets();
      if (this.$route.query.dtnId) {
        this.dtnId = this.$route.query.dtnId || ''
      }
      if (this.$route.query.price) {
        this.price = this.$route.query.price
      }
    },
    methods: {
      //查询网点信息
      showOutlets() {
        this.$http('/outlets/showOutlets', {
          olsId: this.olsId
        }).then(res => {
          if (res.code == 200) {
            this.info = res.data;
            this.address = this.info.province + this.info.city + this.info.area + this.info.address;
          }
        })
      },
      pay() {

        this.$http('/orderlist/insertOrderlist', {
          olsId: this.$route.query.olsId,
          comId: this.info.commodityEntity.comId,
          dtnId: this.dtnId
        }).then(res => {
          if (res.code == 200) {
            window.location.href = res.data;
          } else if (res.code == 500) {
            this.$toast.fail(res.msg)
          }
        })
      }
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

  [v-cloak] {
    display: none;
  }

  .order-payment {
    @include wh(100%, 100%);

    .content {
      padding: 0 1rem;

      .btn {

        padding: 3rem 1rem 0;
      }
    }

    .voucher {
      @include fj();
      @include sc(.6rem, $fc);
      margin-top: 1rem;
      padding: 0 10px;
      align-items: center;
      line-height: 2rem;
      background: linear-gradient(225deg, #F2D197 0%, #DAB074 100%);
      border-radius: 0.5rem;
    }

    .icon {
      display: inline-block;
      color: $fc;
      transform: rotate(180deg);

    }

  }
</style>