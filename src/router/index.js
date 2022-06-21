import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PhotosView from '../views/PhotosView.vue'
import VideosView from '../components/VideosView.vue'
import NoteApp from '../components/NoteApp.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/photos',
    name:'photos',
    component:PhotosView
  },
  {
    path:'/videos',
    name:'videos',
    component:VideosView
  },{
    path:'/notes',
    name:'notes',
    component:NoteApp
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
