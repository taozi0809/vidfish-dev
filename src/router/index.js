import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Home = resolve => require(['@/view/home'], resolve)
const Page1 = resolve => require(['@/view/page1'], resolve)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/',redirect: '/home'},
    {path: '',component:Home},
    {path:'/home', component:Home},
    {path:'/page1', component:Page1},
  ]
})
