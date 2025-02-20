
import Vue from "nativescript-vue";
import App from "./components/App.vue";
Vue.config.silent = false;


new Vue({
  render: (h) => h(App),
}).$start();
