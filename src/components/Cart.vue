<template>
    <section id="cart-row-section">
        <div class="cart-line shadows">
            <span>В корзине</span>&nbsp;
            <span class="cart-total-quantity"><span class='ugavto_cart_state_cout'>{{ incart_num }}</span>шт.</span>
            <span>на сумму</span>&nbsp;
            <span class="cart-total-price"><span class='ugavto_cart_state_summ'>{{ incart_summ }}</span></span>
            <a class="cart-line__button" v-bind:href="cart_url"><i class="fa fa-shopping-cart" aria-hidden="true"></i></a>
        </div>
    </section>
</template>

<script>
    export default {
        data: function () {
            return {
                checkout_url:'',
                clean_url:'',
                cart_del_url:'/ajax/del2cart',
                cart_set_url:'/ajax/set2cart',
                cart_add_url:'/ajax/add2cart',
                csrf:window.__CSRF__,
                cart_url: window.__CART__cart_url,
                incart_num: window.__CART__incart_num,
                incart_summ: window.__CART__incart_summ,
                incart_items: window.__CART__incart_items,
            }
        },
        methods: {
            CartAdd:function(id, count){
                //alert('CartAdd ' + id + ' ' + count);
                this.$http.post(this.cart_add_url, {'item_id': id, 'count': count, '_token':this.csrf } ).then(response => {

                    this.incart_num = response.data.num;
                    this.incart_summ = response.data.summ;
                    this.incart_items = response.data.items;

                    this.$store.commit('M_CARTTOTAL_VALUE', {
                        'incart_num':this.incart_num,
                        'incart_summ':this.incart_summ,
                        'incart_items':this.incart_items
                    });

                    console.log(response.data);
                    //this.someData = response.body;

                }, response => {
                    console.log("Ошибка запроса ");
                    console.log(response);
                });
            },

            CartSet:function(id, count){
                //alert('CartSet '+ id + ' ' + count);
                this.$http.post(this.cart_set_url, {'item_id': id, 'count': count, '_token':this.csrf } ).then(response => {

                    this.incart_num = response.data.num;
                    this.incart_summ = response.data.summ;
                    this.incart_items = response.data.items;

                    this.$store.commit('M_CARTTOTAL_VALUE', {
                        'incart_num':this.incart_num,
                        'incart_summ':this.incart_summ,
                        'incart_items':this.incart_items
                    });

                    console.log(response.data);
                    //this.someData = response.body;

                }, response => {
                    console.log("Ошибка запроса ");
                    console.log(response);
                });
            },

            CartDel:function(id){
                //alert('CartDel '+ id);
                this.$http.post(this.cart_del_url, {'item_id': id, '_token':this.csrf } ).then(response => {

                    this.incart_num = response.data.num;
                    this.incart_summ = response.data.summ;
                    this.incart_items = response.data.items;

                    this.$store.commit('M_CARTTOTAL_VALUE', {
                        'incart_num':this.incart_num,
                        'incart_summ':this.incart_summ,
                        'incart_items':this.incart_items
                    });

                    console.log(response.data);
                    //this.someData = response.body;

                }, response => {
                    console.log("Ошибка запроса ");
                    console.log(response);
                });
            },
        },
        mounted() {
        },
        created() {
            this.$eventHub.$on('cart-add', this.CartAdd);
            this.$eventHub.$on('cart-set', this.CartSet);
            this.$eventHub.$on('cart-del', this.CartDel);

            this.$store.commit('M_CARTTOTAL_VALUE', {
                'incart_num':this.incart_num,
                'incart_summ':this.incart_summ,
                'incart_items':this.incart_items
            });
        },
        beforeDestroy() {
            this.$eventHub.$off('cart-add');
            this.$eventHub.$off('cart-set');
            this.$eventHub.$off('cart-del');
        },
    }
</script>

<style>

</style>