<template lang="html">
    <div class="common-input-cell">

        <!-- 左侧标题 -->
        <div class="input-cell-title">
            {{title}}
        </div>

        <!-- 时间选择器 -->
        <template v-if="type=='DataInput'">
            <div v-if="value" class="comon-input" @click="openDataPicker">
                {{value}}
            </div>
            <div v-else class="comon-input picker-placeholder" @click="openDataPicker">
                {{placeholder}}
            </div>
        </template>

        <!-- 默认输入框 -->
        <template v-else>
            <template v-if="disabled">
                <input class="comon-input disabled" disabled type="text" :placeholder="placeholder" v-on:blur='onblur' v-model="value" v-on:input="$emit('input', $event.target.value)">
            </template>
            <template v-else>
                <input class="comon-input" type="text" :placeholder="placeholder" :value="value" @input="$emit('input', $event.target.value)">
            </template>
        </template>
    </div>
</template>

<script>
export default {

    // type 可选类型:
    // 默认类型, 可不填该属性 模型文字  +  输入框
    // DataInput: 时间选择器, 输入框为时间选择器
    props: ['type', 'title', 'placeholder', 'value', 'disabled', 'onblur', 'openDataPicker'],

    data() {
        return {
            modelValue: '',
        }
    },

    methods: {



    },

    mounted() {

    }



}
</script>

<style lang="css">
</style>
