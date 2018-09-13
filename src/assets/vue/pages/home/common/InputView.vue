<template lang="html">
    <f7-page class="input-search-page">
        <!-- Nav  -->
    <f7-navbar backLink title="搜索"></f7-navbar>
        <!-- 设备型号 -->
        <selected-input title="报修人员" placeholder="添加派修人员" @searchAction="inputSearchAction"></selected-input>

        <!-- 搜索数据列表 -->
        <scroll class="search-content-data-scroll" :items="searchData" fresh=true :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
            <li v-for="(item,index) in searchData" :key="index" :item="item">
                <div class="">
                    item.name
                </div>
                <!-- <repair-item :item="item" :itemClick="searchDataClick"></repair-item> -->
            </li>
        </scroll>
    </f7-page>
</template>

<script>
import scroll from '../../../common/scroll.vue'
import InputCell from '../../../common/inputcell.vue';
import SelectedInput from '../../../common/selectedinput.vue';
export default {

    data() {
        return {

            searchValue: "",
            // 搜索数据源
            searchData: [],
            searchPageNumber: 1,
        }
    },


    watch: {


    },

    methods: {

        NavBack() {
            this.$f7router.back()
        },

        inputSearchAction(value) {
            console.log(value);
        },

        onPullingDown(scroll) {
            this.searchPageNumber = 1;
            this.getSearchData(scroll);
        },

        onPullingUp(scroll) {
            this.searchPageNumber += 1;
            this.getSearchData(scroll);
        },


        // input 失去焦点
        onblur() {
            this.getSearchData();
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
        SelectedInput,
        RepairItem,
    },

}
</script>

<style lang="css">
</style>
