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
                <input-cell title="维修单号" disabled=true v-model="itemData.InventoryUserName"></input-cell>
                <input-cell title="盘点日期" disabled=true v-model="itemData.InventoryTime"></input-cell>
                <input-cell title="设备数量" disabled=true v-model="mEquCount"></input-cell>
                <input-cell title="盘点状态" disabled=true v-model="itemData.InventoryState"></input-cell>
                <input-cell title="盘点备注" disabled=true v-model="itemData.Remarks"></input-cell>
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

            mEquCount: 0,

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

            const toast = this.$createToast({
                time: 0,
                txt: '上传中...',
                mask: true
            })
            toast.show()

            var cachedFinishedArr = []
            var cacheKeyFinished = 'KeyCacheFinished+' + this.itemData.InventoryNo
            var finishedData = localStorage.getItem(cacheKeyFinished)
            if (finishedData) {
                cachedFinishedArr = JSON.parse(finishedData)
            } else {
                const errorToast = this.$createToast({
                    time: 0,
                    txt: '还没有盘点单可以上传哦...',
                    type: 'error',
                    mask: true
                })
                errorToast.show()
                setTimeout(function () {
                    errorToast.hide()
                }, 2000);
                return
            }

            var itemListData = []
            for (var i = 0; i < cachedFinishedArr.length; i++) {
                let item = cachedFinishedArr[i]
                let checkedItem = {
                    "InventoryNo": item.InventoryNo,
                    "EquId": item.AssetNo,
                    "State": item.State,
                    "DepartmentId": item.DepartmentId,
                    "Location": item.Location,
                };
                itemListData.push(checkedItem)
            }


            let params = {
                "InventoryNo": this.itemData.InventoryNo,
                "StoreId": localStorage.storeId,
                "ItemList": JSON.stringify(itemListData),
            };
            console.log(params);

            let vm = this;
            let URL = this.api.updateInventoryItem;
            this.post(URL, params, function(response) {
                var data = JSON.parse(response);

                if (data.Status) {

                }
                var msg = data.Msg
                type = data.Status ? 'success' : 'error'
                const errorToast = this.$createToast({
                    time: 0,
                    txt: msg,
                    type: type,
                    mask: true
                })
                errorToast.show()
                setTimeout(function () {
                    errorToast.hide()
                }, 2000);

                toast.hide()
            });

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
