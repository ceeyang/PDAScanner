<template>
    <div class="segment-bar"  ref="">
        <div v-for="(title,index) in titles"
             :key="index" class="segment-tab"
              :class="{'active':currentIndex===index}"
               @click="switchTab(index)">{{title}}</div>
    </div>
</template>

<script>
    export default {
        props: {
            titles: {
                type: Array,
                required: true
            },
            selectedIndex: {
                type: Number,
                default: 0,
            }
        },
        data() {
            return {
                currentIndex:this.selectedIndex
            }
        },
        mounted(){
        },
        methods:{
            switchTab(index){
                this.currentIndex = index;
                this.$emit('switchTab',index);
            },
        },
        watch: {
            selectedIndex: function (newValue, oldValue) {
                this.currentIndex = newValue;
            }
        }
    }
</script>
