<template>

  <div class="invite-info">
    <NavBar>
      <div slot="center">邀请详情</div>
    </NavBar>
    <div class="content">
      <img class="cover" :src="outlets.image" alt="">
      <NetworkIntro :olsName="outlets.olsName" :address="address" :mobile="outlets.mobile"></NetworkIntro>
      <div class="power">权限：<span v-if="info.power==3">订单管理</span><span v-else-if="info.power==4">会员管理</span></div>
      <div v-if="info.status==1">
        <van-button class="btn" type="danger" square="around" block @click="updateStatus(2)">同意</van-button>
        <van-button class="btn" type="default" square="around" block @click="updateStatus(3)">拒绝</van-button>
      </div>
      <div class="power status" v-else>状态：<span v-if="info.status==2">已同意</span><span
          v-else-if="info.status==3">已拒绝</span></div>

    </div>
  </div>
</template>
<script>
  import NetworkIntro from 'components/page/NetworkIntro'
  import NavBar from 'components/common/navbar/NavBar';

  export default {
    data() {
      return {
        info: {

        },
        outlets: {},
      }
    },
    computed: {
      address() {
        return `${this.outlets.province || ''}${this.outlets.city || ''}${this.outlets.area || ''}${this.outlets.address || ''}`;
      }
    },
    created() {
      this.showStaff()
    },
    methods: {
      showStaff() {
        this.$http('/outlets/showStaff', {
          staId: this.$route.query.staId
        }).then(res => {
          if (res.code == 200) {
            this.info = res.data;
            this.outlets = {
              image: res.data.outlets.image,
              olsName: res.data.outlets.olsName,
              mobile: res.data.outlets.mobile,
              province: res.data.outlets.province,
              city: res.data.outlets.city,
              area: res.data.outlets.area,
              address: res.data.outlets.address,
            }
          }
        })
      },
      updateStatus(status) {
        this.$http('/outlets/updateStaff', {
          staId: this.$route.query.staId,
          status
        }).then(res => {
          if (res.code == 200) {
            this.$toast.success(res.msg);
            this.showStaff()
          } else if (res.code == 500) {
            this.$toast.fail(res.msg);
          }
        })
      }
    },
    components: {
      NavBar,
      NetworkIntro
    }
  }
</script>
<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .content {
    padding: 0 20px;

    .cover {
      @include wh(16.75rem, 7.7rem);
      border-radius: 0.5rem;


    }

    .power {
      @include sc(.7rem, #333)
    }

    .btn {
      margin-top: 10px;
    }

    .status {
      span {
        color: #F24142;
      }
    }
  }
</style>