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
    passwordSave:''
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../list/list'
    })
  },
  handleInputChange(e){
   let targetData = e.currentTarget.dataset.modal; 
   let currentValue = e.detail.value; 
   // 将 input 值赋值给 定义的变量名，this.name 可以直接取到在 data 中定义的 name 值，其效果跟 this[变量名] 是对等的，这是 js 基础
   this.setData({
    [targetData]:currentValue
  })
  },
  setNum(e) {//密码转*
    let value=e.detail.value
   if(value.length>=this.data.passwordSave.length){
     let val=this.data.passwordSave
     val+=value.substr(this.data.passwordSave.length,value.length-this.data.passwordSave.length)
     this.setData({
      passwordSave:val
     })
   }else{
    this.setData({
      passwordSave:this.data.passwordSave.substr(0,value.length)
     })
   }
   let Word=value.replace(/./g,"*")
   this.setData({
    LoginPassWord:Word
   })
  },
  loginFunction() { //登陆
    app.requestUrl(login + '?LoginName=' + this.data.LoginName + '&LoginPassWord=' + this.data.passwordSave, 'POST', {}).then(res => {
      wx.setStorageSync('LoginName', this.data.LoginName); //LoginName存入本地缓存
      wx.setStorageSync('LoginPassWord', this.data.passwordSave);
      
      app.globalData.openid=this.data.LoginName
      app.globalData.authorization=res.data.data
      wx.navigateTo({
        url: '../uploadFile/uploadFile'
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
          passwordSave: res.data,
        })
        _this.setData({
          LoginPassWord: res.data.replace(/./g,"*"),
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