import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import InstantSearch from "../views/InstantSearch.vue";


Vue.use(VueRouter);

const routes = [

    {
    path: '/Home',
    name: 'Register',
    component: Home
  },
  {
    path: '/search',
    name: 'search',
    component: InstantSearch
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


export default router;
