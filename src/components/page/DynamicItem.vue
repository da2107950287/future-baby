<template>
  <div class="item">
    <slot name="headportrait"></slot>
    <!-- <img @click="$router.push({path:'/networkDetail',query:{olsId:item.olsId}})" class="head-portrait" :src="item.headportrait" alt=""> -->
    <div class="left-content">
      <slot name="bname"></slot>

      <div class="dynamic-content">
        <div>{{item.content}}</div>
        <div class="video-images">

          <div v-if="item.dyType==1" style="margin-bottom: 10px;border-radius: 10px; ">
            <video-player class="video-player vjs-custom-skin" ref="videoPlayer" :playsinline="true" x-webkit-airplay="allow"
               :options="playerOptions" webkit-playsinline="true" 
              @fullscreenchange="onPlayerFullScreenchange($event)">
            </video-player>
           
              <!-- <video class="video" :src="item.picture" style="width: 80%;" controls webkit-playsinline="true" x5-playsinline="true" x5-video-orientation="landscape"></video> -->
          </div>
          <!-- webkit-playsinline="true" x5-playsinline="true" x5-video-orientation="landscape" -->
          <!-- <video v-if="item.dyType==1" :src="item.picture" autoplay width="100%" height="100%" controls preload="none"
            webkit-playsinline playsinline="true"></video> -->
          <div v-else-if="item.dyType==2">
            <img v-for="(val,index) in picture" :src="val" :key="index" @click="enlargeImg(index)" alt="">
          </div>
        </div>
      </div>
      <div class="operation">
        <span class="date">{{item.dyTime | timeFormat}}</span>
        <div class="btns">
          <div @click="updateClickState(item.dyId)">
            <span :style="{color:item.clickState == 1?'#F24142':'#aaa'}" class="iconfont icon-dianzan" :class=""></span>
            <span class="text">&nbsp;{{item.clickNumber}}</span>
          </div>
          <div @click="updateCollState(item.dyId)">
            <span :style="{color:item.collState == 1?'#F24142':'#aaa'}" class="iconfont icon-collection-b"
              :class=""></span>
            <span class="text">&nbsp;{{item.collNumber}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { mixin } from "assets/js/mixin.js";
  import { ImagePreview } from 'vant'
  import { videoPlayer } from 'vue-video-player'
  import 'video.js/dist/video-js.css'
  import 'vue-video-player/src/custom-theme.css'
  export default {
    mixins: [mixin],
    props: {
      item: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        events: ['fullscreenchange'],
        img: '',
        playerOptions: {
          playbackRates: [0.75, 1.0, 1.5, 2.0], //播放速度
          autoplay: false, //如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            src: this.item.picture,  // 路径
            type: 'video/mp4'  // 类型
          }, {
            src: this.item.picture,
            type: 'video/webm'
          }],
          poster: this.img, //你的封面地址
          notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
           
            remainingTimeDisplay: false,
            fullscreenToggle: true // 全屏按钮
          }
     

        }

      }
    },
    computed: {
      picture() {
        return this.item.picture.split(",")
      },

    },

    methods: {
      onPlayerFullScreenchange() {

      },
      enlargeImg(index) {
        ImagePreview({
          images: this.picture,
          startPosition: index,
          loop: false
        })
      },
      //修改点赞状态
      updateClickState(dyId) {
        this.$http('/outlets/setDynamicClick', {
          dyId
        }).then(res => {
          if (res.code == 200) {
            this.$emit('updateClickState');

          }
        })
      },
      //修改收藏状态
      updateCollState(dyId) {
        this.$http('/outlets/setDynamicColl', {
          dyId
        }).then(res => {
          if (res.code == 200) {
            this.$emit('updateCollState')
          }
        })
      }
    },
    components: {
      videoPlayer
    }

  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  /deep/ .vjs-custom-skin>.video-js .vjs-control-bar {
    font-size: 12px;
  }

  /deep/ .video-js {
    /* background-color: #fff; */
  }

  /deep/ .video-js .vjs-big-play-button {

    height: 2em;
    width: 2em;
    line-height: 2em;
    border-radius: 1em;

  }

  .item {
    @include fj();
    margin-bottom: 1rem;
    width: 100%;

    .head-portrait {

      @include wh(2rem, 2rem);
      margin-right: .5rem;
      border-radius: 0.2rem;
      flex-shrink: 0
    }

    .left-content {
      width: 100%;
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
          margin-right: 6px;
          margin-bottom: 2px;
          border-radius: 5px;

          &:only-child {
            margin-right: 0;
            @include wh(9.1rem, 9.1rem);

          }

          &:first-child:nth-last-child(n+2),
          &:first-child:nth-last-child(n+2)~img {
            width: calc(34% - 6px);
            height: 4.3rem;
            overflow: hidden;
          }

          &:first-child:nth-last-child(n+5),
          &:first-child:nth-last-child(n+5)~img {
            width: calc(33.33333% - 6px);
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

        flex: 2.5;

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