import Vue from 'vue';
import Vuex from 'vuex';
import VueYupFormValidation from '@/vue-yup-form-validation';

import App from './App.vue';

Vue.use(Vuex);
Vue.use(VueYupFormValidation);

new Vue({
  el: '#app',
  store: new Vuex.Store(),
  // yupFormValidationSettings: new VueYupFormValidation(),
  render: createElement => createElement(App)
});
