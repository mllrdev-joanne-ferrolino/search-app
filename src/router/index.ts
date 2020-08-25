import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import { RouteNames } from '@/router/route-names';

Vue.use(VueRouter);
function loadView(view: string) {
  return () => import(/* webpackChunkName: "about" */ `../views/${view}.vue`);
}
const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/search"
  },
  {
    path: "/search",
    name: RouteNames.SEARCH,
    component: loadView("SearchPage")
  },
  {
    path: "/user/:name",
    name: RouteNames.USER,
    component: loadView("UserPage"),
    props: true
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
