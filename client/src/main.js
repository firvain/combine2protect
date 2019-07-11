import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ReadMore from "vue-read-more";
import i18n from "./plugins/i18n";
import FlagIcon from "vue-flag-icon";
Vue.use(FlagIcon);
Vue.use(ReadMore);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
