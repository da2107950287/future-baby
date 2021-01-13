<template>
  <div class="network-intro">
    <div class="network-name-box">
      <div class="name">{{olsName}}</div>
      <div>
        <slot name="btn"></slot>
      </div>
    </div>
    <div class="icon-box">
      <span class="iconfont icon-weizhi icon"></span>
      <div class="location">{{address}}</div>
    </div>
    <div class="icon-box">
      <span class="iconfont icon-dianhua icon"></span>
      <div class="tel" @click="call">{{mobile}}</div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      olsName: {
        type: String,
        default() {
          return ''
        }
      },
      address: {},
      mobile: {
        type: String,
        default() {
          return ''
        }
      }
    },
    methods: {
      call() {
        window.location.href = `tel://${this.mobile}`;
      }
    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .network-intro {
    padding: .75rem 0;


    .network-name-box {
      @include fj();
      align-item: center;

      .name {
        font-size: 0.75rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;

        margin-right: 5px;
      }



    }

    .icon-box {
      @include fj(flex-start);
      margin-top: .5rem;
      align-items: center;
      font-family: PingFangSC-Regular, PingFang SC;

      .icon {
        @include sc(.64rem, #aaa) margin-right: .55rem;
      }

      .location {
        @include sc(.65rem, #333);
        font-family: PingFangSC-Regular, PingFang SC;
      }

      .tel {
        @include sc(.65rem, #41A1F2);
        font-family: PingFangSC-Regular, PingFang SC;
      }
    }


  }
</style>