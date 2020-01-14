export default {
    methods:{
        async $_getItemsFromType(type) {
            return await this.$store.dispatch('item/getItemsFromType', type);//allitemsの戻り値は関数それに渡す引数がquery
        },
        async $_getItemsFromGroup(groupID) {
            return await this.$store.dispatch('item/getItemsFromGroup',groupID);//allitemsの戻り値は関数それに渡す引数がquery
        },
        async $_getItemFromId(id) {
            return await this.$store.dispatch('item/getItemFromId',id);//allitemsの戻り値は関数それに渡す引数がquery
        },
    },
};