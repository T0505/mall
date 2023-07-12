import { createRouter, createWebHistory } from "vue-router";

const routes = [{
  path: "/",
  redirect: "/layout/index",
}, {
  path: "/login",
  name: "login",
  component: _ => import("@/views/login/Login.vue"),
}, {
  path: "/layout",
  name: "layout",
  component: _ => import("@/views/Layout.vue"),
  children: [],
}];

["profile","index", "cart", "process", "detail", "category","order","address","wallet","collect"].forEach(item => {
  routes[routes.length - 1].children.push({
    path: item,
    name: item,
    component: _ => import(`@/views/${item}/${item.charAt(0).toUpperCase()}${item.substring(1)}.vue`)
  });
});

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
