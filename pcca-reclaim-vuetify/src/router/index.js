import Vue from 'vue'
import VueRouter from 'vue-router'
import MasterDataView from '../views/MasterDataView.vue'
import ScanView from '../views/ScanView.vue'
import SearchView from '../views/SearchView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/master', // เมื่อเข้าเว็บครั้งแรก ให้ไปที่หน้า master
  },
  {
    path: '/master',
    name: 'MasterData',
    component: MasterDataView,
  },
  {
    path: '/scan',
    name: 'Scan',
    component: ScanView,
  },
  {
    path: '/search',
    name: 'Search',
    component: SearchView,
  },
]

const router = new VueRouter({
  routes,
});

export default router