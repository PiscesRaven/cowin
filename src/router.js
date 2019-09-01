import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "login",
      alias: "/login",
      component: () => import("./views/login.vue")
    },
    {
      path: "/index",
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
              name: "category",
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
                  name: "categoryAdd",
                  component: () => import("./views/category/product_cu.vue")
                },
                {
                  path: "/category/:role(retailer|franchiser)/:cid/:pmode(create)",
                  name: "categoryAdd",
                  component: () => import("./views/category/order_c.vue")
                },
                {
                  path: "/category/:role(franchiser)/sp",
                  name: "categorySp",
                  component: () => import("./views/category/category_sp.vue")
                },
                {
                  path: "/category/:role(franchiser)/:cid/sp",
                  name: "categorySp",
                  component: () => import("./views/category/category_sp.vue")
                },
                {
                  path: "/category/:role(staff|retailer|franchiser)/:cid"
                }
              ]
            }
          ]
        },
        //supplier
        {
          path: "/order/:role(supplier)",
          component: () => import("./views/supplier/order.vue")
        },
        //sales
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
        //staff
        {
          path: "/order/:role(staff)",
          name: "order",
          component: () => import("./views/staff/index.vue"),
          children: [
            {
              path: "/order/:role(staff)/:mode(inquiry)",
              name: "order_template",
              component: () => import("./views/staff/order_template.vue")
            }
          ]
        }
      ]
    }
  ]
});
