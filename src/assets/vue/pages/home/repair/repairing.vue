<template lang="html">
    <f7-page class="repairing-page">
        <!-- Nav  -->
        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title title='维修详情'></f7-nav-title>
        </f7-navbar>

        <cube-scroll class="repairing-content" :item="mSectionHeaderTitles">
            <li v-for="(item,index) in mSectionHeaderTitles" :key="index" :item="item">
                <!-- 设备信息 -->
                <div v-if="index==0" class="content-top">
                    <div class="content-header">{{item}}</div>
                    <div class="contet-top-device-info">
                        <i class="iconfont device-icon">&#xe736;</i>
                        <div class="top-right">
                            <information-cell title="资产名称" :value="RepairStore.mCurrentRepairDetail.EquName"></information-cell>
                            <information-cell title="资产编号" :value="RepairStore.mCurrentRepairDetail.EquNo"></information-cell>
                            <information-cell title="规格型号" :value="RepairStore.mCurrentRepairDetail.Size"></information-cell>
                            <information-cell title="序 列 号" :value="RepairStore.mCurrentRepairDetail.EquNumber"></information-cell>
                        </div>
                    </div>
                </div>

                <!-- 报修信息 -->
                <div v-if="index==1" class="content-middle">
                    <div class="content-header">{{item}}</div>
                    <information-cell title="维修单号" :value="RepairStore.mCurrentRepairDetail.RepairNo"></information-cell>
                    <information-cell title="报修科室" :value="RepairStore.mCurrentRepairDetail.DepartmentName"></information-cell>
                    <information-cell title="报修人员" :value="RepairStore.mCurrentRepairDetail.AssignRepairPeople"></information-cell>
                    <information-cell title="报修电话" :value="RepairStore.mCurrentRepairDetail.RepairPhone"></information-cell>
                    <information-cell title="报修地址" :value="RepairStore.mCurrentRepairDetail.RepairAddress"></information-cell>
                    <information-cell title="故障问题" :value="RepairStore.mCurrentRepairDetail.FaultType"></information-cell>
                </div>

                <!-- 故障描述 -->
                <div v-if="index==2" class="content-des">
                    <div class="content-header-bottom">{{item}}</div>
                    <cube-textarea disabled v-model="RepairStore.mCurrentRepairDetail.FaultDescribe"></cube-textarea>
                </div>

                <!-- 维修人员 -->
                <div v-if="index==3" class="content-bottom">
                    <div class="content-header header-add-btn">
                        <span>{{item}}</span>
                        <div class="add-btn" @click="addUser">+</div>
                    </div>
                    <div class="content-bottom-content">
                        <div v-if="RepairStore.mCurrentRepairUsers==false" class="user-empty">暂无维修人员</div>
                        <div v-else class="user-item" v-for="(item, index) in RepairStore.mCurrentRepairUsers">
                            {{item.UserName}}
                        </div>
                    </div>
                </div>

                <!-- 配件明细 -->
                <div v-if="index==4" class="content-parts">
                    <div class="content-header header-add-btn">
                        <span>{{item}}</span>
                        <div class="add-btn" @click="addAccessories">+</div>
                    </div>
                    <div class="content-parts-content">
                        <template v-if="RepairStore.mCurrentRepairingParts==false">
                            <div class="parts-empty">暂无维修配件</div>
                        </template>
                        <template v-else v-for="(part, index) in RepairStore.mCurrentRepairingParts"><parts-item :item="part"></parts-item></template>
                    </div>

                    <!-- <div class="content-parts-content">

                        <div >

                        </div>
                    </div> -->
                </div>

                <!-- 维修信息 -->
                <div v-if="index==5" class="content-repair-info">
                    <div class="content-header">{{item}}</div>
                    <input-cell title="配件费用" placeholder="请输入配件费用" v-model="RepairStore.InventoryTime"></input-cell>
                    <input-cell title="维修费用" placeholder="请输入维修费用" v-model="RepairStore.mRepairingExpense"></input-cell>
                    <input-cell title="合计费用" disable=true value="RepairStore.InventoryTime + RepairStore.mRepairingExpense"></input-cell>
                    <input-cell type="DataInput" title="维修类型" placeholder="请选择维修类型" :value="mCurrentSelectedType" :inputClickAction="repairTypeInputClick"></input-cell>
                </div>

                <!-- 维修结果 -->
                <div v-if="index==6" class="content-result">
                    <div class="content-header-bottom">{{item}}</div>
                    <!-- <cube-textarea v-model="快修好了, 这是死数据, 因为接口没调通"></cube-textarea> -->
                    <cube-textarea value="快修好了, 这是死数据, 因为接口没调通"></cube-textarea>
                </div>


            </li>
        </cube-scroll>

        <picker :slots='mSlots' :onValuesChange="onValuesChange" :pickerCancel="pickerCancel" :pickerConfirm="pickerConfirm" :show="mPopupVisible"></picker>
    </f7-page>
