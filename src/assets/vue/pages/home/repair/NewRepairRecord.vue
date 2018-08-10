<template lang="html">
    <f7-page class="new-repair-record">
        <!-- Nav  -->
        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title title='新增维修记录'></f7-nav-title>
        </f7-navbar>


        <div class="content-header">订单信息</div>
        <input-cell title="维修单号" disabled=true v-model="RepairStore.mCurrentRepair.RepairNo"></input-cell>

        <div class="content-header">报修信息</div>
        <input-cell type="DataInput" title="维修类型" placeholder="请选择维修类型" :value="RepairStore.mCurrentRepair.PartsState|typeTransToTxt" :inputClickAction="PartsStateAction"></input-cell>
        <input-cell title="维修费用" placeholder="请输入维修费用" v-model="mRepairFee"></input-cell>
        <input-cell type="DataInput" title="维修日期" placeholder="请选择维修日期" :value="RepairStore.mCurrentRepair.RepairDate" :inputClickAction="RepairTimeAction"></input-cell>
        <input-cell title="配件费用" placeholder="请输入配件费用" v-model="mExpectRepairFee"></input-cell>
        <input-cell type="DataInput" title="配件状态" placeholder="请选择配件状态" :value="deviceStatusValue" :inputClickAction="openDeviceStatusPicker"></input-cell>

        <!-- 时间选择器 -->
        <mt-datetime-picker ref="picker" type="date" v-model="mRepairTime" @confirm="dataPickerConfirm"></mt-datetime-picker>

        <!-- 状态选择器 -->
        <picker :slots='slots' :onValuesChange="onValuesChange" :pickerCancel="pickerCancel" :pickerConfirm="pickerConfirm" :show="popupVisible"></picker>

    </f7-page>
</template>

<script>
import InputCell from '../../../common/inputcell.vue';
import SelectedInput from '../../../common/selectedinput.vue';
import {
    mapState,
    mapActions,
} from 'vuex';

export default {

    data() {
        return {
            // 维修费用
            mRepairFee: "",

            // 配件费用
            mExpectRepairFee: "",

            // 时间选择器的值
            mRepairTime: "",

            // 配件状态
            mExpectStatus: 0,
            slots: [{
                flex: 1,
                values: ['配件申请中', '配件已到达'],
                className: 'slot1',
                textAlign: 'center'
            }, ],

        }
    },

    computed: {
        ...mapState([
            'RepairStore',
        ])
    },

    watch: {
        mRepairFee: function(newValue){
            this.RepairStore.mCurrentRepair.RepairFee = newValue
        },

        mExpectRepairFee: function(newValue) {
            this.RepairStore.mCurrentRepair.mExpectRepairFee = newValue
        },
    },

    mounted() {
        this.mRepairFee = this.RepairStore.mCurrentRepair.RepairFee
        this.mExpectRepairFee = this.RepairStore.mCurrentRepair.ExpectRepairFee
        this.mRepairTime = this.RepairStore.mCurrentRepair.RepairDate
    },

    methods: {

        // 维修状态点击事件
        PartsStateAction() {

        },

        // 维修事件点击事件
        RepairTimeAction() {
            this.$refs.picker.open();
        },

        // 选择器 value 回调
        onValuesChange(picker, values) {
            this.mExpectStatus = values;
        },

        // 时间选择器回调
        dataPickerConfirm(datetime) {
            var year = datetime.getFullYear();
            var month = datetime.getMonth() + 1; //js从0开始取
            var date = datetime.getDate();
            var repairTime = year + '-' + month + '-' + date;
            this.RepairStore.mCurrentRepair.RepairDate = repairTime
        },

        openDeviceStatusPicker() {
            console.log('');
        },

        NavBack() {
            this.$f7router.back()
        },

    },

    filters: {
        typeTransToTxt(value) {

            // TODO: filters
            if (value == "") {
                return "其他"
            } else if (value == "1") {
                return "自修"
            } else {
                return "其他"
            }
        }
    },


    components: {
        SelectedInput,
        InputCell,

    }
}
</script>

<style lang="css">
</style>
