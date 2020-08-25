import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import { provide } from "@vue/composition-api";
import { DefaultApolloClient } from '@vue/apollo-composable';
import { apolloClient } from "@/plugins/apollo"
import "@/plugins/composition-api";

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App),
  setup(){
    provide(DefaultApolloClient, apolloClient)
  },
}).$mount("#app");
