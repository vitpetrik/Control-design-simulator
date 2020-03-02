import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    component: () =>
      import(/* webpackChunkName: "flyhub" */"../shell/flyhub.vue"),
    children: [
      {
        path: "/",
        name: "discrete_time",
        component: () =>
          import(/* webpackChunkName: "discrete_time" */ "../views/discrete_time.vue")
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
