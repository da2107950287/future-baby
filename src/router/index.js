import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Home = () => import(/* webpackChunkName: "home" */ '../views/home/Home.vue');
const BrandIntro = () => import(/* webpackChunkName: "home" */ '../views/home/BrandIntro.vue');
const DailyCourse = () => import(/* webpackChunkName: "home" */ '../views/home/DailyCourse.vue');
const RecDetail = () => import(/* webpackChunkName: "home" */ '../views/home/RecDetail.vue');
const Parenting = () => import(/* webpackChunkName: "home" */ '../views/home/Parenting.vue');

const BabyHouse = () => import(/* webpackChunkName: "babyhouse" */ '../views/babyhouse/BabyHouse.vue');
const NetworkDetail = () => import(/* webpackChunkName: "babyhouse" */ '../views/babyhouse/NetworkDetail.vue');


const routes = [
  {path:'',redirect:'/home'},
  // 首页
  { path: '/home', name: '首页', component: Home },
  { path: '/brandIntro', name: '品牌介绍', component: BrandIntro },
  { path: '/dailyCourse', name: '每日课程', component: DailyCourse },
  { path: '/recDetail', name: '推荐详情', component: RecDetail },
  { path: '/parenting', name: '育儿知识', component: Parenting },
// 宝贝之家

{ path: '/babyHouse', name: '育儿知识', component: BabyHouse },
{ path: '/networkDetail', name: '育儿知识', component: NetworkDetail },
  
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
