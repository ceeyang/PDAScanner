<template>
<f7-page class="mine-page" no-swipeback :page-content="false">

    <f7-navbar>
        <f7-nav-title title='我'></f7-nav-title>
    </f7-navbar>

    <f7-list class="components-list">
        <f7-list-item link="#" :title=mUserName>
            <img slot="media" src="../../../images/IMG_Header.jpg" width="66" height="66"/>

        </f7-list-item>
        <f7-list-item link="/about/" title="关于我们" panel-close>
            <f7-icon slot="media" icon="fa fa-info fa-fw"></f7-icon>
        </f7-list-item>
        <f7-list-item link="/settings/" title="偏好设置" panel-close>
            <f7-icon slot="media" icon="fa fa-user fa-fw"></f7-icon>
        </f7-list-item>
    </f7-list>

</f7-page>
</template>

<script>
export default {

    data() {
        return {
            mUserName: '',
        }
    },

    mounted() {
        if (localStorage.UserName) {
            this.mUserName = localStorage.UserName
        }
    },

    methods: {
        openDialog() {
            const self = this;
            self.$f7.dialog.preloader();
            setTimeout(() => {
                self.$f7.dialog.close();
            }, 2000);
        },
    },
}
</script>

<style lang="css">
</style>
