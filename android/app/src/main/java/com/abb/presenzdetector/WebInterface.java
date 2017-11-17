package com.abb.presenzdetector;

import android.content.Context;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

import org.json.JSONObject;

import java.util.LinkedHashMap;

public class WebInterface {

    public JSONObject DevInfo;
    public String brThreshold;

    public MainActivity mainActivity;

    /** Instantiate the interface and set the context */
    WebInterface(MainActivity c) {
        mainActivity = c;
    }

    /** Show a toast from the web page */
    @JavascriptInterface
    public void showToast(String toast) {
        Toast.makeText(mainActivity, toast, Toast.LENGTH_SHORT).show();
    }
    @JavascriptInterface
    public void startBLEScan(boolean toast) {
        Toast.makeText(mainActivity, "scan start", Toast.LENGTH_SHORT).show();
    }
    @JavascriptInterface
    public void stopBLEScan(String toast) {
        Toast.makeText(mainActivity, "scan stop", Toast.LENGTH_SHORT).show();
    }
    @JavascriptInterface
    public String getDeviceData() {
        return DevInfo.toString();
    }


    @JavascriptInterface
    public String getBrThreshold() {
        return brThreshold;
    }

    @JavascriptInterface
    public void connectDevice(String address) {
        mainActivity.connectDevice(address);
    }

    @JavascriptInterface
    public void disConnectDevice() {
        mainActivity.disConnectDevice();
    }


    @JavascriptInterface
    public void updateDeviceFW(){
        mainActivity.startFWUpdarte();
    }

    @JavascriptInterface
    public boolean readAttr(byte[] data){
        mainActivity.sendBLEAppFrame(data);
        return true;
    }
    @JavascriptInterface
    public boolean writeAttr(byte[] data){
        mainActivity.sendBLEAppFrame(data);
        return true;
    }
    @JavascriptInterface
    public boolean configureAttr(byte[] data){
        mainActivity.sendBLEAppFrame(data);
        return true;
    }
    @JavascriptInterface
    public void killApp() {
        mainActivity.killApp();
    }

    @JavascriptInterface
    public void reLaunchMe(){
        mainActivity.reLaunchMe();
    }




}
