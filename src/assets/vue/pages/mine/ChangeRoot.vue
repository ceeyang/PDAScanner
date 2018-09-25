<template>
<f7-page>

    <!-- Nav  -->
    <f7-navbar backLink title="修改接口地址">
        <f7-nav-right>
            <div @click="resetRootUrlBtnDidClick">重置</div>
        </f7-nav-right>
    </f7-navbar>

    <f7-list no-hairlines-md>
        <f7-list-item>
            <f7-label>请输入新的接口地址</f7-label>
            <f7-input type="text" :value="mRootUrl" @input="mRootUrl = $event.target.value" placeholder="请输入新的接口地址" clear-button></f7-input>
        </f7-list-item>
        <f7-block>
            新的地址保存后立即生效, 无须重启 APP
        </f7-block>
        <f7-button @click="saveBtnDidClick">保存</f7-button>
    </f7-list>
</f7-page>
</template>


<script>
export default {

    data() {
        return {
            mRootUrl: '',
        }
    },

    mounted() {
        let rootUrl = localStorage.getItem("rootUrl")
        this.mRootUrl = rootUrl
    },

    methods: {

        /// 保存新的接口地址
        saveBtnDidClick() {
            console.log(this.mRootUrl);
            localStorage.setItem('rootUrl', this.mRootUrl);

            const toast = this.$createToast({
                time: 0,
                txt: "保存地址成功",
                type: 'correct',

            })
            toast.show()
            setTimeout(function () {
                toast.hide()
            }, 2000);
        },

        /// 重置接口地址
        resetRootUrlBtnDidClick() {
            this.urlValue = "http://120.78.92.212:8006"
            localStorage.setItem('rootUrl', "http://120.78.92.212:8006");
            this.mRootUrl = "http://120.78.92.212:8006"

            const toast = this.$createToast({
                time: 0,
                txt: "重置地址成功",
                type: 'correct',

            })
            toast.show()
            setTimeout(function () {
                toast.hide()
            }, 2000);
        },

        NavBack() {
            this.$f7router.back()
        },
    },
}
</script>
