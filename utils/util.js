const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//promise 方式
// function promiseRequest(url, data = {},type) {
//   return new Promise(function (resolve, reject) {
//     wx.request({
//       url: url,
//       data: data,
//       method: type,
//       header: {
//         'Content-Type': 'application/json',
//       },
//       success:(res) => {
//         if (res.statusCode == 200) {
//             resolve(res);
//         } else {
//           reject(res.errMsg);
//         }

//       },
//       fail: (err) => {
//         reject(err)
//         console.log("failed")
//       }
//     })
//   });
// }
module.exports = {
  formatTime: formatTime
}
