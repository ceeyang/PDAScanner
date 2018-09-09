<template lang="html">
    <f7-page class="ready-repair-page">
        <!-- Nav  -->
        <f7-navbar backLink title="维修派单"></f7-navbar>

        <cube-scroll class="repair-content" :item="mSectionHeaderTitles">
            <li v-for="(item,index) in mSectionHeaderTitles" :key="index" :item="item">
                <!-- 设备信息 -->
                <div v-if="index==0" class="content-top">
                    <div class="content-header">{{item}}</div>
                    <div class="contet-top-device-info">
                        <i class="iconfont device-icon">&#xe736;</i>
                        <div class="top-right">
                            <information-cell title="资产名称" :value="RepairStore.mReadyRepairDetail.EquName"></information-cell>
                            <information-cell title="资产编号" :value="RepairStore.mReadyRepairDetail.EquNo"></information-cell>
                            <information-cell title="规格型号" :value="RepairStore.mReadyRepairDetail.Size"></information-cell>
                            <information-cell title="序 列 号" :value="RepairStore.mReadyRepairDetail.EquNumber"></information-cell>
                        </div>
                    </div>
                </div>

                <!-- 报修信息 -->
                <div v-if="index==1" class="content-middle">
                    <div class="content-header">{{item}}</div>
                    <input-cell title="维修单号" disabled=true v-model="RepairStore.mReadyRepairDetail.RepairNo"></input-cell>
                    <input-cell title="报修科室" disabled=true v-model="RepairStore.mReadyRepairDetail.DepartmentName"></input-cell>
                    <input-cell title="报修人员" disabled=true v-model="RepairStore.mReadyRepairDetail.RepairPeople"></input-cell>
                    <input-cell title="报修电话" disabled=true v-model="RepairStore.mReadyRepairDetail.RepairPhone"></input-cell>
                    <input-cell title="报修地址" disabled=true v-model="RepairStore.mReadyRepairDetail.RepairAddress"></input-cell>
                    <input-cell title="故障问题" disabled=true v-model="RepairStore.mReadyRepairDetail.FaultType"></input-cell>
                </div>

                <!-- 故障描述 -->
                <div v-if="index==2" class="content-des">
                    <div class="content-header-bottom">{{item}}</div>
                    <cube-textarea disabled v-model="RepairStore.mReadyRepairDetail.FaultDescribe"></cube-textarea>
                </div>

                <!-- 派修人员 -->
                <div v-if="index==3" class="content-bottom">
                    <div class="content-header">{{item}}</div>
                    <input-cell title="派修人员" placeholder="请选择派修人员"  disabled=true v-model="RepairStore.mSearchRepairUser.UserName"></input-cell>
                </div>

            </li>
        </cube-scroll>

        <div class="content-bottom">
            <div @click="chooseUserButtonAction" class="choose-user-bottom">请选择工程师</div>
            <div class="ready-repair-bottom">
                <cube-button class="bottom-btn" @click="readyButtonAction">派工</cube-button>
                <cube-button class="bottom-btn" @click="ignoreButtonAction">忽略</cube-button>
            </div>
        </div>
    </f7-page>
</template>

<script>
import scroll from '../../../common/scroll.vue';
import InputCell from '../../../common/inputcell.vue';
import RepairItem from '../../../common/repairitem.vue';
import SelectedInput from '../../../common/selectedinput.vue';
import InformationCell from '../../../common/InformationCell'

import {
    mapState,
    mapActions,
} from 'vuex';


export default {

    data() {
        return {
            mSectionHeaderTitles: ['设备信息', '报修信息', '故障描述', '派修人员'],
        }
    },

    computed: {
        ...mapState([
            'RepairStore',
            'StoreSearch',
        ])
    },

    watch: {
        falutDes: function(newValue){
            console.log(newValue);
        }
    },

    mounted() {

    },

    methods: {
        /**
         * action 方法映射
         */
        ...mapActions([
            'sendDeviceOrder',
            'dispatchIgnoreRepair',
        ]),

        /**
         * 选择工程师按钮点击事件
         */
        chooseUserButtonAction() {
            this.StoreSearch.mType = "user"
            this.$f7router.navigate(`/SearchItemView/`)
        },

        /**
         * 返回
         */
        NavBack() {
            this.$f7router.back()
        },

        /**
         * 派工
         */
        readyButtonAction() {

            let userCode = this.RepairStore.mSearchRepairUser.UserCode
            console.log(userCode);
            if (userCode === undefined) {
                const toast = this.$createToast({
                    time: 0,
                    txt: '请选择派修人员',
                    type: 'error',
                    mask: true,
                    onTimeout: () => {
                        toast.hide()
                    }
                })
                toast.show()
                return
            }

            let vm = this
            this.sendDeviceOrder().then((data)=>{
                if (data.Status) {
                    debugger
                    const toast = vm.$createToast({
                        time: 0,
                        txt: "派单成功",
                        type: 'correct',
                        mask: true,
                    })
                    toast.show()
                    setTimeout(function () {
                        toast.hide()
                        vm.RepairStore.mSearchRepairUser = []
                        vm.$f7router.back()
                    }, 2000);
                } else {
                    const toast = this.$createToast({
                        time: 0,
                        txt: "派单失败, 请稍后再试",
                        type: 'error',
                        mask: true

                    })
                    toast.show()
                    setTimeout(function () {
                        toast.hide()
                    }, 2000);
                }
            })
        },

        /**
         * 忽略派工
         */
        ignoreButtonAction() {
            let vm = this
            this.dispatchIgnoreRepair().then((res)=>{
                var type = "correct"
                var msg = "订单忽略成功"

                if (res.Status == false) {
                    type = "error"
                    msg = "订单忽略失败"
                }

                const toast = this.$createToast({
                    time: 0,
                    txt: msg,
                    type: type,
                    mask: true
                })
                toast.show()
                setTimeout(function () {
                    toast.hide()
                    vm.$f7router.back()
                }, 2000);
            })
        }
    },


    components: {
        scroll,
        RepairItem,
        InputCell,
        SelectedInput,
        InformationCell
    }
}
</script>

<style lang="css">
</style>
