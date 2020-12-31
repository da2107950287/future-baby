<template>
  <div class="account-detail">
    <NavBar>
      <div slot="center">提现</div>

    </NavBar>
    <div class="content">
      <div class="card">
        <div class="card-right">
          <span class="iconfont icon-cardb icon"></span>
          <span class="card-name">中国建设银行（0985）</span>
        </div>
        <span class="iconfont icon-fanhui2 icon"></span>
      </div>
      <div class="title">提现金额</div>
      <div class="flex">
        <span>￥</span>
        <van-field class="price" v-model="price" name=" " label="" placeholder=""
          :rules="[{ required: true, message: '' }]" />
      </div>
      <div class="blank"></div>
      <div class="amount ">
        <span>当前账户余额7920.00元，</span>
        <span class="all">全部提现</span>
      </div>
      <van-button class="btn" round block color="#aaa" native-type="submit">提现</van-button>

    </div>



  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';

  export default {
    data() {
      return {
        showCalendar: false
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

    .flex {
      display: flex;
      align-items: center;

      span {
        @include sc(.75rem, #333)
      }
    }

    .card {
      @include fj();
      padding: .8rem 0;
      align-items: center;

      .card-right {
        @include fj(center);
      align-items: center;
.icon{
  color: #FC4B4C;
  font-size: .8rem;
  margin-right: .5rem;
}
        .card-name {
          @include sc(.75rem, #333);


        }

      }

      .icon {
        display: inline-block;
        color: #aaa;
        font-size: .75rem;
        transform: rotate(180deg);

      }
    }

    .title {
      @include sc(.7rem, #aaa);

    }

    .blank {
      height: 1px;
      background: #eee;
    }

    .amount {
      @include sc(.6rem, #aaa);
      margin: .45rem 0 1.55rem;

      .all {
        color: #41A1F2;

      }
    }

    .btn {
      @include wh(12rem, 2rem);
      margin: 0 auto;

    }
  }
</style>