<template>
    <f7-page>
        <f7-navbar title="资产盘点" back-link=""></f7-navbar>
            <ul class="tab center"  @click = "clickfun($event)">
                <li class='active'>已有盘点单（{{items.rows.length}}）</li>
                <li>新增盘点单</li>
            </ul>
            <div class="tab_content">
                <ul class="have tab_show">
                    <li class="tab_item" v-for="item in items.rows" @click="itemclickaction(item)" >
                        
                        <div class="img_box inline-block">
                                <!--<img :src="item.src" alt="">-->
                            </div>
                        <div class="inline-block text_box">
                            <h5 class="h5 clearfix">
                                {{item.BZ}}
                                <a href="javascript:;"  class="tab_btn center inline-block fr">
                                    删除
                                </a>
                            </h5>
                        <p class="text_box_item"><small>{{item.PDRXM}}</small></p> 
                        <p class="text_box_item"><small>一共有<span class="danger">{{item.STORE}}</span>&nbsp;/&nbsp;{{item.SHRXM}}台设备已盘点</small></p>
                            <p class="text_box_item clearfix">
                                <small 
                                :class="parseInt(item.nowNub) < parseInt(item.sum) ? 'danger' :'succeed'">
                                    {{ parseInt(item.STORE) < parseInt(item.SHRXM) ? "未完成" :"已完成" }}
                                </small>
                                <small class="fr">
                                    {{date}}
                                </small>
                            </p>
                        </div>
                        
                    </li>
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
           
    </f7-page>
</template>

<script>
   import datas from './assetcheck.json'
    export default {
        data () {
            return {
                 items:datas,
                 date :this.getDat()
            }
        },
        mounted(){
           this.setFormHeight()
           console.log(datas)
        },
        methods: {
           sendParams () {  
                this.$router.push({  
                    path: './assetchecked',   
                    name: '要跳转的路径的 name,在 router 文件夹下的 index.js 文件内找',  
                    params: {   
                        name: 'name',   
                        dataObj: this.msg  
                    }  
                })  
            },
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
                        console.log(ev.target.innerHTML)
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
            getDat(){
                let atDate = new Date()
                let seperator1 = "-";
                let year = atDate.getFullYear();
                let month = atDate.getMonth() + 1;
                let strDate = atDate.getDate();
                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (strDate >= 0 && strDate <= 9) {
                    strDate = "0" + strDate;
                }
                let currentdate = year + seperator1 + month + seperator1 + strDate; 
                 return currentdate
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
                this.$f7router.navigate('/assetchecked/');
            }


 
        },
         components: {
            
        }
    }
</script>
<style scoped>
.tab{
    width: 100%;
    font-size: 0;
    background-color: #fff;
}
.tab li{
    width:45%;
    display: inline-block;
    text-align: center;
    font-size: 1rem;
    padding:10px 0;
    font-weight: 400
}

.list_cont{
    margin: 0;
}
.tab_item{
     color:#666666;
    font-size:0;
     margin-top: 3px;
    background-color: #FFFFF0
}
.img_box{
    width:30%;
    height: auto;
    font-size:0;
    padding:5px 7px;
}
.img_box img{
    width:100%;
}
.text_box{
    width:70%;
    font-size:12px
}
.text_box .h5{
    font-size:.5rem;
    color:#333333;
    line-height:20px;
}
.text_box  .h5 .tab_btn{
    color:#666;
    width:2rem;
    height:17px;
    line-height:15px;
    margin: 3px 5px 0 0;
    font-size:12px;
    font-weight: 400;
    background: none;
    border: 1px solid #d2d2d2;
    border-radius: 2px;
}
.text_box_item{
    font-size:12px;
    margin: 0;
}
.text_box_item small+small{
    margin-right: 5px
}
.add{
    overflow: hidden;
    padding-top:30px;
    background:#FFFFF0
}
form{
    height: 100%;
    overflow: hidden
}
.form-item{
    width:90%;
    margin: 0 auto 10px;
    font-size: 0;
    color:#666666
}
.form-item .label-item{
    font-size: 12px;
    width:30%;
    height: 35px;
    line-height: 35px;
     color:#333333
}
.form-item .input-box{
    font-size: 12px;
    width:70%
}
.form-item .input-box input{
    display: block;
    width:95%;
    height: 35px;
    line-height: 35px;
    border:1px solid #c2c2c2;
    border-radius:4px;
    text-indent:1em;
}
.form-item .input-box .right-text{
    top:25%;
    right:8%;
    z-index:0;
}
.form-btn-box{
    width: 100%;
    bottom:0;
}
.form-btn-box button{
    font-size:15px;
    height: 40px;
    line-height:40px;
    outline: none;
    border: none;
    background-color: #70D746;
    color: #fff;
    cursor:pointer  
}

    
    .tab_show{
        display: block
    }
    .tab_hide{
        display: none
    }
</style>