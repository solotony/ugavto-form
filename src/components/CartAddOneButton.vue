<template>
    <div class="cart-buttons-container snyp" v-on:click="clickAdd">
        <span style="width:120px" class="cart-add item" data-upgraded="cart-button-item-add,">
            <strong style="top: -4px;" class="v-link">{{ price }}</strong>
            <i class="fns-21 fa fa-shopping-cart" aria-hidden="true"></i>
        </span>
    </div>
</template>

<script>
    export default {
        props: {
            id: Number,
            price: String
        },
        data: function () {
            return {
            }
        },
        methods: {
            clickAdd: function () {
                this.$eventHub.$emit("cart-add", this.id, 1);
            }
        },
    }
</script>

<style>

</style>