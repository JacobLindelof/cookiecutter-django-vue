import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';

import axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$http = axios;

axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const token = localStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = "Bearer " + token
}

axios.interceptors.response.use((response) => {
  return response
},
  function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry && originalRequest.url != "/api/token/refresh/") {

      originalRequest._retry = true;
      return axios.post('/api/token/refresh/',
        {
          "refresh": localStorage.getItem('refresh'),
        })
        .then(res => {
          if (res.status === 200) {
            // 1) put token to LocalStorage
            const token = res.data.access
            localStorage.setItem('token', token)

            // 2) Change Authorization header
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token

            // 3) return new request with updated headers with Axios.
            const newRequest = originalRequest
            newRequest.headers.Authorization = "Bearer " + token
            return axios(newRequest);
          }
        })
    }
    store.dispatch('auth/logout')
    router.push('/login')

    // return Error object with Promise
    return Promise.reject(error);
  });


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
