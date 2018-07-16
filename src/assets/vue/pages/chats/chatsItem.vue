<template lang="html">
    <div class="chats-item-content">
        <div class="chats-content-type">
            {{item.type}}
        </div>
        <div class="chats-content">
            <div class="chats-content-title">
                {{item.title}}
            </div>
            <div class="chats-content-subtitle">
                {{item.subtitle}}
            </div>
        </div>
        <div class="chats-content-status">
            {{item.status}}
        </div>
    </div>
</template>

<script>
export default {
    props: ['item',]
}
</script>

<style lang="css">
</style>
