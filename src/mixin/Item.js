export default {
    computed: {
        $_allItems(){
            return this.$store.getters['item/allItems']();
        }
    },
    methods: {
        $_getItems(query){
            return this.$store.getters['item/allItems'](query);
        }
    },
};