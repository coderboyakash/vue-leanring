import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/components/Home.vue'
import Login from '../views/components/auth/Login.vue'
import Register from '../views/components/auth/Register.vue'
import store from './store'
import axios from 'axios'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {loggedIn:true}
  },
  {
    path: '/home',
    name: 'home1',
    component: Home,
    meta: {loggedIn:true}
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta.loggedIn){
    if(!store.getters.getLoggedIn){
      // if loggedIn is false
      const response = retriveUserData().then(()=>{
        // if token login success using token
        if(response){
          if(store.getters.getLoggedIn == true){
            next()
          }else{
            to.name != 'login' ? next({name: 'login'}) : to.name != 'register' ? next({name: 'register'}) : ''
          }
        }else{
          // if token login failed or token not found
          next({name: 'login'})
        }
      })
    }else{
      // if loggedIn is true
      next()
    }
  }else{
    const response = retriveUserData().then(()=>{
      if(response){
        if(store.getters.getLoggedIn == true){
          if(to.name == 'login' || to.name == 'register'){
            next({name:'home'})
          }
        }else{
          next()
        }
      }else{
        to.name != 'login' ? next({name: 'login'}) : to.name != 'register' ? next({name: 'register'}) : ''
      }
    })
  }
})

const retriveUserData = async () => {
  let token = localStorage.getItem('_token')
  if(token != null){
    let headers = {
      'Authorization' : 'Bearer ' + token
    }
    await axios.get('http://127.0.0.1:8000/api/get/user',{headers})
    .then(({data})=>{
      if(data.code == 302){
        store.commit('setLoggedData', {
          'user' : data.result,
          'token' : data.token,
          'status' : true
        })
        return true;
      }
    }).catch(()=>{
      localStorage.setItem('_token', null)
      return false;
    })
  }else{
    return false;
  }
}
export default router