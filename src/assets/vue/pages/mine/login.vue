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


import md5 from 'js-md5';
let MD5KEY = 'YTDF5EF3A6174564E5981A446158F106'

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

            localStorage.account = this.user.account;
            localStorage.password = this.user.password;

            var token = 'UserCode=' + this.user.account + '&Password=' + this.user.password + MD5KEY;
            token = md5(token);
            let vm = this;
            this.get(this.api.login, {'UserCode':this.user.account,'password': this.user.password, 'Token': token}, function(response) {
                var data = JSON.parse(response);
                if (data.Status) {
                    vm.getRepositories();
                }

                else {
                    let msg = data.Msg;
                    console.log(msg);
                    if (!vm.toastCenter) {
                        vm.toastCenter = vm.$f7.toast.create({
                            text: msg,
                            closeTimeout: 2000,
                            position: 'center',
                        });
                    }
                    vm.toastCenter.open();
                }
            });

        },

        getRepositories() {
            // this.post(this.api.repositories, {'type':'StoreHave', 'userId': this.user.account}, function(response) {
            //     console.log(response);
            // })

            this.$f7router.navigate('/', {"animate":false});
        }
    }
}
</script>

<style lang="css">
</style>
