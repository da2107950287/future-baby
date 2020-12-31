<template>
  <div class="order">
    <div class="order-item">
      <div class="top">
        <div class="top-left">
          <img :src="item.image" alt="">
          <span class="name">{{item.olsName}}</span>
        </div>
        <div class="top-right">
          <span v-if="item.status==1">进行中</span>
          <span v-else-if="item.status==2">即将过期</span>
          <span v-else-if="item.status==3">已失效</span>
        </div>
      </div>
      <div class="center">
        <!-- <img src="../../assets/img/icon_ka.png" alt=""> -->
        <div class="img">
       
          <div class="card-name">{{item.commodity.comName}}</div>
          <div class="course-name">{{item.commodity.courseName}}</div>
          <div class="course-english-name">{{item.commodity.courseEnglishName}}</div>
        </div>
        <div class="div">
          <div>{{item.commodity.courseName}}</div>
          <div>{{item.commodity.comName}}</div>
        </div>
      </div>
      <div class="price">
        <div class="total-price">
          <span class="font6">总价</span><span class="font4">&yen;</span><span class="font6">{{item.orderPrice|
            formatPriceInteger}}</span><span class="font4">{{item.orderPrice | formatPriceDecimal}}</span>
        </div>
        <div class="deduction">
          <span class="font6">抵扣</span><span class="font4">&yen;</span><span class="font6">{{item.dtnPrice|
            formatPriceInteger}}</span><span class="font4">{{item.dtnPrice| formatPriceDecimal}}</span>

        </div>
        <div class="real-payment">
          <span class="font6">实付额</span><span class="font4">&yen;</span><span class="font6">{{item.finalPrice|
            formatPriceInteger}}</span><span class="font4">{{item.finalPrice | formatPriceDecimal}}</span>
        </div>
      </div>
    </div>
 </div>
</template>
<script>
  export default {
    props: {
      item: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      formatPriceDecimal(val) {
        return val.toString().split('.')[1] || '00';
      },
      formatPriceInteger(val) {
        return val.toString().split('.')[0] + '.';

      }
    }
  }
</script>
<style lang="scss" scopde>
  @import '~assets/css/mixin.scss';

  .order {
    padding: 0 1rem;
    background: #F7F7F7;



    .order-item {
      /* @include wh(16.75rem, 9.1rem); */
      width: 16.75rem;
      margin-bottom: .5rem;
      padding: 1rem;
      background: $fc;
      box-shadow: 0rem 0.1rem 0.2rem 0rem rgba(230, 230, 230, 0.4);
      border-radius: 0.5rem;
      font-family: PingFangSC-Regular, PingFang SC;

      .top {
        @include fj();
        align-items: center;
        font-size: .6rem;


        .top-left {
          @include fj();
          align-items: center;

          img {
            @include wh(1.5rem, 1.5rem);
            border-radius: 4px;
            margin-right: .5rem;
          }

          .name {
            color: #333;
          }
        }

        .top-right {
          color: #FC4B4C;
        }

        .expire {
          color: #FCA64B;
        }
      }

      .center {
        @include fj(flex-start);
        align-items: center;
        margin-top: 1rem;
      


        .img {
          @include wh(4rem, 2.25rem);
          @include fj(flex-start);
          
          align-items: center;

          flex-direction: column;
          margin-right: .5rem;

          background: linear-gradient(225deg, #F2D197 0%, #DAB074 100%);
          border-radius: 0.2rem;
          


          >div {
            color: $fc;
            /* text-align: center; */
          }

          .card-name {
            font-size: .6rem;
          }

          .course-name {
            width: 120%;
            font-size: .6rem;
            -webkit-transform: scale(0.60);

          }

          .course-english-name {
            margin-top: -10px;
            font-size: .6rem;
            width: 200%;
            -webkit-transform: scale(0.40);
          }

        }

        .div {
          @include sc(.7rem, #333);
          @include fj();
          flex-direction: column;

        }
      }

      .price {
        @include fj(flex-end);

        align-items: center;
        margin-top: 1rem;

        >div {

          @include fj(flex-end);
          margin-left: .8rem;
          align-items: center;
          color: #aaa;

          font-family: PingFangSC-Regular, PingFang SC;
          letter-spacing: 0;

          >div {
            @include fj(flex-start);
          }

          .font6 {
            font-size: .6rem;

          }

          .font4 {
            font-size: .6rem;

            -webkit-transform: scale(.67);
            *font-size: 10px;
          }


        }

        .real-payment {
          color: #333;
        }




      }

    }
  }
</style>