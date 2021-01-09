<template>
  <div class="card">
    <div class="name">
      <div>{{card.courseName}}</div>
      <div>{{card.courseEnglishName}}</div>
    </div>
    <div class="card-type">{{card.comName}}</div>
    <div class="detail">
      <div class="price" @click="$router.push({path:'/orderPayment',query:{olsId:card.olsId}})">
        ￥<div>{{card.price}}</div>
        <div>购买</div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      card: {
        type: Object,
        default() {
          return {};
        }
      },
     

    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .card {
    @include fj();
    @include wh(16.7rem, 9.4rem);

    flex-direction: column;
    position: relative;
    padding: 1rem;
    border-radius: .5rem;
    background: linear-gradient(245deg, #F4D7A4 0%, #DAB074 100%);

    .name {
      div {
        font-weight: 600;
        font-family: PingFangSC-Semibold, PingFang SC;

        color: $fc;
      }

      div:first-child {
        font-size: 0.85rem;
      }

      div:last-child {
        font-size: 0.5rem;

      }
    }

    .card-type {
      @include center();
      @include sc(1.5rem, $fc) font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;

    }

    .detail {
      @include fj(flex-end);
      align-items: center;

      div {
        @include sc(.6rem, $fc);
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;

        &.price {
          @include wh(5.35rem, 1.5rem);
          @include fj(center);
          align-items: centre;

          background: #B08E5B;
          border-radius: 0.75rem;
          text-align: center;
          line-height: 1.5rem;


          div:first-child {
            font-size: .8rem;
          }

          div:last-child {
            font-size: .7rem;
            margin-left: .25rem;
          }
        }
      }
    }
  }
</style>