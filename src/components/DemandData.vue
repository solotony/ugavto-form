<template>
    <div class="demand-data">
        <v-container>
            <demand-row v-for="(draw, ind) in draws"
                :key="draw.vkey"
                :id="ind"
                :def_name="draw.def_name"
                :def_code="draw.def_code"
                :def_used="draw.def_used"
                :def_type="draw.def_type"
                :removeable="removeable"
                @remove-row="RemoveRow"
                @row-changed="RowChanged"
                ></demand-row>

            <v-layout row wrap>
                <v-btn fab dark small color="primary"  v-on:click="AddRow">
                    <v-icon dark>add</v-icon>
                </v-btn>
            </v-layout>

            <datalist id="detail_name_list">
                <option v-for="(item) in preloadSL" v-bind:value="item" v-bind:key="item"></option>
            </datalist>
        </v-container>
    </div>
</template>

<script>
    import DemandRow from './DemandRow.vue';

    export default {
        props: {
        },
        data: function () {
            return {
                preloadSL: window.__DFS__preloadSL,
                counter: window.__DFS__preloadDR.length,
                status:false,
                draws:window.__DFS__preloadDR,
            }
        },
        computed: {
            removeable:function(){
                return this.draws.length > 1;
            },
        },
        components: {
            DemandRow
        },
        methods:{
            RemoveRow:function(ind){
                this.draws.splice(ind,1);
                this.CalculateStatus();
            },
            AddRow:function(){
                this.counter ++ ;
                this.draws.push({
                    vkey:this.counter,
                    def_name:'',
                    def_code:'',
                    def_used:3,
                    def_type:0,
                    status:false,
                });
                this.CalculateStatus();
            },
            RowChanged:function(ind, name, status){
                this.draws[ind].status = status;
                this.CalculateStatus();
            },
            CalculateStatus:function(initial=false){
                var _status = false;
                for (var i=0; i<this.draws.length; i++){
                    _status = _status || this.draws[i].status;
                }
                if (initial || (this.status != _status)) {
                    this.status = _status;
                    this.$store.commit('M_DEMANDDATA_STATUS', _status); // OK
                }
            },
        },
        mounted:function(){
            this.CalculateStatus(true);
            if (!this.draws.length)
            {
                this.AddRow();
            }
        }
    }
</script>

