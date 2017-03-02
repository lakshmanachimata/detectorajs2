/*
    Developer : Preethi Warrier
    Project : Busch Praesenz Detector App
    Copyrights:ABB GISPL
 */
package com.abb.presenzdetector;

import android.app.ActionBar;
import android.app.Activity;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.View;
import android.view.Menu;
import android.view.MenuItem;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.view.WindowManager.LayoutParams;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.TextView;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

/*
    Main Activity
 */
public class MainActivity extends AppCompatActivity {

    private WebView webview;
    View splashScreen;
    View mainScreen;

    private boolean loaded = false;
    final Activity activity = this;
    Animation out;
    Animation in;
    WebInterface webInterface;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        PackageInfo pInfo = null;
        String buildDate= "2016-12-15\n18:59:12";

        try {
            pInfo = getPackageManager().getPackageInfo(getPackageName(), 0);
            /*ApplicationInfo ai = getPackageManager().getApplicationInfo(getPackageName(), 0);
            ZipFile zf = new ZipFile(ai.sourceDir);
            ZipEntry ze = zf.getEntry("classes.dex");
            long time = ze.getTime();
            Date date = new Date(time);
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd-MMM-yyyy\nHH:mm:ss");
            buildDate = simpleDateFormat.format(new java.util.Date(time));
            zf.close();*/
        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();//zf.close here
        } /*catch (IOException e) {
            e.printStackTrace();
        }*/
        String version = pInfo.versionName;

        LayoutParams lp = new LayoutParams(LayoutParams.MATCH_PARENT,LayoutParams.MATCH_PARENT);
        splashScreen = View.inflate(activity,R.layout.activity_splash,null);
        addContentView(splashScreen, lp);
        webInterface = new WebInterface(getApplicationContext());
        TextView tvLogo = (TextView) (splashScreen.findViewById(R.id.textViewLogo));
        String logoText = "BJE\n presence\n detector";
        tvLogo.setText(logoText);


        TextView tvVersion =(TextView) (splashScreen.findViewById(R.id.textViewVersion));
        String versionText = "Version "+version+"\n"+ buildDate;
        tvVersion.setText(versionText);

        mainScreen = View.inflate(activity, R.layout.activity_main, null);
        addContentView(mainScreen, lp);
        mainScreen.setVisibility(View.INVISIBLE);
        in = AnimationUtils.loadAnimation(activity, android.R.anim.fade_in);
        in.setDuration(2500);//TODO: instead of static duration value,animate as soon as webview is loaded
        webview = (WebView) findViewById(R.id.webViewMain);
        webview.getSettings().setJavaScriptEnabled(true);
        webview.getSettings().setDomStorageEnabled(true);

        //set the status bar color as black
        Window window = activity.getWindow();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(activity.getResources().getColor(android.R.color.black));
        }

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN) {
            webview.getSettings().setAllowUniversalAccessFromFileURLs(true);
            webview.getSettings().setAllowFileAccessFromFileURLs(true);
            webview.clearCache(true);
        }
        webview.setWebContentsDebuggingEnabled(true);

        webview.addJavascriptInterface(webInterface,"BJE");

        webview.setWebViewClient(new WebViewClient() {

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return true;
            }

            @Override
            public void onPageStarted(WebView view, String url, Bitmap favicon) {
                super.onPageStarted(view,url,favicon);
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                // do your stuff here
                if (url.equals("file:///android_asset/")) {
                    if (splashScreen.getVisibility() == View.VISIBLE) {
                        splashScreen.startAnimation(out);
                        splashScreen.setVisibility(View.INVISIBLE);
                        view.loadUrl("javascript:BJ_startBLEScan(true)");
                    }
                    if ((splashScreen.getVisibility() == View.INVISIBLE)
                            && (mainScreen.getVisibility() == View.INVISIBLE)) {
                        mainScreen.startAnimation(in);
                        mainScreen.setVisibility(View.VISIBLE);
                        mainScreen.bringToFront();
                    }
                    loaded = true;
                }
            }
        });

        webview.loadUrl("file:///android_asset/index.html");
        splashScreen.setVisibility(View.VISIBLE);
        splashScreen.bringToFront();

        out = AnimationUtils.loadAnimation(activity, android.R.anim.fade_out);
        out.setDuration(2000);
    }


    @Override
    public void onResume() {
        super.onResume();
        if (loaded) {
            if (webview != null) {
                //Review javaScript Enbable again:
                webview.getSettings().setJavaScriptEnabled(true);
                webview.loadUrl("javascript:resumeListener()");
            }
        }
    }

    @Override
    public void onDestroy() {
        if (webview != null) {
            ViewGroup parent = (ViewGroup) webview.getParent();
            if (parent != null) {
                parent.removeView(webview);
            }
            webview.removeAllViews();
            webview.destroy();
        }
        super.onDestroy();
    }

/*
      @Override
    public void onBackPressed() {
        if (webview.canGoBack()) {
            webview.goBack();
        } else {
            super.onBackPressed();
        }
    }*/
}
