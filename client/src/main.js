import Vue from "vue";
import "./plugins/vuetify";
import "./plugins/vueLayers";
import i18n from "./plugins/i18n";
import ReadMore from "vue-read-more";
import FlagIcon from "vue-flag-icon";
import App from "./App.vue";
import router from "./router";
import store from "./store";
Vue.use(FlagIcon);
Vue.use(ReadMore);
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
