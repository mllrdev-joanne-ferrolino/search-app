import Vue from "vue";

export enum RouteNames {
  SEARCH = "Search Page",
  USER = "User Page"
}

Vue.prototype.$routeNames = RouteNames;

declare module "vue/types/vue" {
  interface Vue {
    $routeNames: typeof RouteNames;
  }
}
