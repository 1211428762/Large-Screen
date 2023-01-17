/**
 * 固定地址url (变量为常量名称用大写)
 */

export default {

  BASE_URL: "",
  // PROXY_URL: "/proxy",
  PROXY_URL: "",




  // 登录所需 common.js
  LOGIN: "/sys/login", //登录
  LOGOUT: "/sys/logout", //退出
  CAPTCHA: "/captcha.jpg", //验证码

  // 热词
  WORD_CLOUD: '/api/dp/sina/words', //词云
  WORD_TREND: '/api/dp/sina/words/trend', //趋势

  // 今日要闻
  TODAY_NEWS: '/api/dp/app/content/browsers/topn', //今日要闻

  // WORD_CLOUD: './json/sina-word-cloud.json', //词云
  // WORD_TREND: './json/word-trend.json', //趋势
  OTHERS_DATA_URL: '/api/dp/sina/hot/data',
  OTHERS_DATA: './json/top.json', //性别+城市+年龄段+兴趣

  // AI主播
  AI_LIST: './json/ai-list.json', //ai主播

  // 现场云
  LIVE_URL: './json/live-video.json', //当前直播url
  LIVE_LIST: './json/live-data.json', //现场新闻列表
  LIVE_DATA: './json/live-cloud.json', ///现场云数据

  // 稿件运营


  // 媒体运营 用户量相关
  MEDIA_OPERATION: '/api/dp/users'



};