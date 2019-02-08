<template>
    <div class="generic-form">
        <form method="post" v-bind:action="form_action">
            <input type="hidden" v-bind:value="csrf" name="_token">
            <input type="hidden" name="pass_mode" v-bind:value="pass_mode">

            <div id="page1" v-show="page === 1">
                <h1>Регистрация нового пользователя</h1>
                Если вы уже зарегистрированы, пожалуйста <a href="#" v-on:click="gotoPage2">авторизуйтесь</a>
                <user-register-data ref="userregdata"></user-register-data>
            </div>

            <div id="page2" v-show="page === 2">
                <h1>Укажите логин и пароль</h1>
                Если вы еще не зарегистрированы, пожалуйста <a href="#" v-on:click="gotoPage1">заполните регистрационные данные</a>
                <user-login-data ref="userlogindata"></user-login-data>
            </div>

            <div>
                <select name="u_delivery" v-model="u_delivery" v-validate.immediate="'required|min_value:1'"
                        @input="fieldInput('u_delivery')"  @change="fieldChange('u_delivery')" >
                    <option value="0" disabled="disabled" hidden>Способ получения заказа</option>
                    <option v-for="(val, key) in preloadDL" v-bind:value="key">{{ val }}</option>
                </select>
                <span><i class="fa fa-question" v-if="showPristine('u_delivery')"></i></span>
                <span><i class="fa fa-check" v-if="showValid('u_delivery')"></i></span>
                <span><i class="fa fa-ban" v-if="showInvalid('u_delivery')" style="cursor:help" v-bind:title="errors.first('u_delivery')"></i></span>
            </div>

            <div>
                <textarea phone="text" name="s_destination_addr" placeholder="Точный адрес доставки" v-model="s_destination_addr"
                          v-validate.immediate="'required'"    @input="fieldInput('s_destination_addr')"  @change="fieldChange('s_destination_addr')" ></textarea>
                <span><i class="fa fa-question" v-if="showPristine('s_destination_addr')"></i></span>
                <span><i class="fa fa-check" v-if="showValid('s_destination_addr')"></i></span>
                <span><i class="fa fa-ban" v-if="showInvalid('s_destination_addr')" style="cursor:help" v-bind:title="errors.first('s_destination_addr')"></i></span>

            </div>

            <div>
                <textarea phone="text" name="s_destination_person" placeholder="Получатель заказа" v-model="s_destination_person"
                    v-validate.immediate="'required'"    @input="fieldInput('s_destination_person')"  @change="fieldChange('s_destination_person')" ></textarea>
                <span><i class="fa fa-question" v-if="showPristine('s_destination_person')"></i></span>
                <span><i class="fa fa-check" v-if="showValid('s_destination_person')"></i></span>
                <span><i class="fa fa-ban" v-if="showInvalid('s_destination_person')" style="cursor:help" v-bind:title="errors.first('s_destination_addr')"></i></span>
            </div>

            <div style="margin-top:20px">
                <button v-bind:disabled="!formIsValid()" class="generic-button">Оформить заказ {{ formIsValid() }}</button>
            </div>

            UserCheckoutForm:page1IsValid={{ page1IsValid() }}<br>
            UserCheckoutForm:page2IsValid={{ page2IsValid() }}<br>
            UserCheckoutForm:formIsValid={{ formIsValid() }}<br>

            <slot></slot>

        </form>
    </div>
</template>

<script>
    import UserRegisterData from './UserRegisterData.vue';
    import UserLoginData from './UserLoginData.vue';

    export default {
        components: {
            UserRegisterData,
            UserLoginData,
        },
        data: function () {
            return {
                csrf: window.__CSRF__,
                mode_retry: window.__RETRY__,
                pass_mode: window.__PASSMODE__,
                preloadDL: window.__CARTCO__preloadDL,
                form_action: window.__CARTCO__url,
                passed: window.__CARTCO__passed,
                page: window.__CARTCO__page,
                u_delivery:  window.__CARTCO__u_delivery,
                s_destination_addr: window.__CARTCO__s_destination_addr,
                s_destination_person: window.__CARTCO__s_destination_person,
            }
        },
        computed: {
            mainFieldsAreValid:function () {
                return  this.fieldIsValid('u_delivery') &&
                        this.fieldIsValid('s_destination_addr') &&
                        this.fieldIsValid('s_destination_person');
            }
        },
        methods: {
            fieldInput :function (name) {
                this.$validator.validate(name).then(result => {
                    this.UpdateStatus();
                });
            },
            fieldChange :function (name) {
                this.$validator.validate(name).then(result => {
                    this.UpdateStatus();
                });
            },
            UpdateStatus:function (_status) {

            },
            gotoPage1: function (e) {
                this.page = 1;
            },
            gotoPage2: function (e) {
                this.page = 2;
            },
            fieldIsPristine: function (name) {
                if (!this.fields[name])
                    return false;
                return this.fields[name].pristine;
            },
            fieldIsValid: function (name) {
                return !this.errors.has(name);
            },
            showPristine: function (name) {
                return this.fieldIsPristine(name);
            },
            showValid: function (name) {
                return !this.fieldIsPristine(name) && this.fieldIsValid(name);
            },
            showInvalid: function (name) {
                return !this.fieldIsPristine(name) && !this.fieldIsValid(name);
            },

            page2IsValid:function(){
                if (this.$refs.userlogindata)
                    return this.$refs.userlogindata.formIsValid;
                return false;
            },

            page1IsValid:function(){
                if (this.$refs.userregdata)
                    return this.$refs.userregdata.formIsValid;
                return false;
            },

            formIsValid: function () {
                if (this.page === 1)
                    return this.page1IsValid() && this.mainFieldsAreValid;
                if (this.page === 2)
                    return this.page2IsValid() && this.mainFieldsAreValid;
                return true;
            },

            setAllDirty: function ()
            {
                if(this.u_delivery) this.$validator.flag('u_delivery', { dirty: true });
                if(this.s_destination_addr) this.$validator.flag('s_destination_addr', { dirty: true });
                if(this.s_destination_person) this.$validator.flag('s_destination_person', { dirty: true });
            }
        },
        mounted: function () {
            if (this.mode_retry)
                this.setAllDirty();
        }
    }

</script>