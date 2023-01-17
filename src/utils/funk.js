import config from './config.js'

// 常用需求
export function getVideoUrl(str) {
    return config.VIDEO_LIST[str]
}


//常用函数

//↓把日期变为YYYY-MM-DD格式↓
export function getMidlineYMD(date) {
    if (!(date instanceof Date)) {
        date = new Date(date)
    }
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    if (m < 10) {
        m = '0' + m;
    }
    if (d < 10) {
        d = '0' + d;
    }

    return y + '-' + m + '-' + d;
}

//↓ 给对象数组排序（默认升序） ↓
export function sortObj(attr, flag) {
    return function (a, b) {
        let srt = 0;
        if (b[attr] > a[attr]) {
            srt = -1
        } else if (b[attr] < a[attr]) {
            srt = 1
        } else {
            srt = 0;
        }

        if (flag === 'decrease') {
            srt = srt * -1;
        }
        return srt;
    }
}

export function strToArr(str) {
    var arr = str.slice(1, str.length - 1).split(',');
    for (var i = 0; i < arr.length; i++) {
        arr[i] = Number(arr[i]);
    }
    return arr;
}

export function produceTmSeciton(dayNum) {
    var curr = new Date();
    var stt = new Date(curr - dayNum * 86400000)
    var ed = new Date(curr - 86400000);
    return {
        startDate: stt,
        endDate: ed
    }
}