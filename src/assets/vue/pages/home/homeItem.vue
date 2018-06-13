<template>
    <a class="home-item" href="href">
    <!-- <router-link :to="path"> -->
        <slot></slot>
        <p>
        {{text}}
        </p>
    <!-- </router-link> -->
  </a>
</template>

<script>
export default {
    props: ['text', 'path', 'herf']
}
</script>

<style lang="css">
</style>
