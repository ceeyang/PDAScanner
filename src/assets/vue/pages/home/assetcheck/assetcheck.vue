<template>
    <f7-page>
        <f7-navbar title="资产盘点" back-link=""></f7-navbar>
        <div class="home-assetcheck">
                <ul class="tab center"  @click = "clickfun($event)">
                    <li class='active'>已有盘点单（{{items.rows.length}}）</li>
                    <li>新增盘点单</li>
                </ul>
                <div class="tab_content">
                    <ul class="have tab_show">
                        <myScroll :items="items.rows" fresh=true :onPullingDown='onPullingDown' :onPullingUp="onPullingUp">
                            <li class="tab_item" v-for="item in items.rows" @click="itemclickaction(item)" >
                                <div class="img_box inline-block center">
                                    <i class="iconfont">&#xe62a;</i>
                                </div>
                                <div class="inline-block text_box">
                                    <h5 class="h5 clearfix">
                                        {{item.BZ}}
                                        <a href="javascript:;"  class="tab_btn center inline-block fr">
                                            删除
                                        </a>
                                    </h5>
                                <p class="text_box_item"><small>{{item.PDRXM}}</small></p> 
                                <p class="text_box_item"><small>一共有<span class="danger">{{parseInt(item.STORE)-0}}</span>&nbsp;/&nbsp;{{parseInt(item.ZDR)-0}}台设备已盘点</small></p>
                                    <p class="text_box_item clearfix">
                                        <small 
                                        :class="parseInt(item.STORE) < parseInt(item.ZDR) ? 'danger' :'succeed'">
                                            {{ parseInt(item.STORE) < parseInt(item.ZDR) ? "未完成" :"已完成" }}
                                        </small>
                                        <small class="fr">
                                            {{item.SHRQ}}
                                        </small>
                                    </p>
                                </div>
                            </li>
                        </myScroll>
                    </ul>
                    <div class="tab_hide add">
                        <form class="pos-r">
                            <div class="form-item">
                                <label for="male" class="inline-block right label-item">盘点单号：</label>
                                <div class="inline-block input-box pos-r">
                                    <input type="text" name="" id="male" />
                                    <span class="pos-a right-text danger">
                                        *必填
                                    </span>
                                </div>
                            </div>
                            <div class="pos-a form-btn-box">
                                <button type="button" id="seva">保存</button>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
    </f7-page>
</template>

<script>
   import datas from './assetcheck.json' 
  import myScroll from '../../../common/scroll.vue'
    export default {
        data () {
            return {
                 items:datas
            }
        },
        mounted(){
           this.setFormHeight()
        },
        methods: {
            phoneCall() {
                window.location.href="tel:18108120400"
            },
            setFormHeight(){
                let addBox = document.querySelector('.tab_content .add')
                let formH = window.innerHeight-44*2
                addBox.style.height=formH+'px'
            },
            clickfun(ev){
                if(!this.hasClass(ev.target,'active')){
                    var oul = document.querySelector('.tab'),
                    lis = oul.querySelectorAll('.tab li'),
                    tab_cont = document.querySelector('.tab_content'),
                    have = tab_cont.querySelector('.have'),
                    add = tab_cont.querySelector('.add')
                    if(ev.target.parentNode==oul){
                        for(var i = 0; i< lis.length;i++){
                            this.removeClass(lis[i],'active')
                        }
                        this.addClass(ev.target,'active')
                        if(ev.target.innerHTML=="新增盘点单"){
                            this.removeClass(have, 'tab_show')
                            this.removeClass(add, 'tab_hide')
                            this.addClass(have, 'tab_hide')
                            this.addClass(add, 'tab_show')
                        }else{
                            this.removeClass(have, 'tab_hide')
                             this.removeClass(add, 'tab_show')
                            this.addClass(have, 'tab_show')
                            this.addClass(add, 'tab_hide')
                        }
                    }
                }
            },
             hasClass(obj, cls) {
                return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
            },
            
             addClass(obj, cls) {
                if (!this.hasClass(obj, cls)) {
                    obj.className += " " + cls;
                }
            },
             removeClass(obj, cls) {
                if (this.hasClass(obj, cls)) {
                    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                    obj.className = obj.className.replace(reg, ' ');
                }
            },
            itemclickaction(data){
                global.assetcheckeddata = data;
                this.$f7router.navigate('/detailAssetcheck/');
            },
            onPullingDown(scroll) {
                console.log('pullingDown: ' + scroll);
                setTimeout(function () {
                    scroll.forceUpdate();
                }, 1000);
            },

            onPullingUp(scroll) {
                setTimeout(function () {
                    scroll.forceUpdate();
                }, 1000);
            }
        },
         components: {
             myScroll
        }
    }
</script>
<style scoped>
</style>