</template>

<script>
import scroll from '../../../common/scroll.vue';
import InputCell from '../../../common/inputcell.vue';
import InformationCell from '../../../common/InformationCell'
import PartsItem from '../../../common/PartsItem'
import Picker from '../../../common/picker.vue';

import {
    mapState,
    mapActions,
    mapMutations,
    mapGetters
} from 'vuex';

export default {

    data() {
        return {
            mSectionHeaderTitles: ['设备信息', '报修信息', '故障描述', '维修人', '配件明细', '维修信息', '维修结果'],

            // code by yangxichuan
            // 此处需要设置该值的来
            mPartsItemArr: [],

            mPartsPrices: '300',

            mSlots: [{
                flex: 1,
                values: ['自修', '保修', '原厂', '第三方维修'],
                className: 'slot1',
                textAlign: 'center'
            }, ],

            mPopupVisible: false,

            mCurrentSelectedType: '',
        }
    },

    computed: {
        ...mapState([
            'RepairStore',
            'StoreSearch'
        ])
    },

    watch: {
        falutDes: function(newValue){
            console.log(newValue);
        }
    },

    mounted() {

        // 初始化维修记录
        this.getRepairProcessList()

        // 初始化维修人员
        this.getRepairingUser()

        // 初始化配件数据
        this.getPartList()
    },

    methods: {

        ...mapActions([
            'getHandleRepairingUser',
            'getRepairProcessList',

            'getPartList',
        ]),

        /**
         * 维修类型选择器, 取消按钮点击事件
         */
        pickerCancel() {
            console.log('cancel');
            this.mPopupVisible = false
        },

        /**
         * 维修类型选择器, 确认按钮点击事件
         */
        pickerConfirm() {
            this.mPopupVisible = false
        },

        /**
         * 维修类型选择器 值变化的事件
         */
        onValuesChange(picker, values) {
            console.log(values);
            this.mCurrentSelectedType = values[0]
            // this.statusName = values;
            // this.status = this.getStatusWith(values)
        },

        /**
         * 维修类型输入框点击事件
         */
        repairTypeInputClick() {
            this.mPopupVisible = true
        },

        /**
         * 查询已有的维修用户
         */
        getRepairingUser() {
            this.getHandleRepairingUser()
        },

        /**
         * 新增用户
         */
        addUser() {
            /** 搜索类型 */
            this.StoreSearch.mType = "user"
            /** 搜索结果回调类型 */
            this.StoreSearch.mCallbackType = "Repairing_AddUser"
            this.$f7router.navigate(`/SearchItemView/`)
        },

        /**
         * 添加配件
         */
        addAccessories() {
            this.StoreSearch.mType = "Part"
            this.StoreSearch.mCallbackType = "Repairing_AddPart"
            this.$f7router.navigate(`/SearchItemView/`)
        },

        addClickAction() {
            this.$f7router.navigate("/NewRepairRecord/")
        },

        NavBack() {
            this.$f7router.back()
        },

        repairingItemClick(item) {
            console.log(item);
        },

        onPullingDown(scroll) {

        },

        onPullingUp(scroll) {

        },
    },


    components: {
        scroll,
        InformationCell,
        InputCell,
        PartsItem,
        Picker
    }
}
</script>

<style lang="css">
</style>
