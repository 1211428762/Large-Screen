/**
 * 是否有权限
 * @param {*} key
 */
export function isAuth(key) {
  return JSON.parse(sessionStorage.getItem('permissions') || '[]').indexOf(key) !== -1 || false
}

/**
 * 获取路由名称, 根据url地址
 * @param {*} url
 */
export function getRouteNameByUrl(url) {
  let val = /.*\/(.*)\.html/.exec(url)
  return val && val.length >= 1 ? val[1] : ''
}


// 

export function timer(echarts, length, delay = 3000) {
  let index = 0;
  setInterval(() => {
    index++;
    echarts.dispatchAction({
      type: "downplay",
      seriesIndex: 0,
    });
    echarts.dispatchAction({
      type: "highlight",
      seriesIndex: 0,
      dataIndex: index % length,
    });
    echarts.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: index % length,
    });
  }, delay);


}


/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data, id = 'id', pid = 'parentId') {
  var res = []
  var temp = {}
  for (var i = 0; i < data.length; i++) {
    temp[data[i][id]] = data[i]
  }
  for (var k = 0; k < data.length; k++) {
    if (temp[data[k][pid]] && data[k][id] !== data[k][pid]) {
      if (!temp[data[k][pid]]['childrens']) {
        temp[data[k][pid]]['childrens'] = []
      }
      if (!temp[data[k][pid]]['_level']) {
        temp[data[k][pid]]['_level'] = 1
      }
      data[k]['_level'] = temp[data[k][pid]]._level + 1
      temp[data[k][pid]]['childrens'].push(data[k])
    } else {
      res.push(data[k])
    }
  }
  return res
}

/**
 * 获取字符串字节长度
 * @param {*} s
 */
export function getStringLength(s) {
  return s.replace(/[\u4e00-\u9fa5\uff00-\uffff]/g, '**').length
}

/**
 * 获取uuid
 */
export function getUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16 | 0) : ('r&0x3' | '0x8')).toString(16)
  })
}

export function randomFloat(min, max) {
  return Math.random() * (max - min) + min
}

export function prefixInteger(num, length) {
  return (Array(length).join('0') + num).slice(-length);
}
export function hourTransform(hour, minus) {
  if ((hour - minus) < 0) {
    return hour * 1 + 24 - minus
  } else {
    return hour - minus
  }
}