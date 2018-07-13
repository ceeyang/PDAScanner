<template lang="html">
    <f7-page class="measure-detail-page">

            <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title title='设备计量'></f7-nav-title>
        </f7-navbar>

        </f7-navbar>
    </f7-page>
</template>

<script>
export default {

    data() {
        return {
            item: [],

        }
    },

    methods: {
        NavBack() {
                this.$f7router.back()
            },
    },

    mounted() {
        let itemObject = JSON.parse(localStorage.measureItemData);
        this.item = itemObject;
    }
}
</script>

<style lang="css">
</style>
