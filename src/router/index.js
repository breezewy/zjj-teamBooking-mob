import Vue from 'vue'
import Router from 'vue-router'

//测试页面
import HelloWorld from '@/components/HelloWorld'
// import Login from '@/components/login/login'
import Upload from '@/components/upload'
import Test from '@/components/test'

//首页
import Lead from '@/components/lead/lead'

//导游页面
import GuideLogin from '@/components/guidelogin/guidelogin'
import Home from '@/components/home/home'
import Search from '@/components/search/search'
import Observe from '@/components/observe/observe'
import Score from '@/components/score/score'
import Order from '@/components/order/order'
import OrderDetail from '@/components/order-detail/order-detail'
import My from '@/components/my/my'
import GuideInfo from '@/components/guideinfo/guideinfo'
import idCardList from '@/components/idCard-list/idCard-list'
import idCardEnter from '@/components/idCard-enter/idCard-enter'
import Fix from '@/components/fix/start'
import TicketList from '@/components/ticket-list/ticket-list'
import TicketDetail from '@/components/ticket-detail/ticket-detail'
import  TestScroll from '@/components/test-scroll/test-scroll'
import BaseInfo from '@/components/base-info/base-info'
import ResetPassword from '@/components/reset-password/reset-password'

//以下是导游copy的数据
import  GuideLoginCopy from '@/components/guidelogin/guidelogincopy'
import  HomeCopy from '@/components/home/home-copy'
import FixCopy from '@/components/fix/fixcopy'
import OrderCopy from '@/components/order/order-copy'
import MyCopy from '@/components/my/my-copy'




//以下是旅行社的路由
import TravelLogin from '@/views/travellogin/travellogin'
import Thome from '@/views/thome/thome'
import Tobserve from '@/views/tobserve/tobserve'
import Tscore from '@/views/tscore/tscore'
import Torder from '@/views/torder/torder'
import Tmy from '@/views/tmy/tmy'
import TTicketList from '@/views/t-ticket-list/t-ticket-list'
import TTicketDetail from '@/views/t-ticket-detail/t-ticket-detail'
import TOrderDetail from '@/views/t-order-detail/t-order-detail'
import TravelInfo from '@/views/travelInfo/travelInfo'
import TravelPassword from '@/views/travel-password/travel-password'


//以下是旅行社copy的数据
import TravelLoginCopy from '@/views/travellogin/travellogincopy'
import TravelHome from '@/views/thome/travelhome'
import TravelObserve from '@/views/tobserve/travelobserve'
import TravelScore from '@/views/tscore/travelscore'
import TravelOrder from '@/views/torder/travelorder'
import TravelMy from '@/views/tmy/travelmy'






//以下是新增的页面待处理
//import  ObserveCopy from '@/components/observe-copy'
import ObserveCopyMint from '@/components/observe-copy-mint'















Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    //测试路由
    // { path: '/login', name: 'login',component: Login },
    //{ path: '/test', name: 'test',  component: Test },

    //首页
    { path: '/', name: 'lead',component: Lead },
    { path: '/upload/:orderNo', name: 'upload',component: Upload },

    //导游路由
    { path: '/guide/login', name: 'guidelogin',component: GuideLogin },
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
    {  path: '/idCard-list/:id', name: 'idCard-list', component: idCardList},
    {  path: '/idCard-enter/:id', name: 'idCard-enter', component: idCardEnter},
    {  path: '/reset-password', name: 'reset-password', component: ResetPassword},


    //导游copy的旅游
    // { path: '/home',  name: 'home', component: Home },
    { path: '/guide/logincopy', name: 'guidelogincopy',component: GuideLoginCopy },
    { path: '/home/copy', name: 'home-copy',component: HomeCopy },
    { path: '/fix/copy', name: 'fixcopy',component: FixCopy },
    { path: '/order/copy', name: 'order-copy',component: OrderCopy },
    { path: '/my/copy', name: 'my-copy',component: MyCopy },


  //  以下是旅行社的路由
    { path: '/travel/login', name: 'travellogin',component: TravelLogin },
    { path: '/travel-home',  name: 'thome', component: Thome },
    { path: '/travel-observe',  name: 'tobserve', component: Tobserve },
    { path: '/travel-score',  name: 'tscore', component: Tscore },
    { path: '/travel-order',  name: 'torder', component: Torder },
    { path: '/travel-my',  name: 'tmy', component: Tmy },
    { path: '/travel-ticket-list',  name: 't-ticket-list',component: TTicketList},
    { path: '/travel-ticket-detail',  name: 't-ticket-detail',component: TTicketDetail},
    { path: '/travel-order-detail/:id',  name: 't-order-detail',component: TOrderDetail},
    { path: '/travelInfo',  name: 'travelInfo',component: TravelInfo},
    { path: '/travel-password',  name: 'travel-password',component: TravelPassword},

    //旅行社copy
    { path: '/travel/logincopy', name: 'travellogincopy',component: TravelLoginCopy },
    { path: '/travel/home', name: 'travelhome',component: TravelHome },
    { path: '/travel/observe', name: 'travelobserve',component: TravelObserve },
    { path: '/travel/score', name: 'travelscore',component: TravelScore },
    { path: '/travel/order', name: 'travelorder',component: TravelOrder },
    { path: '/travel/my', name: 'travelmy',component: TravelMy },


    //以下是待处理的路由
    // { path: '/observe/copy', name: 'observe-copy',component: ObserveCopy },
    // { path: '/observe/copy', name: 'observe-copy',component: ObserveCopy },
    // { path: '/observe/copy/mint', name: 'observe-copy-mint',component: ObserveCopyMint },




  ]
})
