<template lang="html">
    <f7-page class="search-page">
        <!-- Nav  -->
        <f7-navbar title="搜索" back-link="Back"></f7-navbar>

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
        <input-cell title="设备型号" placeholder="请输入设备型号" :onblur="modelNumberOnblur" v-model="deviceNumber"></input-cell>

        <!-- 时间输入框 -->
        <input-cell type="DataInput" title="开始日期" placeholder="请选择日期" :value="startDataValue" :openDataPicker="openStartDataPicker"></input-cell>
        <input-cell type="DataInput" title="结束日期" placeholder="请选择日期" :value="endDataValue" :openDataPicker="openEndDataPicker"></input-cell>

        <!-- 搜索数据列表 -->
        <scroll :items="searchData" fresh=true :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
            <li v-for="(item,index) in searchData" :key="index" :item="item">
                <p class="search-item" @click="departmentCellClick(item)">{{item.DepaName}}</p>
            </li>
        </scroll>

        <!-- 时间选择器 -->
        <mt-datetime-picker ref="picker" type="date" v-model="pickerValue" @confirm="pickerConfirm"></mt-datetime-picker>

    </f7-page>
</template>

<script>
import scroll from '../../../common/scroll.vue'
import InputCell from '../../../common/inputcell.vue';


export default {

    data() {
        return {

            setValue: false,

            deviceItem: [],
            deviceNameValue: '',
            deviceNameScrollData: [],

            departmentItem: [],
            departmentNameValue: '',
            departmentNameScrollData: [],

            deviceNumber: '',

            // 区分开始时间和结束时间
            showPickerIndex: 0,
            pickerValue: '',
            startDataValue: '',
            endDataValue: '',

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

        onPullingDown(scroll) {
            this.searchPageNumber = 1;
            this.getItemsWhthPageNumber(scroll);
        },

        onPullingUp(scroll) {
            this.searchPageNumber += 1;
            this.getSearchData(scroll);
        },

        pickerConfirm(datetime) {
            var year = datetime.getFullYear();
            var month = datetime.getMonth() + 1; //js从0开始取
            var date = datetime.getDate();
            var dateTime = year + '-' + month + '-' + date;
            if (this.showPickerIndex == 0) {
                this.startDataValue = dateTime;
            } else {
                this.endDataValue = dateTime;
            }
            this.getSearchData(1);
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
            this.getSearchData(1);
        },

        departmentCellClick(item) {
            this.departmentNameValue = item.DepaName
            this.setValue = true
            this.departmentNameScrollData = []
            this.departmentItem = item;
            this.getSearchData(1);
        },

        // input 失去焦点
        onblur() {

        },

        // 设备型号失去焦点
        modelNumberOnblur() {
            this.getSearchData();
            console.log(this.deviceNumber);
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

        getSearchData(scroll) {

            let params = {
                'RepairStatus': '',
                'EquCode': this.deviceNumber,
                'RepairOrder': '',
                'DepartmentId': this.departmentItem.DepaCode,
                'UserCode': global.account,
                'Store': gloabl.storeId,
                'SortType': '',
                'AssignOrConfirm': 1,
                'StartDate': this.startDataValue,
                'EndDate': this.endDataValue,
                'PageIndex': 1,
                'PageSize': 10,
            }
            let vm = this;
            this.post(this.api.dispatchList, params, function(response) {
                scroll.forceUpdate()
                var data = JSON.parse(response);
                if (data.Status) {
                    console.log(data);
                    // vm.searchData = data.DepartmentList;
                } else {
                    let msg = data.Msg;
                    console.log(msg);
                }
            });
        }

    },



    components: {
        scroll,
        InputCell,

    },

}
</script>

<style lang="css">
</style>
