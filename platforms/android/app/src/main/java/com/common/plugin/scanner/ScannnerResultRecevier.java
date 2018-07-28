package com.common.plugin.scanner;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class ScannnerResultRecevier extends BroadcastReceiver{

    private ScannerPlugin mScannerPlugin;

    public ScannnerResultRecevier(ScannerPlugin scannerPlugin) {
        mScannerPlugin = scannerPlugin;
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        if (Constants.RESULT_ACTION.equals(intent.getAction())){
            //回传结果
            String value = intent.getStringExtra("value");
            mScannerPlugin.sendMsgTojs(value);
        }
    }
}
