<template lang="html">
    <f7-page class="measure-detail-page">
        <f7-navbar title="设备计量" back-link="Back">

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

    mounted() {
        let itemObject = JSON.parse(localStorage.measureItemData);
        this.item = itemObject;
    }
}
</script>

<style lang="css">
</style>
