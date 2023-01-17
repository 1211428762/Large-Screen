import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import Url from '../constUrl.js'


//ai主播列表
export function aiList(params) {
    return request({
        url: Url['AI_LIST'],
        method: 'get',
        params,
    })
}

// 现场直播url
export function liveUrl(params) {
    return request({
        url: Url['LIVE_URL'],
        method: 'get',
        params,
    })
}

// 现场新闻列表  （注：测试版时 现场直播视频与现场直播新闻列合并到 `liveUrl`接口中 。该接口目前不填）
export function liveList(params) {
    return request({
        url: Url['LIVE_LIST'],
        method: 'get',
        params,
    })
}

// 现场云数据
export function liveData(params) {
    return request({
        url: Url['LIVE_DATA'],
        method: 'get',
        params,
    })
}