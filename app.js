//app.js
App({
  onLaunch: function () {

    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        // requestUrl(getOpenID+'?js_code='+res.code,'POST',{},this.getCallBack.bind(this))
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  requestUrl(url, method, data = {}) {
    let header = {}
    let openid = this.globalData.openid
    let authorization = this.globalData.authorization
    // 启动时可将storage中的令牌挂到app.js 
    if (openid) {
      header["FXYB_Authrization"] = authorization
      header["OpenId"] = openid //登陆名
    }
    return new Promise((resolve, reject) => {
      wx.showToast({
        icon: "loading"
      })
      wx.request({
        method,
        url: url,
        header,
        data,
        success(res) {
          wx.hideToast(); 
          if (res.data.code == '0') {
            resolve(res)
          } else if (res.data.code == 401) {
            wx.showModal({
              title: '提示',
              content: '登陆失效，请重新登录',
              showCancel: false,
              success: function (res) {
                wx.redirectTo({
                  url: '../index/index'
                });
              }
            })
          } else {
            wx.showToast({
              title: res.data.msg ? res.data.msg : '请求失败',
              icon: 'error',
              duration: 2000
            })
            reject(res)
          }
        },
        fail(err) {
          wx.hideToast();
        }
      })
    })
  },
  getCallBack(res) {
    this.globalData.openid = res.data.data.openid
  },
  globalData: {
    userInfo: null,
    openid: '',
    authorization: ''
  }
})