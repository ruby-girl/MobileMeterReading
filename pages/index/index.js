//index.js
const {
  login
} = require('../../utils/api.js')
const app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    LoginName: '',
    LoginPassWord: '',
    date:'',
    errorText:''
  },
  handleInputChange(e){
   let targetData = e.currentTarget.dataset.modal; 
   let currentValue = e.detail.value; 
   this.setData({
    [targetData]:currentValue
  })
  if(targetData=='LoginPassWord'){//验证密码
    var reg =/^[^\s]{6,12}$/;
    if(!reg.test(currentValue)){     
      this.setData({
        errorText:'密码长度6-12位且不能出现空格'
      })
    }else{
      this.setData({
        errorText:''
      })
    }
  }
  },
  loginFunction() { //登陆
    //if(this.data.errorText) return false;
    app.requestUrl(login + '?LoginName=' + this.data.LoginName + '&LoginPassWord=' + this.data.LoginPassWord, 'POST', {}).then(res => {
      wx.setStorageSync('LoginName', this.data.LoginName); //LoginName存入本地缓存
      wx.setStorageSync('LoginPassWord', this.data.LoginPassWord);
      app.globalData.openid=this.data.LoginName
      app.globalData.authorization=res.data.data
      // wx.navigateTo({
      //   url: '../home/home'
      // })
        wx.navigateTo({
         url: '../tab/tab'
       })
    }).catch(res => {
     
    })

  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    let _this=this
    // 获取本地存储登陆信息
    wx.getStorage({
      key: 'LoginName',
      success (res) {
        _this.setData({
          LoginName: res.data,
        })
      }
    })
    wx.getStorage({
      key: 'LoginPassWord',
      success (res) {
        _this.setData({
          LoginPassWord: res.data,
        })
      }
    })
  },
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})