<template>
    <v-form method="post"  v-bind:action="form_action" >

        <input type="hidden" v-bind:value="csrf" name="_token">

        <v-container>
            <h1>Регистрация нового пользователя</h1>
        </v-container>

            <user-register-data></user-register-data>

        <v-container>
            <v-layout align-center justify-center row>
                <v-flex>
                    <v-btn color="primary" :disabled="formIsInvalid" type="submit">Зарегистрироваться</v-btn>
                </v-flex>
            </v-layout>
        </v-container>

        UserRegisterForm:formIsInvalid={{ formIsInvalid }}<br>
        <slot></slot>

    </v-form>
</template>

<script>
    import UserRegisterData from './UserRegisterData.vue';

    export default {
        data: function () {
            return {
                csrf: window.__CSRF__,
                form_action: window.__REGISTER__url,
            }
        },
        methods: {
        },
        computed: {
            formIsInvalid: function () {
                return !this.$store.state.userreg_valid;
            }
        },
        components: {
            UserRegisterData,
        },
    }

</script>


<style>
    .v-form>.container {
        padding:5px;
    }
</style>