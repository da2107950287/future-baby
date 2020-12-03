<template>
  <div class="card">
    <div class="name">
      <div>蒙台梭利托育课程</div>
      <div>MONTESSORI EDUCATION </div>
    </div>
    <div class="card-type">单月卡</div>
    <div class="detail">
      <div>
        <span>查看详情</span>
        <span></span>
      </div>
      <div class="price">
        ￥<span>2500</span>
        <span>购买</span>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scopde>
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
          @include fj();
          align-items: center;

          div {
            @include sc(.6rem, $fc);
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;

            &.price {
              @include wh(5.35rem, 1.5rem);

              background: #B08E5B;
              border-radius: 0.75rem;
              text-align: center;
              line-height: 1.5rem;

              span:first-child {
                font-size: .8rem;
              }

              span:last-child {
                font-size: .7rem;
                margin-left: .25rem;
              }
            }
          }
        }
      }
</style>