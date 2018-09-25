<template>
<f7-page class="home-page no-swipeback">

    <!-- Nav -->
    <!-- <nav-bar title="深圳市源泰达科技有限公司"></nav-bar> -->
    <f7-navbar>
        <f7-nav-title :title='companyName'></f7-nav-title>
        <f7-nav-right>
            <div @click="barcodeScanner">
                <i class="f7-icons">camera</i>
            </div>
        </f7-nav-right>
    </f7-navbar>

    <!-- content -->
    <f7-swiper pagination class="home-page-swiper">
        <f7-swiper-slide>
            <img class="swiper-images" src="../../../images/swiperImage1.png" />
        </f7-swiper-slide>

        <f7-swiper-slide>
            <img class="swiper-images" src="../../../images/swiperImage0.png" />
        </f7-swiper-slide>

        <f7-swiper-slide>
            <img class="swiper-images" src="../../../images/swiperImage2.png" />
        </f7-swiper-slide>
    </f7-swiper>

    <div class="home-page-content">
        <home-item text="科室报修" :href='/scanrepair/'> <i class="iconfont">&#xe617;</i> </home-item>
        <home-item text="资产盘点" :href='/assetcheck/'> <i class="f7-icons">bars</i> </home-item>
        <home-item text="维修管理" :href='/repair/'> <i class="f7-icons">favorites</i> </home-item>
        <home-item text="我的审批" :href='/approve/'> <i class="f7-icons">refresh_round</i> </home-item>
        <!-- <home-item text="设备计量" :href='/devicemeasure/'> <i class="f7-icons">bars</i> </home-item> -->
        <home-item text="更多功能.." :href='/morefunction/'> <i class="f7-icons">more_round</i> </home-item>
    </div>

</f7-page>
</template>

<script>
import HomeItem from './homeItem';
import {
    exec
} from 'assets/js/common/androidPlugin.js'
import * as Env from 'assets/js/common/env.js'
import {
    mapState,
    mapActions,
    mapMutations,
    mapGetters
} from 'vuex';

export default {

    data() {
        return {
            companyName: '',
        }
    },

    computed: {
        ...mapState([
            'scanRepairStore',
        ])
    },

    mounted() {
        this.companyName = this.globalSetting.companyName;
        if (Env.isAndroid) { //android platform
            exec('ScannerPlugin', 'init', [], this.handleCode, () => {})
        }
    },

    beforeCreate: function() {
        // console.log('创建vue实例前', this);
    },
    created: function() {
        // console.log('创建vue实例后', this);
    },
    beforeMount: function() {
        // console.log('挂载到dom前', this);
    },

    beforeUpdate: function() {
        // console.log('数据变化更新前', this);
    },
    updated: function() {
        // console.log('数据变化更新后', this);
    },
    beforeDestroy: function() {
        // console.log('vue实例销毁前', this);
    },
    destroyed: function() {
        // console.log('vue实例销毁后', this);
    },

    methods: {
        ...mapActions([
            'getEquDetail',
        ]),

        itemClick() {

        },

        switchTab(index) {
            this.currentIndex = index;
        },

        onPullingDown(scroll) {
            console.log('pullingDown: ' + scroll);
            setTimeout(function() {
                scroll.forceUpdate();
            }, 1000);
        },

        onPullingUp(scroll) {
            setTimeout(function() {
                scroll.forceUpdate();
            }, 1000);
        },

        handleCode(res) {
            console.log(res);

            const toast = this.$createToast({
                time: 0,
                txt: '获取资产信息中...',
                mask: true
            })
            toast.show()

            let vm = this
            this.getEquDetail(res).then((data) => {
                toast.hide()
                if (data.Status && data.EquModel !== null) {
                    vm.scanRepairStore.mViewType = "apply"
                    vm.$f7router.navigate("/applyrepair/")
                } else {
                    if (!vm.toastCenter) {
                        vm.toastCenter = vm.$f7.toast.create({
                            text: "获取资产信息失败",
                            closeTimeout: 2000,
                            position: 'center',
                        });
                    }
                    vm.toastCenter.open();
                }
            })
            setTimeout(function() {
                toast.hide()
            }, 3000);
        },

        barcodeScanner() {
            let vm = this
            if (Env.isAndroid) { //android platform
                exec('ScannerPlugin', 'camera', [], this.handleCode, (error) => {
                    if (!vm.toastCenter) {
                        vm.toastCenter = vm.$f7.toast.create({
                            text: "扫码失败, 请重试",
                            closeTimeout: 2000,
                            position: 'center',
                        });
                    }
                    vm.toastCenter.open();
                })
            }
            if (Env.isIOS) {
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
    },

    components: {
        HomeItem,
    }
}
</script>

<style lang="css">
</style>
