<template lang="html">
    <f7-page>


        <!-- Nav  -->
        <f7-navbar backLink title="偏好设置"></f7-navbar>

        <!-- list -->
        <f7-list>
            <!-- <f7-list-item link="/modifypsd/" title="修改密码"></f7-list-item> -->
            <f7-list-item link="/colortheme/" title="选择主题"></f7-list-item>
            <f7-list-item link="/changeRoot/" title="API 地址"></f7-list-item>
            <f7-list-item @click='logoutpop' title="退出登录"></f7-list-item>
        </f7-list>


        <!-- Actions -->
        <f7-actions :opened='show'>
            <f7-actions-group>
                <f7-actions-button @click="logout">退出登录</f7-actions-button>
            </f7-actions-group>
            <f7-actions-group>
                <f7-actions-button @click="cancel" color="red" bold>取消</f7-actions-button>
            </f7-actions-group>
        </f7-actions>


    </f7-page>
</template>

<script>
export default {

    data(){
        return{
            show:false,
        }
    },


    methods:{
        logoutpop(){
            this.show = true;
        },

        logout(){
            this.show = false;
            localStorage.setItem('isLogined','0');
            this.$f7router.back('/', {"force": true, "animate":false});
        },

        cancel(){
            this.show = false;
        },

        NavBack() {
                this.$f7router.back()
            },
    }

}
</script>

<style lang="css">
</style>
