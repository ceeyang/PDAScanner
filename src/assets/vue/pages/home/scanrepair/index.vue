<template lang="html">
    <f7-page class="scan-repair-page">
        <!-- Nav  -->
        <f7-navbar backLink title="科室报修">
            <f7-nav-right>
                <div @click="searchButtonAction">
                    <i class="f7-icons">search</i>
                </div>
            </f7-nav-right>
        </f7-navbar>

        <!-- 分类选择器 -->
        <segment-bar :titles="titlesArray" @switchTab="switchTab" :selectedIndex="segmentBarIndex"></segment-bar>

        <!-- 待维修 -->
        <template v-if="segmentBarIndex==0">
            <scroll class="scan-repair-scroll" :items="readyrepairData" fresh=true :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in readyrepairData" :key="index" :item="item">
                    <repair-item :item="item" :itemClick="itemClick" className="readyrepair"></repair-item>
                </li>
            </scroll>
        </template>

        <!-- 已维修 -->
        <template v-if="segmentBarIndex==1">
            <scroll class="scan-repair-scroll" :items="repairCompletedData" fresh=true  :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                <li v-for="(item,index) in repairCompletedData" :key="index" :item="item">
                    <repair-item :item="item" :itemClick="itemClick"></repair-item>
                </li>
            </scroll>
        </template>


        <!-- <cube-button class="scan-repair-add-btn" @click="newApplyButton">新增</cube-button> -->

    </f7-page>
</template>

<script>
import scroll from '../../../common/scroll.vue';
import SegmentBar from '../../../common/segmentBar';
import RepairItem from '../../../common/repairitem.vue';
import {
    mapState,
    mapActions,
    mapMutations,
    mapGetters
} from 'vuex';

export default {

    data() {
        return {
            titlesArray: ['待报修', '已报修'],
            segmentBarIndex: 0,

            // 待维修
            readyrepairData: [],
            readyrepairPageIndex: 1,

            // 已维修
            repairCompletedData: [],
            repairCompletedPageIndex: 1,


            currentPageIndex: 1,
        }
    },

    computed: {
        ...mapState([
            'scanRepairStore',
        ])
    },

    mounted() {
        // 没有数据的时候显示本地数据
        // this.readyrepairData = data;

        this.getItemsWhthPageNumber(this.currentPageIndex);
    },

    methods: {
        ...mapActions([
            'getRepairDetail',
        ]),


        NavBack() {
            this.$f7router.back()
        },

        // 获取所有设备名称数据
        getDeviceNameData() {
            let params = {
                'Store': localStorage.storeId,
                'QueryText': '',
            };

            let vm = this;
            this.post(this.api.equNameList, params, function(response) {
                var data = JSON.parse(response);

                if (data.Status) {
                    console.log(data);
                    vm.deviceNameScrollData = data.EquNameList;
                } else {
                    let msg = data.Msg;
                    console.log(msg);
                }
            });
        },

        getDepartmentNameData() {
            let params = {
                'UserCode': localStorage.account,
                'QueryText': '',
            };

            let vm = this;
            this.post(this.api.departmentList, params, function(response) {
                var data = JSON.parse(response);

                if (data.Status) {
                    console.log(data);
                    vm.departmentNameScrollData = data.DepartmentList;
                } else {
                    let msg = data.Msg;
                    console.log(msg);
                }
            });
        },

        // 新增维修接口
        newApplyButton() {
            localStorage.removeItem('ItemData');
            localStorage.setItem('repairViewType', "apply");
            this.$f7router.navigate('/newRepair/',{"domCache":true});
        },

        searchButtonAction() {
            this.$f7router.navigate('/search/');
        },

        getItemsWhthPageNumber(pageNumber, scroll) {

            const toast = this.$createToast({
                time: 0,
                txt: '加载中...',
                mask: true,
            })
            toast.show()

            let params = {
                'DepartmentId': '',
                'EquName': '',
                'EquType': '',
                'StartDate': '',
                'EndDate': '',
                'UserCode': localStorage.account,
                'Store': localStorage.storeId,
                'PageIndex': pageNumber,
                'PageSize': this.config.PageSize,
            };

            let vm = this;
            let URL = this.segmentBarIndex == 0 ? this.api.notRepairList : this.api.hadRepairedList;
            this.post(URL, params, function(response) {
                var data = JSON.parse(response);
                console.log(data);
                if (data.Status) {
                    if (vm.segmentBarIndex == 0) {
                        if (pageNumber == 1) {
                            vm.readyrepairData = data.DepartmentEquList
                        } else {
                            vm.readyrepairData = vm.readyrepairData.concat(data.DepartmentEquList)
                        }
                    } else {
                        if (pageNumber == 1) {
                            vm.repairCompletedData = data.DepartmentEquListHas;
                        } else {
                            vm.repairCompletedData = vm.repairCompletedData.concat(data.DepartmentEquListHas)
                        }
                    }
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

        itemClick(item) {
            const toast = this.$createToast({
                time: 0,
                txt: '加载中...',
                mask: true,
            })
            toast.show()

            this.scanRepairStore.mEquModel = item
            this.scanRepairStore.mViewType = this.segmentBarIndex == 0 ? "apply" : "check"

            let vm = this
            vm.$f7router.navigate('/applyrepair/');
            toast.hide()
        },

        switchTab(index) {
            this.segmentBarIndex = index;
            if (this.repairCompletedData.length < 1) {
                this.getItemsWhthPageNumber(1, scroll);
            }
        },

        onPullingDown(scroll) {
            this.getItemsWhthPageNumber(1, scroll);
        },

        onPullingUp(scroll) {
            if (this.segmentBarIndex == 0) {
                this.readyrepairPageIndex += 1;
                this.getItemsWhthPageNumber(this.readyrepairPageIndex, scroll);
            } else {
                this.repairCompletedPageIndex += 1;
                this.getItemsWhthPageNumber(this.repairCompletedPageIndex, scroll);
            }
        },
    },


    components: {
        SegmentBar,
        scroll,
        RepairItem,
    }
}
</script>

<style lang="css">
</style>
