<template>
<f7-page cached tab class="chats-page no-swipeback">
    <f7-navbar sliding title="消息"></f7-navbar>

    <!-- segment 选择器 -->
    <segment-bar :titles="titlesArray" @switchTab="switchTab" :selectedIndex="currentIndex"></segment-bar>

    <div class="chats-content-total">共计: {{mTotalValues}} 条</div>

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

</f7-page>
</template>
<script>
import SegmentBar from '../../common/segmentBar';
import scroll from '../../common/scroll';
import ChatsItem from './ChatsItem'
import {
    mapState,
    mapActions,
} from 'vuex';
export default {
    name: 'Home',
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

            mTotalValues: 0,
        }
    },

    on: {
        show() {
            console.log("page show");
        },
    },

    computed: {
        ...mapState([
            'RepairStore',
        ])
    },


    mounted() {
        this.getChatsList()
    },

    beforein() {
        // this.getChatsList()
    },

    watch: {
        currentIndex: function (newValue, oldValue) {
            if (newValue == 0) {
                this.mTotalValues = this.allDataArr.length
            }

            else if (newValue == 1) {
                this.mTotalValues = this.unFinishedDataArr.length
            }

            else if (newValue == 2) {
                this.mTotalValues = this.finishedDataArr.length
            }
        }
    },

    methods: {

        ...mapActions([
            'getRepaiingrHandleList',
            'getRepairProcessList',
            'getReadyRepairDetail',   // 待接单

        ]),

        itemClick(item) {

            console.log(item);

            // 去除空格
            let itemTypeID = item.TypeId.replace(/\s*/g, "")
            let itemStatus = item.State.replace(/\s*/g, "")
            let itemRepairOrder = item.OrderNo.replace(/\s*/g, "")

            // 维修
            if (itemTypeID == "1") {

                // 待派工
                if (itemStatus == "1") {
                    this.RepairStore.mReadyRepairItme = item
                    let vm = this
                    this.getReadyRepairDetail(itemRepairOrder).then((data)=>{
                        // toast.hide()
                        this.RepairStore.mReadyRepairDetail = data.RepairInfo
                        vm.$f7router.navigate('/readyrepair/');
                    })
                }

                // 待接单
                else if (itemStatus == "6") {
                    this.RepairStore.mTakeOrderItme = item
                    let vm = this
                    this.getReadyRepairDetail(itemRepairOrder).then((data)=>{
                        // toast.hide()
                        vm.RepairStore.mTakeOrderItmeDetail = data.RepairInfo
                        vm.$f7router.navigate('/takeorders/');
                    })
                }

                else {
                    self.$f7.dialog.close();
                    var toastCenter = this.$f7.toast.create({
                      text: '暂不支持该类型, 请前往 PC 处理',
                      position: 'top',
                      closeTimeout: 2000,
                    });
                    toastCenter.open()
                }
            }

            else {
                var toastCenter = this.$f7.toast.create({
                  text: '暂不支持该类型, 请前往 PC 处理',
                  position: 'center',
                  closeTimeout: 2000,
                });
                toastCenter.open()
            }
        },

        getEquInfo(EquId) {

            // const toast = this.$createToast({
            //     time: 0,
            //     txt: '加载中...',
            //     mask: true
            // })
            // toast.show()

            let params = {
                "EquNo": EquId,
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
                //toast.hide()
            });

            // setTimeout(function() {
            //     toast.hide()
            // }, 2000);
        },

        /// 下拉加载更多
        onPullingDown(scroll) {
            this.getChatsList(scroll)
        },

        /// 上啦加载更多
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
            // const toast = this.$createToast({
            //     time: 0,
            //     txt: '加载中',
            //     mask: true
            // })
            // toast.show()

            let params = {
                "State": '1',
                "UserCode": localStorage.account,
                "StoreId": localStorage.storeId,
                "StartDate": '',
                "EndDate": '',
                "PageIndex": 1,
                "PageSize": this.config.PageSize,
            };

            let vm = this;
            this.post(this.api.getNoticeList, params, function(response) {
                var data = JSON.parse(response);
                console.log(data);
                if (data.Status) {
                    vm.allDataArr = data.NoticeList
                    vm.mTotalValues = data.Total
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
                // toast.hide()
            });

            // if (scroll && scroll.forceUpdate) {
            //     setTimeout(function() {
            //         scroll.forceUpdate();
            //     }, 5000);
            // }
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
        SegmentBar,
        scroll,
        ChatsItem,
    }
};
</script>
