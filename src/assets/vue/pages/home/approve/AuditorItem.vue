<template lang="html">
    <div class="auditor-item">
        <!-- <i class="iconfont device-icon">&#xe736;</i> -->

        <div class="user-name">
            {{item.UserCode}}
        </div>

        <div class="user-status">
            {{getStatus(item.AuditState)}}
        </div>

        <div class="user-time">
            {{item.WaitDate}}
        </div>
    </div>
</template>

<script>
export default {

    props: ['item'],

    data() {
        return {

        }
    },

    mounted() {

    },

    methods: {
        getStatus(value) {
            if (value == 0 ) {
                return "等待中"
            }
            return value
        }
    }
}
</script>

<style lang="css">

</style>
