<template>
  <div class="item">
    <img class="head-portrait" src="" alt="">
    <div>
      <div class="bname">未来宝贝成都高新中心</div>
      <div class="dynamic-content">
        <div>早教为什么越早越好？？抬头晚、翻身晚、坐就晚、爬也晚、走一定晚，一项落后其他项也会发育滞后，那孩子的智力、说话、动作、习惯以及各项能力都会跟着发育迟缓，这是孩子特有的“累加模式”发育规律。</div>
        <div class="video-images">
          <!-- <video src=""></video> -->
          <img src="" alt="">
        </div>
      </div>
      <div class="operation">
        <span class="date">2020.10.04</span>
        <div class="btns">
          <div>
            <span class="iconfont icon-dianzan" :class=""></span>
            <span class="text">&nbsp;点赞</span>
          </div>
          <div>
            <span class="iconfont icon-collection-b" :class=""></span>
            <span class="text">&nbsp;收藏</span>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scopde>
  @import '~assets/css/mixin.scss';

    .item {
      @include fj();
      margin-bottom: 1rem;

      .head-portrait {

        @include wh(2rem, 2rem);
        margin-right: .5rem;
        border-radius: 0.2rem;
        background-color: #000;
      }

      .bname {
        font-size: 0.7rem;
        font-family: PingFangSC-Regular, PingFang SC;
        color: #41A1F2;
      }

      .dynamic-content {
        margin-top: .5rem;

        div {
          font-size: 0.75rem;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
        }

        .video-images {
          margin-top: .7rem;

          .video {
            @include wh(9.1rem, 9.1rem);
            border-radius: 0.5rem;
          }

          img {
            margin-right: .5rem;
            margin-bottom: .5rem;

            border-radius: 0.5rem;
            background-color: #000;

            &:only-child {
              margin-right: 0;
              @include wh(9.1rem, 9.1rem);

            }

            &:first-child:nth-last-child(n+2),
            &:first-child:nth-last-child(n+2)~img {
              width: calc(50% - .5rem);
              height: 4.3rem;
              overflow: hidden;
            }

            &:first-child:nth-last-child(n+5),
            &:first-child:nth-last-child(n+5)~img {
              width: calc(33.33333% - .5rem);
              height: 4.3rem;
              overflow: hidden;
            }
          }
        }


      }

      .operation {
        @include fj();
        align-items: center;
        font-size: .6rem;

        color: #AAAAAA;

        .date {
          flex: 5;
          font-family: PingFangSC-Regular, PingFang SC;
        }

        .btns {

          @include fj();

          flex: 3;

          span {
            font-size: .75rem;
          }

          span.text {

            font-size: 0.6rem;
            font-family: PingFangSC-Regular, PingFang SC;
            color: #AAAAAA;
            line-height: 0.85rem;
          }

        }
      }
    }
</style>