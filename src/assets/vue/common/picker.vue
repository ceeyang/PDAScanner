<template lang="html">
    <mt-popup class="warehouse-picker" v-model="popupVisible" position="bottom">
        <div class="picker-top-buttons">
            <div class="picker-top-buttons">
                <button class="top-button cancel" @click='pickerCancelAction'>取消</button>
                <button class="top-button confirm" @click='pickerConfirmAction'>确认</button>
            </div>
        </div>
        <mt-picker :slots="slots" :valueKey="valueKey" @change="onValuesChange"></mt-picker>
    </mt-popup>
</template>

<script>
export default {

    props: ['slots', 'valueKey', 'pickerConfirm', 'pickerCancel', 'onValuesChange', 'show'],

    data() {
        return {
            popupVisible: false,
        }
    },

    watch: {
        show: function(val) {
            this.popupVisible = val;
        }
    },


    methods: {

        pickerCancelAction() {
            this.popupVisible = false;
            if (this.pickerCancel) {
                this.pickerCancel();
            }
        },

        pickerConfirmAction() {
            this.popupVisible = false
            if (this.pickerConfirm) {
                this.pickerConfirm()
            };
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
