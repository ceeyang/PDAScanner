
<template>
    <f7-page>
        <f7-navbar title="资产列表" back-link=""></f7-navbar>
        <div class="beginAassetcheck-cont">
             <segment-bar :titles="titlesArray" @switchTab="switchTab" :selectedIndex="currentIndex"></segment-bar>
             <ul class="cont_list">
                  <li class="list_item" v-for="(item,index) in items.child">
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
                                 <p>资产状态： {{zts[index]}}</p>
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
                zts:[]
            }
        },
        mounted(){
          this.titlesArray= this.NewTitles(this.titlesArray,this.items)
          this.setZt(this.items.child,this.items.zt)
        },
        methods: {
            setZt(data,zt){
                var self = this
                data.forEach(function(item,index){
                    zt.forEach(function(items,indexs){
                        if(item.YCZK == items.BH){
                            self.zts.push(items.MC)
                        }
                    })
                })
                
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
                console.log(index)
            },
            phoneCall() {
                window.location.href="tel:18108120400"
            },  
           
        },
        components: {
         SegmentBar
     }
    }
</script>
<style scoped>
  .beginAassetcheck-cont{

  }
  .list_item{
      background-color:#fffbf0;
      border-bottom:2px solid #eeeeee;
  }

  .list_item h6{
      line-height: 15px;
      padding:3px 5px;
      color: #666666;
      font-weight: 400;
      font-size: 13px;
  }
  .list-item-cont{
      font-size:0;
      background-color: #eeeeee;
  }
  .list-item-cont .item-cont-icon{
      width:20%;
      font-size:12px;
      line-height:70px;
  }
   .list-item-cont .item-cont-icon i{
       font-size:45px;
       color:#009688
   }
  .list-item-cont .item-cont-text{
       font-size:12px;
       width:80%;
       color: #828282;
       padding: 2px 0
  }
  .list-item-footer {
      font-size:12px;
      color:#666666
  }
   .list-item-footer span{
       font-size:12px;
       line-height:20px
   }
   .list-item-footer button{
       background:none;
       border: 1px solid #999999;
       border-radius: 10px;
       font-size:12px;
       height: 16px;
       line-height: 16px;
       margin: 3px 10px 0 0;
       padding: 0 5px;
       width:auto;
   }
</style>