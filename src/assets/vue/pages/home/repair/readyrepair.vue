<!--
申请设备维修页面
codeer: cee
2018-06-25 18:16:13
-->
<template lang="html">
    <f7-page class="ready-repair-page">
        <!-- Nav  -->
        <f7-navbar title="维修派单" back-link="Back"></f7-navbar>

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
                            设备型号:  {{deviceType || "无"}}
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
                    报修科室:  {{repairDepartment || "无"}}
                </div>
                <div class="content-repair-info">
                    报修日期:  {{repairTime || "无"}}
                </div>
                <div class="content-repair-info">
                    报修人员:  {{repairUser || "无"}}
                </div>
                <div class="content-repair-info">
                    报修电话:  {{repairUserPhone || "无"}}
                </div>
                <div class="content-repair-info problem-description">
                    报修电话:  {{repairUserPhone || "无"}}
                </div>
                <!-- <mt-field label="故障描述" placeholder="故障描述" type="textarea" rows="4" v-modal="introduction"></mt-field> -->
            </div>

            <div class="content-bottom">
                <div class="content-header">选派人员</div>
                <selected-input :itemlist="showArr" placeholder="请输入..." nodatatext="暂无数据"></selected-input>
                <!-- <selected-input :itemlist="showArr" placeholder="请输入..." nodatatext="暂无数据"></selected-input> -->
            </div>
        </div>

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
            deviceName: '',
            deviceType: '',
            deviceNumber: '',
            repairDepartment: '',
            repairTime: '',
            repairUser: '',
            repairUserPhone: '',
            introduction: '',

            showArr: [],

            repairTitlesArr: [{
                    "title": "设备名称",
                    "name": "SBMC",
                    "value": "",
                    "disabled": true,
                }, {
                    "title": "报修科室",
                    "name": "SYKSMC",
                    "value": "西药库",
                    "disabled": false
                },
                {
                    "title": "报修人员",
                    "name": "WXR",
                    "value": "管理员",
                    "disabled": true
                },
                {
                    "title": "报修日期",
                    "name": "BXRQ",
                    "value": "2018-06-26",
                    "disabled": false

                },
                {
                    "title": "维修期限",
                    "name": "WXQX",
                    "value": "2019-06-26",
                    "disabled": false
                },
                {
                    "title": "资产编号",
                    "name": "SBBH",
                    "value": "68990500067",
                    "disabled": true
                },
                {
                    "title": "规格型号",
                    "name": "SBXH",
                    "value": "",
                    "disabled": true
                },
                {
                    "title": "报修电话",
                    "name": "BXDH",
                    "value": "",
                    "disabled": false
                },
                {
                    "title": "维修状态",
                    "name": "SBZT",
                    "value": "",
                    "disabled": false
                },
                {
                    "title": "资产厂家",
                    "name": "SBCJMC",
                    "value": "",
                    "disabled": true
                },
                {
                    "title": "故障描述",
                    "name": "GZMS",
                    "value": "",
                    "disabled": false
                }
            ],
        }
    },

    mounted() {

        let itemData = JSON.parse(localStorage.ItemData);
        console.log(itemData);

        for (var item in itemData) {
            for (var i = 0; i < this.repairTitlesArr.length; i++) {
                let repair = this.repairTitlesArr[i];
                if (item == repair.name) {
                    repair.value = itemData[item];
                }
                this.repairTitlesArr[i] = repair;
            }
        }

    },

    methods: {

        onblur() {

        },

        inputFunc() {

        },

        readyButtonAction() {
            const self = this;
            if (!self.toastCenter) {
                self.toastCenter = self.$f7.toast.create({
                    text: '申请成功',
                    closeTimeout: 2000,
                    position: 'center',
                });
            }
            self.toastCenter.open();

            this.$f7router.back();
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
