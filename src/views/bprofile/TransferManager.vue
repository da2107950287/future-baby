<template>
  <div>
    <NavBar>
      <div slot="center">转移管理员</div>
    </NavBar>
    <div>
      <div class="info">
        <div class="title">网点名称：{{olsName}}</div>
        <div class="money">员工权限：
          <span v-if="$route.query.power==3">订单管理</span>
          <span v-else-if="$route.query.power==4">会员管理</span></div>
        <div class="create-btn" @click="transferStaff">生成转移链接</div>
      </div>
      <div class="info">
        <!-- <div class="title">生成链接</div> -->
        <div class="url">{{link}}</div>
        <div class="copy-btn" :data-clipboard-text="link" @click="copy">复制链接并分享</div>
      </div>
    </div>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';
  import Clipboard from "clipboard";
  import { isPhone, formatDate } from "assets/js/utils.js";
  export default {
    data() {
      return {
        power: '3',
        olsName: '',

        staId: '',
        link: ''
      }
    },

    created() {
      this.showOutletsInfo();
    },
    methods: {
      showOutletsInfo() {
        this.$http('/outlets/showOutletsInfo').then(res => {
          if (res.code == 200) {
            this.olsName = res.data.olsName;
         
          }
        })
      },
      transferStaff() {
        this.$http('/outlets/transferStaff', {
          staId: this.$route.query.staId,
        }).then(res => {
          if (res.code == 200) {
            this.link = window.location.origin + window.location.pathname + `#/invite_info?staId=${this.$route.query.staId}`
          }
        })
      },
      //复制链接
      copy() {
        let clipboard = new Clipboard('.copy-btn');
        clipboard.on("success", e => {
          clipboard.destroy();
        })
      },

    },
    components: {
      NavBar,
    },
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';

  .err-msg {
    @include sc(.6rem, #FC4B4C)
  }

  .info {
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0px 2px 4px 0px rgba(230, 230, 230, 0.4);
    border-radius: 10px;

    padding: 20px;
  }

  .title {
    font-size: 15px;
    color: #333333;
    font-weight: bold;
    line-height: 30px;
  }

  .create {
    font-size: 13px;
    font-weight: 400;
    color: #AAAAAA;
    line-height: 30px;
  }

  .money {
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    font-size: 15px;
    color: #333333;
    font-weight: bold;
    line-height: 30px;

    margin-top: 10px;

  }

  .money>input {

    width: 60%;
    height: 100%;
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    color: #AAAAAA;
    padding-left: 10px;



  }

  .icon {
    display: inline-block;
    color: #aaa;
    transform: rotate(180deg);
  }

  .create-btn {
    width: 240px;
    height: 40px;
    background: #FC4B4C;
    border-radius: 20px;
    margin: 0 auto;
    margin-top: 20px;
    text-align: center;
    font-size: 15px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FFFFFF;
    line-height: 40px;
  }

  .url {
    
    height: 40px;
    background: #F2F2F2;
    border-radius: 5px;
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 40px;
    padding: 0 10px;
    margin-top: 20px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .copy-btn {
    width: 240px;
    height: 40px;
    background: #FFE5E5;
    border-radius: 20px;
    font-size: 15px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #FC4B4C;
    text-align: center;
    line-height: 40px;
    margin: 0 auto;
    margin-top: 20px;
  }
</style>