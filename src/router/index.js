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
const Audition = () => import(/* webpackChunkName: "babyhouse" */ '../views/babyhouse/Audition.vue');
const OrderPayment = () => import(/* webpackChunkName: "babyhouse" */ '../views/babyhouse/OrderPayment.vue');

const Outlets = () => import(/* webpackChunkName: "outlets" */ '../views/outlets/Outlets.vue');

const Community = () => import(/* webpackChunkName: "community" */ '../views/community/Community.vue');
const Activity = () => import(/* webpackChunkName: "community" */ '../views/community/Activity.vue');
const Guide = () => import(/* webpackChunkName: "community" */ '../views/community/Guide.vue');
const Newest = () => import(/* webpackChunkName: "community" */ '../views/community/Newest.vue');
const Notice = () => import(/* webpackChunkName: "community" */ '../views/community/Notice.vue');

const CProfile = () => import(/* webpackChunkName: "cprofile" */ '../views/cprofile/CProfile.vue');
const PersonalInfo = () => import(/* webpackChunkName: "cprofile" */ '../views/cprofile/PersonalInfo.vue');
const COrder = () => import(/* webpackChunkName: "cprofile" */ '../views/cprofile/COrder.vue');

const COrderDetail = () => import(/* webpackChunkName: "cprofile" */ '../views/cprofile/COrderDetail.vue');


const routes = [
  { path: '', redirect: '/home' },
  // 首页
  { path: '/home', name: '首页', component: Home },
  { path: '/brandIntro', name: '品牌介绍', component: BrandIntro },
  { path: '/dailyCourse', name: '每日课程', component: DailyCourse },
  { path: '/recDetail', name: '推荐详情', component: RecDetail },
  { path: '/parenting', name: '育儿知识', component: Parenting },
  // 宝贝之家
  { path: '/babyHouse', name: '育儿知识', component: BabyHouse },
  { path: '/networkDetail', name: '育儿知识', component: NetworkDetail },
  { path: '/audition', name: '预约试听', component: Audition },
  { path: '/orderPayment', name: '订单支付', component: OrderPayment },
  //网点
  { path: '/outlets', name: '网点', component: Outlets },
  //创业社区

  { path: '/community', name: '创业社区', component: Community },
  { path: '/activity', name: '网点活动', component: Activity },
  { path: '/guide', name: '网点活动', component: Guide },
  { path: '/newest', name: '最新', component: Newest },

  { path: '/notice', name: '网点活动', component: Notice },
  // c端我的
  { path: '/cprofile', name: '我的', component: CProfile },
  { path: '/personalInfo', name: '个人相信', component: PersonalInfo },
  { path: '/corder', name: '我的订单', component: COrder },
  { path: '/corderDetail', name: '订单详情', component: COrderDetail },

  







]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
