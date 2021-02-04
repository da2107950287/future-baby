import Vue from 'vue'
import VueRouter from 'vue-router'
import { getStore, setStore } from '../assets/js/utils.js'
Vue.use(VueRouter);
// 解决vue-router重复点击菜单报错的问题
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const Auth = () => import(/* webpackChunkName: "home" */ '../views/Auth.vue');
const ReceiveVouchers = () => import(/* webpackChunkName: "home" */ '../views/ReceiveVouchers.vue');


const Home = () => import(/* webpackChunkName: "home" */ '../views/home/Home.vue');
const Details = () => import(/* webpackChunkName: "home" */ '../views/home/Details.vue');

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
const CVouchers = () => import(/* webpackChunkName: "cprofile" */ '../views/cprofile/CVouchers.vue');
const CAccountInfo = () => import(/* webpackChunkName: "cprofile" */ '../views/cprofile/CAccountInfo.vue');
const AccountDetails = () => import(/* webpackChunkName: "cprofile" */ '../views/cprofile/AccountDetails.vue');
const Withdrawal = () => import(/* webpackChunkName: "cprofile" */ '../views/cprofile/Withdrawal.vue');
const OnlineConsulting = () => import(/* webpackChunkName: "cprofile" */ '../views/cprofile/OnlineConsulting.vue');
const PointsOfConcern = () => import(/* webpackChunkName: "cprofile" */ '../views/cprofile/PointsOfConcern.vue');
const MyCollection = () => import(/* webpackChunkName: "cprofile" */ '../views/cprofile/MyCollection.vue');
const AboutUs = () => import(/* webpackChunkName: "cprofile" */ '../views/cprofile/AboutUs.vue');
const Setting = () => import(/* webpackChunkName: "cprofile" */ '../views/cprofile/Setting.vue');
const ApplyNetwork = () => import(/* webpackChunkName: "cprofile" */ '../views/cprofile/ApplyNetwork.vue');

const Search = () => import(/* webpackChunkName: "cprofile" */ '../views/cprofile/Search.vue');
const NetworkVouchers = () => import(/* webpackChunkName: "cprofile" */ '../views/cprofile/NetworkVouchers.vue');





const BProfile = () => import(/* webpackChunkName: "bprofile" */ '../views/bprofile/Profile.vue');
const BOrder = () => import(/* webpackChunkName: "bprofile" */ '../views/bprofile/Order.vue');
const BOrderDetail = () => import(/* webpackChunkName: "bprofile" */ '../views/bprofile/OrderDetail.vue');
const voucher = () => import(/* webpackChunkName: "bprofile" */ '../views/bprofile/Voucher.vue');
const voucher_list = () => import(/* webpackChunkName: "bprofile" */ '../views/bprofile/VoucherList.vue');


const account_info = () => import(/* webpackChunkName: "bprofile" */ '../views/bprofile/AccountInfo.vue');
const withdraw = () => import(/* webpackChunkName: "bprofile" */ '../views/bprofile/Withdraw.vue');
const staff = () => import(/* webpackChunkName: "bprofile" */ '../views/bprofile/Staff.vue');
const teach_plan = () => import(/* webpackChunkName: "bprofile" */ '../views/bprofile/TeachPlan.vue');
const teach_plan_detail = () => import(/* webpackChunkName: "bprofile" */ '../views/bprofile/TeachPlanDetail.vue');
const member = () => import(/* webpackChunkName: "bprofile" */ '../views/bprofile/Member.vue');
const member_detail = () => import(/* webpackChunkName: "bprofile" */ '../views/bprofile/MemberDetail.vue');
const network = () => import(/* webpackChunkName: "bprofile" */ '../views/bprofile/Network.vue');
const bussiness = () => import(/* webpackChunkName: "bprofile" */ '../views/bprofile/Bussiness.vue');
const invite = () => import(/* webpackChunkName: "bprofile" */ '../views/bprofile/Invite.vue');
const invite_info = () => import(/* webpackChunkName: "bprofile" */ '../views/bprofile/InviteInfo.vue');
const transfer_manager = () => import(/* webpackChunkName: "bprofile" */ '../views/bprofile/TransferManager.vue');
const transfer_manager_info = () => import(/* webpackChunkName: "bprofile" */ '../views/bprofile/TransferManagerInfo.vue');




