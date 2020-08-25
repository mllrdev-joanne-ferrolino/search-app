import Vue from "vue";

export enum RouteNames {
  SEARCH = "Search",
  USER = "User"
}

Vue.prototype.$routeNames = RouteNames;

declare module "vue/types/vue" {
  interface Vue {
    $routeNames: typeof RouteNames;
  }
}
