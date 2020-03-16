
const baseUrl='http://test.scfxyb.com:8093'
const getOpenID=baseUrl+'/api/User/code2Session_Mp'//获取openid
const login=baseUrl+'/api/Login'//登陆
const getWarerList=baseUrl+'api/WaterFactory/GetWaterFactoryList'//获取水厂列表
module.exports = {
  getOpenID:getOpenID,
  getWarerList:getWarerList,
  login:login
}