<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12>
                <v-text-field
                        :messages="['Введите вашу электронную почту']"
                        prepend-icon="mail"
                        v-model="email"
                        label="E-mail"
                        @input="fieldInput('email')"  @change="fieldChange('email')"
                        v-validate="'required|email'"
                        name="email"
                        data-vv-name="email"
                        ref="email"
                        :error-messages="errors.collect('email')"
                >
                </v-text-field>
            </v-flex>

            <v-flex xs12>
                <v-text-field
                        :messages="['Введите ваш пароль']"
                        v-model="password"
                        prepend-icon="lock"
                        label="Пароль"
                        hint="At least 6 characters"
                        counter
                        v-validate="'required|min:6'"
                        :append-icon="!showPassword ? 'visibility_off' : 'visibility'"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
                        @input="fieldInput('password')"  @change="fieldChange('password')"
                        name="password"
                        ref="password"
                        data-vv-name="password"
                        :error-messages="errors.collect('password')"
                >
                    Пароль
                </v-text-field>
            </v-flex>
        </v-layout>
        <!-- UserLoginData:formIsValid={{ formIsValid }}<br> -->
    </v-container>
</template>

<script>
    import 'vuetify/dist/vuetify.min.css';

    export default {
        $_veeValidate: {
            validator: 'new'
        },
        name: 'TextFields',
        props: {
        },
        data: function () {
            return {
                hasMessages: false,

                mode_retry: window.__RETRY__,
                email: window.__LOGIN__email,
                phone: window.__LOGIN__phone,
                password: window.__LOGIN__password,
                showPassword: false,


                dictionary: {
                    attributes: {
                        email: 'E-mail Address'
                        // custom attributes
                    },
                    custom: {
                        password: {
                            required: () => 'password can not be empty',
                            max: 'The password field may not be greater than 10 characters'
                            // custom messages
                        },
                        select: {
                            required: 'Select field is required'
                        }
                    }
                }

            }

        },
        components: {
        },
        computed: {
            formIsValid: function () {
                return  this.fieldIsValid('email') &&
                    this.fieldIsValid('password');
            }
        },
        methods: {
            fieldInput :function (name) {
                console.log(name);
                this.$validator.validate(name).then(() => {
                    this.UpdateStatus();
                });
            },
            fieldChange :function (name) {
                console.log(name);
                this.$validator.validate(name).then(() => {
                    this.UpdateStatus();
                });
            },
            UpdateStatus:function () {
                this.$store.commit('M_USERLOGIN_VALID', this.formIsValid);
            },

            fieldIsValid :function (name) {
                if (!this.fields[name])
                    return false;
                return this.fields[name].valid;
            },
            fieldIsPristine: function (name) {
                if (!this.fields[name])
                    return false;
                return this.fields[name].pristine;
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

            setAllDirty: function ()
            {
                if(this.name) this.$validator.flag('name', { dirty: true });
                if(this.password) this.$validator.flag('password', { dirty: true });
            },
        },
        mounted: function () {
            if (this.mode_retry)
                this.setAllDirty();
        }
    }
</script>
