<template lang="html">
    <div class="information-cell-content">
        <div class="content-name">
            {{title}}
        </div>
        :
        <div class="content-value">
            {{value}}
        </div>
    </div>
</template>

<script>
export default {
    props:["title", "value"]
}
</script>

<style lang="css" >
</style>
