export default [
  {
    path: '/',
    name: 'Front',
    component: () => import("../views/Front.vue"),
    meta: {
      title: "Yegupov Gennady",
      desc: "Website development by web developer Gennady Yegupov."
    }
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "Login",
      desc: "Login page in the admin panel of the site."
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/Admin.vue'),
    meta: {
      title: "Admin panel",
      desc: "Admin panel of the landing page site."
    }
  },
  {
    path: "/admin/users",
    component: () => import("../views/AdminUsers.vue"),
    meta: {
      title: "Users list",
      desc: "Users list in the admin panel of the site."
    }
  },
  {
    path: "/admin/works",
    component: () => import("../views/AdminWorks.vue"),
    meta: {
      title: "Works list",
      desc: "Works list in the admin panel of the site."
    }
  },
  {
    path: "/admin/reviews",
    component: () => import("../views/AdminReviews.vue"),
    meta: {
      title: "Reviews list",
      desc: "Reviews list in the admin panel of the site."
    }
  },
  {
    path: "/admin/skills",
    component: () => import("../views/AdminSkills.vue"),
    meta: {
      title: "Skills list",
      desc: "Skills list in the admin panel of the site."
    }
  },
  {
    path: '*',
    beforeEnter: (to, from, next) => { next('/404') }
  },
  {
    path: '/404',
    name: '404',
    component: () => import("../views/PageNotFound.vue")
  }

];
