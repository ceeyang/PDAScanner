<template lang="html">
    <f7-page :page-content="false">

      <!-- <f7-navbar title="Swipeable Tabs"></f7-navbar> -->
      <f7-navbar>
          <f7-nav-title :title='companyName'></f7-nav-title>
          <f7-nav-right>
              <div @click="barcodeScanner">
                  <i class="f7-icons">camera</i>
              </div>
          </f7-nav-right>
      </f7-navbar>

      <f7-toolbar tabbar>
        <f7-link tab-link="#tab-1"><i class="f7-icons">chat_fill</i></f7-link>
        <f7-link tab-link="#tab-2" tab-link-active><i class="f7-icons">home_fill</i></f7-link>
        <f7-link tab-link="#tab-3"><i class="f7-icons">personal</i></f7-link>
      </f7-toolbar>


      <f7-tabs swipeable>

          <!-- 消息 -->
        <f7-tab id="tab-1" class="page-content" tab-active>

            <!-- segment 选择器 -->
            <segment-bar :titles="titlesArray" @switchTab="switchTab" :selectedIndex="currentIndex"></segment-bar>

            <!-- 全部 -->
            <template v-if="currentIndex==0">
                <scroll :items="allDataArr" fresh=true :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                    <li v-for="(item,index) in allDataArr" :key="index" :item="item">
                        <chats-item :item="item" @itemClick="itemClick" className="readyrepair"></chats-item>
                    </li>
                </scroll>
            </template>

            <!-- 待维修 -->
            <template v-if="currentIndex==1">
                <scroll :items="unFinishedDataArr" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                    <li v-for="(item,index) in unFinishedDataArr" :key="index" :item="item">
                        <repair-item :item="item" :itemClick="itemClick"></repair-item>
                    </li>
                </scroll>
            </template>

            <!-- 已维修 -->
            <template v-if="currentIndex==2">
                <scroll :items="finishedDataArr" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                    <li v-for="(item,index) in finishedDataArr" :key="index" :item="item">
                        <repair-item :item="item" :itemClick="itemClick"></repair-item>
                    </li>
                </scroll>
            </template>
        </f7-tab>

        <!-- 首页 -->
        <f7-tab id="tab-2" class="page-content">
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
                <!-- <home-item text="设备巡检" :href='/devicepolling/'> <i class="f7-icons">refresh_round</i> </home-item> -->
                <!-- <home-item text="设备计量" :href='/devicemeasure/'> <i class="f7-icons">bars</i> </home-item> -->
                <home-item text="更多功能.." :href='/morefunction/'> <i class="f7-icons">more_round</i> </home-item>
            </div>
        </f7-tab>


        <!-- 我的 -->
        <f7-tab id="tab-3" class="page-content">
          <f7-block>
            <p>Tab 3 content</p>
            ...
          </f7-block>
        </f7-tab>
      </f7-tabs>



    </f7-page>
</template>

<script>
import HomeItem from './homeItem';
import SegmentBar from '../../common/segmentBar';
import scroll from '../../common/scroll';
import ChatsItem from '../chats/ChatsItem'

import {
    exec
} from 'assets/js/common/androidPlugin.js'
import * as Env from 'assets/js/common/env.js'
import {
    mapState,
    mapActions,
} from 'vuex';


export default {


    data() {
        return {
            titlesArray: ['全部', '待维修', '已完成'],
            currentIndex: 0,
            loading: false,
            loadMoreNot: true,
            firstLoad: true,

            allDataArr: [],
            unFinishedDataArr: [],
            finishedDataArr: [],

            companyName: '',


        }
    },

    computed: {
        ...mapState([
            'scanRepairStore',
        ])
    },

    mounted() {
        this.getChatsList()

        this.companyName = this.globalSetting.companyName;
        if (Env.isAndroid) { //android platform
            exec('ScannerPlugin', 'init', [], this.handleCode, () => {})
        }
    },

    methods: {
        ...mapActions([
            'getEquDetail',
        ]),

        itemClick(data) {

            console.log(data);

            // 维修
            if (data.TypeId == "1" || data.TypeId == "1 ") {
                // 待派工
                if (data.State == "1" || data.State == "1 ") {
                    let equNumber = data.EquId
                    // 去除空格
                    equNumber = equNumber.replace(/\s*/g,"")
                    //this.getEquInfo(equNumber)

                    let itemDataJson = JSON.stringify(data);
                    localStorage.setItem('ItemData',itemDataJson);
                    this.$f7router.navigate('/readyrepair/');
                }
            }
        },

        getEquInfo(EquId) {

            const toast = this.$createToast({
                time: 0,
                txt: '加载中...',
                mask: true
            })
            toast.show()

            let params = {
                "EquNo":EquId,
                "UserCode": localStorage.account,
                // 'Store': localStorage.storeId,
            };
            let vm = this;
            this.get(this.api.getEquById, params, function(response) {
                var data = JSON.parse(response);
                console.log(data);
                if (data.Status) {

                } else {
                    let msg = data.Msg;
                    if (!vm.toastCenter) {
                        vm.toastCenter = vm.$f7.toast.create({
                            text: msg,
                            closeTimeout: 2000,
                            position: 'center',
                        });
                    }
                    vm.toastCenter.open();
                }
                toast.hide()
            });

            setTimeout(function () {
                toast.hide()
            }, 2000);
        },

        onPullingDown(scroll) {
            this.getChatsList(scroll)
        },

        onPullingUp(scroll) {

            setTimeout(function() {
                scroll.forceUpdate()
            }, 2000);

            if (this.currentIndex == 0) {


            } else if (this.currentIndex == 1) {


            } else {

            }
        },

        getChatsList(scroll) {
            const toast = this.$createToast({
                time: 0,
                txt: '加载中...',
                mask: true
            })
            toast.show()

            let params = {
                "State":'1',
                "UserCode": localStorage.account,
                "StoreId": localStorage.storeId,
                "StartDate":'',
                "EndDate":'',
                "PageIndex": 1,
                "PageSize": this.config.PageSize,
            };

            let vm = this;
            this.post(this.api.getNoticeList, params, function(response) {
                var data = JSON.parse(response);
                console.log(data);
                if (data.Status) {
                    vm.allDataArr = data.NoticeList
                } else {
                    let msg = data.Msg;
                    if (!vm.toastCenter) {
                        vm.toastCenter = vm.$f7.toast.create({
                            text: msg,
                            closeTimeout: 2000,
                            position: 'center',
                        });
                    }
                    vm.toastCenter.open();
                }
                if (scroll && scroll.forceUpdate) {
                    scroll.forceUpdate();
                }
                toast.hide()
            });

            if (scroll && scroll.forceUpdate) {
                setTimeout(function() {
                    scroll.forceUpdate();
                }, 5000);
            }
        },

        // 导航栏点击事件
        switchTab(index) {
            this.currentIndex = index;
        },


        onfresh() {
            console.log('.....');
            this.$f7.ptr.done();
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

            }
        },
    },

    components: {
        HomeItem,
        SegmentBar,
        scroll,
        ChatsItem,

    }
}
</script>

<style lang="css">
</style>
