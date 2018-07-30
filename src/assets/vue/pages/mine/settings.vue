<template lang="html">
    <f7-page>


        <!-- Nav  -->
        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title title='偏好设置'></f7-nav-title>
        </f7-navbar>

        <!-- list -->
        <f7-list>
            <!-- <f7-list-item link="/modifypsd/" title="修改密码"></f7-list-item> -->
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
            console.log('logoutpop');
            this.show = true;
            console.log(this.show);
        },

        logout(){
            this.show = false;
            localStorage.setItem('isLogined','0');
            this.$f7router.navigate('/', {"animate":false});
        },

        cancel(){
            console.log('cancel');
            this.show = false;
            console.log(this.show);
        },

        NavBack() {
                this.$f7router.back()
            },




    }

}
</script>

<style lang="css">
</style>
