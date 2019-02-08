const config = {
    aria: true,
    classNames: {},
    classes: false,
    delay: 0,
    dictionary: null,
    errorBagName: 'errors', // change if property conflicts
    events: 'input|blur',
    fieldsBagName: 'fields',
    i18n: null, // the vue-i18n plugin instance
    i18nRootKey: 'validations', // the nested key under which the validation messages will be located
    inject: true,
    locale: 'ru',
    validity: false
};

import Vue from 'vue'
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import VueResource from 'vue-resource'
import VeeValidate from 'vee-validate'
import Vuex from 'vuex'

Vue.use(VeeValidate, config);
Vue.use(Vuex);
Vue.use(Vuetify);
Vue.use(VueResource);
Vue.use(VeeValidate);
Vue.use(Vuex);
//Vue.use(VueMaterial);

    // Vue.component('BmfSelect', require('./components/BmfSelect.vue'));
    //
    // Vue.component('Cart', require('./components/Cart.vue'));
    // Vue.component('CartAddOneButton', require('./components/CartAddOneButton.vue'));
    // Vue.component('CartAddMulti', require('./components/CartAddMulti.vue'));
    // Vue.component('CartAddMultiDel', require('./components/CartAddMultiDel.vue'));
    // Vue.component('CartTotalSumm', require('./components/CartTotalSumm.vue'));

// Vue.component('UserLoginForm', require('./components/UserLoginForm.vue'));
// Vue.component('UserRegisterForm', require('./components/UserRegisterForm.vue'));
Vue.component('DemandForm', require('./components/DemandForm.vue'));
import App from './App.vue'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

