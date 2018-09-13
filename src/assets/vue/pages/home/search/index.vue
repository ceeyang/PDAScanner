<template lang="html">
    <f7-page class="search-page">
        <!-- Nav  -->
        <f7-navbar backLink title="搜索"></f7-navbar>

        <input-cell type="DataInput" title="设备类型" placeholder="请选择设备类型" :value="deviceStatusValue" :inputClickAction="openDeviceStatusPicker"></input-cell>

        <!-- 设备名称选择器 -->
        <input-cell title="设备名称" placeholder="请输入设备名称" :onblur="onblur" v-model="deviceNameValue"></input-cell>
        <scroll v-if="deviceNameScrollData.length > 0" class="search-content-device-scroll" :items="deviceNameScrollData">
            <li v-for="(item,index) in deviceNameScrollData" :key="index" :item="item">
                <p class="search-item" @click="deviceCellClick(item)">{{item.EquName}}</p>
            </li>
        </scroll>

        <!-- 科室名称选择器 -->
        <input-cell title="使用科室" placeholder="请输入科室名称" :onblur="onblur" v-model="departmentNameValue"></input-cell>
        <scroll v-if="departmentNameScrollData.length > 0" class="search-content-department-scroll" :items="departmentNameScrollData">
            <li v-for="(item,index) in departmentNameScrollData" :key="index" :item="item">
                <p class="search-item" @click="departmentCellClick(item)">{{item.DepaName}}</p>
            </li>
        </scroll>

        <!-- 设备型号 -->
        <input-cell title="设备型号" placeholder="请输入设备型号" :onblur="modelNumberOnblur" v-model="repairNumber"></input-cell>

        <!-- 时间输入框 -->
        <input-cell type="DataInput" title="开始日期" placeholder="请选择日期" :value="startDataValue" :inputClickAction="openStartDataPicker"></input-cell>
        <input-cell type="DataInput" title="结束日期" placeholder="请选择日期" :value="endDataValue" :inputClickAction="openEndDataPicker"></input-cell>

        <!-- 搜索数据列表 -->
        <scroll class="search-content-data-scroll" :items="searchData" fresh=true :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
            <li v-for="(item,index) in searchData" :key="index" :item="item">
                <repair-item :item="item" :itemClick="searchDataClick"></repair-item>
            </li>
        </scroll>

        <!-- 时间选择器 -->
        <mt-datetime-picker ref="picker" type="date" v-model="pickerValue" @confirm="dataPickerConfirm"></mt-datetime-picker>

        <picker :slots='slots' :onValuesChange="onValuesChange" :pickerCancel="pickerCancel" :pickerConfirm="pickerConfirm" :show="popupVisible"></picker>

    </f7-page>
</template>

<script>
import scroll from '../../../common/scroll.vue'
import InputCell from '../../../common/inputcell.vue';
import picker from '../../../common/picker.vue';
import RepairItem from '../../../common/repairitem.vue';

export default {

    data() {
        return {

            setValue: false,

            deviceStatus: 0,
            deviceStatusValue: '未保修',
            popupVisible: false,
            slots: [{
                flex: 1,
                values: ['未保修', '已报修'],
                className: 'slot1',
                textAlign: 'center'
            }, ],

            deviceItem: [],
            deviceNameValue: '',
            deviceNameScrollData: [],

            departmentItem: [],
            departmentNameValue: '',
            departmentNameScrollData: [],

            repairNumber: '',

            // 区分开始时间和结束时间
            showPickerIndex: 0,
            pickerValue: '',
            startDataValue: '',
            endDataValue: '',

            // 搜索数据源
            searchData: [],
            searchPageNumber: 1,
        }
    },


    watch: {
        deviceNameValue: function(newValue) {
            if (this.setValue) {
                this.setValue = false;
            } else {
                this.getDeviceNameData();
            }
        },

        departmentNameValue: function(newValue) {
            if (this.setValue) {
                this.setValue = false;
            } else {
                this.getDepartmentNameData();
            }
        },

    },

    methods: {

        NavBack() {
                this.$f7router.back()
            },

        searchDataClick() {
            localStorage.setItem('repairViewType', this.deviceStatus == 0 ? "apply" : "check");
            this.$f7router.navigate('/applyrepair/');
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

            this.deviceStatusValue = values;
            this.deviceStatus = values == "未保修" ? 0 : 1
            console.log(values);
            console.log(this.deviceStatus);
        },

        // 打开设备类型选择器
        openDeviceStatusPicker() {
            console.log('openDeviceStatusPicker');
            this.popupVisible = true
        },

        onPullingDown(scroll) {
            this.searchPageNumber = 1;
            this.getSearchData(scroll);
        },

        onPullingUp(scroll) {
            this.searchPageNumber += 1;
            this.getSearchData(scroll);
        },

        dataPickerConfirm(datetime) {
            var year = datetime.getFullYear();
            var month = datetime.getMonth() + 1; //js从0开始取
            var date = datetime.getDate();
            var dateTime = year + '-' + month + '-' + date;
            if (this.showPickerIndex == 0) {
                this.startDataValue = dateTime;
            } else {
                this.endDataValue = dateTime;
            }
            this.searchPageNumber = 1
            this.getSearchData();
        },


        openStartDataPicker() {
            this.showPickerIndex = 0
            this.$refs.picker.open();
        },

        openEndDataPicker() {
            this.showPickerIndex = 1
            this.$refs.picker.open();
        },


        deviceCellClick(item) {
            this.deviceNameValue = item.EquName
            this.setValue = true
            this.deviceNameScrollData = []
            this.deviceItem = item
            this.searchPageNumber = 1
            this.getSearchData(1);
        },

        departmentCellClick(item) {
            this.departmentNameValue = item.DepaName
            this.setValue = true
            this.departmentNameScrollData = []
            this.departmentItem = item;
            this.searchPageNumber = 1
            this.getSearchData(1);
        },

        // input 失去焦点
        onblur() {

        },

        // 设备型号失去焦点
        modelNumberOnblur() {
            console.log('modelNumberOnblur');
            this.getSearchData();
        },

        getDeviceNameData() {
            let params = {
                'Store': localStorage.storeId,
                'QueryText': this.deviceNameValue,
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
                'QueryText': this.departmentNameValue,
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

        // 获取查询数据
        // scroll : 滚动组件, 用于结束刷新
        getSearchData(scroll) {
            let params = {
                'DepartmentId': this.departmentItem.DepaCode || "",
                'EquName': this.deviceNameValue || "",
                'EquType': this.repairNumber || "",
                'StartDate': this.startDataValue || "",
                'EndDate': this.endDataValue || "",
                'UserCode': localStorage.account || "",
                'Store': localStorage.storeId || "",
                'PageIndex': this.searchPageNumber || "",
                'PageSize': this.config.PageSize || "",
            }

            let vm = this;
            let URL = this.deviceStatus == 0 ? this.api.notRepairList : this.api.hadRepairedList
            this.post(URL, params, function(response) {
                var data = JSON.parse(response);
                if (data.Status) {
                    console.log(data);
                    vm.searchData = data.DepartmentEquList;
                } else {
                    let msg = data.Msg;
                    console.log(msg);
                }
                if (scroll && scroll.forceUpdate) {
                    scroll.forceUpdate()
                }
            });
        }

    },



    components: {
        scroll,
        InputCell,
        picker,
        RepairItem,
    },

}
</script>

<style lang="css">
</style>
