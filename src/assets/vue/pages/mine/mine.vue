<template>
    <f7-page class="mine-page">

        <!-- Nav -->
        <!-- 封装该组件后 ios 下显示异常, 暂不知原因 -->
        <!-- <nav-bar title="我"></nav-bar> -->
        <f7-navbar>
            <f7-nav-title title='我'></f7-nav-title>
            <f7-nav-right>
                <div @click="barcodeScanner">
                    <i class="f7-icons">camera</i>
                </div>
            </f7-nav-right>
        </f7-navbar>

        <f7-list class="components-list">
            <f7-list-item class="user-info-item" link="/settings/"panel-close>
                <img class="header-image" src="../../../images/headerimg.png">
                <span class="user-info-name">{{user.name}}</span>
            </f7-list-item>
        </f7-list>

        <f7-list class="components-list">
            <f7-list-item link="/about/" title="关于我们" panel-close>
                <f7-icon slot="media" icon="fa fa-info fa-fw"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/dynamic-route/blog/11/post/23/" title="意见反馈" panel-close>
                <f7-icon slot="media" icon="fa fa-user fa-fw"></f7-icon>
            </f7-list-item>
            <f7-list-item link="/settings/" title="偏好设置" panel-close>
                <f7-icon slot="media" icon="fa fa-user fa-fw"></f7-icon>
            </f7-list-item>
        </f7-list>

        <!-- tabbar -->
        <foot-bar select="mine"></foot-bar>
    </f7-page>
</template>

<script>
import FootBar from '../../common/footBar';
import NavBar from '../../common/navBar';
export default {

    data () {
        return {
            user:{
                name: '管理员',
            }
        }
    },

    methods: {
        barcodeScanner() {
            console.log('barcodeScanner');
        }
    },


    components: {
      FootBar,
      NavBar,
    },
}
</script>

<style lang="css">
</style>
