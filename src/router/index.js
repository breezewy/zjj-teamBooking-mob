import Vue from 'vue'
import Router from 'vue-router'

//首页
// import Lead from '@/views/lead'
const Lead = () => import('@/views/lead')

//导游
// import GuideLogin from '@/views/guide/login'
const GuideLogin = () => import('@/views/guide/login')
// import GuideHome from '@/views/guide/home'
const GuideHome = () => import('@/views/guide/home')
// import GuideBooking from '@/views/guide/booking'
const GuideBooking = () => import('@/views/guide/booking')
// import GuideTicketList from '@/views/guide/ticket/ticket-list'
const GuideTicketList = () => import('@/views/guide/ticket/ticket-list')
// import GuideTicketDetail from '@/views/guide/ticket/ticket-detail'
const GuideTicketDetail = () => import('@/views/guide/ticket/ticket-detail')
// import GuideScore from '@/views/guide/score'
const GuideScore = () => import('@/views/guide/score')
// import GuideOrderList from '@/views/guide/order/order-list'
const GuideOrderList = () => import('@/views/guide/order/order-list')
// import GuideOrderDetail from '@/views/guide/order/order-detail'
const GuideOrderDetail = () => import('@/views/guide/order/order-detail')
// import GuideIdList from '@/views/guide/id/id-list'
const GuideIdList = () => import('@/views/guide/id/id-list')
// import GuideIdEnter from '@/views/guide/id/id-enter'
const GuideIdEnter = () => import('@/views/guide/id/id-enter')
// import GuideMy from '@/views/guide/my'
const GuideMy = () => import('@/views/guide/my')
// import GuideChangePass from '@/views/guide/info/change-pass'
const GuideChangePass = () => import('@/views/guide/info/change-pass')
// import GuideCollectId from '@/views/guide/info/collectId'
const GuideCollectId = () => import('@/views/guide/info/collectId')

//旅行社
// import TravelLogin from '@/views/travel/login'
const TravelLogin = () => import('@/views/travel/login')
// import TravelHome from '@/views/travel/home'
const TravelHome = () => import('@/views/travel/home')
// import TravelBooking from '@/views/travel/booking'
const TravelBooking = () => import('@/views/travel/booking')
// import TravelTicketList from '@/views/travel/ticket/ticket-list'
const TravelTicketList = () => import('@/views/travel/ticket/ticket-list')
// import TravelTicketDetail from '@/views/travel/ticket/ticket-detail'
const TravelTicketDetail = () => import('@/views/travel/ticket/ticket-detail')
// import TravelScore from '@/views/travel/score'
const TravelScore = () => import('@/views/travel/score')
// import TravelOrderList from '@/views/travel/order/order-list'
const TravelOrderList = () => import('@/views/travel/order/order-list')
// import TravelOrderDetail from '@/views/travel/order/order-detail'
const TravelOrderDetail = () => import('@/views/travel/order/order-detail')
// import TravelMy from '@/views/travel/my'
const TravelMy = () => import('@/views/travel/my')
// import TravelChangePass from '@/views/travel/info/change-pass'
const TravelChangePass = () => import('@/views/travel/info/change-pass')


//未找到
// import NoFound from '@/bases/no-found/no-found'
const NoFound = () => import('@/bases/no-found/no-found')

Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    //首页
    {
      path: '/',
      name: 'lead',
      component: Lead
    },
    //导游
    {
      path: '/guide/login',
      name: 'guide-login',
      component: GuideLogin
    },
    {
      path: '/guide/home',
      name: 'guide-home',
      component: GuideHome
    },
    {
      path: '/guide/booking',
      name: 'guide-booking',
      component: GuideBooking
    },
    {
      path: '/guide/ticket-list',
      name: 'guide-ticket-list',
      component: GuideTicketList
    },
    {
      path: '/guide/ticket-detail',
      name: 'guide-ticket-detail',
      component: GuideTicketDetail
    },
    {
      path: '/guide/score',
      name: 'guide-score',
      component: GuideScore
    },
    {
      path: '/guide/order-list',
      name: 'guide-order-list',
      component: GuideOrderList
    },
    {
      path: '/guide/order-detail/:id',
      name: 'guide-order-detail',
      component: GuideOrderDetail
    },
    {
      path: '/guide/id-list/:id',
      name: 'guide-id-list',
      component: GuideIdList
    },
    {
      path: '/guide/id-enter/:id',
      name: 'guide-id-enter',
      component: GuideIdEnter
    },
    {
      path: '/guide/my',
      name: 'guide-my',
      component: GuideMy
    },
    {
      path: '/guide/change-pass',
      name: 'guide-change-pass',
      component: GuideChangePass
    },
    {
      path: '/guide/collect-id',
      name: 'guide-collect-id',
      component: GuideCollectId
    },

    //旅行社
    {
      path: '/travel/login',
      name: 'travel-login',
      component: TravelLogin
    },
    {
      path: '/travel/home',
      name: 'travel-home',
      component: TravelHome
    },
    {
      path: '/travel/booking',
      name: 'travel-booking',
      component: TravelBooking
    },
    {
      path: '/travel/ticket-list',
      name: 'travel-ticket-list',
      component: TravelTicketList
    },
    {
      path: '/travel/ticket-detail',
      name: 'travel-ticket-detail',
      component: TravelTicketDetail
    },
    {
      path: '/travel/score',
      name: 'travel-score',
      component: TravelScore
    },
    {
      path: '/travel/order-list',
      name: 'travel-order-list',
      component: TravelOrderList
    },
    {
      path: '/travel/order-detail/:id',
      name: 'travel-order-detail',
      component: TravelOrderDetail
    },
    {
      path: '/travel/my',
      name: 'travel-my',
      component: TravelMy
    },
    {
      path: '/travel/change-pass',
      name: 'travel-change-pass',
      component: TravelChangePass
    },
    //未找到
    {
      path: '*',
      component: NoFound
    }



  ]
})
