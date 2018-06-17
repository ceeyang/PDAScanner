<template lang="html">
    <div class="page-content ptr-content" data-ptr-distance="55" @ptr:refresh="onfresh">

        <div class="ptr-preloader">
          <div class="preloader"></div>
          <div class="ptr-arrow"></div>
        </div>

        <slot></slot>
    </div>
</template>

<script>
export default {

    methods:{


    },


    props:['onfresh', ]
}
</script>
