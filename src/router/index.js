import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: () => import("../views/finance_list_view.vue"),
      prop: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/auth",
      name: "auth",
      component: () => import("../views/auth.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/register.vue")
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("../views/dashboard.vue"),
      prop: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/finance_list_view",
      name: "finance_list_view",
      component: () => import("../views/finance_list_view.vue"),
      prop: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/transfer",
      name: "transfer",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/transfer.vue"),
      prop: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/loan",
      name: "loan",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/loan.vue"),
      prop: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/transactions",
      name: "transactions",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/transactions.vue"),
      prop: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/credit_transactions",
      name: "credit_transactions",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/credit_transactions.vue"
        ),
      prop: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/debit_transactions",
      name: "debit_transactions",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/debit_transactions.vue"
        ),
      prop: true,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/account_view",
      name: "account_view",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/account_view.vue"),
      prop: true,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach((to,from, next) => {
  let logged_in = localStorage.getItem("login");
  if (to.meta.requiresAuth && !logged_in) {
    next({ path: "/auth" });
  }
  next();
});

export default router;
