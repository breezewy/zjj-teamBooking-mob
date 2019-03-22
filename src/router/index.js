import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Lead from '@/components/lead/lead'

import Login from '@/components/login/login'

import GuideLogin from '@/components/guidelogin/guidelogin'
import TravelLogin from '@/views/travellogin/travellogin'

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





import Fix from '@/components/fix/start'
import TicketList from '@/components/ticket-list/ticket-list'
import TicketDetail from '@/components/ticket-detail/ticket-detail'
import  TestScroll from '@/components/test-scroll/test-scroll'
import BaseInfo from '@/components/base-info/base-info'


//以下是旅行社的路由
import Thome from '@/views/thome/thome'
import Tobserve from '@/views/tobserve/tobserve'
import Tscore from '@/views/tscore/tscore'
import Torder from '@/views/torder/torder'
import Tmy from '@/views/tmy/tmy'
import TTicketList from '@/views/t-ticket-list/t-ticket-list'
import TTicketDetail from '@/views/t-ticket-detail/t-ticket-detail'
import TOrderDetail from '@/views/t-order-detail/t-order-detail'
import TravelInfo from '@/views/travelInfo/travelInfo'











Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    { path: '/', name: 'lead',component: Lead },
    { path: '/login', name: 'login',component: Login },
    { path: '/guide/login', name: 'guidelogin',component: GuideLogin },
    { path: '/travel/login', name: 'travellogin',component: TravelLogin },


    { path: '/upload/:orderNo', name: 'upload',component: Upload },
    { path: '/test', name: 'test',  component: Test },
    { path: '/home',  name: 'home', component: Home },
    { path: '/search', name: 'search', component: Search},
    { path: '/observe',name: 'observe',component: Observe },
    { path: '/score',  name: 'score',  component: Score},
    { path: '/order', name: 'order', component: Order},
    { path: '/order-detail/:id',  name: 'order-detail',component: OrderDetail },
    { path: '/my',  name: 'my', component: My },
    { path: '/guideInfo', name: 'guideInfo', component: GuideInfo},
    { path: '/fix', name: 'fix',component: Fix },
    { path: '/ticket-list',  name: 'ticket-list',component: TicketList},
    { path: '/ticket-detail',  name: 'ticket-detail',component: TicketDetail},
    { path: '/base-info',  name: 'base-info',component: BaseInfo},
    {  path: '/test-scroll', name: 'test-scroll', component: TestScroll},

  //  以下是旅行社的路由
    { path: '/travel-home',  name: 'thome', component: Thome },
    { path: '/travel-observe',  name: 'tobserve', component: Tobserve },
    { path: '/travel-score',  name: 'tscore', component: Tscore },
    { path: '/travel-order',  name: 'torder', component: Torder },
    { path: '/travel-my',  name: 'tmy', component: Tmy },
    { path: '/travel-ticket-list',  name: 't-ticket-list',component: TTicketList},
    { path: '/travel-ticket-detail',  name: 't-ticket-detail',component: TTicketDetail},
    { path: '/travel-order-detail/:id',  name: 't-order-detail',component: TOrderDetail},
    { path: '/travelInfo',  name: 'travelInfo',component: TravelInfo}
  ]
})
