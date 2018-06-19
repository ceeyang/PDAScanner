<template>
<f7-page class="home-page">

    <!-- Nav -->
    <!-- <nav-bar title="深圳市源泰达科技有限公司"></nav-bar> -->
    <f7-navbar>
        <f7-nav-title title='深圳市源泰达科技有限公司'></f7-nav-title>
        <f7-nav-right>
            <div @click="barcodeScanner">
                <i class="f7-icons">camera</i>
            </div>
        </f7-nav-right>
    </f7-navbar>

    <!-- content -->
    <f7-swiper pagination class="home-page-swiper">
        <f7-swiper-slide>
            <img class="swiper-images" src="../../../images/swiperImage0.png" />
        </f7-swiper-slide>
        <f7-swiper-slide>
            <img class="swiper-images" src="../../../images/swiperImage1.png" />
        </f7-swiper-slide>
        <f7-swiper-slide>
            <img class="swiper-images" src="../../../images/swiperImage2.png" />
        </f7-swiper-slide>
    </f7-swiper>


    <div class="home-page-content">
        <home-item text="扫码保修" :href='/scanrepair/'> <i class="f7-icons">camera</i> </home-item>
        <home-item text="资产盘点" :href='/assetcheck/'> <i class="f7-icons">bars</i> </home-item>
        <home-item text="维修管理" :href='/repair/'> <i class="f7-icons">favorites</i> </home-item>
        <home-item text="设备巡检" :href='/devicepolling/'> <i class="f7-icons">refresh_round</i> </home-item>
        <home-item text="设备计量" :href='/devicemeasure/'> <i class="f7-icons">bars</i> </home-item>
        <home-item text="更多功能.." :href='/morefunction/'> <i class="f7-icons">more_round</i> </home-item>
    </div>



    <!-- tabbar -->
    <foot-bar select="home"></foot-bar>
    <!-- <f7-toolbar tabbar labels>
            <f7-link><a class="link" href="/chats/"><i class="f7-icons">chats</i><span>消息</span></a></f7-link>
            <f7-link><a class="link"><i class="f7-icons">home</i><span>主页</span></a></f7-link>
            <f7-link><a class="link" href="/mine/"><i class="f7-icons">personal</i><span>我的</span></a></f7-link>
        </f7-toolbar> -->
</f7-page>
</template>

<script>
import HomeItem from './homeItem';
import FootBar from '../../common/footBar';
import NavBar from '../../common/navBar';

export default {

    data() {
        return {

        }
    },

    mounted() {

    },

    methods: {
        barcodeScanner() {
            console.log('barcodeScanner');
            console.log(cordova.plugins);

            cordova.plugins.barcodeScanner.scan(
                function(result) {
                    alert("We got a barcode\n" +
                        "Result: " + result.text + "\n" +
                        "Format: " + result.format + "\n" +
                        "Cancelled: " + result.cancelled);
                },
                function(error) {
                    alert("Scanning failed: " + error);
                }, {
                    preferFrontCamera: true, // iOS and Android
                    showFlipCameraButton: true, // iOS and Android
                    showTorchButton: true, // iOS and Android
                    torchOn: true, // Android, launch with the torch switched on (if available)
                    saveHistory: true, // Android, save scan history (default false)
                    prompt: "Place a barcode inside the scan area", // Android
                    resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500
                    formats: "QR_CODE,PDF_417", // default: all but PDF_417 and RSS_EXPANDED
                    orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device
                    disableAnimations: true, // iOS
                    disableSuccessBeep: false // iOS and Android
                }
            );


        }
    },

    components: {
        HomeItem,
        FootBar,
        NavBar
    }
}
</script>

<style lang="css">
</style>
