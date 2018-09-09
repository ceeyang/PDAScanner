<template lang="html">
    <f7-page class="measure-detail-page">

            <f7-navbar backLink title="设备计量"></f7-navbar>

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
