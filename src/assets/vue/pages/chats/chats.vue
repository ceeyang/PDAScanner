<template>
    <f7-page class="chats-page">

        <!-- Nav -->
        <nav-bar title='消息'></nav-bar>


        <!-- tabbar -->
        <foot-bar select="chats"></foot-bar>
    </f7-page>
</template>

<script>
import FootBar from '../../common/footBar';
import NavBar from '../../common/navBar';

export default {
    components: {
        FootBar, NavBar
    }
}
</script>

<style lang="css">
</style>
