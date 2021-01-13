<template>
  <div>
    <NavBar>
      <div slot="center">邀请员工</div>
    </NavBar>
    <div>
      <div class="info">
        <div class="title">网点名称：{{olsName}}</div>
        <div class="money">员工权限：
          <van-radio-group v-model="power" direction="horizontal">
            <van-radio checked-color="#FC4B4C" name="3">订单管理</van-radio>
            <van-radio checked-color="#FC4B4C" name="4">会员管理</van-radio>
          </van-radio-group>
        </div>
        <div class="create-btn" @click="inviteStaff">生成邀请链接</div>
      </div>
      <div class="info">
        <!-- <div class="title">生成链接</div> -->
        <div class="url">{{link}}</div>
        <div class="copy-btn" :data-clipboard-text="link" @click="copy">复制链接并分享</div>
      </div>

    </div>
    <van-overlay :show="isShow" @click="isShow = false">
      <div class="wrapper" @click.stop>
        <div class="share">
          <img class="arrow" src="~assets/img/arrow.png" alt="">
          <img class="text" src="~assets/img/share.png" alt="">
        </div>
      </div>
    </van-overlay>
  </div>
</template>
<script>
  import NavBar from 'components/common/navbar/NavBar';
  import Clipboard from "clipboard";
  import { isPhone, formatDate,getStore } from "assets/js/utils.js";
	import { wxShare } from "assets/js/wx.js";

  export default {
    data() {
      return {
        power: '3',
        olsName: '',
        olsId: '',
        staId: '',
        link: '',
        url: '',
        isShow:false,
        config:{}
      }
    },

    created() {
      this.showOutletsInfo();
      this.getAppConfig()
    },
    methods: {
      getAppConfig() {
        this.$http('/userinfo/getConfig', {
          url: window.location.href.split('#')[0]
        }).then(res => {
          if (res.code == 200) {
            this.config = res.data;
           
          }
        })
      },
      showOutletsInfo() {
        this.$http('/outlets/showOutletsInfo').then(res => {
          if (res.code == 200) {
            this.olsName = res.data.olsName;
            this.olsId = res.data.olsId;
          }
        })
      },
      inviteStaff() {
        this.$http('/outlets/insertStaff', {
          olsId: this.olsId,
          power: this.power,
        }).then(res => {
          if (res.code == 200) {
            this.staId = res.data;
           this.link=`${window.location.origin}/futureBaby/index.html?#/invite_info?staId=${this.staId}`
          }
        })
      },
      //复制链接
      copy() {
        let clipboard = new Clipboard('.copy-btn');
        clipboard.on("success", e => {
          this.isShow = true;
          this.url = e.text;
          let obj = {
              title: this.olsName, // 分享标题
              desc: '邀请你加入',
              link: `${window.location.href.split('#')[0]}?#/invite_info?staId=${this.staId}`, // 分享链接
              imgurls: getStore('image')
            }
            wxShare(this.config, obj, (msg) => {
              console.log(msg)
            })
      
          clipboard.destroy();
        })
      },

    },
    destroyed() {
      this.$http('/userinfo/getConfig', {
        url: window.location.href.split('#')[0]
      }).then(res => {
        if (res.code == 200) {
          this.config = res.data;
          let obj = {
            title: '未来宝贝', // 分享标题
          
            link: `${window.location.href.split('#')[0]}?#/home`, // 分享链接
            imgurls: require('../../assets/img/logoShare.jpg')

            
          }
          wxShare(this.config, obj, (msg) => {
            console.log(msg)
          })
        }
      })
    },
    components: {
      NavBar,
    },
  }
</script>

<style lang="scss" scoped>
  @import '~assets/css/mixin.scss';
	.share {
		width: 100%;
		padding: 0 1rem;
		position: absolute;
		left: 50%;
		top: 10px;
		transform: translateX(-50%);
		display: flex;
		flex-direction: column;
		align-items: flex-end;

		.arrow {

			height: 60px;
			width: 60px
		}

		.text {
			margin-top: 10px;
			margin-right: 60px;
			width: 60vw;
		}
	}
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