<template>
    <f7-page class="home-page">

        <!-- Nav -->
        <nav-bar title="深圳市源泰达科技有限公司"></nav-bar>

        <!-- content -->
        <f7-swiper pagination class="home-page-swiper">
            <f7-swiper-slide>
                <img class="swiper-images" src="../../../images/swiperImage0.png"/>
            </f7-swiper-slide>
            <f7-swiper-slide>
                <img class="swiper-images" src="../../../images/swiperImage1.png"/>
            </f7-swiper-slide>
            <f7-swiper-slide>
                <img class="swiper-images" src="../../../images/swiperImage2.png"/>
            </f7-swiper-slide>
        </f7-swiper>


        <div class="home-page-content">
            <home-item text="资产盘点"> <i class="f7-icons">bars</i> </home-item>
            <home-item text="扫码保修"> <i class="f7-icons">camera</i> </home-item>
            <home-item text="维修处理"> <i class="f7-icons">favorites</i> </home-item>
            <home-item text="设备巡检"> <i class="f7-icons">refresh_round</i> </home-item>
            <home-item text="设备计量"> <i class="f7-icons">bars</i> </home-item>
            <home-item text="更多功能"> <i class="f7-icons">more_round</i> </home-item>
        </div>



        <!-- tabbar -->
        <foot-bar select="home"></foot-bar>
    </f7-page>
</template>

<script>
import HomeItem from './homeItem';
import FootBar from '../../common/footBar';
import NavBar from '../../common/navBar';

export default {

    data () {
        return {

        }
    },

    mounted() {

    },

    methods: {
        barcodeScanner() {
            console.log('barcodeScanner');
        }
    },

    components: {
        HomeItem, FootBar, NavBar
    }
}
</script>

<style lang="css">
</style>
