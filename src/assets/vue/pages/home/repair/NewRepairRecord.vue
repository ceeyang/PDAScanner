<template lang="html">
    <f7-page class="repairing-page">
        <!-- Nav  -->
        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title title='新增维修记录'></f7-nav-title>
        </f7-navbar>

        

    </f7-page>
</template>

<script>

import {
    mapState,
    mapActions,
    mapMutations,
    mapGetters
} from 'vuex';

export default {

    data() {
        return {
            itemData: [],
        }
    },

    computed: {
        ...mapState([
            'RepairStore',
        ])
    },

    watch: {
        falutDes: function(newValue){
            console.log(newValue);
        }
    },

    mounted() {

    },

    methods: {
        confirmBtnClickAction() {

        },

        NavBack() {
            this.$f7router.back()
        },

    },


    components: {

    }
}
</script>

<style lang="css">
</style>
