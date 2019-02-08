<template>
    <v-container>
        <v-layout row wrap>

            <v-flex xs12 sm6>
                <v-select
                        v-model="brand_id"
                        label="* Марка"
                        :items="brands"
                        item-text="s_name"
                        item-value="id"
                        required="required"
                        @input="brandChanged()"
                ></v-select>
            </v-flex>

            <v-flex xs12 sm6>
                <v-select
                        v-model="model_id"
                        label="* Модель"
                        :items="models"
                        item-text="s_name"
                        item-value="id"
                        required="required"
                        @input="modelChanged()"
                ></v-select>
            </v-flex>

            <v-flex xs12 sm6>
                <v-select
                        v-model="modif_id"
                        label="* Модификация"
                        :items="modifs"
                        item-text="s_name"
                        item-value="id"
                        @input="modifChanged()"
                ></v-select>
            </v-flex>

            <v-flex xs12 sm6>
                <v-select
                    v-model="u_prod_year"
                    label="Год выпуска"
                    :items="years"
                    ref="u_prod_year"
                ></v-select>
            </v-flex>

            <v-flex xs12 sm6>
                <v-select
                    v-model="u_engine_type"
                    label="Тип двигателя"
                    :items="etypes"
                    item-text="name"
                    item-value="id"
                    ref="u_engine_type"
                ></v-select>
            </v-flex>


            <v-flex xs12 sm6>
                <v-select
                    v-model="u_engine_volume"
                    label="Объем двигателя"
                    :items="evolumes"
                    item-text="name"
                    item-value="id"
                    ref="u_engine_volume"
                ></v-select>
            </v-flex>

            <v-flex xs12 sm6>
                <v-select
                        v-model="u_transm_type"
                        label="Трансмиссия"
                        :items="ttypes"
                        item-text="name"
                        item-value="id"
                        ref="u_transm_type"
                ></v-select>
            </v-flex>

            <v-flex xs12 sm6>
                <v-select
                        v-model="u_wheel_type"
                        label="Привод"
                        :items="wtypes"
                        item-text="name"
                        item-value="id"
                        ref="u_wheel_type"
                ></v-select>
            </v-flex>

            <v-flex  xs12 sm12 >
                <v-text-field
                        :messages="['длина VIN ровно 17 символов, допустимы цифры и латинские буквы кроме I, O, Q']"
                        v-model="s_vin"
                        label="VIN"
                        @input="fieldInput('s_vin')"  @change="fieldChange('s_vin')"
                        v-validate="{ length:17 , regex:/^([0-9ABCDEFGHJKLMNPRSTUVWXYZ]{17})$/ }"
                        name="s_vin"
                        data-vv-name="s_vin"
                        ref="s_vin"
                        :error-messages="errors.collect('s_vin')"
                ></v-text-field>
            </v-flex>
        </v-layout>

        DemandAuto:formIsValid={{ formIsValid }}<br>
        DemandAuto:fieldIsValid('brand_id')={{ fieldIsValid('brand_id') }}<br>
        DemandAuto:fieldIsValid('model_id')={{ fieldIsValid('model_id') }}<br>
        DemandAuto:fieldIsValid('modif_id')={{ fieldIsValid('modif_id') }}<br>
        DemandAuto:fieldIsValid('s_vin')={{ fieldIsValid('s_vin') }}<br>

    </v-container>
</template>

<script>
    export default {
       data: function () {
            return {
                brands: window.__DFS__preloadBrands,
                models: window.__DFS__preloadModels,
                modifs: window.__DFS__preloadModifs,
                years: window.__DFS__preloadYears,
                etypes: window.__DFS__etypes,
                evolumes: window.__DFS__evolumes,
                ttypes: window.__DFS__ttypes,
                wtypes: window.__DFS__wtypes,
                brand_id: window.__DFS__brand,
                model_id: window.__DFS__model,
                modif_id: window.__DFS__modif,
                u_prod_year: window.__DFS__u_prod_year,
                u_engine_type: window.__DFS__u_engine_type,
                u_engine_volume: window.__DFS__u_engine_volume,
                u_transm_type: window.__DFS__u_transm_type,
                u_wheel_type: window.__DFS__u_wheel_type,
                s_vin: window.__DFS__s_vin.toUpperCase(),

                base_url: '/api/rest/',
                wasMounted: false,
                inProcess: false
            }
        },
        components: {
        },
        computed: {
            formIsValid: function () {
                return  this.fieldIsValid('brand_id') &&
                        this.fieldIsValid('model_id') &&
                        this.fieldIsValid('modif_id') &&
                        this.fieldIsValid('s_vin');
            },
            modelDisabled:function() {
                if (!this.brand_id) return true;
                return !!this.inProcess;
            },
            modifDisabled:function() {
                if (!this.model_id) return true;
                return !!this.inProcess;
            },
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
                let s = this.fieldIsValid('brand_id') &&
                    this.fieldIsValid('model_id') &&
                    this.fieldIsValid('modif_id') &&
                    this.fieldIsValid('s_vin');
                this.$store.commit('M_DEMANDAUTO_VALID', s);
            },

            fieldIsValid :function (name) {

                switch (name)
                {
                    case 'brand_id': return (this.brand_id > 0);
                    case 'model_id': return (this.model_id > 0);
                    case 'modif_id': return (this.modif_id > 0);
                }
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
                if(this.s_vin) this.$validator.flag('s_vin', { dirty: true });
            },
            getBrands: function(){
                this.inProcess = 1;
                this.$http.get(this.base_url + 'brands/').then(function(response){
                    console.log(response);
                    this.brands = response.data;
                    this.inProcess = 0;
                }, function(error){
                    console.log(error);
                    this.inProcess = 0;
                })
            },
            getModels: function(){
                this.inProcess = 1;
                this.$http.get(this.base_url + 'models/'+this.brand_id+'/').then(function(response){
                    console.log(response);
                    this.models = response.data;
                    this.inProcess = 0;
                }, function(error){
                    console.log(error);
                    this.inProcess = 0;
                });
            },
            getModifs: function(){
                this.inProcess = 1;
                this.$http.get(this.base_url + 'modifs/'+this.model_id+'/').then(function(response){
                    console.log(response);
                    this.modifs = response.data;
                    this.inProcess = 0;
                }, function(error){
                    console.log(error);
                    this.inProcess = 0;
                })
            },
            brandChanged: function(){
                if (!this.wasMounted) return;
                this.model_id = 0;
                this.modif_id= 0;
                this.models = [];
                this.modifs = [];
                this.getModels();
                this.UpdateStatus();
            },
            modelChanged: function(){
                if (!this.wasMounted) return;
                this.modif_id = 0;
                this.modifs = [];
                this.getModifs();
                this.UpdateStatus();
            },
            modifChanged: function(){
                this.UpdateStatus();
            },
        },
        mounted: function () {
            this.wasMounted = true;
            this.$validator.validate('s_vin').then(() => {
                this.UpdateStatus();
            });
        }
    }
</script>
