/*
    Developer : Preethi Warrier
    Project : Busch Praesenz Detector App
    Copyrights:ABB GISPL
 */
package com.abb.presenzdetector;

import android.app.ActionBar;
import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothGattCharacteristic;
import android.bluetooth.BluetoothGattService;
import android.bluetooth.BluetoothManager;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.ServiceConnection;
import android.content.pm.ApplicationInfo;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.ParcelUuid;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.text.TextUtils;
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
import android.widget.ExpandableListView;
import android.widget.SimpleExpandableListAdapter;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONObject;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.nio.ByteBuffer;
import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.Dictionary;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipFile;

/*
    Main Activity
 */
public class MainActivity extends Activity {

    private WebView webview;
    View splashScreen;
    View mainScreen;
    static final int EBLE_128BitUUIDCom   = 0x07;//«Complete List of 128-bit Service Class UUIDs»	Bluetooth Core Specification:
    static final int EBLE_32BitUUIDCom    = 0x05;//«Complete List of 32-bit Service Class UUIDs»	Bluetooth Core Specification:

    private final String LIST_NAME = "NAME";
    private final String LIST_UUID = "UUID";
    int infocharcount = 0;
    LinkedHashMap  deviceInfo  =  new LinkedHashMap();


    boolean blePacketStart = false;
    boolean blePacketEnd = false;
    byte blePacketCounter = 0;
    ByteBuffer bleRecvBuffer;
    private BluetoothLeService mBluetoothLeService;
    private boolean loaded = false;
    final Activity activity = this;
    private BluetoothAdapter mBluetoothAdapter;
    private boolean mScanning;
    private Handler mHandler;
    Animation out;
    ArrayList <BluetoothGattService> mGattServices =  new ArrayList<>();

    BluetoothGattCharacteristic writeCharecteristic;
    private boolean mConnected = false;
    private BluetoothGattCharacteristic mNotifyCharacteristic;
    Animation in;
    WebInterface webInterface;
    private static final int REQUEST_ENABLE_BT = 1;
    // Stops scanning after 10 seconds.
    private static final long SCAN_PERIOD = 10000;


    class ScannedDeviceInfo{
        int hascode;
        BluetoothDevice device;
    }

    ArrayList<ScannedDeviceInfo> scannedDevices =  new ArrayList<>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        PackageInfo pInfo = null;
        String buildDate= "2016-12-15\n18:59:12";
        mHandler = new Handler();
        try {
            pInfo = getPackageManager().getPackageInfo(getPackageName(), 0);

        } catch (PackageManager.NameNotFoundException e) {
            e.printStackTrace();//zf.close here
        }
        String version = pInfo.versionName;
        final BluetoothManager bluetoothManager =
                (BluetoothManager) getSystemService(Context.BLUETOOTH_SERVICE);
        mBluetoothAdapter = bluetoothManager.getAdapter();

        // Checks if Bluetooth is supported on the device.
        if (mBluetoothAdapter == null) {
            Toast.makeText(this, "Bluetooth not supported", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }
        LayoutParams lp = new LayoutParams(LayoutParams.MATCH_PARENT,LayoutParams.MATCH_PARENT);
        splashScreen = View.inflate(activity,R.layout.activity_splash,null);
        addContentView(splashScreen, lp);
        webInterface = new WebInterface(MainActivity.this);
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
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            webview.setWebContentsDebuggingEnabled(true);
        }

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
                if (url.equals("file:///android_asset/") ||
                        url.equals("file:///android_asset/welcome")) {
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
        Intent gattServiceIntent = new Intent(this, BluetoothLeService.class);
        bindService(gattServiceIntent, mServiceConnection, BIND_AUTO_CREATE);
    }

    private final ServiceConnection mServiceConnection = new ServiceConnection() {

        @Override
        public void onServiceConnected(ComponentName componentName, IBinder service) {
            mBluetoothLeService = ((BluetoothLeService.LocalBinder) service).getService();
            if (!mBluetoothLeService.initialize()) {
                finish();
            }
            // Automatically connects to the device upon successful start-up initialization.
            if(scannedDevices.size() > 0)
                mBluetoothLeService.connect(scannedDevices.get(0).device.getAddress());

        }

        @Override
        public void onServiceDisconnected(ComponentName componentName) {
            mBluetoothLeService = null;
        }
    };

