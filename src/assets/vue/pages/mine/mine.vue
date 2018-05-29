<template>
    <f7-page class="mine-page">

        <!-- Nav -->
        <f7-navbar>
            <f7-nav-right>
                <i class="f7-icons">settings</i>
            </f7-nav-right>
        </f7-navbar>

        <!-- tabbar -->
        <foot-bar select="mine"></foot-bar>
    </f7-page>
</template>

<script>
import FootBar from '../../common/footBar';

export default {
    components: {
        FootBar
    }
}
</script>

<style lang="css">
</style>
