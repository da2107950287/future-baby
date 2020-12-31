<template>
  <div class="setting">
    <NavBar>
      <div slot="center">设置</div>
    </NavBar>
    <div class="content">
      <div class="item">
        <div class="text">是否愿意接收课程介绍的微信通知</div>
        <van-switch @change="change('tip1',tip1)" v-model="tip1" size=".95rem" active-color="#FC4B4C" />
      </div>
      <div class="item">
        <div class="text">是否愿意接受课程付款相关提醒</div>
        <van-switch @change="change('tip2',tip2)" v-model="tip2" size=".95rem" active-color="#FC4B4C" />
      </div>
      <div class="item">
        <div class="text">是否愿意接收课程到期提醒</div>
        <van-switch @change="change('tip3',tip3)" v-model="tip3" size=".95rem" active-color="#FC4B4C" />
      </div>
      <div class="item">
        <div class="text">是否愿意接收抵用券到账提醒</div>
        <van-switch @change="change('tip4',tip4)" v-model="tip4" size=".95rem" active-color="#FC4B4C" />
      </div>
    </div>
  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';

  export default {
    data() {
      return {
        tip1: "",// 是否愿意接收课程介绍的微信通知 1 是 2 否
        tip2: "",//是否愿意接受课程付款相关提醒  1 是 2 否
        tip3: "",//是否愿意接收课程到期提醒  1 是 2 否
        tip4: "",//是否愿意接收抵用券到账提醒 1 是 2 否
      }
    },
    created() {
      this.showRemind()
    },
    methods: {

      showRemind() {
        this.$http('/other/showRemind').then(res => {
          if (res.code == 200) {

            this.tip1 = Boolean(res.data.tip1 & 1);
            this.tip2 = Boolean(res.data.tip2 & 1);
            this.tip3 = Boolean(res.data.tip3 & 1);
            this.tip4 = Boolean(res.data.tip4 & 1);
          }
        })
      },
      change(key, value) {
        console.log(value)
        if (value) {
          value = 1;
        } else {
          value = 2;
        }
        this.$http('/other/updateRemind', {
          key,
          value
        }).then(res => {
          if (res.code == 200) {
            this.$toast.success(res.msg)
          } else if (res.code == 500) {
            this.$toast.fail(res.msg)
          }
        })
      }
    },
    components: {
      NavBar,

    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .setting {
    @include wh(100%, 100%);

    .content {
      @include wh(100%, calc(100% - 44px));
      background: #F2F2F2;
      padding-top: .5rem;

      .item {
        @include fj();
        @include wh(100%, 2.55rem);

        align-items: center;
        padding: 0 1rem;
        margin-bottom: .5rem;
        line-height: 2.55rem;
        background: $fc;

        .text {
          @include sc(.75rem, #333);


        }

      }
    }

  }
</style>