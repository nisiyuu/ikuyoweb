export default {
    computed: {
        // $_allItems(){
        //     return this.$store.getters['item/allItems']();
        // }使ってないよね？11/11
    },
    methods: {
        $_getItems(query) {
            return this.$store.getters['item/allItems'](query);
        }
    },
};