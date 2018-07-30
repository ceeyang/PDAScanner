/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package com.ceeyang.pdascanner;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.view.KeyEvent;

import com.common.plugin.scanner.ScannerPlugin;

import org.apache.cordova.*;

public class MainActivity extends CordovaActivity {

    private ScannerPlugin mScannerPlugin = null;

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }
        loadUrl(launchUrl);
    }

    @Override
    public boolean dispatchKeyEvent(KeyEvent event) {
        if (appView!=null){
            CordovaPlugin scannerPlugin = appView.getPluginManager().getPlugin("ScannerPlugin");
            if (scannerPlugin!=null){
                scannerPlugin.dispatchKeyEvent(event);
            }
        }
        return super.dispatchKeyEvent(event);
    }
}
