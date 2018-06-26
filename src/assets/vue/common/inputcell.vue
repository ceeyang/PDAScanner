<template lang="html">
    <div class="common-input-cell">
        <div class="input-cell-title">
            {{title}}
        </div>
        <template v-if="disabled">
            <input class="comon-input disabled" disabled type="text" :placeholder="placeholder" :value="inputValue">
        </template>
        <template v-else>
            <input class="comon-input" type="text" :placeholder="placeholder" :value="inputValue">
        </template>
    </div>
</template>

<script>
export default {
    props: ['title', 'placeholder', 'inputValue', 'disabled'],

    mounted() {
        
    }
}
</script>

<style lang="css">
</style>
