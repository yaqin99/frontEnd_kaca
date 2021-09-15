import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import stok from '../views/stok.vue'
import transaksi from '../views/transaksi.vue'
import transaksii from '../views/transaksii.vue'


const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home }, 
  { path: '/stok', name: 'stok', component: stok }, 
  { path: '/transaksi', name: 'transaksi', component: transaksi }, 
  { path: '/transaksii', name: 'transaksii', component: transaksii }, 

]

const router = createRouter({
  history: createWebHistory(''),
  routes
})

export default router