import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _2be7c3f1 = () => interopDefault(import('../pages/finanzas/index.vue' /* webpackChunkName: "pages/finanzas/index" */))
const _00ff82e0 = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _4b7297b9 = () => interopDefault(import('../pages/investments/index.vue' /* webpackChunkName: "pages/investments/index" */))
const _403469c2 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _16c1d960 = () => interopDefault(import('../pages/news/index.vue' /* webpackChunkName: "pages/news/index" */))
const _12935c2f = () => interopDefault(import('../pages/referrals/index.vue' /* webpackChunkName: "pages/referrals/index" */))
const _16bcf546 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _900ebbda = () => interopDefault(import('../pages/rents/index.vue' /* webpackChunkName: "pages/rents/index" */))
const _39ee2845 = () => interopDefault(import('../pages/sales/index.vue' /* webpackChunkName: "pages/sales/index" */))
const _163e2808 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _a6eb96c8 = () => interopDefault(import('../pages/investments/single/_id.vue' /* webpackChunkName: "pages/investments/single/_id" */))
const _76c34136 = () => interopDefault(import('../pages/news/single/_id.vue' /* webpackChunkName: "pages/news/single/_id" */))
const _cec06c34 = () => interopDefault(import('../pages/referrals/single/_id.vue' /* webpackChunkName: "pages/referrals/single/_id" */))
const _6462dafc = () => interopDefault(import('../pages/rents/single/_id.vue' /* webpackChunkName: "pages/rents/single/_id" */))
const _3baf1b90 = () => interopDefault(import('../pages/sales/single/_id.vue' /* webpackChunkName: "pages/sales/single/_id" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/finanzas",
    component: _2be7c3f1,
    name: "finanzas"
  }, {
    path: "/inspire",
    component: _00ff82e0,
    name: "inspire"
  }, {
    path: "/investments",
    component: _4b7297b9,
    name: "investments"
  }, {
    path: "/login",
    component: _403469c2,
    name: "login"
  }, {
    path: "/news",
    component: _16c1d960,
    name: "news"
  }, {
    path: "/referrals",
    component: _12935c2f,
    name: "referrals"
  }, {
    path: "/register",
    component: _16bcf546,
    name: "register"
  }, {
    path: "/rents",
    component: _900ebbda,
    name: "rents"
  }, {
    path: "/sales",
    component: _39ee2845,
    name: "sales"
  }, {
    path: "/",
    component: _163e2808,
    name: "index"
  }, {
    path: "/investments/single/:id?",
    component: _a6eb96c8,
    name: "investments-single-id"
  }, {
    path: "/news/single/:id?",
    component: _76c34136,
    name: "news-single-id"
  }, {
    path: "/referrals/single/:id?",
    component: _cec06c34,
    name: "referrals-single-id"
  }, {
    path: "/rents/single/:id?",
    component: _6462dafc,
    name: "rents-single-id"
  }, {
    path: "/sales/single/:id?",
    component: _3baf1b90,
    name: "sales-single-id"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