const routes = [
  { path: '', redirect: '/home' },
  { path: '/auth', name: '微信授权', component: Auth },
  { path: '/receiveVouchers', name: '抵用券领取', component: ReceiveVouchers },


  // 首页
  { path: '/home', name: '首页', component: Home },
  { path: '/details', name: '详情', component: Details },
  // 宝贝之家
  { path: '/babyHouse', name: '宝贝之家', component: BabyHouse },
  { path: '/networkDetail', name: '网点详情', component: NetworkDetail },
  { path: '/audition', name: '预约试听', component: Audition },
  { path: '/orderPayment', name: '订单支付', component: OrderPayment },
  //网点
  { path: '/outlets', name: '网点', component: Outlets },
  //创业社区

  { path: '/community', name: '创业社区', component: Community },
  { path: '/activity', name: '网点活动', component: Activity },
  { path: '/guide', name: '加盟指南', component: Guide },
  { path: '/newest', name: '最新', component: Newest },
  { path: '/notice', name: '公告', component: Notice },
  // c端我的
  { path: '/cprofile', name: '我的', component: CProfile },
  { path: '/personalInfo', name: '个人相信', component: PersonalInfo },
  { path: '/corder', name: '我的订单', component: COrder },
  { path: '/corderDetail', name: '订单详情', component: COrderDetail },
  { path: '/cVouchers', name: '我的抵用券', component: CVouchers },
  { path: '/cAccountInfo', name: '账户信息', component: CAccountInfo },
  { path: '/accountDetails', name: '账户明细', component: AccountDetails },
  { path: '/onlineConsulting', name: '在线咨询', component: OnlineConsulting },
  { path: '/pointsOfConcern', name: '关注网点', component: PointsOfConcern },
  { path: '/MyCollection', name: '我的收藏', component: MyCollection },
  { path: '/aboutUs', name: '关于我们', component: AboutUs },
  { path: '/setting', name: '设置', component: Setting },
  { path: '/applyNetwork', name: '网点申请', component: ApplyNetwork },
  { path: '/search', name: '搜索', component: Search },
  { path: '/networkVouchers', name: '网点抵用券', component: NetworkVouchers },





  // b端我的
  { path: '/bprofile', name: '我的', component: BProfile },
  { path: '/border', name: '我的订单', component: BOrder },
  { path: '/borderDetail', name: '订单详情', component: BOrderDetail },
  { path: '/voucher', name: '抵用券', component: voucher },
  { path: '/voucher_list', name: '抵用券列表', component: voucher_list },

  { path: '/account_info', name: '账户信息', component: account_info },
  { path: '/withdraw', name: '提现', component: withdraw },
  { path: '/staff', name: '员工管理', component: staff },
  { path: '/teach_plan', name: '教案中心', component: teach_plan },
  { path: '/teach_plan_detail', name: '教案中心详情', component: teach_plan_detail },
  { path: '/member', name: '会员管理', component: member },
  { path: '/member_detail', name: '会员管理', component: member_detail },
  { path: '/bussiness', name: '商户信息', component: bussiness },
  { path: '/network', name: '网点资料', component: network },

  { path: '/invite', name: '邀请员工', component: invite },
  { path: '/invite_info', name: '邀请详情', component: invite_info },
  { path: '/transfer_manager', name: '转移管理员', component: transfer_manager },
  { path: '/transfer_manager_info', name: '转移管理员详情', component: transfer_manager_info },




]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path != "/auth") {
    setStore('beforeUrl', to.fullPath);

    let _token = getStore('token');
    if (!_token) {
      // let url = encodeURIComponent('http://dragonworld.top/futureBaby/index.html#/auth');
      // let url = encodeURIComponent(`${window.location.href.split('#')[0]}#/auth`);
      // window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxd77b65042c011f00&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`;

    } else {
      next();
    }
  } else {
    next();
  }
})


export default router;
