<template lang="html">
    <f7-page class="apply-repair-page">
        <!-- Nav  -->
        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title :title="scanRepairStore.mViewType=='apply'?'申请报修':'查看详情'"></f7-nav-title>
        </f7-navbar>

        <div class="repair-content">
            <div class="content-top">
                <div class="content-header">设备信息</div>
                <div class="contet-top-device-info">

                    <i class="iconfont device-icon">&#xe736;</i>
                    <div class="top-right">
                        <information-cell title="资产名称" :value="scanRepairStore.mEquModel.EquName"></information-cell>
                        <information-cell title="资产编号" :value="scanRepairStore.mEquModel.EquCode"></information-cell>
                        <information-cell title="规格型号" :value="scanRepairStore.mEquModel.EquType"></information-cell>
                        <information-cell title="序 列 号" :value="scanRepairStore.mEquModel.EquType"></information-cell>
                    </div>
                </div>
            </div>

            <div class="content-middle">
                <div class="content-header">报修信息</div>
                <input-cell type="DataInput" title="报修科室" placeholder="请输入选择报修科室" :value="itemData.DepartmentName" :inputClickAction="departmentInputClick"></input-cell>
                <input-cell type="DataInput" title="报修人员" placeholder="请输入选择报修人员" :value="itemData.UserName" :inputClickAction="repairUserInputClick"></input-cell>
                <input-cell title="报修电话" placeholder="请输入输入报修电话" :value="itemData.UserName"></input-cell>
                <input-cell type="DataInput" title="报修地址" placeholder="请输入选择报修人员" :value="itemData.UserName" :inputClickAction="repairUserInputClick"></input-cell>
                <input-cell type="DataInput" title="故障问题" placeholder="请输入选择报修人员" :value="itemData.UserName" :inputClickAction="repairUserInputClick"></input-cell>
            </div>

            <div class="content-bottom">
                <div class="content-header">故障描述</div>
                <cube-textarea v-model="value"></cube-textarea>
            </div>

            <div class="content-bottom">
                <div class="content-header">备注</div>
                <cube-textarea v-model="value"></cube-textarea>
            </div>


        </div>

        <cube-button v-if="scanRepairStore.mViewType=='apply'" @click="applyButtonAction" class="ready-repair-bottom">申请报修</cube-button>

    </f7-page>
</template>

<script>
import scroll from '../../../common/scroll.vue';
import InputCell from '../../../common/inputcell.vue';
import RepairItem from '../../../common/repairitem.vue';
import SelectedInput from '../../../common/selectedinput.vue';
import InformationCell from '../../../common/InformationCell.vue';

import {
    mapState,
    mapActions,
} from 'vuex';

export default {

    data() {
        return {
            // 页面类型 : 1. apply 申请页面; 2. check 查看页面
            viewType: '',

            itemData: [],

            username: '',

            // 故障问题 title 数组
            problemNameArr: [],

            problemDes: '',


            repairUsersNameArr: [],
            repairUsersArr: [],
            repairUser: [],

            value: ""
        }
    },

    computed: {
        ...mapState([
            'scanRepairStore',
            'StoreSearch'
        ])
    },

    mounted() {

        let itemData = JSON.parse(localStorage.ItemData);
        this.itemData = itemData
        console.log(itemData);

        this.username = localStorage.UserName

        this.viewType = localStorage.repairViewType
    },

    methods: {

        // 科室选择输入框点击
        departmentInputClick() {
            this.StoreSearch.mTitle = "选择科室"
            this.$f7router.navigate(`/SearchItemView/`)
        },

        // 报修人员输入框点击事件
        repairUserInputClick() {
            this.StoreSearch.mTitle = "选择报修人员"
            this.$f7router.navigate("/SearchItemView/")
        },



        problemItemClickAction(title) {
            console.log(title);
        },

        problemInputSearchAction(searchvalue) {
            console.log(searchvalue);
        },

        NavBack() {
                this.$f7router.back()
            },

        // 遍历用户模型列表取出名称
        parseUsers() {
            this.repairUsersNameArr = []
            var nameArr = []
            for (var i = 0; i < this.repairUsersArr.length; i++) {
                nameArr.push(this.repairUsersArr[i].UserName)
            }
            this.repairUsersNameArr = nameArr
        },

        searchItemClickAction(data, event) {
            this.currentSelecteInputData = []
            for (var i = 0; i < this.repairUsersArr.length; i++) {
                if (this.repairUsersArr[i].UserName == data) {
                    this.repairUser = this.repairUsersArr[i]
                }
            }
        },

        inputSearchAction(searchvalue) {

            let params = {
                'QueryText': searchvalue,
                'UserCode': localStorage.account,
                'PageIndex': 1,
                'PageSize': 100,
            };

            let vm = this;
            this.get(this.api.getRepaitUsers, params, function(response) {
                console.log(params);
                var data = JSON.parse(response);
                if (data.Status) {
                    vm.repairUsersArr = data.AssignUserList;
                    vm.parseUsers()
                } else {
                    let msg = data.Msg;
                    console.log(msg);
                    if (!vm.toastCenter) {
                        vm.toastCenter = vm.$f7.toast.create({
                            text: msg,
                            closeTimeout: 2000,
                            position: 'center',
                        });
                    }
                    vm.toastCenter.open();
                }
            });
        },

        onblur() {

        },

        applyButtonAction() {

            var storeNumber = localStorage.storeId

            let params = {

                "EquId": this.itemData.EquCode,
                "EquName": this.itemData.EquName,
                "StoreNumber": '2',
                "Store": localStorage.storeId,
                "RepairUserId": localStorage.account,
                "RepairUserName": '', //
                "DepartmentId": this.itemData.DepartmentId,
                "DepartmentName": this.itemData.DepartmentName,
                "RepairStatus": '1',
                "ApplyDate": '', //
                "SupplierId": '',
                "SupplierName": '',
                "RepairTerm": '',
                "RepairPhone": '', //
                "FaultId": '', //
                "FaultDesription": '', //
                "Remark": '', //
                "RepairNo": '',
                "RepairNoReadonly": 'true',

            }


            let vm = this;
            let URL = this.api.applyRepair
            this.post(URL, params, function(response) {
                var data = JSON.parse(response);

                let msg = data.Msg;
                if (data.Status) {
                    vm.$f7router.back()
                } else {

                }

                var type = data.Status ? "correct" : "error"
                const toast = vm.$createToast({
                    time: 0,
                    txt: msg,
                    type: type,
                    time: 2000,
                    onTimeout: () => {
                        toast.hide()
                    }
                })
                toast.show()
            });

        },

        itemClick() {

        },

        switchTab(index) {
            this.currentIndex = index;
        },

        onPullingDown(scroll) {
            console.log('pullingDown: ' + scroll);
            setTimeout(function() {
                scroll.forceUpdate();
            }, 1000);
        },

        onPullingUp(scroll) {
            setTimeout(function() {
                scroll.forceUpdate();
            }, 1000);
        },
    },


    components: {
        scroll,
        RepairItem,
        InputCell,
        SelectedInput,
        InformationCell,
    }
}
</script>

<style lang="css">
</style>
