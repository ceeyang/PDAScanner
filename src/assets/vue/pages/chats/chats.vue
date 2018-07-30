<template>
<f7-page class="chats-page no-swipeback">

    <!-- Nav -->
    <f7-navbar>
        <f7-nav-title title='消息'></f7-nav-title>
    </f7-navbar>

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

    <!-- tabbar -->
    <foot-bar select="chats"></foot-bar>
</f7-page>
</template>

<script>
import FootBar from '../../common/footBar';
import NavBar from '../../common/navBar';
import SegmentBar from '../../common/segmentBar';
import scroll from '../../common/scroll';
import ChatsItem from './ChatsItem'

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
        }
    },

    mounted() {
        this.getChatsList()
    },

    methods: {

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


    },

    components: {
        FootBar,
        NavBar,
        SegmentBar,
        scroll,
        ChatsItem,
    }
}
</script>

<style lang="css">
.ptr-preloader{
    margin-top: -70px;
}
</style>
