
<template>
    <f7-page>
        <f7-navbar title="资产列表" back-link=""></f7-navbar>
        <div class="beginAassetcheck-cont"  ref="viewBox" >
             <segment-bar :titles="titlesArray" @switchTab="switchTab" :selectedIndex="currentIndex" ref="tabs"></segment-bar>
             <ul class="cont_list">
                  <li class="list_item" v-for="(item,index) in items.child" @click="itemclickaction(item)" >
                        <h6 class="clearfix center">
                            <span class="inline-block left fl">{{item.SBMC}}</span>
                            {{item.SBDW}}
                            <span class="fr">×1</span>
                        </h6>
                        <div class="list-item-cont">
                            <div class="item-cont-icon inline-block center">
                                <i class="iconfont middle">&#xe615;</i>
                            </div>
                             <div class="item-cont-text inline-block">
                                 <p>资产编号：{{item.SBBH}}</p>
                                 <p>使用科室：{{item.KSMC}}</p>
                                 <p>设备型号：{{item.SBXH}}</p>
                                 <p>启用日期：{{item.QYRQ}}</p>
                                 <p>资产状态： {{item.SYZT}}</p>
                            </div>
                        </div>
                        <div class="list-item-footer clearfix">
                            <i class="iconfont danger middle">&#xe613;</i>
                            <span>未盘点</span>
                            <button class="inline-block center normal middle fr fz12">
                                详细
                            </button>
                        </div>
                  </li>
             </ul>
        </div>
    </f7-page>
</template>
<script>
    import SegmentBar from '../../../common/segmentBar';
    import datas from './assetcheck.json'
    export default {
        data () {
            return {
                 titlesArray:['全部','未盘点','已盘点'],
                currentIndex:0,
                items:datas,
                box:null
            }
        },
        mounted(){
              this.box = this.$refs.viewBox

              this.box.addEventListener('scroll', this.setScroll, false)
        },
        methods: {
            setScroll(){
                if(this.$refs.viewBox.scrollTop>25){
                    if(!this.hasClass(this.$refs.tabs.$el,'con-top-f')){
                         this.addClass(this.$refs.tabs.$el,'con-top-f')
                     }
                }else{
                    if(this.hasClass(this.$refs.tabs.$el,'con-top-f')){
                         this.removeClass(this.$refs.tabs.$el,'con-top-f')
                     }
                }
            },
            NewTitles(arr,data){
                let NewArrs = []
                let tools = []
                    tools.push(data.totals,data.end,data.not)
                 for(var i = 0; i< arr.length;i++){
                    
                    NewArrs.push(arr[i]+tools[i])
                 }
                return NewArrs
            },
             switchTab(index) {
                this.currentIndex = index;
            },
            phoneCall() {
                window.location.href="tel:18108120400"
            },  
            itemclickaction(data){
                global.propertyDetail = data;
                this.$f7router.navigate('/propertyDetail/');
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
        },
        components: {
         SegmentBar
     }
    }
</script>
<style scoped>
    
</style>