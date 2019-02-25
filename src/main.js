/* eslint-disable */

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

Vue.component('BmfSelect', require('./components/BmfSelect.vue'));

Vue.component('Cart', require('./components/Cart.vue'));
Vue.component('CartAddOneButton', require('./components/CartAddOneButton.vue'));
Vue.component('CartAddMulti', require('./components/CartAddMulti.vue'));
Vue.component('CartAddMultiDel', require('./components/CartAddMultiDel.vue'));
Vue.component('CartTotalSumm', require('./components/CartTotalSumm.vue'));

Vue.component('UserLoginForm', require('./components/UserLoginForm.vue'));
Vue.component('UserRegisterForm', require('./components/UserRegisterForm.vue'));
Vue.component('DemandForm', require('./components/DemandForm.vue'));

Vue.config.productionTip = false;

const store = new Vuex.Store({
    state: {
        demanddata_status: false,
        userreg_valid: false,
        userlogin_valid: false,
        demandauto_valid: false,
        incart_summ:'000.00₽',
        incart_num:0,
        incart_items:[]
    },
    actions: {
    },
    mutations: {
        M_DEMANDAUTO_VALID: function(state, new_status) {
            state.demandauto_valid = new_status;
        },
        M_DEMANDDATA_STATUS: function(state, new_status) {
            state.demanddata_status = new_status;
        },
        M_USERREG_VALID: function(state, new_status) {
            state.userreg_valid = new_status;
        },
        M_USERLOGIN_VALID: function(state, new_status) {
            console.log('M_USERLOGIN_VALID='+new_status);
            state.userlogin_valid = new_status;
        },
        M_CARTTOTAL_VALUE: function(state, values) {
            state.incart_num = values.incart_num;
            state.incart_summ = values.incart_summ;
            state.incart_items = values.incart_items;
        },
    },
    getters: {
    },
    modules: {}
});

Vue.prototype.$eventHub = new Vue(); // Global event bus

const app = new Vue({
    store:store,
}).mount('#app');