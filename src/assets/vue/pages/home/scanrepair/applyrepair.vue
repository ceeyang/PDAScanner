<template lang="html">
    <f7-page class="ready-repair-page">
        <!-- Nav  -->
        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title :title="viewType=='apply'?'申请报修':'查看详情'"></f7-nav-title>
        </f7-navbar>

        <div class="repair-content">
            <div class="content-top">
                <div class="content-header">设备信息</div>
                <div class="contet-top-device-info">

                    <i class="iconfont device-icon">&#xe736;</i>
                    <div class="top-right">
                        <div class="content-device-name">
                            {{itemData.EquName || "设备名称"}}
                        </div>
                        <div class="content-device-subname">
                            资产编号:  {{itemData.EquCode || "无"}}
                        </div>
                        <div class="content-device-subname">
                            规格型号:  {{itemData.EquType || "无"}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="content-middle">
                <div class="content-header">报修信息</div>
                <common-cell title="报修科室" :subtitle="itemData.DepartmentName || '无'"></common-cell>
                <common-cell title="报修人员" :subtitle="username || '无'"></common-cell>
                <selected-input title="故障问题" :data="problemNameArr" placeholder="请输入故障问题" @itemClick="problemItemClickAction" @searchAction="problemInputSearchAction"></selected-input>
                <input-cell title="故障描述" placeholder="请输入故障描述" :value="problemDes"></input-cell>
            </div>
        </div>

        <cube-button v-if="viewType=='apply'" @click="applyButtonAction" class="ready-repair-bottom">申请报修</cube-button>

    </f7-page>
</template>

<script>
import scroll from '../../../common/scroll.vue';
import InputCell from '../../../common/inputcell.vue';
import RepairItem from '../../../common/repairitem.vue';
import CommonCell from '../../../common/commonCell.vue';
import SelectedInput from '../../../common/selectedinput.vue';

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
        }
    },


    mounted() {

        let itemData = JSON.parse(localStorage.ItemData);
        this.itemData = itemData

        this.username = localStorage.UserName

        this.viewType = localStorage.repairViewType
        console.log(this.viewType);
    },

    methods: {

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

            this.currentSelecteInputData = ['hahah', 'heiheie', 'nice']
            console.log('searchvalue : ' + searchvalue);

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

                } else {

                }

                var type = data.Status ? "sucess" : "error"
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


                if (scroll && scroll.forceUpdate) {
                    scroll.forceUpdate()
                }
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
        CommonCell
    }
}
</script>

<style lang="css">
</style>
