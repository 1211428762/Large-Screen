/**
 * 1、接口地址统一在constUrl.js中编写
 * 
 */

import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import httpUrl from '../constUrl'
const BASE_URL = "http://121.89.192.156/mock/11/api/"

export function vioceCollection(params) {
    return request({
        url: BASE_URL + "collection/voice",
        method: 'get',
        params,
    })
}

export function imgCollection(params) {
    return request({
        url: BASE_URL + "collection/img",
        method: 'get',
        params,
    })
}
export function smartProductionLine(params) {
    return request({
        url: BASE_URL + "smart/productionLine",
        method: 'get',
        params,
    })
}
export function checkContentAudit(params) {
    return request({
        url: BASE_URL + "check/contentAudit",
        method: 'get',
        params,
    })
}
export function checkDistributeList(params) {
    return request({
        url: BASE_URL + "check/distributeList",
        method: 'get',
        params,
    })
}

export function smartTechnology(params) {
    return request({
        url: BASE_URL + "smart/technology",
        method: 'get',
        params,
    })
}
export function productionStatistic(params) {
    return request({
        url: BASE_URL + "smart/productionStatistic",
        method: 'get',
        params,
    })
}
export function hotpotList(params) {
    return request({
        url: BASE_URL + "hotpot/list",
        method: 'get',
        params,
    })
}
export function checkSpread(params) {
    return request({
        url: BASE_URL + "check/spread",
        method: 'get',
        params,
    })
}
// TODO
export function checkProofread(params) {
    return request({
        url: BASE_URL + "check/proofread",
        method: 'get',
        params,
    })
}
