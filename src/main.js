import Vue from 'vue'
import App from './App'
import router from './router'
import "./theme/index.css"
import axios from "axios";
import qs from "qs";
import 'jquery'
import elementUi from "element-ui";
import VCharts from 'v-charts';
//导入自定义模块
import {
  getCurDate,
  setSessionStorage,
  getSessionStorage,
  removeSessionStorage,
  setLocalStorage,
  getLocalStorage,
  removeLocalStorage,
  toDecimal2,
} from "./common.js";
Vue.filter("toDecimal", function(value) {
  return toDecimal2(value);
});

Vue.config.productionTip = false
Vue.use(elementUi);
Vue.use(VCharts);

axios.defaults.baseURL = "http://localhost:8083/"; //将axios挂载到vue上，使用是就可以 this.$axios 这样使用了
Vue.prototype.$axios = axios;
Vue.prototype.$qs = qs;
Vue.prototype.$getCurDate = getCurDate;
Vue.prototype.$setSessionStorage = setSessionStorage;
Vue.prototype.$getSessionStorage = getSessionStorage;
Vue.prototype.$removeSessionStorage = removeSessionStorage;
Vue.prototype.$setLocalStorage = setLocalStorage;
Vue.prototype.$getLocalStorage = getLocalStorage;
Vue.prototype.$removeLocalStorage = removeLocalStorage;

// router.beforeEach(function(to, from, next) {
//   let user = sessionStorage.getItem("user");
//   //除了登录、注册、首页、商家列表、商家信息之外，都需要判断是否登录了
//   if (
//     !(
//       to.path == "/" ||
//       to.path == "/index" ||
//       to.path == "/login" ||
//       to.path == "/register"||
//       to.path == "/managerLogin"||
//       to.path == "/detail"
//     )
//   ) {
//     if (user == null) {
//       router.push("/login");
//       location.reload();
//     }
//   }
//   next();
// });

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
