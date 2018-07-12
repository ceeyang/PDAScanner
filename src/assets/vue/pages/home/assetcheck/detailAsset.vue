<template lang="html">
    <f7-page class="ready-repair-page">
        <!-- Nav  -->
        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title title="资产详情"></f7-nav-title>
        </f7-navbar>

        <div class="repair-content">
            <div class="content-top">
                <div class="content-header">资产详情</div>
                <div class="contet-top-device-info">

                    <i class="iconfont device-icon">&#xe736;</i>
                    <div class="top-right">
                        <div class="content-device-name">
                            {{item.AssetName || "资产名称"}}
                        </div>
                        <div class="content-device-subname">
                            资产编号:  {{item.AssetNo || "无"}}
                        </div>
                        <div class="content-device-subname">
                            类型名称:  {{item.AssetTypeName || "无"}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="content-middle">
                <div class="content-header">其他信息</div>
                <div class="content-repair-info">
                    科室名称 |  {{ item.DepartmentName || "无"}}
                </div>
                <div class="content-repair-info">
                    启用时间 |  {{ item.EnableTime || "无"}}
                </div>
                <div class="content-repair-info">
                    盘点单号 |  {{ item.InventoryNo || "无"}}
                </div>
                <div class="content-repair-info">
                    存放位置 |  {{ item.Location || "无"}}
                </div>
            </div>

            <div class="content-bottom">
                <div class="content-header">状态</div>
                <input-cell type="DataInput" title="设备类型" placeholder="请选择设备类型" :value="statusName" :openDataPicker="openDeviceStatusPicker"></input-cell>
            </div>
        </div>

        <picker :slots='slots' :onValuesChange="onValuesChange" :pickerCancel="pickerCancel" :pickerConfirm="pickerConfirm" :show="popupVisible"></picker>
        <cube-button @click="checkBtnAction" class="ready-repair-bottom">确认修改</cube-button>

    </f7-page>
</template>

<script>
import scroll from '../../../common/scroll.vue';
import InputCell from '../../../common/inputcell.vue';
import RepairItem from '../../../common/repairitem.vue';
import SelectedInput from '../../../common/selectedinput.vue';
import Picker from '../../../common/picker.vue';

export default {

    data() {
        return {
            item: [],
            slots: [{
                flex: 1,
                values: ['在用', '保养', '维修', '计量', '退库', '闲置', '报废申请中','在库','调出','捐赠','缺失', '外调申请中', '外售', '转科申请中'],
                className: 'slot1',
                textAlign: 'center'
            }, ],
            popupVisible: false,
            status: 1,
            statusName: '在用',
        }
    },


    mounted() {
        let itemData = JSON.parse(localStorage.getItem('detailAssetData'));
        this.item = itemData
        console.log(itemData);
    },

    methods: {
        openDeviceStatusPicker() {
            this.popupVisible = true
        },

        NavBack() {
            this.$f7router.back()
        },

        checkBtnAction() {

            let checkedItem = {
                "InventoryNo": this.item.InventoryNo,
                "EquId": this.item.EquId,
                "State": this.Status,
                "DepartmentId": this.item.DepartmentId,
                "Location": this.item.Location,
            };

            var cacheKeyFinishedArr = []
            var cacheKeyFinished = 'KeyCacheFinished+' + this.item.InventoryNo
            var finishedData = localStorage.getItem(cacheKeyFinished)
            if (finishedData) {
                cacheKeyFinishedArr = JSON.parse(localStorage.getItem(cacheKeyFinished))
                cacheKeyFinishedArr.push(checkedItem)
            } else {
                cacheKeyFinishedArr.push(checkedItem)
            }
            localStorage.setItem(cacheKeyFinished, JSON.stringify(cacheKeyFinishedArr))
            this.$f7router.back()
        },

        pickerCancel() {
            console.log('cancel');
            this.popupVisible = false
        },

        pickerConfirm() {
            console.log('confirm');
            this.popupVisible = false
        },

        onValuesChange(picker, values) {

            this.statusName = values;

            if ( values == '在用' ) {
                this.status = "1"
            } else if (values == '保养') {
                this.status = '2'
            } else if (values == '维修') {
                this.status = '3'
            } else if (values == '计量') {
                this.status = '4'
            } else if (values == '退库') {
                this.status = '5'
            } else if (values == '闲置') {
                this.status = '7'
            } else if (values == '报废申请中') {
                this.status = '9'
            } else if (values == '保养') {
                this.status = '2'
            } else if (values == '保养') {
                this.status = '2'
            } else if (values == '在库') {
                this.status = "C"
            } else if (values == '调出') {
                this.status = "D"
            } else if (values == '捐赠') {
                this.status = "J"
            } else if (values == '缺失') {
                this.status =  "Q"
            } else if (values == '外调申请中') {
                this.status = "W"
            } else if (values == '外售') {
                this.Status = "Z"
            }

            console.log(this.status);
        },


    },


    components: {
        scroll,
        RepairItem,
        InputCell,
        SelectedInput,
        Picker
    }
}
</script>

<style lang="css">
</style>
