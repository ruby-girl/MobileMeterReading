//logs.js
const {
  UploadFile
} = require('../../utils/api.js')
const app = getApp()
Page({
  data: {
    logs: [],
    fileList: [],
    gallery: false
  },
  onLoad: function () {

  },
  afterRead(event) {
    const {
      file
    } = event.detail;
    let _this = this
    wx.showToast({
        icon: "loading",
        title: "正在上传"
      }),
      wx.uploadFile({
        url: UploadFile,
        filePath: file.path,
        name: 'file',
        header: {
          "Content-Type": "multipart/form-data",
          "FXYB_Authrization": app.globalData.authorization,
          "OpenId": app.globalData.openid,
        },
        success: function (res) {
          //上传成功返回数据
          const {
            fileList = []
          } = _this.data;
          fileList.push({
            ...file,
            url: file.path
          });
          _this.setData({
            fileList
          });

        },
        fail: function (e) {
          wx.showModal({
            title: '提示',
            content: '上传失败',
            showCancel: false
          })
        },
        complete: function () {
          wx.hideToast(); //隐藏Toast
        }
      })

  },
  close: function () {
    this.setData({
      gallery: false,
    });
  },
  open: function () {
    this.setData({
      gallery: true
    });
  },
  delImg: function () {
    this.setData({
      gallery: false,
      files: [],
    });
  },
  onPullDownRefresh() {
    console.info('123')

  }
})