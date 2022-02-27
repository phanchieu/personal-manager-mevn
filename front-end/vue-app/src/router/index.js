import Vue from 'vue';
import VueRouter from 'vue-router';
import Auth from '../views/Auth/index.vue';
import SignUp from '../views/Auth/views/SignUp.vue';
import Profile from '../views/Profile/index.vue';
import Form from '../views/Admin/views/Form.vue';
import Admin from '../views/Admin/index.vue';
import NotFound from '../views/404/index.vue';
import Home from '../views/Home/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/sign-in',
    name: 'Auth',
    component: Auth,
  },
  {
    path: '/sign-up',
    name: 'Sign Up',
    component: SignUp,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    beforeEnter: (to, from, next) => {
      const loggedIn = localStorage.getItem('mevn');
      if (to.name === 'Auth' || to.name === 'Sign Up') {
        if (loggedIn) {
          router.push('/');
        } else {
          next();
        }
      } else {
        if (!loggedIn) {
          router.push('/sign-in');
        } else {
          next();
        }
      }
    },
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    beforeEnter: (to, from, next) => {
      const loggedIn = localStorage.getItem('mevn');
      if (to.name === 'Auth' || to.name === 'Sign Up') {
        if (loggedIn && (loggedIn.role.name === 'Admin' || loggedIn.role.name === 'Manager')) {
          router.push('/');
        } else {
          next();
        }
      } else {
        if (!loggedIn) {
          router.push('/sign-in');
        } else {
          next();
        }
      }
    },
  },
  {
    path: '/form/:id',
    name: 'Update',
    component: Form,
    props: true,

    beforeEnter: (to, from, next) => {
      const loggedIn = localStorage.getItem('mevn');
      if (to.name === 'Auth' || to.name === 'Sign Up') {
        if (loggedIn && (loggedIn.role.name === 'Admin' || loggedIn.role.name === 'Manager')) {
          router.push('/');
        } else {
          next();
        }
      } else {
        if (!loggedIn) {
          router.push('/sign-in');
        } else {
          next();
        }
      }
    },
  },
  {
    path: '/form',
    name: 'Created',
    component: Form,
    beforeEnter: (to, from, next) => {
      const loggedIn = localStorage.getItem('mevn');
      if (to.name === 'Auth' || to.name === 'Sign Up') {
        if (loggedIn && (loggedIn.role.name === 'Admin' || loggedIn.role.name === 'Manager')) {
          router.push('/');
        } else {
          next();
        }
      } else {
        if (!loggedIn) {
          router.push('/sign-in');
        } else {
          next();
        }
      }
    },
  },
  { path: '/404', name: '404', component: NotFound },
  { path: '*', redirect: '/404' },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
