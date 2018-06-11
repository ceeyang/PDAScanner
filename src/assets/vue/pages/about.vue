<template>
    <f7-page>

        <!-- Nav  -->
        <f7-navbar title="关于我们" back-link="Back"></f7-navbar>

        <div class="about-page">
            <img class="about-logo-img" src="../../images/loginlogo.png"/>
            <div class="about-page company-info">
                <p>深圳市源泰达科技有限公司</p>
                <a class="tell" @click="phoneCall">18108120400</a>
                <a class="website" href="http://ceeyang.com">www.ceeyang.com</a>
            </div>
            <!-- <a class="version-info">LT Version 1.0</a> -->
        </div>
    </f7-page>
</template>

<script>
    export default {

        methods: {
            phoneCall() {
                window.location.href="tel:18108120400"
            }
        },
    }
</script>
