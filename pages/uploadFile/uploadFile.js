const {
  UploadFile
} = require('../../utils/api.js')
const {
  imageUtil
} = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    logs: [],
    fileList: [],
    gallery: false,
    cw: 100,
    ch: 100
  },
  onLoad: function () {

  },
  afterRead(event) {
    const {
      file
    } = event.detail;
    this.getCanvasImg(file)
  },
  getCanvasImg: function (tempFile) {//压缩图片
    var that = this;
    wx.showToast({
      icon: "loading",
      title: "正在上传"
    })
    wx.getImageInfo({
      src: tempFile.path, //图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径,  
      success: res => {
        var imageSize = imageUtil(res);
        const ctx = wx.createCanvasContext('attendCanvasId');
        setTimeout(() => {
          ctx.drawImage(tempFile.path, 0, 0, imageSize.imageWidth, imageSize.imageHeight);
          that.setData({
            cw: imageSize.imageWidth,
            ch: imageSize.imageHeight
          });
          ctx.draw(true, function () {
            wx.canvasToTempFilePath({
              canvasId: 'attendCanvasId',
              success: function success(res) {
                that.uploadfile(res.tempFilePath,tempFile)             
              },
              fail: function (e) {
                console.log('失败回调')
              }
            });
          });
        }, 500);

      },
      fail: () => {},
      complete: () => {}
    });
  },
  uploadfile(filePath,file){//上传图片
    let _this=this
    
      wx.uploadFile({
        url: UploadFile,
        filePath: filePath,
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

  }
})