<template>
    <f7-page>

        <!-- Nav  -->
        <f7-navbar backLink title="关于我们"></f7-navbar>

        <div class="about-page">
            <img class="about-logo-img" src="../../../images/loginlogo.png"/>
            <div class="about-page company-info">
                <p>{{companyName}}</p>
                <a class="tell" @click="phoneCall">18108120400</a>
                <a class="website" href="http://ceeyang.com">www.ceeyang.com</a>
            </div>
            <!-- <a class="version-info">LT Version 1.0</a> -->
        </div>
    </f7-page>
</template>

<script>
    export default {

        data() {
            return {
                companyName: '',
            }
        },

        mounted() {
            this.companyName = this.globalSetting.companyName;
        },

        methods: {
            NavBack() {
                this.$f7router.back()
            },
            phoneCall() {
                window.location.href="tel:18108120400"
            }
        },
    }
</script>
