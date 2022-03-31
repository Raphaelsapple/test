require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var axios = require('axios')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

var apiRoutes = express.Router()

apiRoutes.get('/getDiscList', function (req, res) {
  var str = Math.floor((Math.random() * 1000000000) + 1);
  var url = 'https://kuwo.cn/api/www/artist/artistInfo?category=0&prefix=&pn=1&rn=102&httpsStatus=1&reqId=cc9252b0-a834-11ec-a296-578af47cb584'
  // axios.get(url, {
  //   headers: {
  //     "accept": "application/json, text/plain, */*",
  //     "accept-language": "zh-CN,zh;q=0.9",
  //     "csrf": str,
  //     "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
  //     "sec-ch-ua-mobile": "?0",
  //     "sec-ch-ua-platform": "\"Windows\"",
  //     "sec-fetch-dest": "empty",
  //     "sec-fetch-mode": "cors",
  //     "sec-fetch-site": "same-origin",
  //     "cookie": "_ga=GA1.2.1825525254.1647352133; h5Uuid=7c50da4ddb1d42e1b7b0eafdafc057-2e; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1647352133,1647439564,1647770504; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1647770504; _gid=GA1.2.10505907.1647770504; _gat=1; kw_token="+str,
  //     "Referer": "https://kuwo.cn/singers",
  //     "Referrer-Policy": "strict-origin-when-cross-origin"
  //   },
  //   params: req.query
  // }).then((response) => {
  //   res.json(response.data)
  // }).catch((e) => {
  //   console.log(e)
  // })
})

apiRoutes.get('/getSingerDetailApi', function (req, res) {
  var str = Math.floor((Math.random() * 1000000000) + 1);
  console.log(str);
  // var url = "https://kuwo.cn/api/www/artist/artistMusic?artistid="+id+"&pn=1&rn=30&httpsStatus=1&reqId=8819cf21-adc8-11ec-a545-8152a54b0099"
  // axios.get(url, {
  //   headers: {
  //     "accept": "application/json, text/plain, */*",
  //     "accept-language": "zh-CN,zh;q=0.9",
  //     "csrf": str,
  //     "sec-ch-ua": "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"99\", \"Google Chrome\";v=\"99\"",
  //     "sec-ch-ua-mobile": "?0",
  //     "sec-ch-ua-platform": "\"Windows\"",
  //     "sec-fetch-dest": "empty",
  //     "sec-fetch-mode": "cors",
  //     "sec-fetch-site": "same-origin",
  //     "cookie": "_ga=GA1.2.1825525254.1647352133; h5Uuid=7c50da4ddb1d42e1b7b0eafdafc057-2e; _gid=GA1.2.1907497052.1648383315; Hm_lvt_cdb524f42f0ce19b169a8071123a4797=1647439564,1647770504,1647869987,1648383315; _gat=1; Hm_lpvt_cdb524f42f0ce19b169a8071123a4797=1648383727; kw_token="+str,
  //     "Referer": "https://kuwo.cn/singer_detail/336",
  //     "Referrer-Policy": "strict-origin-when-cross-origin"
  //   },
  //   params: req.query
  // }).then((response) => {
  //   res.json(response.data)
  // }).catch((e) => {
  //   console.log(e)
  // })
})

apiRoutes.get('/lyric', function (req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  }).then((response) => {
    var ret = response.data
    if (typeof ret === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = ret.match(reg)
      if (matches) {
        ret = JSON.parse(matches[1])
      }
    }
    res.json(ret)
  }).catch((e) => {
    console.log(e)
  })
})

app.use('/api', apiRoutes)

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
