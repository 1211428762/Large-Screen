import { randomFloat, prefixInteger, hourTransform,timer} from "./index"

import ICountUp from "vue-countup-v2";
import { number } from "echarts";
export default {
  install(Vue) {
    Vue.prototype.$randomFloat = randomFloat;
    Vue.prototype.$hourTransform = hourTransform;
    Vue.prototype.$prefixInteger = prefixInteger;
    Vue.prototype.$timer = timer;
    Vue.component("number", ICountUp)
  },
};


