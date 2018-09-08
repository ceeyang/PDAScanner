<template>
<f7-page tabbar-fixed with-subnavbar>

    <!-- 导航栏 -->
    <!-- <f7-navbar sliding title="消息"></f7-navbar> -->

    <!-- 底部 tabbar  -->
    <f7-toolbar tabbar labels>
        <f7-link icon-f7="chats_fill" text="消息" tab-link="#chats" active  tab-link-active></f7-link>
        <f7-link icon-f7="home_fill" text="首页" tab-link="#home"></f7-link>
        <f7-link icon-f7="persons" text="我的" tab-link="#mine"></f7-link>
    </f7-toolbar>

    <!-- 内存跟试图, page-content -->
    <!-- <f7-tabs swipeable routable> -->
    <f7-tabs routable>
        <f7-tab id="chats" tab-active tab-link-active>
            <chats-page />
        </f7-tab>
        <f7-tab id="home">
            <home-page />
        </f7-tab>
        <f7-tab id="mine">
            <mine-page />
        </f7-tab>
    </f7-tabs>
</f7-page>
</template>

<script>
import Home from '../home/NewHome';
import Chats from '../chats/NewChats';
import Mine from '../mine/NewMine';
import Login from '../mine/login';

export default {
    name: 'Tabs',

    data() {
        return {

        }
    },

    components: {
        'home-page': Home,
        'chats-page': Chats,
        'mine-page': Mine,
        'login-page': Login,
    },

    mounted() {

    },

    computed: {}
};
</script>
