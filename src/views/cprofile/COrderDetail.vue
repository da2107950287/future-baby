<template>
  <div class="c-order">
    <NavBar>
      <div slot="center">订单详情</div>
    </NavBar>
    <div class="order-detail">
      <div class="order">
        <div class="top">
          <div class="top-left">
            <img :src="info.image" alt="">
            <span class="name">{{info.olsName}}</span>
          </div>
          <div class="top-right">
            <span v-if="info.status==1">进行中</span>
            <span v-else-if="info.status==2">即将过期</span>
            <span v-else-if="info.status==3">已失效</span>
            <span v-else-if="info.status==4">未付款</span>

          </div>
        </div>
        <div class="center">
          <div class="img">
            <div class="card-name">{{info.commodity.comName}}</div>
            <div class="course-name">{{info.commodity.courseName}}</div>
            <div class="course-english-name">{{info.commodity.courseEnglishName}}</div>
          </div>
          <div>
            <div>{{info.commodity.courseName}}</div>
            <div>{{info.commodity.comName}}</div>
          </div>
        </div>
        <div class="price">
          <div class="total-price common">
            <span class="font6">总价</span>
            <div>
              <span class="font4">&yen;</span><span class="font6">{{info.orderPrice|
                formatPriceInteger}}</span><span class="font4">{{info.orderPrice | formatPriceDecimal}}</span>
            </div>
          </div>
          <div class="deduction common">
            <span class="font6">抵扣</span>
            <div>
              <span class="font4">&yen;</span><span class="font6">{{info.dtnPrice|
                formatPriceInteger}}</span><span class="font4">{{info.dtnPrice| formatPriceDecimal}}</span>
            </div>

          </div>
          <div class="real-payment common">
            <span class="font6">实付额</span>
            <div>
              <span class="font4">&yen;</span><span class="font6">{{info.finalPrice|
                formatPriceInteger}}</span><span class="font4">{{info.finalPrice | formatPriceDecimal}}</span>
            </div>
          </div>

        </div>
      </div>
      <OrderInfo :orderInfo="orderInfo"></OrderInfo>
      <div class="btns">
        <div v-if="info.status==4"  @click="toPay">去付款</div>
        <div v-else  @click="show=true">学习打卡</div>
        <div @click="$router.go(-1)">返回上一页</div>
      </div>
    </div>
    <van-overlay :show="show" @click="show=false">
      <div class="wrapper">
        <div class="block">
          <img src="../../assets/img/popup.png" alt="">
          <div class="title">确认打卡</div>
          <div class="dec">您本次打卡后，即开始扣课时，课时有效期1个月。是否继续打卡？</div>
          <div @click="clock" class="btn red">确认打卡</div>
          <div class="btn white">取消打卡</div>
        </div>
      </div>
    </van-overlay>
  </div>
  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';
  import OrderInfo from 'components/page/OrderInfo'

  export default {
    data() {
      return {
        show: false,
        info: {},
        orderInfo: {}
      }
    },
    filters: {
      formatPriceInteger(val) {
        return val.toString().split('.')[0] + '.';
      },
      formatPriceDecimal(val) {
        return val.toString().split('.')[1] || '00';
      },
    },
    created() {
      this.showOrderlist()
    },
    methods: {
      toPay(){
        window.location.href=this.info.payCode
      },
      showOrderlist() {
        this.$http('/orderlist/showOrderlist', {
          olId: this.$route.query.olId,
          type: 'C'
        }).then(res => {
          if (res.code == 200) {
            this.info = res.data;
            this.orderInfo = {
              olId: this.info.olId,
              orderTime: this.info.orderTime,
              endTime: this.info.endTime,
              status: this.info.status,
            }
          }
        })
      },
     
      clock() {
        this.$http('/orderlist/insertClockIn', {
          olId: this.$route.query.olId
        }).then(res => {
          if (res.code == 200) {
            this.$toast.success(res.msg)
          } else if (res.code == 500) {
            this.$toast.fail(res.msg)
          }
        })
      }
    },
    components: {
      NavBar,
      OrderInfo
    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .c-order {
    @include wh(100%, 100%);

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

  }



  .order-detail {
    height: calc(100% - 44px);
    padding: 1rem;
    overflow-y: scroll;
    background: #F7F7F7;

    .order {

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

            border-radius: 0.2rem;
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

        img {
          @include wh(4rem, 2.25rem);
          margin-right: .5rem;

        }

        >div {
          @include sc(.7rem, #333);
          @include fj();
          flex-direction: column;

        }
      }

      .price {

        margin-top: 1rem;

        .common {

          @include fj();
          margin-top: .5rem;
          align-items: center;
          color: #333;

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




      }
    }

    .btns {
      @include fj(flex-end);
      margin-top: 2rem;

      >div {
        @include wh(6rem, 2rem);
        line-height: 2rem;
        text-align: center;
        margin-left: .5rem;
        border-radius: 1.1rem;
        font-size: 0.75rem;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 500;

      }

      div:first-child {
        color: $fc;
        background: #FC4B4C;

        box-shadow: 0rem 0.1rem 0.2rem 0rem #E65354;
      }

      div:last-child {
        color: #FC4B4C;
        background: $fc;
        box-shadow: 0rem 0.1rem 0.2rem 0rem #e6e6e6;
      }
    }


  }

  .wrapper {
    @include fj(center);
    align-items: center;
    height: 100%;


    .block {
      position: relative;
      width: 12.5rem;
      padding: 1rem;
      text-align: center;
      border-radius: 1rem;
      background: $fc;
      font-family: PingFangSC-Regular, PingFang SC;

      img {
        @include wh(3rem, 3rem);
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
       
        border: 0.1rem solid #FFFFFF;
      }

      .title {
        font-size: 0.8rem;
        font-weight: 500;
        color: #333333;
        margin-top: 2.7rem;
      }

      .dec {
        margin-top: .75rem;
        font-size: 0.7rem;

        color: #AAAAAA;
        line-height: 1.1rem;
      }

      .btn {
        @include wh(10.5rem, 2rem);
        text-align: center;
        line-height: 2rem;
        font-size: .75rem;
        border-radius: 0.2rem;
      }

      .red {
        background: #FC4B4C;
        color: $fc;
        margin-top: 1rem;
      }

      .white {
        color: #333;
      }





    }
  }
</style>