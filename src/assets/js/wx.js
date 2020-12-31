
//注入权限验证配置
export function initConfig(config) {
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: config.appid, // 必填，公众号的唯一标识
    timestamp: config.timestamp, // 必填，生成签名的时间戳
    nonceStr: config.nonceStr, // 必填，生成签名的随机串
    signature: config.signature,// 必填，签名
    jsApiList: [
      "onMenuShareTimeline",
      "onMenuShareAppMessage",
      "onMenuShareQQ",
      'getLocation',
      'chooseImage',
      'previewImage',
      'uploadImage',
      'downloadImage'
    ] // 必填，需要使用的JS接口列表
  });
}
/* 微信获取定位 */
export function getLocation(config) {
  return new Promise((reslove, reject) => {
    initConfig(config)
    wx.ready(function () {
      wx.checkJsApi({
        jsApiList: [
          'getLocation',
        ],
        success: function (res) {
          if (res.checkResult.getLocation == false) {
            console.log('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
            return;
          } else {
            //调用地理位置
            wx.getLocation({
              type: 'wgs84',
              success: function (res) {
                let data = {
                  latitude: res.latitude,    // 纬度，浮点数，范围为90 ~ -90
                  longitude: res.longitude,  // 经度，浮点数，范围为180 ~ -180。
                }
                reslove(data);
              },
              cancel: function (res) {
                alert('用户拒绝授权获取地理位置');
              },
              fail(err) {
                console.log(err)
              }
            });

          }
        },
        error: function (err) {
          console.log(err)
        }
      });
    });
  })

}

// 微信分享
export function wxShare(config, data, callback) {
  console.log(data)
  let urls = data.link;
  let imgurls = data.imgurls;
  let title = data.title;
  let desc = data.desc;
  initConfig(config)
  wx.ready(function () {
    wx.checkJsApi({
      jsApiList: [
        "onMenuShareTimeline",
        "onMenuShareAppMessage",
        "onMenuShareQQ",
      ],
      success: function () {
        wx.onMenuShareTimeline({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: urls, // 分享链接
          imgUrl: imgurls, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
            callback('success');
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            callback('cancel');
          }
        });

        wx.onMenuShareAppMessage({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: urls, // 分享链接
          imgUrl: imgurls, // 分享图标
          type: '', // 分享类型,music、video或link，不填默认为link
          dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
          success: function () {
            // 用户确认分享后执行的回调函数
            callback('success');
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            callback('cancel');
          }
        });

        wx.onMenuShareQQ({
          title: title, // 分享标题
          desc: desc, // 分享描述
          link: urls, // 分享链接
          imgUrl: imgurls, // 分享图标
          success: function () {
            // 用户确认分享后执行的回调函数
            callback('success');
          },
          cancel: function () {
            // 用户取消分享后执行的回调函数
            callback('cancel');
          }
        });
      },

      error: function (err) {
        console.log(err)
      }
    });

  });
}
export function wxUpload(config) {//微信单图片上传
console.log(config)
  return new Promise((reslove, reject) => {
    initConfig(config)
    var sourceType = ['album', 'camera']

    wx.ready(function () {
      wx.checkJsApi({
        jsApiList: [
          'chooseImage',
          'previewImage',
          'uploadImage',
          'downloadImage'
        ],
        success: function (res) {
          if (res.checkResult.getLocation == false) {
            _this.$toast('你的微信版本太低，不支持微信JS接口，请升级到最新的微信版本！');
            return;
          } else {
            //调用 拍照或从手机相册中选图接口
            wx.chooseImage({
              count: 1,
              sourceType: sourceType,
              success: function (res) {
                //返回选定照片的本地ID列表
                //上传图片函数
                wx.uploadImage({
                  localId: res.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
                  isShowProcess: 1,   // 默认为1，显示进度提示
                  success: function (res) {
                    //返回图片的服务器端ID res.serverId,然后调用wxImgCallback函数进行下载图片操作
                    reslove(res.serverId)
                    // afterUploadToWx(res.serverId);  // 返回图片的服务器端ID
                  },
                  fail: function (res) {
                    uploadImageCancel();
                    _this.$toast('上传失败!error:uploadImage');
                  }
                });
              },
              fail: function (res) {
                uploadImageCancel();
                _this.$toast('上传失败!error:chooseImage');
              },
              cancel: function () {
                uploadImageCancel();
              }
            });
          }
        }
      });
    });
  })
}