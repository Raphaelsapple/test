// import jsonp from 'common/js/jsonp'
// import {commonParams, options} from './config'
import axios from 'axios'
export function getRecommend() {
      return new Promise((resolve, reject) => {
        axios({
            method:'get',
            url: "http://m.kuwo.cn/newh5app/api/mobile/v1/home",
            responseType:'stream'
          }) .then(function(response) {
            // response.data.pipe(fs.createWriteStream('ada_lovelace.jpg'))
            resolve(response)
          }).catch(err => {
            reject()
        });
    });
}
