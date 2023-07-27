import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9ee0b1b6 = () => interopDefault(import('../pages/inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _7107ebe4 = () => interopDefault(import('../pages/investments/index.vue' /* webpackChunkName: "pages/investments/index" */))
const _6d1f5618 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _b68b32ca = () => interopDefault(import('../pages/news/index.vue' /* webpackChunkName: "pages/news/index" */))
const _0b47b828 = () => interopDefault(import('../pages/rents/index.vue' /* webpackChunkName: "pages/rents/index" */))
const _e585834c = () => interopDefault(import('../pages/sales/index.vue' /* webpackChunkName: "pages/sales/index" */))
const _006e9c46 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _67a3ef67 = () => interopDefault(import('../pages/investments/single/_id.vue' /* webpackChunkName: "pages/investments/single/_id" */))
const _0f9a62fa = () => interopDefault(import('../pages/news/single/_id.vue' /* webpackChunkName: "pages/news/single/_id" */))
const _3b59fce6 = () => interopDefault(import('../pages/rents/single/_id.vue' /* webpackChunkName: "pages/rents/single/_id" */))
const _50338a9b = () => interopDefault(import('../pages/sales/single/_id.vue' /* webpackChunkName: "pages/sales/single/_id" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/inspire",
    component: _9ee0b1b6,
    name: "inspire"
  }, {
    path: "/investments",
    component: _7107ebe4,
    name: "investments"
  }, {
    path: "/login",
    component: _6d1f5618,
    name: "login"
  }, {
    path: "/news",
    component: _b68b32ca,
    name: "news"
  }, {
    path: "/rents",
    component: _0b47b828,
    name: "rents"
  }, {
    path: "/sales",
    component: _e585834c,
    name: "sales"
  }, {
    path: "/",
    component: _006e9c46,
    name: "index"
  }, {
    path: "/investments/single/:id?",
    component: _67a3ef67,
    name: "investments-single-id"
  }, {
    path: "/news/single/:id?",
    component: _0f9a62fa,
    name: "news-single-id"
  }, {
    path: "/rents/single/:id?",
    component: _3b59fce6,
    name: "rents-single-id"
  }, {
    path: "/sales/single/:id?",
    component: _50338a9b,
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
