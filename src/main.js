import Vue from "vue";
import App from "./App.vue";
import VCalendar from "v-calendar";
import cookieconsent from "vue-cookieconsent-component";

Vue.component("cookie-consent", cookieconsent);
Vue.use(VCalendar);
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;
const ibe_housingid = 999;
new Vue({
  render: h => h(App)
}).$mount("#ibe");
