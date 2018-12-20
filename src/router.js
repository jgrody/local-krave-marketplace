import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/admin",
      name: "products",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/admin/Products.vue")
    },
    {
      path: "/admin/invites",
      name: "invites",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/admin/Invites.vue")
    }
  ]
});

export default router;