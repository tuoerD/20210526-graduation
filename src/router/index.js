import Vue from 'vue'
import Router from 'vue-router'
import Index from '../views/Index'
import ManagerIndex from '../views/ManagerIndex'
import Register from '../views/Register'
import Login from '../views/Login'
import ManagerLogin from '../views/ManagerLogin'
import Person from '../views/Person'
import UserInfo from '../components/UserInfo'
import IdSetting from '../components/IdSetting'
import Orders from '../views/Orders'
import OrderInfo from '../components/OrderInfo'
import WaitPay from '../components/WaitPay'
import WaitSend from '../components/WaitSend'
import WaitReceive from '../components/WaitReceive'
import WaitComment from '../components/WaitComment'
import Detail from '../views/Detail'
import Consumer from '../components/pages/Consumer'
import InfoPage from '../components/pages/InfoPage'
import Producer from '../components/pages/Producer'
import OrderPage from '../components/pages/OrderPage'
import StorePage from '../components/pages/StorePage'
import ClassList from '../views/ClassList'
import ShopIndex from '../views/ShopIndex'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path:'/managerIndex',
      name:'ManagerIndex',
      component:ManagerIndex,
      children:[
        {
          path:'/infoPage',
          name:'InfoPage',
          component:InfoPage
        },
        {
          path:'/consumer',
          name:'Consumer',
          component:Consumer
        },
        {
          path:'/producer',
          name:'Produer',
          component:Producer
        },
        {
          path:'/orderPage',
          name:'OrderPage',
          component:OrderPage
        },
        {
          path:'/storePage',
          name:'StorePage',
          component:StorePage
        }
      ]
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/managerLogin',
      name: 'ManagerLogin',
      component: ManagerLogin
    },
    {
      path: '/person',
      name: 'Person',
      component: Person,
      children:[
        {
          path: '/userInfo',
          name: 'UserInfo',
          component: UserInfo,
        },
        {
          path: '/idSetting',
          name: 'IdSetting',
          component: IdSetting,
        }
      ]
    },
    {
      path: '/orders',
      name: 'Orders',
      component: Orders,
      children:[
        {
          path: '/orderInfo',
          name: 'OrderInfo',
          component: OrderInfo,
        },
        {
          path: '/waitPay',
          name: 'WaitPay',
          component: WaitPay,
        },
        {
          path: '/waitSend',
          name: 'WaitSend',
          component: WaitSend,
        },
        {
          path: '/waitReceive',
          name: 'WaitReceive',
          component: WaitReceive,
        },
        {
          path: '/waitComment',
          name: 'WaitComment',
          component: WaitComment,
        },
      ]
    },
    {
        path: '/detail',
        name: 'Detail',
        component: Detail
    },
    {
      path:'/classList',
      name:"ClassList",
      component:ClassList
    },
    {
      path:'/shopIndex',
      name:'ShopIndex',
      component:ShopIndex
    }
  ]
})
