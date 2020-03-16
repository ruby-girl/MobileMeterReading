//logs.js
const {
  login
} = require('../../utils/api.js')
const app = getApp()
Page({
  data: {
    logs: [],
    files:[],
    gallery:false
  },
  onLoad: function () {
    // app.requestUrl(login, 'POST', {}).then(res => {
      
    // }).catch(res => {
     
    // })
  },
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {   
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            that.setData({
                files: that.data.files.concat(res.tempFilePaths)
            });
        }
    })
},
close: function() {
  this.setData({
      gallery: false,
  });
},
open: function () {
  this.setData({
      gallery: true
  });
},
delImg:function(){
  this.setData({
    gallery: false,
    files: [],
});
},
  onPullDownRefresh() {
   console.info('123')
    
  },
})
