import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import Url from '../constUrl.js'

function getUrl(str) {
    return Url['PROXY_URL'] + Url[str];
}

//今日要闻
export function newsList(params) {
    return request({
        url: getUrl('TODAY_NEWS'),
        method: 'get',
        params,
    })
}

