<template>
    <!-- App -->
    <f7-app :params="f7params">
        <f7-statusbar></f7-statusbar>
        <f7-panel left cover>
            <f7-view url="/panel-left/" links-view=".view-main" />
        </f7-panel>
        <f7-view url="/" :main="true" :stack-pages="true" class="ios-edges"></f7-view>
    </f7-app>
</template>
<script>
// Import Routes...
import routes from './routes.js'


export default {
    data() {
        return {
            f7params: {
                name: "医修",
                theme: "ios",
                routes,
                cache: true,
                id: 'com.ceeyang.pdascanner',
            }
        }
    },

    mounted() {

        if (localStorage.isLogined != '1') {
            //this.$f7router.navigate('/login/', {"animate": false});
        } else {
            //this.$f7router.navigate('/')
        }

        let $$ = this.$$

        $$('document').on('page:beforein', function (e) {

        });
    }
}
</script>
