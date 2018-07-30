package com.common.plugin.scanner;

import android.Manifest;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.os.Build;
import android.support.v4.app.ActivityCompat;
import android.view.KeyEvent;

import com.zbar.lib.CaptureActivity;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaArgs;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.PluginResult;
import org.json.JSONException;

public class ScannerPlugin extends CordovaPlugin{

    private ScannerInterface scannerInterface;
    private CallbackContext curCallbackContext;
    private boolean open = false;

    @Override
    public boolean execute(String action, CordovaArgs args, CallbackContext callbackContext) throws JSONException {
        curCallbackContext = callbackContext;
        if ("init".equals(action)){
            init();
            return true;
        }
        if ("camera".equals(action)){
            startCamera();
            return true;
        }
        return super.execute(action, args, callbackContext);
    }


    private void startCamera() {
            String brand = Build.BRAND;
            if ("idata".equalsIgnoreCase(brand)){
                if(open){
                    return;
                }
                scannerInterface.scan_start();
                open = true;
                new Thread(new Runnable() {
                    @Override
                    public void run() {
                        try {
                            Thread.sleep(1000);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                        open = false;
                        scannerInterface.scan_stop();
                    }
                }).start();
            }else {
                if(ActivityCompat.checkSelfPermission(cordova.getActivity(), Manifest.permission.CAMERA)!= PackageManager.PERMISSION_GRANTED){
                    ActivityCompat.requestPermissions(cordova.getActivity(),new String[]{Manifest.permission.CAMERA},00);
                }else {
                    Intent intent = new Intent(cordova.getActivity(), CaptureActivity.class);
                    intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                    cordova.startActivityForResult(this,intent,Constants.CAMERA_SCANNER);
                }
            }
    }

    private void init(){
        scannerInterface = new ScannerInterface(cordova.getActivity());
        scannerInterface.open();
        scannerInterface.setOutputMode(1);
        //注册一个结果广播接收器
        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(Constants.RESULT_ACTION);
        ScannnerResultRecevier scannnerResultRecevier = new ScannnerResultRecevier(this);
        cordova.getActivity().registerReceiver(scannnerResultRecevier,intentFilter);
    }

    protected void sendMsgTojs(String msg){
        if (curCallbackContext!=null){
            PluginResult pluginResult = new PluginResult(PluginResult.Status.OK,msg);
            pluginResult.setKeepCallback(true);
            curCallbackContext.sendPluginResult(pluginResult);
        }
    }

    @Override
    public void dispatchKeyEvent(KeyEvent event) {
        super.dispatchKeyEvent(event);
        int action = event.getAction();
        int keyCode = event.getKeyCode();
        if (keyCode == 141){
            if (action == KeyEvent.ACTION_DOWN){
                scannerInterface.scan_start();
            }
            if (action == KeyEvent.ACTION_UP){
                scannerInterface.scan_stop();
            }
        }
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent intent) {
        super.onActivityResult(requestCode, resultCode, intent);
        if (requestCode == Constants.CAMERA_SCANNER){
            if (intent == null||intent.getExtras() ==null){
                return;
            }
            String result = intent.getExtras().getString("result");
            sendMsgTojs(result);
        }
    }
}
