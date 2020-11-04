import Vue from 'vue'
import VueRouter from 'vue-router'

// 采用懒加载的方式引入组件
const Trip = r => require.ensure([], () => r(require('@/components/Trip')), 'Trip')
const Home = r => require.ensure([], () => r(require('@/components/Home')), 'Home')
const CopyTrip = r => require.ensure([], () => r(require('@/components/CopyTrip')), 'CopyTrip')
const NewTrip = r => require.ensure([], () => r(require('@/components/NewTrip')), 'NewTrip')

//1.安装插件
Vue.use(VueRouter)

//2.创建路由对象并导出VueRouter
export default new VueRouter({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '',
      name: 'Home',
      title: '首页',
      component: Home
    },
    {
      path: '/trip/:id/:playName',
      name: 'Trip',
      title: '开启旅程',
      component: Trip
    },
    {
      path: '/copyTrip',
      name: 'CopyTrip',
      title: '复制旅程',
      component: CopyTrip
    },
    {
      path: '/newTrip',
      name: 'NewTrip',
      title: '新增旅程',
      component: NewTrip
    }
  ]
})








