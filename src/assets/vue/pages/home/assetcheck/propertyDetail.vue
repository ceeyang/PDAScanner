<template>
    <f7-page>
        <f7-navbar title="资产明细" back-link=""></f7-navbar>
        <div class="propertyDetail">
            <div class="detail">
                <blockquote class="elem-quote">资产详情明细</blockquote>
                <ul class="list-text">  
                    <li><span class="inline-block">资产名称：</span>{{data.SBMC}}</li>
                    <li><span class="inline-block">设备型号：</span>{{data.SBXH}}</li>
                    <li><span class="inline-block">资产编号：</span>{{data.SBBH}}</li>
                    <li><span class="inline-block">资产条码：</span>{{data.SBTMBH}}</li>
                    <li><span class="inline-block">使用科室：</span>{{data.KSMC}}</li>
                    <li><span class="inline-block">资产规格：</span>{{data.SBXH}}</li>
                    <li><span class="inline-block">单位：</span>台</li>
                    <li><span class="inline-block">启用日期：</span>{{data.QYRQ}}</li>
                    <li><span class="inline-block">原值：</span>{{data.YZ}}</li>
                    <li><span class="inline-block">折旧：</span>{{data.ZJ}}</li>
                    <li><span class="inline-block">净值：</span>{{data.JZ}}</li>
                    <li><span class="inline-block">资产分类：</span>{{data.SBDW}}</li>
                    <li><span class="inline-block">存放地点：</span>{{data.CFDD}}</li>
                    <li><span class="inline-block">设备状态：</span>{{data.SBZT}}</li>
                </ul>
            </div>
           
        </div>
    </f7-page>
</template>
<script>
    export default {
        data () {
            return {
               data:''
            }
        },
        mounted(){
          this.data = global.propertyDetail
        },
        methods: {
        }
    }
</script>
<style scoped>
    .elem-quote{
        border-style:solid;
        border-width:0 0 0 5px;
        border-radius:0 2px 2px 0;
        border-color:#f5cb5f;
        background-color: #fff;
        color: #666666;
        line-height:22px;
        padding:0 15px;
        margin: 5px 0 0;
    }
</style>