import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import routes from "./routes"

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/','/login'];
  const authRequired = !publicPages.includes(to.path);  // includes - содержит ли массив искомый элемент
  const loggedIn = store.getters['users/loggedUser'];

  document.title = to.meta.title + ' — Vue Landing';
  document.description = to.meta.desc;

  if (authRequired && !loggedIn) {
    return next('/login');
  }

  next();
})

export default router
