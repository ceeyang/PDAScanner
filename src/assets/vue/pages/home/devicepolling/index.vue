<template lang="html">
    <f7-page>
        <!-- Nav  -->
        <f7-navbar backLink title="设备巡检"></f7-navbar>

    </f7-page>
</template>

<script>

export default {

    methods: {
        NavBack() {
                this.$f7router.back()
            },
    }

}
</script>

<style lang="css">
</style>
