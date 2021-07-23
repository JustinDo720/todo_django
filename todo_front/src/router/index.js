import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import ViewTodos from "../views/ViewTodos";
import Login from "../views/Login";
import Logout from "../views/Logout";
import Register from "../views/Register";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    // Route path should start with / and end with /
    path: "/view_todos/",
    name: "ViewTodo",
    component: ViewTodos,
    meta:{
      requiresLogin: true
    },
  },
  {
    path: "/login/",
    name: "Login",
    component: Login,
  },
  {
    path: "/register/",
    name: "Register",
    component: Register
  },
  {
    path: "/logout/",
    name: "Logout",
    component: Logout,
  },
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

store.dispatch('reinitializeStore').then(()=>{
      // router guards
      router.beforeEach((to, from, next) =>{
        console.log('router log in info after: ' + !store.getters.loggedIn)
        if(to.matched.some(record => record.meta.requiresLogin)){
          if(!store.getters.loggedIn){
            next({name:'Login'})
          }else{
            next()
          }
        }else{
          // This means that the router doesnt have the meta tag 'requiresLogin' which means they are free to pass
          next()
        }
      })
    }).catch(()=>{
      console.log(
          'There is an error here'
      )
})



export default router;
