import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import store from '@/store'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/lobby",
    name: "Lobby",
    component: function () {
      return import(/* webpackChunkName: "Lobby" */ "../views/Lobby.vue");
    },
  },
  {
    path: "/booth/:id?",
    name: "Booth",
    component: function () {
      return import(/* webpackChunkName: "Booth" */ "../views/Booth.vue");
    },
  },
  {
    path: "/auditorium",
    name: "Auditorium",
    component: function () {
      return import(/* webpackChunkName: "Auditorium" */ "../views/Auditorium.vue");
    },
  },
];

const router = new VueRouter({
  routes,
});

// route guard
router.beforeEach((to, from, next) => {
  const auth_token = store.getters['authentication/token']

  if ( to.name !== 'Login' && !auth_token ) {
    store.dispatch('authentication/logout')
    next({ name: 'Login' });
  }
  else if ( to.name === 'Login' && auth_token ) {
    next({ name: 'Lobby' });
  }
  else {
    next();
  }
});

export default router;
