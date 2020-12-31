<template>
  <div class="news-item">
    <img  :src="item.purl" alt="">
    <div class="right">
      <div class="title">{{item.title}}</div>
      <div class="right-bottom">
        <!-- <div class="tab"> -->
        <slot class="tab" name="tab"></slot>
        <!-- </div> -->
        <div class="date">{{item.oflTime | timeFormat }}</div>
      </div>
    </div>
  </div>
</template>
<script>
  import {mixin} from 'assets/js/mixin.js'
  export default{
    mixins:[mixin],
    props:{
      item:{
        type:Object,
        default(){
          return {};
        }
      }
    },
  
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .news-item {
    padding: .75rem 0;
    margin-bottom: .25rem;
    border-bottom: 1px solid #eee;
    @include fj();

    img {
      @include wh(5.25rem, 3.9rem);
      border-radius: 0.3rem;
      margin-right: .5rem;
    }

    .right {
      @include fj();
      flex-direction: column;

      .title {
        @include sc(.75rem, #333);
        @include ellipsis();
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