<!--
申请设备维修页面
codeer: cee
2018-06-25 18:16:13
-->
<template lang="html">
    <f7-page class="ready-repair-page">
        <!-- Nav  -->
        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title title='维修派单'></f7-nav-title>
        </f7-navbar>

        <div class="repair-content">
            <div class="content-top">
                <div class="content-header">设备信息</div>
                <div class="contet-top-device-info">

                    <i class="iconfont device-icon">&#xe736;</i>
                    <div class="top-right">
                        <div class="content-device-name">
                            {{deviceName || "设备名称"}}
                        </div>
                        <div class="content-device-subname">
                            维修编号:  {{repairOrder || "无"}}
                        </div>
                        <div class="content-device-subname">
                            资产编号:  {{deviceNumber || "无"}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="content-middle">
                <div class="content-header">报修信息</div>
                <div class="content-repair-info">
                    报修科室 |  {{repairDepartment || "无"}}
                </div>
                <div class="content-repair-info">
                    报修日期 |  {{repairTime || "无"}}
                </div>
                <div class="content-repair-info">
                    报修人员 |  {{repairUserName || "无"}}
                </div>
                <div class="content-repair-info">
                    报修电话 |  {{repairUserPhone || "无"}}
                </div>
                <div class="content-repair-info">
                    故障描述 |  {{repairIntroduction || "无"}}
                </div>
                <!-- <mt-field label="故障描述" placeholder="无" type="textarea" rows="4" v-modal="repairIntroduction"></mt-field> -->
            </div>
        </div>

        <cube-button @click="applyButtonAction" class="ready-repair-bottom">申请报修</cube-button>

    </f7-page>
</template>

<script>
import scroll from '../../../common/scroll.vue';
import InputCell from '../../../common/inputcell.vue';
import RepairItem from '../../../common/repairitem.vue';
import SelectedInput from '../../../common/selectedinput.vue';

export default {

    data() {
        return {
            itemData: [],

            deviceName: '',
            repairOrder: '',
            deviceNumber: '',

            repairDepartment: '',
            repairTime: '',
            repairUserName: '',
            repairUserPhone: '',
            repairIntroduction: '',


            repairUsersNameArr: [],
            repairUsersArr: [],
            repairUser: [],

        }
    },


    mounted() {

        let itemData = JSON.parse(localStorage.ItemData);
        this.itemData = itemData

        this.deviceName = itemData.EquName
        this.RepairOrder = itemData.RepairOrder
        this.repairDepartment = itemData.DepartmentName
        this.repairTime = itemData.RepairDate
        this.repairUserName = itemData.RepairPeople
        // this.repairUserPhone = itemData.phone
        this.repairIntroduction = itemData.FaultDescribe

    },

    methods: {
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

            if (this.repairUser.UserName == undefined) {
                const toast = this.$createToast({
                    time: 0,
                    txt: '请选择派修人员',
                    type: 'error'
                })
                toast.show()
                setTimeout(() => {
                    toast.hide()
                }, 2000)

                return
            }

            let params = {
                "EquId": '',
                "EquName": '',
                "StoreNumber": '',
                "Store": '',
                "RepairUserId": '',
                "RepairUserName": '',
                "DepartmentId": '',
                "DepartmentName": '',
                "RepairStatus": '',
                "ApplyDate": '',
                "SupplierId": '',
                "SupplierName": '',
                "RepairTerm": '',
                "RepairPhone": '',
                "FaultId": '',
                "FaultDesription": '',
                "Remark": '',
                "RepairNo": '',
                "RepairNoReadonly": '',
            }
            let vm = this;
            let URL = this.deviceStatus == 0 ? this.api.notRepairList : this.api.hadRepairedList
            this.post(URL, params, function(response) {
                var data = JSON.parse(response);


                if (data.Status) {
                    console.log(data);
                } else {
                    let msg = data.Msg;
                    console.log(msg)
                }

                let msg = data.Msg;
                if (!vm.toastCenter) {
                    vm.toastCenter = vm.$f7.toast.create({
                        text: '申请成功',
                        closeTimeout: 2000,
                        position: 'center',
                    });
                }
                vm.toastCenter.open();

                if (scroll && scroll.forceUpdate) {
                    scroll.forceUpdate()
                }
            });
            vm.$f7router.back();
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
        SelectedInput
    }
}
</script>

<style lang="css">
</style>
