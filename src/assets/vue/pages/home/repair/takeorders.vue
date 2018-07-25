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
            <f7-nav-title title='维修接单'></f7-nav-title>
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
                            报修科室:  {{itemData.DepartmentName || "暂无科室"}}
                        </div>
                        <div class="content-device-subname">
                            资产编号:  {{itemData.RepairOrder || "暂无编号"}}
                        </div>
                    </div>
                </div>
            </div>

            <div class="content-bottom">
                <div class="content-header">维修信息</div>
                <input-cell title="维修时间" disabled=true v-model="itemData.RepairDate"></input-cell>
                <input-cell title="报修人员" disabled=true v-model="itemData.RepairPeople"></input-cell>
                <input-cell title="维修编号" disabled=true v-model="itemData.RepairOrder"></input-cell>

                <selected-input title="故障类型" :data="falutTypeNameArr" placeholder="请输入故障类型" @itemClick="faultTypeSearchItemClickAction" @searchAction="faultTypeInputSearchAction"></selected-input>
                <selected-input title="故障问题" :data="falutNameArr" placeholder="请输入故障问题" @itemClick="faultSearchItemClickAction" @searchAction="faultInputSearchAction"></selected-input>
                <selected-input title="故障描述" :data="falutDesNameArr" placeholder="请输入故障描述" @itemClick="faultDesSearchItemClickAction" @searchAction="faultDesInputSearchAction"></selected-input>

            </div>
        </div>

        <mt-datetime-picker ref="picker" type="date" v-model="pickerValue" @confirm="dataPickerConfirm"></mt-datetime-picker>
        <cube-button @click="readyButtonAction" class="ready-repair-bottom">我要接单</cube-button>

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

            falutType: [],
            falutTypeNameArr:[],
            falutTypeArr: [],


            // 故障问题
            fault: [],
            falutNameArr: [],
            falutsArr: [],
            falutDesNameArr: [],
            falutDes: '', // 故障描述


            // 报修期限
            startDataValue: '',
            pickerValue: '',
        }
    },

    watch: {
        falutDes: function(newValue){
            console.log(newValue);
        }
    },

    mounted() {

        let itemData = JSON.parse(localStorage.ItemData);
        this.itemData = itemData
        console.log(itemData);
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

        // 故障描述选择器回调
        faultTypeSearchItemClickAction(data, event) {
            console.log(data);
        },

        // 故障问题选择器回调
        faultSearchItemClickAction(data, event) {


        },
        // 故障描述选择器回调
        faultDesSearchItemClickAction(data, event) {
            this.currentSelecteInputData = []

        },

        // 故障类型输入事件
        faultTypeInputSearchAction(searchvalue) {

            let params = {
                'QueryText': searchvalue,
            };

            let vm = this;
            this.get(this.api.getRepaitUsers, params, function(response) {
                console.log(params);
                var data = JSON.parse(response);
                if (data.Status) {
                    // vm.falutTypeArr =
                    // vm.parseUsers()
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

        // 输入用户时候的事件
        faultInputSearchAction(searchvalue) {

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
        faultDesInputSearchAction(searchvalue) {

            let params = {
                'QueryText': searchvalue,
                'UserCode': localStorage.account,
                // 'PageIndex': 1,
                // 'PageSize': 100,
            };

            let vm = this;
            this.get(this.api.getQuestionList, params, function(response) {
                console.log(params);
                var data = JSON.parse(response);
                if (data.Status) {

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

            console.log(params);
            debugger

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
