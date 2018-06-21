<template lang="html">
    <mt-popup class="warehouse-picker"
    v-model="popupVisible"
    position="bottom">
    <div class="picker-top-buttons">
        <div class="picker-top-buttons">
            <button class="top-button cancel" @click='pickerCancel'>取消</button>
            <button class="top-button confirm" @click='pickerConfirm'>确认</button>
        </div>
    </div>
    <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
    </mt-popup>
</template>

<script>
export default {

    props:['slots', 'onValuesChange'],

    data() {
        return {
            popupVisible: false,
        }
    },

    methods: {
        pickerCancel() {
            this.popupVisible = false;
        },

        pickerConfirm() {
            this.popupVisible = false;
        },

        // onValuesChange(picker, values) {
        //     if (values[0] > values[1]) {
        //         picker.setSlotValue(1, values[0]);
        //     }
        //     console.log(picker.slotValue);
        // },


    }
}
</script>

<style lang="css">
</style>
