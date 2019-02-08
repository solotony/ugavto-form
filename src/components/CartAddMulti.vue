<template>
    <div class="cart-buttons-container">
        <button class="cart-quantity-down" v-on:click="clickMinus" v-bind:disabled="!canMinus">-</button>
        <span class="cart-quantity">{{count}}</span>
        <button class="cart-quantity-up" v-on:click="clickPlus"  v-bind:disabled="!canPlus">+</button>
        <button onclick="" class="cart-add item" v-on:click="clickAdd">в корзину</button>
    </div>
</template>

<script>
    export default {
        props: {
            id: Number,
            max: Number,
        },
        data: function () {
            return {
                count:1
            }
        },
        computed: {
            canPlus: function () {
                return this.count < this.max;
            },
            canMinus: function () {
                return this.count > 1;
            },
        },
        methods: {
            clickAdd: function () {
                this.$eventHub.$emit("cart-add", this.id, this.count);
            },
            clickMinus: function () {
                if (this.count>1)
                    this.count --;
            },
            clickPlus: function () {
                if (this.count<this.max)
                    this.count ++;
            },
        },
    }
</script>

<style>

</style>