<template lang="html">
    <f7-page class="page-login">

        <!-- background  -->
        <!-- <img class="login-background-image" src="../../../images/loginbackgroundimg.png"> -->
        <div class="login-background-image"></div>

        <!-- login content  -->
        <div class="login-content">

            <!-- logo -->
            <img class="login-logo" src="../../../images/loginlogo.png">

            <!-- input item -->
            <div class="login-input-div">
                <form class="login-input list form-store-data" id="demo-form">
                    <li class="item-content item-input">
                        <div class="item-inner">
                            <div class="item-title item-label">账号</div>
                            <div class="item-input-wrap">
                                <input v-model='user.account' name="name" type="text" placeholder="请输入您的账号">
                                <span class="input-clear-button"></span>
                            </div>
                        </div>
                    </li>
                    <li class="item-content item-input">
                        <div class="item-inner">
                            <div class="item-title item-label">密码</div>
                            <div class="item-input-wrap">
                                <input v-model='user.password' name="password" type="password" placeholder="请输入您的密码">
                                <span class="input-clear-button"></span>
                            </div>
                        </div>
                    </li>
                </form>
            </div>

            <!-- login button -->
            <f7-button class="login-button"@click='login'>登录</f7-button>


        </div>

    </f7-page>
</template>

<script>

export default {



    data(){
        return {
            user: {
                account:'',
                password: '',
                appsystem: 'iOS',
            }
        }
    },

    mounted () {
        if (localStorage.account) {
            this.user.account = localStorage.account;
        }

        if (localStorage.password) {
            this.user.password = localStorage.password;
        }
    },

    methods: {
        login() {

            console.log(this.user);

            if (this.user.account.length < 1) {
                const self = this;
                if (!self.toastCenter) {
                    self.toastCenter = self.$f7.toast.create({
                        text: '请输入您的账号',
                        closeTimeout: 2000,
                        position: 'center',
                    });
                }
                self.toastCenter.open();
                return;
            }

            if (this.user.password.length < 1) {
                const self = this;
                if (!self.toastCenter) {
                    self.toastCenter = self.$f7.toast.create({
                        text: '请输入您的密码',
                        closeTimeout: 2000,
                        position: 'center',
                    });
                }
                self.toastCenter.open();
                return;
            }

            if (this.user.password !== 'admin') {
                const self = this;
                if (!self.toastCenter) {
                    self.toastCenter = self.$f7.toast.create({
                        text: '您输入的密码不正确',
                        closeTimeout: 2000,
                        position: 'center',
                    });
                }
                self.toastCenter.open();
                return;
            }


            localStorage.account = this.user.account;
            localStorage.password = this.user.password;

            this.$f7router.navigate('/', {"animate":false});
        }
    }
}
</script>

<style lang="css">
</style>
