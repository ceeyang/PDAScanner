<template>
    <a class="home-item">
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
    props: ['text', 'path']
}
</script>

<style lang="css">
</style>
