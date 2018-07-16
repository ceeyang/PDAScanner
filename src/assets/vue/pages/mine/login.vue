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
            <cube-button class="login-button"@click='login'>登录</cube-button>

            <mt-popup class="warehouse-picker"
            v-model="popupVisible"
            position="bottom">
            <div class="picker-top-buttons">
                <div class="picker-top-buttons">
                    <button class="top-button cancel" @click='pickerCancel'>取消</button>
                    <button class="top-button confirm" @click='pickerConfirm'>确认</button>
                </div>
            </div>
                <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
            </mt-popup>

        </div>
    </f7-page>
</template>

<script>

export default {

    data() {
        return {
            WarehouseData: [],
            popupVisible: false,
            // warehouseNameArr: [],
            currentWarechouse: '',
            user: {
                account: '',
                password: '',
                appsystem: 'iOS',
            },
            slots: [{
                flex: 1,
                values: [''],
                className: 'slot1',
                textAlign: 'center'
            }, ],
            showPicker: false,
        }
    },


    mounted() {
        if (localStorage.account) {
            this.user.account = localStorage.account;
        }

        if (localStorage.password) {
            this.user.password = localStorage.password;
        }


        if (localStorage.isLogined == '1') {
            this.$f7router.navigate('/home/', {"animate": false});
        }
    },


    methods: {

        pickerCancel() {
            this.popupVisible = false;
        },

        pickerConfirm() {
            var storeId = '';
            for (var i = 0; i < this.WarehouseData.length; i++) {
                let item = this.WarehouseData[i];
                if (item.StoreName == this.currentWarechouse) {
                    storeId = this.WarehouseData[i].StoreId;
                    localStorage.storeId = storeId;
                    localStorage.store = item.StoreName
                    continue;
                }
            }

            this.popupVisible = false;
            this.$f7router.navigate('/home/', {"animate": false});
            localStorage.isLogined = '1';
        },

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

            const toast = this.$createToast({
                time: 0,
                txt: '登录中...',
            })
            toast.show()

            localStorage.account = this.user.account;
            localStorage.password = this.user.password;

            // LOGIN
            let params = {
                'UserCode': this.user.account,
                'Password': this.user.password
            }
            let vm = this;
            this.get(this.api.login, params, function(response) {
                console.log(params);
                var data = JSON.parse(response);
                if (data.Status) {
                    localStorage.UserName = data.UserName;
                    vm.getRepositories();
                } else {
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

            toast.hide()

        },

        getRepositories() {

            // 获取仓库地址
            let vm = this;
            let params = {
                'UserCode': this.user.account,
            }
            this.get(this.api.WarehouseList, params, function(response) {

                var data = JSON.parse(response);
                vm.WarehouseData = data.WarehouseList;
                localStorage.WarehouseData = JSON.stringify(data.WarehouseList);

                var warehouseNameArr = [];
                for (var i = 0; i < vm.WarehouseData.length; i++) {
                    let item = vm.WarehouseData[i];
                    warehouseNameArr.push(item.StoreName);
                }
                vm.slots[0].values = warehouseNameArr;
                vm.popupVisible = true;
            })

        },

        onValuesChange(picker, values) {
            this.currentWarechouse = values;
        }
    },
}
</script>

<style lang="css">
</style>
