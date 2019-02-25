<template>
    <v-container>
        <input type="hidden" name="region_id" :value="region_id">
        <v-layout row wrap>
            <v-flex  xs12 sm12 >
                <v-text-field
                        :messages="['Введите вашее имя']"
                        v-model="s_name"
                        label="Ваше имя"
                        @input="fieldInput('s_name')"  @change="fieldChange('s_name')"
                        v-validate="'required'"
                        name="s_name"
                        data-vv-name="s_name"
                        ref="s_name"
                        required
                        :error-messages="errors.collect('s_name')"
                ></v-text-field>
            </v-flex>

            <v-flex  xs12 sm6  >
                <v-text-field
                        :messages="['Введите вашу электронную почту']"
                        v-model="s_email"
                        label="E-mail"
                        @input="fieldInput('s_email')"  @change="fieldChange('s_email')"
                        v-validate="{ required:true, email:true }"
                        name="s_email"
                        data-vv-name="s_email"
                        ref="s_email"
                        required
                        :error-messages="errors.collect('s_email')"
                ></v-text-field>
            </v-flex>

            <v-flex  xs12 sm6 >
                <v-text-field
                        :messages="['Введите номер телефона']"
                        v-model="s_phone"
                        label="Телефон"
                        @input="fieldInput('s_phone')"  @change="fieldChange('s_phone')"
                        v-validate="{ required: true, regex:/^\+7(\d{10})$/ }"
                        name="s_phone"
                        data-vv-name="s_phone"
                        ref="s_phone"
                        required
                        :error-messages="errors.collect('s_phone')"
                ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6>
                <v-text-field
                        :messages="['Введите ваш пароль']"
                        v-model="s_password"
                        label="Пароль"
                        hint="At least 6 characters"
                        counter
                        v-validate="{ required: true, min:6  }"
                        :append-icon="!showPassword ? 'visibility_off' : 'visibility'"
                        :type="showPassword ? 'text' : 'password'"
                        @click:append="showPassword = !showPassword"
                        @input="fieldInput('s_password')"  @change="fieldChange('s_password')"
                        name="s_password"
                        ref="s_password"
                        data-vv-name="s_password"
                        required
                        :error-messages="errors.collect('s_password')"
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
                <v-text-field
                        :messages="['Подтвердите ввод пароля']"
                        v-model="s_password2"
                        label="Подтвердите пароль"
                        hint="At least 6 characters"
                        counter
                        v-validate="{ required: true, confirmed: s_password  }"
                        :append-icon="!showPassword2 ? 'visibility_off' : 'visibility'"
                        :type="showPassword2 ? 'text' : 'password'"
                        @click:append="showPassword2 = !showPassword2"
                        @input="fieldInput('s_password2')"  @change="fieldChange('s_password2')"
                        name="s_password2"
                        ref="s_password2"
                        data-vv-name="s_password2"
                        required
                        :error-messages="errors.collect('s_password2')"
                ></v-text-field>
            </v-flex>


            <v-flex xs12 sm6>
                <v-select
                        v-model="region_id"
                        label="Регион"
                        :items="preloadREG"
                        item-text="s_name"
                        item-value="id"
                        ref="region_id"
                        data-vv-name="region_id"
                        v-validate="{ required: true  }"
                ></v-select>
            </v-flex>

            <v-flex  xs12 sm6  >
                <v-text-field
                        :messages="['Введите ваш город']"
                        v-model="s_city"
                        label="Город"
                        @input="fieldInput('s_city')"  @change="fieldChange('s_city')"
                        v-validate="{ required:true  }"
                        name="s_city"
                        data-vv-name="s_city"
                        ref="s_city"
                        required
                        :error-messages="errors.collect('s_city')"
                ></v-text-field>
            </v-flex>

        </v-layout>

        UserRegisterData:formIsValid={{ formIsValid }}<br>
        region_id:{{ region_id }}<br>

    </v-container>

    <!--


    <div class="md-layout md-gutter">
        <div class="md-layout-item">
            <input type="hidden" name="region_id" v-bind:value="region_id">
            <md-field :class="fieldRegionClass">
                <label>Регион</label>
                <md-select v-model="region_id" name="y3"  @input="fieldInput('region_id')"
                           @change="fieldChange('region_id')" required="required" >
                    <md-option v-for="(val, key) in preloadREG" v-bind:key="key" v-bind:value="key">{{val}}</md-option>
                </md-select>
            </md-field>
        </div>

        <div class="md-layout-item">
            <md-field :class="fieldCityClass">
                <label>Город</label>
                <md-input v-validate.immediate="{ required: true }" v-model="s_city"
                          name="s_city"  @input="fieldChange('s_city')"  @change="fieldChange('s_city')" required="required"></md-input>
                <span class="md-helper-text"></span>
                <span class="md-error">{{ errors.first('s_city') }}</span>
            </md-field>
        </div>
    </div>

    <div>
        <md-switch v-model="u_org" class="md-primary">Юридическое лицо</md-switch>
    </div>

    <div v-if="u_org">

        <div class="md-layout md-gutter">
            <div class="md-layout-item">
                <md-field :class="fieldOrgnameClass">
                    <label>Наименование ЮЛ</label>
                    <md-input type="text" data-vv-name="s_org_name" v-validate.immediate="{ required:true }" v-model="s_org_name"
                              name="s_org_name"  @input="fieldChange('s_org_name')"  @change="fieldChange('s_org_name')" required="required"></md-input>
                    <span class="md-helper-text"></span>
                    <span class="md-error">{{ errors.first('s_org_name') }}</span>
                </md-field>
            </div>

            <div class="md-layout-item">
                <md-field :class="fieldOrgaddrClass">
                    <label>Юридический Адрес</label>
                    <md-input type="text" data-vv-name="s_org_addr" v-validate.immediate="{ required: true  }" v-model="s_org_addr"
                              name="s_org_addr"  @input="fieldChange('s_org_addr')"  @change="fieldChange('s_org_addr')" required="required"></md-input>
                    <span class="md-helper-text"></span>
                    <span class="md-error">{{ errors.first('s_org_addr') }}</span>
                </md-field>
            </div>
        </div>

        <div class="md-layout md-gutter">
            <div class="md-layout-item">
                <md-field :class="fieldInnClass">
                    <label>ИНН</label>
                    <md-input type="text" data-vv-name="s_org_inn" v-validate.immediate="{ required:true, regex:/^([0-9]{10}|[0-9]{12})$/ }" v-model="s_org_inn"
                              name="s_org_inn"  @input="fieldChange('s_org_inn')"  @change="fieldChange('s_org_inn')" required="required"></md-input>
                    <span class="md-helper-text">10 или 12 цифр</span>
                    <span class="md-error">{{ errors.first('s_org_inn') }}</span>
                </md-field>
            </div>
            <div class="md-layout-item">
                <md-field :class="fieldKppClass">
                    <label>КПП</label>
                    <md-input type="text" data-vv-name="s_org_kpp" v-validate.immediate="{ regex:/^([0-9]{9})$/  }" v-model="s_org_kpp"
                              name="s_org_kpp"  @input="fieldChange('s_org_kpp')"  @change="fieldChange('s_org_kpp')"></md-input>
                    <span class="md-helper-text">9 цифр</span>
                    <span class="md-error">{{ errors.first('s_org_kpp') }}</span>
                </md-field>
            </div>

            <div class="md-layout-item">
                <md-field :class="fieldBikClass">
                    <label>БИК</label>
                    <md-input type="text" data-vv-name="s_org_bik" v-validate.immediate="{ required: true, regex:/^([0-9]{9})$/  }" v-model="s_org_bik"
                              name="s_org_bik"  @input="fieldChange('s_org_bik')"  @change="fieldChange('s_org_bik')" required="required"></md-input>
                    <span class="md-helper-text">9 цифр</span>
                    <span class="md-error">{{ errors.first('s_org_bik') }}</span>
                </md-field>
            </div>
        </div>

        <div class="md-layout md-gutter">
            <div class="md-layout-item">
                <md-field :class="fieldKsClass">
                    <label>Корр счет</label>
                    <md-input type="text" data-vv-name="s_org_ks" v-validate.immediate="{ required:true, regex:/^([0-9]{10}|[0-9]{20})$/ }" v-model="s_org_ks"
                              name="s_org_ks"  @input="fieldChange('s_org_ks')"  @change="fieldChange('s_org_ks')" required="required"></md-input>
                    <span class="md-helper-text">20 цифр</span>
                    <span class="md-error">{{ errors.first('s_org_ks') }}</span>
                </md-field>
            </div>

            <div class="md-layout-item">
                <md-field :class="fieldRsClass">
                    <label>Расчетный счет</label>
                    <md-input type="text" data-vv-name="s_org_rs" v-validate.immediate="{ required:true, regex:/^([0-9]{10}|[0-9]{20})$/ }" v-model="s_org_rs"
                              name="s_org_rs"  @input="fieldChange('s_org_rs')"  @change="fieldChange('s_org_rs')" required="required"></md-input>
                    <span class="md-helper-text">20 цифр</span>
                    <span class="md-error">{{ errors.first('s_org_rs') }}</span>
                </md-field>
            </div>
        </div>

        <show-event-generator v-on:show="onShowOrgBlock"></show-event-generator>
    </div>
