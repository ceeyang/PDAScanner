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

            <div class="content-bottom">
                <div class="content-header">派修信息</div>
                <input-cell type="DataInput" title="维修期限" placeholder="请选择日期" :value="startDataValue" :openDataPicker="openStartDataPicker"></input-cell>
                <div class="content-selecte-user">
                    <div class="selecte-user-title">
                        报修人员
                    </div>
                    <selected-input class="selecte-input" :data="repairUsersNameArr" placeholder="添加派修人员" @itemClick="userSearchItemClickAction" @searchAction="userInputSearchAction"></selected-input>
                </div>
                <div class="content-selecte-user">
                    <div class="selecte-user-title">
                        故障问题
                    </div>
                    <selected-input class="selecte-input" :data="falutNameArr" placeholder="添加故障问题" @itemClick="faultSearchItemClickAction" @searchAction="faultInputSearchAction"></selected-input>
                </div>
                <div class="content-selecte-user">
                    <div class="selecte-user-title">
                        故障描述
                    </div>
                    <selected-input class="selecte-input" :data="falutDesNameArr" placeholder="添加故障描述" @itemClick="faultDesriptionSearchItemClickAction" @searchAction="faultDesriptionInputSearchAction"></selected-input>
                </div>
            </div>
        </div>

        <mt-datetime-picker ref="picker" type="date" v-model="pickerValue" @confirm="dataPickerConfirm"></mt-datetime-picker>

        <cube-button @click="readyButtonAction" class="ready-repair-bottom">维修派工</cube-button>

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

            // 派修人员
            repairUser: [],
            repairUsersNameArr: [],
            repairUsersArr: [],


            // 故障问题
            fault: [],
            falutNameArr: [],
            falutsArr: [],
            falutDesNameArr: [],


            // 报修期限
            startDataValue: '',
            pickerValue: '',


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

        // 时间选择器回调
        dataPickerConfirm(datetime) {
            var year = datetime.getFullYear();
            var month = datetime.getMonth() + 1; //js从0开始取
            var date = datetime.getDate();
            var dateTime = year + '-' + month + '-' + date;
            this.startDataValue = dateTime;
        },

        // 打开时间选择器
        openStartDataPicker() {
            this.$refs.picker.open();
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

        // 派修人员选择回调
        userSearchItemClickAction(data, event) {
            this.currentSelecteInputData = []
            for (var i = 0; i < this.repairUsersArr.length; i++) {
                if (this.repairUsersArr[i].UserName == data) {
                    this.repairUser = this.repairUsersArr[i]
                }
            }
        },
        // 故障问题选择器回调
        faultSearchItemClickAction(data, event) {


        },
        // 故障描述选择器回调
        faultDesriptionSearchItemClickAction(data, event) {
            this.currentSelecteInputData = []

        },

        // 输入用户时候的事件
        userInputSearchAction(searchvalue) {

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

        // 故障问题输入的时候选择器
        faultInputSearchAction(searchvalue) {

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

        faultDesriptionInputSearchAction(searchvalue) {
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

        readyButtonAction() {

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

            if (this.startDataValue == '') {
                const toast = this.$createToast({
                    time: 0,
                    txt: '请选择维修期限',
                    type: 'error'
                })
                toast.show()
                setTimeout(() => {
                    toast.hide()
                }, 2000)

                return
            }

            let params = {
                "DepartmentId": this.itemData.DepartmentId | "",
                "DepartmentName": this.itemData.DepartmentName | "",
                "ApplyDate": '',
                "RepairTerm": this.startDataValue | "",
                "EquId": this.itemData.EquCode | "",
                "EquName": this.itemData.EquName | "",
                "SpecType": '',
                "RepairPhone": '',
                "RepairStatus": '',
                "Factory": '',
                "FaultId": 'xxxx',
                "RepairUserId": this.repairUser.UserCode | "",
                "RepairUserName": this.repairUser.UserName | "",
                "FaultDesription": this.repairIntroduction | "",
                "Remark": '',
                "StoreNumber": '',
                "Store": '',
                "SupplierId": '',
                "SupplierName": '',
                "RepairNo": '',
                "RepairNoReadonly": '',
            };

            let vm = this;
            let URL = this.api.ApplyRepair;
            this.post(URL, params, function(response) {
                var data = JSON.parse(response);

                console.log(params);

                console.log("---------------------------------------------------------------------: ");
                console.log(" 请求地址: " + URL);
                console.log(" 返回数据: ");
                console.log(data);
                console.log("---------------------------------------------------------------------- ");

                if (data.Status) {

                } else {


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
        SelectedInput
    }
}
</script>

<style lang="css">
</style>