    private static IntentFilter makeGattUpdateIntentFilter() {
        final IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction(BluetoothLeService.ACTION_GATT_CONNECTED);
        intentFilter.addAction(BluetoothLeService.ACTION_GATT_DISCONNECTED);
        intentFilter.addAction(BluetoothLeService.ACTION_GATT_SERVICES_DISCOVERED);
        intentFilter.addAction(BluetoothLeService.ACTION_DATA_AVAILABLE);
        return intentFilter;
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        // User chose not to enable Bluetooth.
        if (requestCode == REQUEST_ENABLE_BT && resultCode == Activity.RESULT_CANCELED) {
            finish();
            return;
        }
        super.onActivityResult(requestCode, resultCode, data);
        scanLeDevice(true);
    }

    @Override
    public void onResume() {
        super.onResume();
        deviceInfo.clear();
        if (!mBluetoothAdapter.isEnabled()) {
            Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
            startActivityForResult(enableBtIntent, REQUEST_ENABLE_BT);
        }
        else {
            scanLeDevice(true);
        }
        if (loaded) {
            if (webview != null) {
                //Review javaScript Enbable again:
                webview.getSettings().setJavaScriptEnabled(true);
                //webview.loadUrl("javascript:resumeListener()");
            }
        }
        registerReceiver(mGattUpdateReceiver, makeGattUpdateIntentFilter());

    }

