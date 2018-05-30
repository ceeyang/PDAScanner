<template>
    <f7-page class="mine-page">

        <!-- Nav -->
        <nav-bar title="我"></nav-bar>

        

        <!-- tabbar -->
        <foot-bar select="mine"></foot-bar>
    </f7-page>
</template>

<script>
import FootBar from '../../common/footBar';
import NavBar from '../../common/navBar';
export default {
    components: {
      FootBar,
      NavBar,
    },
}
</script>

<style lang="css">
</style>
