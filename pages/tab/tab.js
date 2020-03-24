
var app = getApp();
Page({
  data: {      
    currentTab: 0,
    sendList:[],
  },
  select: {
    page: 1,
    size: 6,
    isEnd: false
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.info('底部1')
    this.getData()
  },
  onChange(event) {
    this.select={
      page: 1,
      size: 6,
      isEnd: false
    }
    this.data.sendList=[];
    this.getData()
  },
  getData:function(){
    var _this=this;
    if (this.select.isEnd){
      return
    }

      var content = [{content:'1'},{content:'1'},{content:'1'},{content:'1'},{content:'1'},{content:'1'},{content:'1'},{content:'1'},{content:'1'},{content:'1'}];
      _this.setData({
        sendList:[..._this.data.sendList,...content]
      })
      if (content.length>0){
        _this.select.page++
      }else{
        _this.select.isEnd=true
      }
    
  },
})