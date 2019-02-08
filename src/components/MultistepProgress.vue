<template>
    <div>
        <ul id="progressbar" class="probar">
            <li v-for="(step,id) in stepss" v-bind:class="activePage>=id?'active':''">{{ step }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: {
            activePage:Number
        },
        data: function () {
            return {
                stepss:[
                    "Автомобиль",
                    "Запчасти",
                    "Заявка",
                ]
            }
        },
        computed: {

        },
        components: {

        },
        methods:{

        },
        mounted:function(){

        }
    }
</script>
