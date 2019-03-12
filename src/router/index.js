import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login/login'
import Upload from '@/components/upload'
import Test from '@/components/test'
import Home from '@/components/home/home'
import Search from '@/components/search/search'
import Observe from '@/components/observe/observe'
import Score from '@/components/score/score'
import Order from '@/components/order/order'
import OrderDetail from '@/components/order-detail/order-detail'
import My from '@/components/my/my'
import GuideInfo from '@/components/guideinfo/guideinfo'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/upload/:orderNo',
      name: 'upload',
      component: Upload
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/search',
      name: 'search',
      component: Search
    },
    {
      path: '/observe',
      name: 'observe',
      component: Observe
    },
    {
      path: '/score',
      name: 'score',
      component: Score
    },
    {
      path: '/order',
      name: 'order',
      component: Order
    },
    {
      path: '/order-detail/:id',
      name: 'order-detail',
      component: OrderDetail
    },
    {
      path: '/my',
      name: 'my',
      component: My
    },
    {
      path: '/guideInfo',
      name: 'guideInfo',
      component: GuideInfo
    }
  ]
})
