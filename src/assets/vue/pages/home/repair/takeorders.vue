<!--
申请设备维修页面
codeer: cee
2018-06-25 18:16:13
-->
<template lang="html">
    <f7-page class="take-order-page">
        <!-- Nav  -->
        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title title='维修接单'></f7-nav-title>
        </f7-navbar>

        <cube-scroll class="repair-content" :item="mSectionHeaderTitles">
            <li v-for="(item,index) in mSectionHeaderTitles" :key="index" :item="item">
                <!-- 设备信息 -->
                <div v-if="index==0" class="content-top">
                    <div class="content-header">{{item}}</div>
                    <div class="contet-top-device-info">
                        <i class="iconfont device-icon">&#xe736;</i>
                        <div class="top-right">
                            <information-cell title="资产名称" :value="RepairStore.mTakeOrderItmeDetail.EquName"></information-cell>
                            <information-cell title="资产编号" :value="RepairStore.mTakeOrderItmeDetail.EquNo"></information-cell>
                            <information-cell title="规格型号" :value="RepairStore.mTakeOrderItmeDetail.Size"></information-cell>
                            <information-cell title="序 列 号" :value="RepairStore.mTakeOrderItmeDetail.EquNumber"></information-cell>
                        </div>
                    </div>
                </div>

                <!-- 报修信息 -->
                <div v-if="index==1" class="content-middle">
                    <div class="content-header">{{item}}</div>
                    <input-cell title="维修单号" disabled=true v-model="RepairStore.mTakeOrderItmeDetail.RepairNo"></input-cell>
                    <input-cell title="报修科室" disabled=true v-model="RepairStore.mTakeOrderItmeDetail.DepartmentName"></input-cell>
                    <input-cell title="报修人员" disabled=true v-model="RepairStore.mTakeOrderItmeDetail.AssignRepairPeople"></input-cell>
                    <input-cell title="报修电话" disabled=true v-model="RepairStore.mTakeOrderItmeDetail.RepairPhone"></input-cell>
                    <input-cell title="报修地址" disabled=true v-model="RepairStore.mTakeOrderItmeDetail.RepairAddress"></input-cell>
                    <input-cell title="故障问题" disabled=true v-model="RepairStore.mTakeOrderItmeDetail.FaultType"></input-cell>
                </div>

                <!-- 故障描述 -->
                <div v-if="index==2" class="content-des">
                    <div class="content-header-bottom">{{item}}</div>
                    <cube-textarea disabled v-model="RepairStore.mTakeOrderItmeDetail.FaultDescribe"></cube-textarea>
                </div>
            </li>
        </cube-scroll>

        <cube-button class="content-bottom" @click="readyButtonAction">接单</cube-button>
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
            mSectionHeaderTitles: ['设备信息', '报修信息', '故障描述'],
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
            'repairCheckOrder',
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
            this.repairCheckOrder().then((res)=>{
                console.log(res);
            })

        },

        /**
         * 忽略派工
         */
        ignoreButtonAction() {

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
