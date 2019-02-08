<template>
    <div class="cart-block">
        <button class="generic-button generic-button-down" v-on:click="clickMinus" v-bind:disabled="!canMinus"></button>
        <span class="cart-block__cart-quantity">{{ num }}</span>
        <button class="generic-button generic-button-up" v-on:click="clickPlus"  v-bind:disabled="!canPlus"></button>
        <button onclick="" class="generic-button generic-button-remove" v-on:click="clickRemove"></button>
    </div>
</template>

<script>
    export default {
        props: {
            id: Number,
        },
        data: function () {
            return {

            }
        },
        computed: {
            canPlus: function () {
                return this.$store.state.incart_items[this.id].num < this.$store.state.incart_items[this.id].available;
            },
            canMinus: function () {
                return this.$store.state.incart_items[this.id].num > 1;
            },
            num() {
                return this.$store.state.incart_items[this.id].num;
            }
        },
        methods: {
            clickMinus: function () {
                if (this.$store.state.incart_items[this.id].num > 1)
                {
                    this.$eventHub.$emit("cart-set", this.id, this.$store.state.incart_items[this.id].num - 1);
                }
            },
            clickPlus: function () {
                if (this.$store.state.incart_items[this.id].num < this.$store.state.incart_items[this.id].available)
                {
                    this.$eventHub.$emit("cart-set", this.id, this.$store.state.incart_items[this.id].num + 1);
                }
            },
            clickRemove: function () {
                this.$eventHub.$emit("cart-del", this.id);
            },
        },
        created: function () {

        }
    }
</script>

<style>

</style>