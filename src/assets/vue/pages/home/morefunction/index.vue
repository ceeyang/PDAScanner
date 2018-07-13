<template lang="html">
    <f7-page class="moref-unction-page">
        <!-- Nav  -->
        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title title='更多功能'></f7-nav-title>
        </f7-navbar>

        <p class="more-hint">
            功能完善中, 敬请期待 ~
        </p>




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
.moref-unction-page{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.more-hint{
    margin-top: 100%;
    font-size: 24px;
}

</style>
