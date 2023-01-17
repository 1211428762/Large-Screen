import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import Url from '../constUrl.js'

function getUrl(str) {
    return Url['PROXY_URL'] + Url[str];
}

// 获取饼形图
export function getMedia(params) {
    return request({
        // url: Url['PROXY_URL'] + Url['MEDIA_OPERATION'],
        url: getUrl('MEDIA_OPERATION'),
        method: 'get',
        params,
    })
}