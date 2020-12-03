<template>
  <div class="news-item">
    <img src="" alt="">
    <div class="right">
      <div class="title">未来我们一起加油！10月新园长培训圆满落幕！</div>
      <div class="right-bottom">
        <!-- <div class="tab"> -->
        <slot class="tab" name="tab"></slot>
        <!-- </div> -->
        <div class="date">2020.11.20</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .news-item {
    padding: .75rem 1rem;
    margin-bottom: .25rem;
    border-bottom: 1px solid #eee;
    @include fj();

    img {
      @include wh(5.25rem, 3.9rem);
      border-radius: 0.3rem;
      background: #000;
      margin-right: .5rem;
    }

    .right {
      @include fj();
      flex-direction: column;

      .title {
        @include sc(.75rem, #333);
        @include ellipse();
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;

      }

      .right-bottom {
        @include fj(flex-start);

        div:nth-child(2) {
          margin-left: 1rem;
        }

        div:not(.date) {
          @include sc(.6rem, #FF7373);
        }

        div {
          font-family: PingFangSC-Regular, PingFang SC;
        }

        .date {
          @include sc(.6rem, #aaa);


        }
      }
    }
  }
</style>