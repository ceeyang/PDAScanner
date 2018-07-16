<template lang="html">
    <div class="cell-content">
        <div class="cell-content-title">
            {{title}}
        </div>
        <div class="cell-content-subtitle">
            {{subtitle}}
        </div>
    </div>
</template>

<script>
export default {
    props: ['title', 'subtitle']
}
</script>

<style lang="css">
</style>
