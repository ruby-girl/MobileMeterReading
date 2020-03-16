
var app = getApp();
Page({
  data: {
    navTab: ['未抄表','已抄表'],        
    currentTab: 0,
    sendList:[],
  },
  select: {
    page: 1,
    size: 6,
    isEnd: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getData()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.info('底部1')
    this.getData()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  currentTab: function (e) {
    if (this.data.currentTab == e.currentTarget.dataset.idx){
      return;
    }
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
    console.info('m',this.select.isEnd)
    this.select={
      page: 1,
      size: 6,
      isEnd: false
    }
     console.info('m',this.select.isEnd)
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