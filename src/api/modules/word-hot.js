import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import Url from '../constUrl.js'

function getUrl(str) {
    return Url['PROXY_URL'] + Url[str];
}

//词云
export function wordCloud(params) {
    return request({
        url: getUrl('WORD_CLOUD'),
        // url: Url['WORD_CLOUD'],
        method: 'get',
        params,
    })
}
// 单个词
export function wordTrend(params) {
    return request({
        // url: Url['WORD_TREND'],
        url: getUrl('WORD_TREND'),
        method: 'get',
        params 
    })
}

// 性别+城市+年龄段+兴趣
export function getOthers(params) {
    return request({
        // url: Url['OTHERS_DATA'],
        url: getUrl('OTHERS_DATA_URL'),
        method: 'get',
        params 
    })
}