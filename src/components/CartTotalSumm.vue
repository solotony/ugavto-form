<template>
    <div class="cart-total-summ">
        <span class="cart-total-summ__text">
            Итого: {{ $store.state.incart_summ }}
        </span>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
            }
        },
    }
</script>

<style>

</style>