
const baseUrl='http://18a5558a14.imwork.net'
const getOpenID=baseUrl+'/api/User/code2Session_Mp'//获取openid
const login=baseUrl+'/api/Login/Login'//登陆
const UploadFile=baseUrl+'/api/File/UploadX'//上传图片
module.exports = {
  getOpenID:getOpenID,
  UploadFile:UploadFile,
  login:login
}