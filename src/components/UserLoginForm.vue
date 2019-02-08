<template>
    <form method="post" v-bind:action="form_action" class="v-form">
        <input type="hidden" v-bind:value="csrf" name="_token">

        <v-container>
            <h1>Вход в личный кабинет</h1>
        </v-container>

        <user-login-data ref="userlogindata"></user-login-data>

        <v-container>
            <v-layout align-center justify-center row>
                <v-btn color="primary" :disabled="formIsInvalid" type="submit">Войти</v-btn>
            </v-layout>
        </v-container>

        <slot></slot>
        <!-- UserLoginForm:formIsInvalid={{ formIsInvalid }}<br> -->
    </form>
</template>

<div class="generic-form">
</div>

<script>
    import UserLoginData from './UserLoginData.vue';
    export default {
        data: function () {
            return {
                csrf: window.__CSRF__,
                form_action: window.__LOGIN__url,
            }
        },
        methods: {
        },
        computed:{
            formIsInvalid:function(){
                return ! this.$store.state.userlogin_valid;
            },
        },
        components: {
            ///VContent,  import VContent from "vuetify/src/components/VGrid/VContent";
            UserLoginData,
        },
    };
</script>


<style>
    .v-form>.container {
        padding:5px;
    }
</style>