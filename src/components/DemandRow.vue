<template>

        <div class="demand-data__demand-row">



            <v-layout row wrap>
                <v-flex xs12 sm5>
                    <input type="hidden" v-model="id" v-bind:name="nameOfField_id" v-bind:id="idOfField_id"  />
                    <input type="hidden" v-bind:name="nameOfField_type" v-bind:value="u_type">
                    <v-select
                        v-model="u_type"
                        label="Тип запчасти"
                        :items="preloadTN"
                        item-text="name"
                        item-value="id"
                        required="required"
                    ></v-select>
                </v-flex>
                <v-flex xs11 sm6>
                    <v-text-field
                        :messages="['Укажите название детали и ее код']"
                        v-model="s_detail_name"
                        label="Название детали"
                        @input="nameFieldChanged"  @change="nameFieldChanged"
                        v-validate="'required'"
                        name="s_detail_name"
                        data-vv-name="s_detail_name"
                        ref="s_detail_name"
                        :error-messages="errors.collect('s_detail_name')"
                    ></v-text-field>
                </v-flex>
                <v-flex xs1 sm1>
                    <v-btn fab dark small color="error"  v-on:click="removeButtonClicked" v-if="removeable">
                        <v-icon dark>remove</v-icon>
                    </v-btn>
                </v-flex>

                <v-flex xs12 sm7>
                    <v-text-field
                            :messages="['Укажите код производителя если знаете']"
                            v-model="s_code"
                            label="Код производителя"
                            @input="nameFieldChanged"  @change="nameFieldChanged"
                            v-validate="'required'"
                            name="s_code"
                            data-vv-name="s_code"
                            ref="s_code"
                            :error-messages="errors.collect('s_code')"
                    ></v-text-field>
                </v-flex>

                <v-flex xs12 sm5>
                    <v-select
                        v-model="u_new_used"
                        label="Новая или б/у"
                        :items="preloadUN"
                        item-text="name"
                        item-value="id"
                        required="required"
                    ></v-select>
                </v-flex>

            </v-layout>

            <!--div class="md-layout md-gutter">
                <div class="md-layout-item  md-size-30" >
                    <input type="hidden" v-bind:name="nameOfField_type" v-bind:value="u_type">
                    <md-field>
                        <label v-bind:for="idOfField_type">Тип запчасти</label>
                        <md-select v-model="u_type" required="required" name="y1">
                            <md-option v-for="(tval, tkey) in preloadTN" v-bind:value="tkey" v-bind:key="tkey">{{tkey}} {{tval}}</md-option>
                        </md-select>
                    </md-field>
                </div>
                <div class="md-layout-item  md-size-70">
                    <md-field>
                        <label>Наименование запчасти</label>
                        <md-input type="text" list="detail_name_list" v-model="s_detail_name" v-bind:name="nameOfField_name"
                                   v-bind:disabled="!isEnabled" v-validate="'required'"  required="required"
                                  v-on:input="nameFieldChanged" v-on:change="nameFieldChanged"  v-bind:key="idOfField_name" ></md-input>
                        <span class="md-error">{{ errors.first(nameOfField_name) }}</span>
                    </md-field>
                </div>
            </div>
            <div class="md-layout md-gutter">
                <div class="md-layout-item">
                    <md-field>
                        <label >Код производителя</label>
                        <md-input type="text" v-model="s_code" v-bind:name="nameOfField_code"  v-bind:disabled="!isEnabledEx" ></md-input>
                    </md-field>
                </div>
                <div class="md-layout-item">
                    <input type="hidden" v-bind:name="nameOfField_used" v-bind:value="u_new_used">
                    <md-field>
                        <label v-bind:for="idOfField_used">Новая или б/у</label>
                        <md-select v-model="u_new_used" v-bind:disabled="!isEnabledEx">
                            <md-option v-for="(uval, ukey) in preloadUN" v-bind:value="ukey" v-bind:key="ukey">{{uval}}</md-option>
                        </md-select>
                    </md-field>
                </div>
                <md-button class="md-icon-button  md-accent" v-on:click="removeButtonClicked" v-if="removeable">
                    <md-icon>remove_circle_outline</md-icon>
                </md-button>
             </div-->
        </div>

</template>

<script>
    export default  {
        props: {
            id:Number,
            removeable:Boolean,
            def_name:String,
            def_used:Number,
            def_type:Number,
            def_code:String,
        },
        data: function () {
            return {
                preloadUN: window.__DFS__preloadUN,
                preloadTN: window.__DFS__preloadTN,
                s_detail_name:this.def_name,
                u_type:this.def_type,
                u_new_used:this.def_used,
                s_code: this.def_code,
                s_id: this.id,
            }
        },
        computed:{
            nameOfField_name:function() {
                return 's_detail_name[' + this.id + ']';
            },
            idOfField_name:function() {
                return 's_detail_name' + this.id;
            },

            nameOfField_type:function() {
                return 'u_type[' + this.id + ']';
            },
            idOfField_type:function() {
                return 'u_type' + this.id;
            },

            nameOfField_used:function() {
                return 'u_new_used[' + this.id + ']';
            },
            idOfField_used:function() {
                return 'u_new_used' + this.id;
            },

            nameOfField_code:function() {
                return 's_code[' + this.id + ']';
            },
            idOfField_code:function() {
                return 's_code' + this.id;
            },

            nameOfField_id:function() {
                return 's_id[' + this.id + ']';
            },
            idOfField_id:function() {
                return 's_id' + this.id;
            },

            isEnabled:function() {
                return this.u_type>0;
            },
            isValid:function() {
                if (!this.fields[this.nameOfField_name])
                    return !!this.s_detail_name;
                if (this.fields[this.nameOfField_name].pristine)
                    return !!this.s_detail_name;
                return this.fields[this.nameOfField_name].valid;
            },
            isEnabledEx:function() {
                return this.isEnabled && this.isValid;
            },
        },
        methods:{
            removeButtonClicked: function () {
                this.$emit("remove-row", this.id);
            },
            nameFieldChanged: function () {
                //alert(1);
                //alert("1: " + e);
                //alert("2: " + e.target.name);
                //alert("3: " + this.fields[e.target.name].valid);
                this.$validator.validate().then(result => {
                    //alert(result);
                    //this.$emit("row-changed", this.id, this.name, this.fields[e.target.name].valid); //OK
                    this.$emit("row-changed", this.id, this.s_detail_name, result);
                });
            },
        },
        mounted: function () {
            //this.$validator.validate();
        }
    }
</script>