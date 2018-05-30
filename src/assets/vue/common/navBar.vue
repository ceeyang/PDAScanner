<template lang="html">
    <f7-navbar style="background-color:#70D746">
        <f7-nav-title :title='title'></f7-nav-title>
        <f7-nav-right>
            <div @click="barcodeScanner">
                <i class="f7-icons">camera</i>
            </div>
        </f7-nav-right>
    </f7-navbar>
</template>

<script>
export default {

    data() {
        return {

        }
    },


    methods: {
        barcodeScanner() {
            console.log('barcodeScanner');
        }
    },

    props: ['title']
}
</script>

<style lang="css">
</style>
