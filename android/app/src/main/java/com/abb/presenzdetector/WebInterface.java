package com.abb.presenzdetector;

import android.content.Context;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

public class WebInterface {
    Context mContext;

    /** Instantiate the interface and set the context */
    WebInterface(Context c) {
        mContext = c;
    }

    /** Show a toast from the web page */
    @JavascriptInterface
    public void showToast(String toast) {
        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
    }
    @JavascriptInterface
    public void startBLEScan(boolean toast) {
        Toast.makeText(mContext, "scan start", Toast.LENGTH_SHORT).show();
    }
    @JavascriptInterface
    public void stopBLEScan(String toast) {
        Toast.makeText(mContext, "scan stop", Toast.LENGTH_SHORT).show();
    }
}