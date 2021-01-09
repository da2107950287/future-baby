<template>
  <div class="vouch_list">
    <NavBar>
      <div slot="center">抵用券领取</div>
    </NavBar>
    <div class="content">
      <div class="item">
        <div class="card-name">月度课程名称：{{courseName}}</div>
        <div class="card-right">
          <div class="price">
            <span>抵用券金额</span>
            <span>￥</span>
            <span>{{price}}</span>
          </div>
          <div class="time">有效时间 {{createTime | formatTime}}-{{endTime | formatTime}}</div>
        </div>
      </div>
      <van-button v-if="uid==''" @click="submit" class="btn" round block color="#FC4B4C" type="danger">领取抵用券
      </van-button>
      <van-button v-else class="btn" round block  color="#FC4B4C"  type="danger">已被领取</van-button>
    </div>
  </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';

  export default {
    data() {
      return {
        courseName: '',
        price: '',
        createTime: '',
        endTime: '',
        uid:'',
        dtnId:''
      }

    },
    filters: {
      formatTime(val) {
        return val.split(' ')[0].split('-').join('.')
      }
    },
    created() {
      this.dtnId=this.$route.query.dtnId
      this.showDeduction();
    },
    methods: {
      showDeduction() {
        this.$http('/orderlist/showDeduction', {
          dtnId:this.dtnId,
        }).then(res => {
          if (res.code == 200) {
            this.courseName = res.data.courseName;
            this.price = res.data.price;
            this.createTime = res.data.createTime;
            this.endTime = res.data.endTime;
            this.uid=res.data.uid;
          }
        })
      },
      submit() {
        this.$http('/orderlist/updateDeduction', {
          dtnId: this.$route.query.dtnId
        }).then(res => {
          if (res.code == 200) {
            this.showDeduction()
            this.$toast.success(res.msg)
          } else if(res.code==500) {
            this.$toast.fail(res.msg)
          }
        })
      },

    },
    components: {
      NavBar
    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .vouch_list {
    height: 100%;

    .content {
      padding: 1rem;

      .item {
        padding: .75rem 1rem .55rem;
        border-radius: 10px;
        background: linear-gradient(245deg, #F4D7A4 0%, #DAB074 100%);

        .card-name {
          @include sc(.75rem, #000)
        }

        .card-right {
          text-align: right;


          .price {
            margin-top: 3rem;
            color: #FC4B4C;
            font-weight: 500;
            font-family: PingFangSC-Medium, PingFang SC;

            span:nth-child(1) {
              @include sc(.75rem, $fc);
            }

            span:nth-child(2) {
              font-size: .7rem;
              margin-left: .6rem;
            }

            span:nth-child(3) {
              font-size: 2rem;
            }

          }

          .time {
            @include sc(.55rem, $fc)
          }
        }
      }



      .btn {

        width: 14.7rem;
        margin: 2rem auto 0;
      }
    }
  }
</style>