<template>

        <v-form method="post"  v-bind:action="form_action" >
            <input type="hidden" v-bind:value="csrf" name="_token">

            <v-stepper v-model="step">
                <v-stepper-header>
                    <v-stepper-step :complete="step > 1" step="1">Автомобиль</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step :complete="step > 2" step="2">Запчасти</v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step step="3">Заявка</v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <demand-auto ref="demand-auto"></demand-auto>
                        <v-container>
                            <v-layout align-center justify-center row>
                                <v-btn color="primary" @click="step=2" :disabled="!page1IsValid">Далее</v-btn>
                            </v-layout>
                        </v-container>
                    </v-stepper-content>
                    <v-stepper-content step="2">
                        <demand-data ref="demand-data"></demand-data>
                        <v-container>
                            <v-layout align-center justify-center row>
                                <v-btn color="primary" @click="step=1">Назад</v-btn>
                                <v-btn color="primary" @click="step=3">Далее</v-btn>
                            </v-layout>
                        </v-container>
                    </v-stepper-content>
                    <v-stepper-content step="3">


                        <div v-if="regMode">

                            <h1>Регистрация нового пользователя</h1>
                            Если вы уже зарегистрированы, пожалуйста <a href="#" v-on:click="showAuth">авторизуйтесь</a>

                            <user-register-data ref="userregdata"></user-register-data>

                        </div>
                        <div v-if="authMode">

                            <h1>Укажите логин и пароль</h1>
                            Если вы еще не зарегистрированы, пожалуйста <a href="#" v-on:click="showReg">заполните регистрационные данные</a>
                            <user-login-data ref="userlogindata"></user-login-data>

                        </div>
                        <div v-if="userMode">

                            <h1>Вы уже залогинены</h1>
                            Просто жмахайте на батон!

                        </div>


                        <v-container>
                            <v-layout align-center justify-center row>
                                <v-btn color="primary" @click="step=2">Назад</v-btn>
                                <v-btn color="primary" @click="step=1">Отправить заявку</v-btn>
                            </v-layout>
                        </v-container>

                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
            <slot></slot>
            DemandAuto:page1IsValid={{ page1IsValid }}<br>
        </v-form>
</template>


<script>

    import UserRegisterData from './UserRegisterData.vue';
    import UserLoginData from './UserLoginData.vue';
    import DemandData from './DemandData.vue';
    import DemandAuto from './DemandAuto.vue';

    export default {
        components: {
            UserRegisterData,
            UserLoginData,
            DemandAuto,
            DemandData
        },
        data: function () {
            return {
                step: 1,


                secondStepError: null,
                wasMounted: false,
                pass_mode: 1,

                csrf: window.__CSRF__,
                mode_retry: window.__RETRY__,
                mode_auth: window.__AUTH__,

                base_url: '/api/rest/',
                inProcess: 0, /* загрузка данных */
                xmail:'qqq',
                form_action: window.__DFS__form_action,
            }
        },
        methods: {
            showAuth : function(){ this.pass_mode = 1; },
            showReg : function(){  this.pass_mode = 2; },
            sendData: function () {
                alert(this.data);
            },
            setAllDirty: function () {

            },
        },
        computed:{
            regMode: function () {
                return (! this.mode_auth)  && (this.pass_mode==1);
            },
            authMode: function () {
                return (! this.mode_auth)  && (this.pass_mode==2);
            },
            userMode: function () {
                return this.mode_auth;
            },
            page1IsValid:function(){
                if (!this.$store) return true;
                return this.$store.state.demandauto_valid;
            },
            page2IsValid:function(){
                if (!this.$store) return false;
                return this.$store.state.demanddata_status;
            },
            page3IsValid:function(){
                return false;
                //return this.$refs.userregdata.formIsValid;
                //return this.$refs.userlogindata.formIsValid;
            },
        },
        created:function(){
            //this.getBrands();
            //this.getModels();
            //this.getModifs();
        },
        mounted: function () {
            this.wasMounted = true;
            if (this.mode_retry)
                this.setAllDirty();
        },
    };
</script>

<style>
    .demand-form {
        background-color: #eeeeee;
        margin-left: auto;
        margin-right: auto;
        width:600px;
        display: flex;
        justify-content: center;
        align-content: space-between;
        align-items: center;
        flex-direction: column;
    }
    .demand-form__page{
        text-align:left;
        width:100%;
    }
    .container {
        padding-top:0;
        padding-bottom:15px;
    }
    .container .layout .flex {
        padding:8px;
    }
</style>