    private final BroadcastReceiver mGattUpdateReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            final String action = intent.getAction();
            if (BluetoothLeService.ACTION_GATT_CONNECTED.equals(action)) {
                mConnected = true;
                deviceInfo.put("btDeviceName",scannedDevices.get(0).device.getName());
                invalidateOptionsMenu();
            } else if (BluetoothLeService.ACTION_GATT_DISCONNECTED.equals(action)) {
                mConnected = false;
                invalidateOptionsMenu();
            } else if (BluetoothLeService.ACTION_GATT_SERVICES_DISCOVERED.equals(action)) {
                displayGattServices(mBluetoothLeService.getSupportedGattServices());
                getDeviceInfo();
            } else if (BluetoothLeService.ACTION_DATA_AVAILABLE.equals(action)) {
                    byte[] data = intent.getByteArrayExtra(BluetoothLeService.EXTRA_DATA);

                    String charecterstic = intent.getStringExtra(BluetoothLeService.EXTRA_CHARECTERSTIC);
                    if(charecterstic.contains("00805f9b34fb")) {
                        if (charecterstic.contains("2a29")) {
                            deviceInfo.put("manufacturerName", new String(data));
                        }
                        if (charecterstic.contains("2a24")) {
                            deviceInfo.put("modelNumber", new String(data));
                        }
                        if (charecterstic.contains("2a26")) {
                            deviceInfo.put("firmwareRevision", new String(data));
                        }
                        if (charecterstic.contains("2a28")) {
                            deviceInfo.put("softwareRevision", new String(data));
                        }
                        if (deviceInfo.size() >= 5) {
                            //mBluetoothLeService.disconnect();
                            sendDeviceInfo();
                            Toast.makeText(getApplicationContext(), "Go to detector now", Toast.LENGTH_LONG).show();
                        }
                    }else if(charecterstic.equalsIgnoreCase("0783b03e-8535-b5a0-7140-a304d2495cb8")){

                        byte[] rawdata = data;
                        if (rawdata.length == 2 && rawdata[0] == (byte) 126) {
                            blePacketStart = true;
                            bleRecvBuffer = ByteBuffer.allocate(rawdata[1]);
                            bleRecvBuffer.put(rawdata[1]);
                            blePacketCounter = 0;
                        }
                        else if (blePacketStart == true) {


                            if (rawdata[0] == (byte) 126) {
                                if (blePacketCounter == bleRecvBuffer.get(0) -1) {
                                    blePacketEnd = true;
                                    char recvCRC = SCCPEnumerations.computeCRC(bleRecvBuffer.array());
                                    if (recvCRC == 0) {
                                        byte[] recvData = bleRecvBuffer.array();
                                        Log.d("BJE", "CRC MATCH");
                                        if(recvData[4] == 0x31 && recvData[3] == 0x06){

                                            char data1 = (char)(recvData[8] & 0x00FF);
                                            data1 = (char)(data1 << 8);
                                            char data2 = (char)(recvData[7] & 0x00FF);
                                            char brData = (char)(data1 | data2);
                                            setBrDataBack((int)brData);
                                        }

                                    }
                                    else {
                                        Log.d("BJE", "CRC MIS MATCH");
                                    }
                                }
                                else {
                                    Log.d("BJE", "LENGTH MIS MATCH");
                                }
                            }
                            else {
                                for (int i = 0; i < rawdata.length; i++) {
                                    bleRecvBuffer.put(rawdata[i]);
                                }

                                blePacketCounter = (byte) (blePacketCounter + (byte) rawdata.length);
                            }
                        }
                    }

            }
        }
    };


    void setBrDataBack(int brData) {
        webInterface.brThreshold = Integer.toString(brData);
        webview.loadUrl("javascript:BJ_getBrThreshold()");
    }

    void sendBLEdata(char value) {
        sendRequestFrame(SCCPEnumerations.WRITE_ATTRIBUTE_REQUEST,value);
    }

    void sendRequestFrame(final int command, final char val) {

        final Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                byte mydata[] = new byte[5];
                mydata[0] = (byte) 0x31;
                mydata[1] = (byte) 0x00;
                mydata[2] = (byte) SCCPEnumerations.SCCP_TYPE_UINT16;
                mydata[3] = ((byte)(val & 0x00FF));
                mydata[4] = (byte)(val >> 8);

                final byte[] data = SCCPEnumerations.makeRequestFrame(command, mydata);
                for(int i =0; i < mGattServices.size(); i++) {
                    if (mGattServices.get(i).getUuid().toString().equalsIgnoreCase(SCCPEnumerations.DSPS_SERVICE)) {
                        final List<BluetoothGattCharacteristic> gattCharacteristics =
                                mGattServices.get(i).getCharacteristics();
                        if (writeCharecteristic != null) {
                            writeCharecteristic.setValue(data);
                            writeCharecteristic.setWriteType(BluetoothGattCharacteristic.WRITE_TYPE_NO_RESPONSE);
                            mBluetoothLeService.writeCharacteristic(writeCharecteristic);
                            return;
                        }
                        else {
                            for (int j = 0; j < gattCharacteristics.size(); j++) {
                                if (gattCharacteristics.get(j).getUuid().toString().equalsIgnoreCase(SCCPEnumerations.SERVER_RX_DATA)) {
                                    BluetoothGattCharacteristic writeme = gattCharacteristics.get(j);
                                    writeme.setValue(data);
                                    writeme.setWriteType(BluetoothGattCharacteristic.WRITE_TYPE_NO_RESPONSE);
                                    mBluetoothLeService.writeCharacteristic(writeme);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }, 10);
    }


    public void notifyForBrThreshold(boolean value) {
        if(value == false)
            return;
        final Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                byte mydata[] = new byte[6];
                mydata[0] = (byte) 0x31;
                mydata[1] = (byte) 0x00;
                mydata[2] = (byte) 0x03;
                mydata[3] = (byte) 0x00;
                mydata[4] = (byte) 0x0A;
                mydata[5] = (byte) 0x00;

                final byte[] data = SCCPEnumerations.makeRequestFrame(SCCPEnumerations.CONFIGURE_REPORTING_REQUEST, mydata);

                for(int i =0; i < mGattServices.size(); i++) {
                    if (mGattServices.get(i).getUuid().toString().equalsIgnoreCase(SCCPEnumerations.DSPS_SERVICE)) {
                        final List<BluetoothGattCharacteristic> gattCharacteristics =
                                mGattServices.get(i).getCharacteristics();
                        if (writeCharecteristic != null) {
                            writeCharecteristic.setValue(data);
                            writeCharecteristic.setWriteType(BluetoothGattCharacteristic.WRITE_TYPE_NO_RESPONSE);
                            mBluetoothLeService.writeCharacteristic(writeCharecteristic);
                            return;
                        }
                        else {
                            for (int j = 0; j < gattCharacteristics.size(); j++) {
                                if (gattCharacteristics.get(j).getUuid().toString().equalsIgnoreCase(SCCPEnumerations.SERVER_RX_DATA)) {
                                    BluetoothGattCharacteristic writeme = gattCharacteristics.get(j);
                                    writeme.setValue(data);
                                    writeme.setWriteType(BluetoothGattCharacteristic.WRITE_TYPE_NO_RESPONSE);
                                    mBluetoothLeService.writeCharacteristic(writeme);
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }, 10);
    }



    public void sendDeviceInfo() {
        MainActivity.this.runOnUiThread(new Runnable() {
            @Override
            public void run() {
                webInterface.DevInfo = new JSONObject(deviceInfo);
                webview.loadUrl("javascript:BJ_updateScanList()");
            }
        });
    }


    public void getDeviceInfo() {
        for(int i =0; i < mGattServices.size(); i++) {
            if(mGattServices.get(i).getUuid().toString().equalsIgnoreCase(SCCPEnumerations.INFO_SERVICE)){
                final List<BluetoothGattCharacteristic> gattCharacteristics =
                        mGattServices.get(i).getCharacteristics();

                final Handler handler = new Handler();
                infocharcount = 0;
                handler.postDelayed(new Runnable() {
                    @Override
                    public void run() {
                        if(infocharcount<gattCharacteristics.size()) {
                            mBluetoothLeService.readCharacteristic(gattCharacteristics.get(infocharcount));
                            infocharcount++;
                            handler.postDelayed(this,1000);
                        }else {
                            handler.removeCallbacks(this);
                        }

                    }
                }, 1000);
            }
            else if(mGattServices.get(i).getUuid().toString().equalsIgnoreCase(SCCPEnumerations.DSPS_SERVICE)) {
                    final List<BluetoothGattCharacteristic> gattCharacteristics =
                            mGattServices.get(i).getCharacteristics();
                for(int j =0;j < gattCharacteristics.size(); j++ ){
                    String uuidstr = gattCharacteristics.get(j).getUuid().toString();
                    if(uuidstr.equalsIgnoreCase(SCCPEnumerations.SERVER_RX_DATA)) {
                        writeCharecteristic =  gattCharacteristics.get(j);
                    }else if(uuidstr.equalsIgnoreCase(SCCPEnumerations.SERVER_TX_DATA)) {
                        mBluetoothLeService.setCharacteristicNotification(gattCharacteristics.get(j),true);
                    }
                }
            }

        }
    }

    private void displayGattServices(List<BluetoothGattService> gattServices) {
        mGattServices.addAll(gattServices);
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

    private BluetoothAdapter.LeScanCallback mLeScanCallback =
            new BluetoothAdapter.LeScanCallback() {

                @Override
                public void onLeScan(final BluetoothDevice device, int rssi, final byte[] scanRecord) {
                    runOnUiThread(new Runnable() {
                        @Override
                        public void run() {
                            if(device.getName() != null && device.getName().equalsIgnoreCase("BJE_HOLGER")){
                                if(mBluetoothLeService != null) {
                                    mBluetoothLeService.connect(device.getAddress());

                                    boolean deviceExists = false;
                                    for(int i = 0; i < scannedDevices.size(); i++) {
                                        if(device.hashCode() == scannedDevices.get(i).hascode) {
                                            deviceExists = true;
                                            break;
                                        }
                                    }
                                    if(deviceExists == false){
                                        ScannedDeviceInfo deviceInfo = new ScannedDeviceInfo();
                                        deviceInfo.hascode = device.hashCode();
                                        deviceInfo.device = device;
                                        scannedDevices.add(deviceInfo);
                                    }
                                }
                            }
                        }
                    });
                }
            };






    private void scanLeDevice(final boolean enable) {

        if (enable) {
            scannedDevices.clear();
            // Stops scanning after a pre-defined scan period.
            mHandler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    mScanning = false;
                    mBluetoothAdapter.stopLeScan(mLeScanCallback);
                    invalidateOptionsMenu();
                }
            }, SCAN_PERIOD);

            mScanning = true;
            mBluetoothAdapter.startLeScan(mLeScanCallback);
        } else {
            mScanning = false;
            mBluetoothAdapter.stopLeScan(mLeScanCallback);
        }
        invalidateOptionsMenu();
    }

}
