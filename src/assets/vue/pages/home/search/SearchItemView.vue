<template lang="html">
    <f7-page class="search-page">
        <!-- Nav  -->
        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title :title='title'></f7-nav-title>
        </f7-navbar>


    </f7-page>
</template>

<script>
export default {
    data () {
        return {
            title: "标题"
        }
    },

    mounted() {
        console.log(this.$f7router);
        console.log(this.$f7router.params);
        console.log(this.$f7router.params.title);
    },

    methods: {
        NavBack() {
            this.$f7router.back()
        },
    },
}
</script>

<style lang="css">
</style>
