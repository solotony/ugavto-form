<template>
    <section class="section-bmf">
        <div class="section-bmf__vehicle-search">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <div class="well form-title">
                            <form method="post" v-bind:action="form_action" id='search_car__main_form1'>
                                <input type='hidden' name="_token" v-bind:value="csrf">
                                <div class="row simple-search__by_vehicle">
                                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                        <div class="form-group " id="block_select_firm">
                                            <div class="chosen-container chosen-container-single" title="" id="select_firm_chosen">
                                                <select v-model="brand" v-on:change="brandChanged" name="brand_id" v-bind:disabled="disableSelect1" class="form-control chosen-search-input chosen-search-input-top">
                                                    <option v-for="brand in brands" v-bind:value="brand.id" v-bind:key="brand.id">{{ brand.s_name }}</option>
                                                </select>
                                                <span class="fns-18">Марка</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                        <div class="form-group " id="block_select_model">
                                            <div class="chosen-container chosen-container-single chosen-disabled" title=""
                                                 id="select_model_chosen">
                                                <select v-model="model" v-on:change="modelChanged" name="model_id" v-bind:disabled="disableSelect2"  class="form-control chosen-search-input chosen-search-input-top">
                                                    <option v-for="model in models" v-bind:value="model.id" v-bind:key="model.id">{{model.s_name}}</option>
                                                </select>
                                                <span class="fns-18">Модель</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                        <div class="form-group " id="block_select_modification">
                                            <div class="chosen-container chosen-container-single chosen-disabled" title=""
                                                 id="select_modification_chosen">
                                                <select v-model="modif" name="modif_id" v-bind:disabled="disableSelect3"  class="form-control chosen-search-input chosen-search-input-top">
                                                    <option v-for="modif in modifs" v-bind:value="modif.id" v-bind:key="modif.id">{{modif.s_name}}</option>
                                                </select>
                                                <span class="fns-18">Модификация</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                                        <div class="form-group">
                                            <input value="Перейти в каталог" class="btn btn-primary2 btn-block"
                                                   type="submit" id="vehicle-btn-find" v-bind:disabled="disableButton">
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        data: function () {
                return {
                    form_action: window.__BMF__form_action,
                    brands: window.__BMF__preloadBrands ,
                    models: window.__BMF__preloadModels,
                    modifs: window.__BMF__preloadModifs,
                    brand: window.__BMF__brand,
                    model: window.__BMF__model,
                    modif: window.__BMF__modif,
                    base_url: '/api/rest/',
                    csrf: window.__CSRF__,
                    inProcess1: 0,    /* загрузка данных */
                    inProcess2: 0,    /* загрузка данных */
                    inProcess3: 0,    /* загрузка данных */
            }
        },
        methods: {
            getBrands: function(){
                this.inProcess1 += 1;

                this.$http.get(this.base_url + 'brands/').then(function(response){
                    console.log(response);
                    this.brands = response.data;
                    this.inProcess1 -= 1;
                }, function(error){
                    console.log(error);
                    this.inProcess1 -= 1;
                })
            },
            getModels: function(){
                this.inProcess2 += 1;
                this.$http.get(this.base_url + 'models/'+this.brand+'/').then(function(response){
                    console.log(response);
                    this.models = response.data;
                    this.inProcess2 -= 1;
                }, function(error){
                    console.log(error);
                    this.inProcess2 -= 1;
                })
            },
            getModifs: function(){
                this.inProcess3 += 1;
                this.$http.get(this.base_url + 'modifs/'+this.model+'/').then(function(response){
                    console.log(response);
                    this.modifs = response.data;
                    this.inProcess3 -= 1;
                }, function(error){
                    console.log(error);
                    this.inProcess3 -= 1;
                })
            },
            brandChanged: function(){
                this.model = 0;
                this.modif = 0;
                this.models = [];
                this.modifs = [];
                this.getModels();
            },
            modelChanged: function(){
                this.modif = 0;
                this.modifs = [];
                this.getModifs();
            }
        },
        computed:{
            vehicle:function(){
                if (this.modif > 0) return this.modif;
                if (this.model > 0) return this.model;
                return this.brand;
            },
            disableSelects:function(){
                return this.inProcess > 0;
            },
            disableSelect1:function(){
                return this.inProcess1 > 0;
            },
            disableSelect2:function(){
                return this.inProcess1 > 0 || this.inProcess2 > 0;
            },
            disableSelect3:function(){
                return this.inProcess1 > 0 || this.inProcess2 > 0 || this.inProcess3 > 0;
            },
            disableButton:function(){
                return this.vehicle == 0;
            },
        },
        created:function(){
            //this.getBrands();
            //this.getModels();
            //this.getModifs();
        }
    }
</script>

<style>
    section#top_search_car {
        margin:0;
        padding:0;
        clear-after: both;
    }
</style>