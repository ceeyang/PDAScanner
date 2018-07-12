<template lang="html">
    <f7-page class="detail-asset-acheck">
        <!-- Nav  -->
        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title title='盘点详情'></f7-nav-title>
        </f7-navbar>


            <div class="content-top">
                <div class="content-header">盘点信息</div>
                <div class="contet-top-device-info">

                    <i class="iconfont device-icon">&#xe62a;</i>
                    <div class="content-device-name">
                        盘点单号:  {{InventoryNo || "No.000"}}
                    </div>
                </div>
            </div>

            <div class="content-middle">
                <div class="content-header">详细信息</div>
                <div class="content-repair-info">
                    盘点人员 |  {{InventoryUserName || "无"}}
                </div>
                <div class="content-repair-info">
                    盘点日期 |  {{InventoryTime || "无"}}
                </div>
                <div class="content-repair-info">
                    设备数量 |  {{deviceTotalNumber || "无"}}
                </div>
                <div class="content-repair-info">
                    盘点状态 |  {{InventoryType || "无"}}
                </div>
                <div class="content-repair-info">
                    盘点备注 |  {{Remarks || "无"}}
                </div>
            </div>


            <div class="asset-checkout-bottom-btn">
                <cube-button @click="startCheckAction" class="asset-check-bottom-btn">开始盘点</cube-button>
                <cube-button @click="uploadAssetCheckAction" class="asset-check-bottom-btn">上传盘点</cube-button>
            </div>

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

            InventoryNo: '',

            InventoryUserName: '',
            InventoryTime: '',
            deviceTotalNumber: '',
            InventoryType: '',
            Remarks: '',

        }
    },


    mounted() {

        let itemData = JSON.parse(localStorage.ItemData);
        this.itemData = itemData
        console.log(this.itemData);

        this.InventoryNo = itemData.InventoryNo
        this.InventoryUserName = itemData.InventoryUserName
        this.InventoryTime = itemData.InventoryTime
        this.deviceTotalNumber = itemData.deviceTotalNumber
        this.InventoryType = itemData.InventoryType
        this.Remarks = itemData.Remarks

    },

    methods: {

        NavBack() {
            this.$f7router.back()
        },

        startCheckAction() {
            this.$f7router.navigate('/beginAassetcheck/')
        },

        uploadAssetCheckAction() {

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
