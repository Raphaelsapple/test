import fetch from 'node-fetch'
import express from 'express'
const app = express();

app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, mytoken')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Authorization')
  res.setHeader('Content-Type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  res.header('X-Powered-By', ' 3.2.1')

  if (req.method == 'OPTIONS') {
    /*让options请求快速返回*/
    res.sendStatus(200)
  } else {
    next()
  }
});
app.get('/', function (req, res) {
  var myRes = ""
  getArtistInfo(req.query.id).then((resstr)=>{
    myRes = JSON.stringify(resstr)
    res.send(myRes)
  });
})
app.get('/getArtMusicInfo', function (req, res) {
  var myRes = ""
  getArtistMusic(req.query.id).then((resstr)=>{
    myRes = JSON.stringify(resstr)
    res.send(myRes)
  });
})
app.listen(10001, function () {
  console.log('服务器启动: http://127.0.0.1:10001');
});


function getArtistMusic(id) {
  return new Promise((resolve, reject) => {
    var str = Math.floor((Math.random() * 1000000000) + 1);
    fetch("https://kuwo.cn/api/www/artist/artistMusic?artistid="+id+"&pn=1&rn=30&httpsStatus=1&reqId=8819cf21-adc8-11ec-a545-8152a54b0099", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9",
        "csrf": str,
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": "_ga=GA1.2.1825525254.1647352133; h5Uuid=7c50da4ddb1d42e1b7b0eafdafc057-2e; _gid=GA1.2.1907497052.1648383315; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1647439564,1647770504,1647869987,1648383315; _gat=1; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1648383727; kw_token="+str,
        "Referer": "https://kuwo.cn/singer_detail/336",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
    }).then(function(response) {
      resolve(response.json())
    }).catch(err => {
      reject()
    });
  });
}


function getArtistInfo(id) {
  return new Promise((resolve, reject) => {
    var str = Math.floor((Math.random() * 1000000000) + 1);
    fetch("https://kuwo.cn/api/www/artist/artist?artistid="+id+"&httpsStatus=1&reqId=277dff20-af61-11ec-85de-59f6e34c78ec", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "zh-CN,zh;q=0.9",
        "csrf": str,
        "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "cookie": "_ga=GA1.2.1825525254.1647352133; h5Uuid=7c50da4ddb1d42e1b7b0eafdafc057-2e; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1647770504,1647869987,1648383315,1648558866; _gid=GA1.2.1078143322.1648558866; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1648558928; _gat=1; kw_token="+str,
        "Referer": "https://kuwo.cn/singers",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      },
      "body": null,
      "method": "GET"
    }).then(function(response) {
      resolve(response.json())
    }).catch(err => {
      reject()
    });
  });
}