-->
    <!--div-->
    <!--/div-->
</template>

<script>
    //    import ShowEventGenerator from './ShowEventGenerator.vue';

    export default {
        data: function () {
            return {
                mode_retry: window.__RETRY__,

                //preloadREG: window.__UR__preloadREG,
                preloadREG: [],
                s_name: window.__UR__s_name,
                s_email: window.__UR__s_email,
                s_phone: window.__UR__s_phone,
                s_password: window.__UR__s_password,
                s_password2: window.__UR__s_password2,
                region_id: window.__UR__region_id,
                s_city: window.__UR__s_city,
                u_org: window.__UR__u_org,
                s_org_name: window.__UR__s_org_name,
                s_org_addr: window.__UR__s_org_addr,
                s_org_inn: window.__UR__s_org_inn,
                s_org_kpp: window.__UR__s_org_kpp,
                s_org_bik: window.__UR__s_org_bik,
                s_org_ks: window.__UR__s_org_ks,
                s_org_rs: window.__UR__s_org_rs,

                showPassword: false,
                showPassword2: false

            }
        },
        components: {
//            ShowEventGenerator,
        },
        computed: {
            passwordFieldType: function () {
                if (this.passwordFieldTypePw)
                    return 'password';
                else
                    return 'text';
            },
            password2FieldType: function () {
                if (this.password2FieldTypePw)
                    return 'password';
                else
                    return 'text';
            },
            formIsValid: function () {
                return this.mainIsValid && (!this.u_org || this.orgIsValid);
            },
            mainIsValid: function () {
                return  this.fieldIsValid('s_name') &&
                    this.fieldIsValid('s_email') &&
                    this.fieldIsValid('s_phone') &&
                    this.fieldIsValid('s_password') &&
                    this.fieldIsValid('s_password2') &&
                    this.fieldIsValid('region_id') &&
                    this.fieldIsValid('s_city') ;
            },
            orgIsValid: function () {
                return  this.fieldIsValid('s_org_name') &&
                    this.fieldIsValid('s_org_addr') &&
                    this.fieldIsValid('s_org_inn') &&
                    this.fieldIsValid('s_org_kpp') &&
                    this.fieldIsValid('s_org_bik') &&
                    this.fieldIsValid('s_org_ks') &&
                    this.fieldIsValid('s_org_rs') ;
            },
        },
        methods: {
            fieldInput :function (name) {
                this.$validator.validate(name).then(() => {
                    this.UpdateStatus();
                });
            },
            fieldChange :function (name) {
                this.$validator.validate(name).then(() => {
                    this.UpdateStatus();
                });
            },
            UpdateStatus:function () {
                this.$store.commit('M_USERREG_VALID', this.formIsValid);
            },
            orgChanged:function () {
                this.$store.commit('M_USERREG_VALID', this.formIsValid);
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
            onShowOrgBlock : function () {
                this.$validator.validate().then(result => {
                    this.UpdateStatus(result);
                });
            },
            setAllDirty: function ()
            {
                if(this.s_name) this.$validator.flag('s_name', { dirty: true });
                if(this.s_email) this.$validator.flag('s_email', { dirty: true });
                if(this.s_phone) this.$validator.flag('s_phone', { dirty: true });
                if(this.s_password) this.$validator.flag('s_password', { dirty: true });
                if(this.s_password2) this.$validator.flag('s_password2', { dirty: true });
                if(this.region_id) this.$validator.flag('region_id', { dirty: true });
                if(this.s_city) this.$validator.flag('s_city', { dirty: true });
                if(this.s_org_name) this.$validator.flag('s_org_name', { dirty: true });
                if(this.s_org_addr) this.$validator.flag('s_org_addr', { dirty: true });
                if(this.s_org_inn) this.$validator.flag('s_org_inn', { dirty: true });
                if(this.s_org_kpp) this.$validator.flag('s_org_kpp', { dirty: true });
                if(this.s_org_bik) this.$validator.flag('s_org_bik', { dirty: true });
                if(this.s_org_rs) this.$validator.flag('s_org_rs', { dirty: true });
                if(this.s_org_ks) this.$validator.flag('s_org_ks', { dirty: true });
            },
        },
        mounted: function () {
            if (this.mode_retry)
                this.setAllDirty();
        }
    }

</script>
