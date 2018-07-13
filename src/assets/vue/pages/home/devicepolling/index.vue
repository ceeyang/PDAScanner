<template lang="html">
    <f7-page>
        <!-- Nav  -->
        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title title='设备巡检'></f7-nav-title>
        </f7-navbar>


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
