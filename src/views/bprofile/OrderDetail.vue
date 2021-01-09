<template>
  <div class="c-order">
    <NavBar>
      <div slot="center">订单详情</div>
    </NavBar>
    <div class="order-detail">
      <div class="order">
        <div class="order-item-info">
          <div class="top-info-head">
            <img :src="info.headportrait" alt="">
          </div>
          <div class="top-info-intro">
            <div class="top-info-intro-content">
              昵称：{{info.nickname}} {{info.account}}
            </div>
            <!-- <div class="top-info-intro-content">
              宝宝名：小七
            </div> -->
          </div>
          <div class="order-status order-tag-new">
            <span v-if="info.status==1">进行中</span>
            <span v-else-if="info.status==2">即将过期</span>
            <span v-else-if="info.status==3">即将失效</span>
            <span v-else-if="info.status==4">未付款</span>
          </div>
        </div>
        <div class="item-card">
          <div class="item-card-img">
            <div class="img">
              <div class="card-name">{{commodity.comName}}</div>
              <div class="course-name">{{commodity.courseName}}</div>
              <div class="course-english-name">{{commodity.courseEnglishName}}</div>
            </div>
          </div>
          <div class="item-card-content">
            <div>{{commodity.courseName}}</div>
            <div>{{commodity.comName}}</div>
          </div>
        </div>
        <div class="prices">
          <div class="total-price common">
            <span class="font6">总价</span>
            <div>
              <span class="font4">&yen;</span><span class="font6">{{info.orderPrice | formatPriceInteger}}</span><span
                class="font4">{{info.orderPrice | formatPriceDecimal}}</span>
            </div>
          </div>
          <div class="deduction common">
            <span class="font6">抵扣</span>
            <div>
              <span class="font4">&yen;</span><span class="font6">{{info.dtnPrice | formatPriceInteger}}</span><span
                class="font4">{{info.dtnPrice | formatPriceDecimal}}</span>
            </div>
          </div>
          <div class="real-payment common">
            <span class="font6">实付额</span>
            <div>
              <span class="font4">&yen;</span><span class="font6">{{info.finalPrice | formatPriceInteger}}</span><span
                class="font4">{{info.finalPrice |formatPriceDecimal}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="order-info">
        <div class="order-info-title">订单信息</div>
        <div class="order-info-item">
          <div class="order-info-item-title">订单编号</div>
          <div>{{info.olId}}</div>
        </div>
        <div class="order-info-item">
          <div class="order-info-item-title">订单状态</div>
          <div class="order-tag-new">
            <span v-if="info.status==1">进行中</span>
            <span v-else-if="info.status==2">即将过期</span>
            <span v-else-if="info.status==3">即将失效</span>
            <span v-else-if="info.status==4">未付款</span>

          </div>
        </div>
        <div class="order-info-item">
          <div class="order-info-item-title">生成时间</div>
          <div>{{info.orderTime}}</div>
        </div>
        <div class="order-info-item" v-if="info.status!=4">
          <div class="order-info-item-title">到期时间</div>
          <div>{{info.endTime}}</div>
        </div>
      </div>
      <div class="btns">
        <!-- <div @click="show=true">邀请打卡</div> -->
        <div @click="$router.go(-1)">返回上一页</div>
      </div>
    </div>
    <van-overlay :show="show" @click="show=false">
      <div class="wrapper">
        <div class="block">
          <img src="" alt="">
          <div class="title">确认打卡</div>
          <div class="dec">您本次打卡后，即开始扣课时，课时有效期1个月。是否继续打卡？</div>
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
     
        info: {
          dtnPrice:'',
          orderPrice:'',
          finalPrice:''
        },
        commodity:{
   
          
        },
      }
    },
    filters: {
      formatPriceInteger(val) {
        return val.toString().split('.')[0] + '.';
      },
      formatPriceDecimal(val) {
        return val.toString().split('.')[1] || '00';
      },
      formatTime(val) {
        return val.split(' ')[0].replace('-', '.') + ' ' + val.split(' ')[1]
      }
    },
    created() {
      this.showOrderlist()
    },
    methods: {

      showOrderlist() {
        this.$http('/orderlist/showOrderlist', {
          olId: this.$route.query.olId,
          type: 'B'
        }).then(res => {
          if (res.code == 200) {
            this.info = res.data;
            this.commodity=res.data.commodity;

          }
        })
       
      },

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
            background: #000;
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

      .prices {
        /* @include fj(flex-end);
        align-items: center; */
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

    .order-tag-new {
      color: #FC4B4C;
    }

    .order-tag-outdate {
      color: #FEA740;
    }

    .order-tag-expire {
      color: #AAAAAA;
      ;
    }

    .order-item-info {
      width: 100%;
      height: 100%;
      padding: 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .top-info-head {
      width: 40px;
      height: 30px;
      border-radius: 50%;
      overflow: hidden;
      margin-top: 5px;
    }

    .top-info-head>img {
      width: 100%;
      height: 100%;
    }

    .top-info-intro {
      width: 100%;
      height: 60px;
      margin-left: 10px;
      margin-right: 10px;
    }

    .top-info-intro-content {
      width: 100%;
      height: 22px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      line-height: 22px;
    }

    .order-status {
      width: 60px;
      height: 100%;
      font-size: 12px;
    }

    .item-card {
      width: 100%;
      height: 45px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .item-card-img {
      width: 80px;
      height: 100%;
      margin-right: 10px;
    }

    .item-card-img>img {
      width: 100%;
      height: 100%;
    }

    .item-card-content {
      width: 100%;
      height: 100%;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: #333333;
      line-height: 24px;
    }

    .item-card-content>div {
      font-weight: bold;
    }

    .order-info-title {
      width: 100%;
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: bold;
      color: #333333;
      line-height: 20px;
      margin-bottom: 15px;
    }

    .order-info{
      background-color: #fff;
      padding: 20px;
    }
    .order-info-item {
      width: 100%;
      height: 28px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
    }

    .order-info-item>div {
      font-size: 12px;
      font-weight: 400;
      color: #333333;
    }

    .order-info-item-title {
      font-size: 12px;
      font-weight: 400;
      color: #333333;
      margin-right: 10px;
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

      border-radius: 1rem;
      background: $fc;

      img {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background: #000;
        border: 0.1rem solid #FFFFFF;
      }

      .title {
        text-align: center;
        font-size: 0.8rem;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
        line-height: 1.1rem;
        margin-top: 2.7rem;
      }

      .dec {
        margin-top: .75rem;
        font-size: 0.7rem;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #AAAAAA;
        line-height: 1.1rem;
      }





    }
  }
</style>