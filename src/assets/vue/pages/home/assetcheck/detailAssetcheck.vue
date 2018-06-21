<template>
    <f7-page>
        <f7-navbar title="盘点单" back-link=""></f7-navbar>
          <div class="conterBox-assetcheck">
              <div class="cont-top" :style="note">
                    <p>
                        <span>{{parseInt(item.STORE)-0}}&nbsp;/&nbsp;</span>{{parseInt(item.ZDR)-0}}
                        <br>
                        台设备已盘点
                    </p>
              </div>
              <div class="cont-cont">
                  <div class="cont-cont-title right">
                    <a href="">查看资产</a>
                </div>
                <ul class="cont-cont-list inline-block">
                    <li><span class="inline-block right">盘点单号：</span>{{item.PDDH}}</li>
                    <li><span class="inline-block right">盘点人：</span>{{item.PDRXM}}</li>
                    <li><span class="inline-block right">盘点生成日期：</span>{{item.SHRQ}}</li>
                    <li><span class="inline-block right">备注：</span>{{item.BZ}}</li>
                </ul>
                <div class="cont-cont-icon inline-block center">
                    <i class="iconfont normal">&#xe62a;</i>
                </div>
              </div>
              <div class="cont-bottom pos-r">
                  <h6 class="h6">盘点单详情</h6>
                  <div class="cont-bottom-text">
                      <p>设备数量：{{parseInt(item.ZDR)-0}}</p>
                      <p>盘点单状态：<span class="danger">未上传</span></p>
                      <button class="pos-a" @click="itemclickaction(item)" >
                          开始盘点
                      </button>
                      <button class="pos-a">上传盘点单</button>
                  </div>
              </div>
          </div>
    </f7-page>
</template>
<script>
    export default {
        data () {
            return {
                  item:'',
                  note: {
                    backgroundImage: "url(" + require("../../../../images/pdd.png") + ")",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "100% 100%",
                },
            }
        },
        mounted(){
            this.setContBottom()
            this.item = global.assetcheckeddata
        },
        methods: {
            phoneCall() {
                window.location.href="tel:18108120400"
            },
            setContBottom(){
                let conterBox = document.querySelector('.conterBox-assetcheck'),
                    contTop = conterBox.querySelector('.cont-top'),
                    contCont = conterBox.querySelector('.cont-cont'),
                    contBottom = conterBox.querySelector('.cont-bottom')
                    contBottom.style.height=parseInt(window.innerHeight-44-10-(contCont.offsetHeight+5)-contTop.offsetHeight)+"px"
            },
            itemclickaction(data){
                global.detailAssetchecked = data;
                this.$f7router.navigate('/beginAassetcheck/');
            }
        }
    }
</script>
<style scoped>
   
</style>