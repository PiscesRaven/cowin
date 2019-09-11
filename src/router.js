import Vue from "vue";
import Router from "vue-router";
import store from "@/store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: "/",
      name: "login",
      alias: "/login",
      component: () => import("./views/login.vue")
    },
    {
      path: "/index",
      name: "index",
      component: () => import("./views/index.vue"),
      children: [
        {
          path: "/user",
          name: "user",
          component: () => import("./views/user/user.vue"),
          children: [
            { path: "/user/:role", meta: { parentPath: "/user" } },
            {
              path: "/user/:role/:mode(create|edit)",
              component: () => import("./views/user/user_cu.vue")
            }
          ]
        },
        {
          path: "/category",
          name: "category",
          component: () => import("./views/category/index.vue"),
          children: [
            {
              path: "/category/:role",
              name: "category2",
              components: {
                category: () => import("./views/category/index_category.vue"),
                order: () => import("./views/category/index_order.vue")
              },
              children: [
                { path: "/category/:role", meta: { parentPath: "/category" } },
                {
                  path: "/category/:role(staff)/:cmode(create|edit)",
                  component: () => import("./views/category/category_cu.vue")
                },
                {
                  path: "/category/:role(staff)/:cid/:pmode(create|edit)",
                  component: () => import("./views/category/product_cu.vue")
                },
                {
                  path: "/category/:role(retailer|franchiser)/:cid/:pmode(create)",
                  component: () => import("./views/category/order_c.vue")
                },
                {
                  path: "/category/:role(franchiser)/sp",
                  component: () => import("./views/category/order_sp.vue")
                },
                {
                  path: "/category/:role(franchiser)/:cid/sp",
                  component: () => import("./views/category/order_sp.vue")
                },
                {
                  path: "/category/:role(staff|retailer|franchiser)/:cid"
                }
              ]
            }
          ]
        },
        //staff
        {
          path: "/order/:role(staff)",
          component: () => import("./views/staff/order.vue"),
          children: [
            {
              path: "/order/:role(staff)/:mode(inquiry)",
              component: () => import("./views/staff/flow.vue")
            }
          ]
        },
        //supplier
        {
          path: "/order/:role(supplier)",
          component: () => import("./views/supplier/order.vue"),
          children: [
            {
              path: "/order/:role(supplier)/:mode(inquiry)",
              component: () => import("./views/supplier/flow.vue")
            }
          ]
        },
        //sales
        {
          path: "/order/:role(sales)",
          component: () => import("./views/sales/order.vue"),
          children: [
            {
              path: "/order/:role(sales)/:mode(inquiry)",
              component: () => import("./views/sales/flow.vue")
            }
          ]
        },
        {
          path: "/stock/:role(sales)",
          name: "salesStock",
          component: () => import("./views/sales/stock.vue"),
          children: [
            {
              path: "/stock/:role(sales)/:retailerId",
              component: () => import("./views/sales/stock_r.vue")
            }
          ]
        },
        //retailer
        {
          path: "/order/:role(retailer)",
          component: () => import("./views/retailer/order.vue"),
          children: [
            {
              path: "/order/:role(retailer)/:mode(inquiry)",
              component: () => import("./views/retailer/flow.vue")
            }
          ]
        },
        //franchiser
        {
          path: "/order/:role(franchiser)",
          component: () => import("./views/franchiser/order.vue"),
          children: [
            {
              path: "/order/:role(franchiser)/:mode(inquiry)",
              component: () => import("./views/franchiser/flow.vue")
            }
          ]
        }
      ]
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (store.state.isLogin) {
    if (to.name === "login") {
      if (store.state.isFirst) next("/index");
      else next(false);
      return false;
    }
  } else {
    if ((to.meta || {}).next) {
      next();
      return false;
    } else if (to.name !== "login") {
      next({ path: "/" });
      return false;
    }
  }
  next();
});
export default router;
