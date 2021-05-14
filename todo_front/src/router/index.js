import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import ViewTodos from "../views/ViewTodos";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    // Route path should start with / and end with /
    path: '/view_todos/',
    name: 'ViewTodo',
    component: ViewTodos,
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
