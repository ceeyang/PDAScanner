<template>
    <f7-page>

        <!-- Nav  -->
        <f7-navbar>
            <f7-nav-left>
                <div @click="NavBack">
                    <i class="iconfont">&#xe605;</i>
                </div>
            </f7-nav-left>
            <f7-nav-title title='关于我们'></f7-nav-title>
        </f7-navbar>

        <div class="about-page">
            <img class="about-logo-img" src="../../../images/loginlogo.png"/>
            <div class="about-page company-info">
                <p>{{companyName}}</p>
                <a class="tell" @click="phoneCall">{{supportPhone}}</a>
                <a class="website" href="http://ceeyang.com">{{supportWebsite}}</a>
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
                supportPhone: '',
                supportWebsite: '',
            }
        },

        mounted() {
            this.companyName = this.globalSetting.companyName;
            this.supportPhone = this.globalSetting.supportPhone;
            this.supportWebsite = this.globalSetting.supportWebsite;
        },

        methods: {
            phoneCall() {
                window.location.href="tel:18108120400"
            },

            NavBack() {
                this.$f7router.back()
            },
        },
    }
</script>
