import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Swal from 'sweetalert2' // นำเข้า SweetAlert2

// ทำให้ Swal สามารถเรียกใช้จากที่ไหนก็ได้ในแอป
window.Swal = Swal;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')