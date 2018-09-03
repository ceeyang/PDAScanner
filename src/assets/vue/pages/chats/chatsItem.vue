<template lang="html">
    <div class="chats-item-content" @click="itemClickAction(item,$event)">
        <i class="iconfont chats-content-type">&#xe626;</i>
        <div class="chats-content">
            <div class="chats-content-title">
                {{item.EquName}}
            </div>
            <div class="chats-content-subtitle">
                {{item.RepairUserName}}
            </div>
            <div class="chats-content-subtitle">
                {{item.OrderNo}}
            </div>
            <div class="chats-content-subtitle">
                {{item.RepairDate}}
            </div>
        </div>
        <div class="chats-content-status">
            {{transToTxtWithState(item.State)}}
        </div>
    </div>
</template>

<script>
export default {
    props: ['item',],

    methods: {

        itemClickAction: function(data, event) {
            this.$emit('itemClick', data, event);
        },

        transToTxtWithState(value) {
            if (value == "1 ") {
                return "待派工"
            }

            else if (value == "3 " || value == "3") {
                return "待验收"
            }

            else if (value == "6 " || value == "6") {
                return "待接单"
            }

            else if (value == "10 " || value == "10") {
                return "待验收"
            }

            else {
                return "待巡检 "
            }
        },

        transToTxtWithTypeID(value) {

            if (value == "1" || value == "1 ") {
                return "维修"
            }

            else if (value == "2" || value == "2 ") {
                return "巡检"
            }

            else if (value == "3" || value == "3 ") {
                return "验收"
            }
            else {
                return "计量 "
            }
        }
    }

}
</script>

<style lang="css">
</style>
