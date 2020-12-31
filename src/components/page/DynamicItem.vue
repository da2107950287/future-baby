<template>
  <div class="item">
    <slot name="headportrait"></slot>
    <!-- <img @click="$router.push({path:'/networkDetail',query:{olsId:item.olsId}})" class="head-portrait" :src="item.headportrait" alt=""> -->
    <div>
      <slot name="bname"></slot>

      <div class="dynamic-content">
        <div>{{item.content}}</div>
        <div class="video-images">
          <video v-if="item.dyType==1" :src="item.picture"></video>
          <div v-else>
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

    computed: {
      picture() {

        return this.item.picture.split(",")
      }
    },
    methods: {
      enlargeImg(index) {
        ImagePreview({
          images:this.picture,
          startPosition:index,
          loop:false 
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
    }

  }
</script>
<style lang="scss" scoped>
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
          margin-right: .3rem;
          margin-bottom: .2rem;

          border-radius: 5px;
          background-color: #000;

          &:only-child {
            margin-right: 0;
            @include wh(9.1rem, 9.1rem);

          }

          &:first-child:nth-last-child(n+2),
          &:first-child:nth-last-child(n+2)~img {
            width: calc(50% - .3rem);
            height: 4.3rem;
            overflow: hidden;
          }

          &:first-child:nth-last-child(n+5),
          &:first-child:nth-last-child(n+5)~img {
            width: calc(33.33333% - .3rem);
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