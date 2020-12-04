<template>
  <div class="order-info">
    <div class="title">订单信息</div>
    <div>
      <span class="label">订单编号</span>
      <span>w2020110101121123</span>
    </div>
    <div>
      <span class="label">订单状态</span>
      <span>
        <span class="tag">新订单</span>
        <span>2020.11.05 10:11:12</span>
      </span>
    </div>
    <div>
      <span class="label">生成时间</span>
      <span>2020.11.05 10:11:12</span>
    </div>
    <div>
      <span class="label">到期时间</span>
      <span>2020.11.04</span>
    </div>
  </div>
</template>
<style lang="scss" scopde>
  @import '~assets/css/mixin.scss';

  .order-info {
    background-color: $fc;
    padding: 1rem;
    
box-shadow: 0rem 0.1rem 0.2rem 0rem rgba(230, 230, 230, 0.4);
border-radius: 0.5rem;

    .title {

      font-size: 0.7rem;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;

      margin-bottom: 0.25rem;
    }

    .title ~div {
      margin-top: .5rem;
      font-size: 0.6rem;
      font-family: PingFangSC-Regular, PingFang SC;

      span {



        color: #333333;


        &.label {
          margin-right: 1rem;
        }

        &.tag {
          color: #FC4B4C;
          margin-right: .75rem;
        }
      }
    }

  }
</style>