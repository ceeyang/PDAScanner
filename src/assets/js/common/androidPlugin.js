/**
 * Created by zhixueyun on 2017/8/20.
 */
export const exec = (plguinName,functionName,params,success,failed)=>{
    try{
        cordova.require('cordova/channel').onCordovaReady.subscribe(function () {
            cordova.exec(success, failed, plguinName, functionName, params);
        });
    }catch(e){

    }
}
