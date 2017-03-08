import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'
import Todolist from '../components/Todolist'
import About from '../components/About'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Todolist',
      component: Todolist
    },
    {
      path: '/about',
      name: 'About',
      component: About
    }
  ]
})
