<template>
  <div class="order-info">
    <div class="title">订单信息</div>
    <div>
      <span class="label">订单编号</span>
      <span>{{orderInfo.olId}}</span>
    </div>
    <div>
      <span class="label">订单状态</span>
      <span>
        <span class="tag">
          <span class="tag" v-if="orderInfo.status==1">进行中</span>
          <span class="tag" v-else-if="orderInfo.status==2">即将过期</span>
          <span class="tag" v-else-if="orderInfo.status==3">已失效</span>
          <span class="tag" v-else-if="orderInfo.status==4">未付款</span>
        
        </span>
        <!-- <span>{{orderInfo.orderTime | formatTime}}</span> -->
      </span>
    </div>
    <div>
      <span class="label">生成时间</span>
      <span>{{orderInfo.orderTime | formatTime}}</span>
    </div>
    <!-- <div  v-if="orderInfo.status!=4">
      <span class="label">到期时间</span>
      <span>{{orderInfo.endTime | formatTime}}</span>
    </div> -->
  </div>
</template>
<script>
  export default {
    props: {
      orderInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      formatTime(val) {
        return val.split(' ')[0].split('-').join('.') + ' ' + val.split(' ')[1]
      }
    }
  }
</script>
<style lang="scss" scoped>
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

    .title~div {
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