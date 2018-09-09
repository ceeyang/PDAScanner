<template lang="html">
    <f7-page class="ready-repair-page">
        <!-- Nav  -->
        <f7-navbar backLink title="资产详情"></f7-navbar>

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
                <input-cell type="DataInput" title="设备类型" placeholder="请选择设备类型" :value="statusName" :inputClickAction="openDeviceStatusPicker"></input-cell>
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
import {
    mapState,
    mapActions,
    mapMutations,
    mapGetters
} from 'vuex';
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
            firstTime: true,
        }
    },


    computed: {
        ...mapState([
            'assetCheckStore',
        ])
    },

    mounted() {
        let itemData = JSON.parse(localStorage.getItem('detailAssetData'));
        this.item = itemData

        if (this.item.State) {
            this.statusName = this.getValuesWith(this.item.State)
        }
    },

    methods: {

        ...mapActions([
                'refreshFinishedData',
            ]),

        openDeviceStatusPicker() {
            this.popupVisible = true
        },

        NavBack() {
            this.refreshFinishedData(this.item)
            this.$f7router.back()
        },

        checkBtnAction() {


            this.item.State = this.status

            var cacheKeyFinishedArr = []
            var cacheKeyFinished = 'KeyCacheFinished+' + this.item.InventoryNo
            var finishedData = localStorage.getItem(cacheKeyFinished)
            if (finishedData) {
                cacheKeyFinishedArr = JSON.parse(localStorage.getItem(cacheKeyFinished))
                cacheKeyFinishedArr.push(this.item)
            } else {

                // 如果有重复的, 删除重复的数据, js 中暂时不知道如何删除 item, 遍历删除
                var newArr = []
                for (var i = 0; i < cacheKeyFinishedArr.length; i++) {
                    if (this.item.InventoryNo == cacheKeyFinishedArr[i].InventoryNo) {
                        continue
                    }
                    newArr.push(cacheKeyFinishedArr[i])
                }
                newArr.push(this.item)
                cacheKeyFinishedArr = newArr
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

            // bug : 加载的时候默认调用了一次
            if (this.firstTime) {
                this.firstTime = false;
                return;
            }

            this.statusName = values[0];
            this.status = this.getStatusWith(values[0])

            console.log(this.status);
        },

        // 根据 value 返回 code
        getStatusWith(values) {
            if ( values == '在用' ) {
                return "1"
            } else if (values == '保养') {
                return '2'
            } else if (values == '维修') {
                return '3'
            } else if (values == '计量') {
                return '4'
            } else if (values == '退库') {
                return '5'
            } else if (values == '闲置') {
                return '7'
            } else if (values == '报废申请中') {
                return '9'
            } else if (values == '在库') {
                return "C"
            } else if (values == '调出') {
                return "D"
            } else if (values == '捐赠') {
                return "J"
            } else if (values == '缺失') {
                return  "Q"
            } else if (values == '外调申请中') {
                return "W"
            } else if (values == '外售') {
                return "Z"
            }
            return ''
        },
        getValuesWith(status) {
            if ( status == '1' ) {
                return "在用"
            } else if (status == '2') {
                return '保养'
            } else if (status == '3') {
                return '维修'
            } else if (status == '4') {
                return '计量'
            } else if (status == '5') {
                return '退库'
            } else if (status == '7') {
                return '闲置'
            } else if (status == '9') {
                return '报废申请中'
            } else if (status == 'C') {
                return "在库"
            } else if (status == 'D') {
                return "调出"
            } else if (status == 'J') {
                return "捐赠"
            } else if (status == 'Q') {
                return  "缺失"
            } else if (status == 'W') {
                return "外调申请中"
            } else if (status == 'Z') {
                return "外售"
            }
            return ''
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
