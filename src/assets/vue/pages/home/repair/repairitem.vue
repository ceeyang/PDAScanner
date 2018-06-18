<template>
    <a class="repair-item" :href="href">
        <slot></slot>
        <p>
        {{text}}
        </p>
  </a>
</template>

<script>
export default {
    props: ['text', 'path', 'href']
}
</script>

<style lang="css">
</style>
