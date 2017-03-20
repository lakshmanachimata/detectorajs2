/*
    Developer : Preethi Warrier
    Project : Busch Praesenz Detector App
    Copyrights:ABB GISPL
 */
package com.abb.presenzdetector;

import android.Manifest;
import android.app.Activity;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothGatt;
import android.bluetooth.BluetoothGattCharacteristic;
import android.bluetooth.BluetoothGattService;
import android.bluetooth.BluetoothManager;
import android.bluetooth.le.BluetoothLeScanner;
import android.bluetooth.le.ScanCallback;
import android.bluetooth.le.ScanResult;
import android.content.BroadcastReceiver;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.ServiceConnection;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.view.WindowManager.LayoutParams;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.TextView;
import android.widget.Toast;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;

import org.json.JSONArray;
import org.json.JSONObject;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.UUID;

/*
    Main Activity
 */
public class MainActivity extends AppCompatActivity {

    private WebView webview;
    View splashScreen;
    View mainScreen;

    int infocharcount = 0;
    BluetoothManager bluetoothManager;
    boolean blePacketStart = false;
    boolean blePacketEnd = false;
    byte blePacketCounter = 0;
    ByteBuffer bleRecvBuffer;

    private BluetoothLeService mBluetoothLeService;
    private boolean loaded = false;
    final Activity activity = this;
    private BluetoothAdapter mBluetoothAdapter;
    private Handler mHandler;
    Animation out;

    ArrayList <BluetoothGattService> mGattServices =  new ArrayList<>();
    BluetoothGattCharacteristic writeCharecteristic;

    Animation in;
    WebInterface webInterface;
    private static final int REQUEST_ENABLE_BT = 1;
    // Stops scanning after 10 seconds.
    private static final long SCAN_PERIOD = 5000;
    JSONArray inDataArray = new JSONArray();

    int deviceIndex = 0;

    boolean getDeviceInfo =  false;
    private static final int REQUEST_PERMISSIONS = 124;
    private static String[] PERMISSIONS_BJE = {
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_COARSE_LOCATION,
    };

    class DetectorInfo {
        String hashCode;
        String btDeviceName;
        String modelNumber;
        String manufacturerName;
        String firmwareVersion;
        String softwareVersion;
        String btAddress;
    }
    BluetoothLeScanner scanner;
    BluetoothGatt mBleGatt;

    LinkedHashMap<String, String> deviceInfo = new LinkedHashMap<>();

    ArrayList<DetectorInfo> scannedDevices =  new ArrayList<>();
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

        if (android.os.Build.VERSION.SDK_INT >= 23) {
            verifyStoragePermissions(MainActivity.this);
        }
        else {
            setUpBluetooth();
        }


        String version = pInfo.versionName;

        // Checks if Bluetooth is supported on the device.

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
        webview.addJavascriptInterface(webInterface,"BJE");

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


    void setUpBluetooth() {


        bluetoothManager =
                (BluetoothManager) getSystemService(Context.BLUETOOTH_SERVICE);
        mBluetoothAdapter = bluetoothManager.getAdapter();
        scanner = mBluetoothAdapter.getBluetoothLeScanner();

        if (mBluetoothAdapter == null) {
            Toast.makeText(this, "Bluetooth not supported", Toast.LENGTH_SHORT).show();
            finish();
            return;
        }
        if (mBluetoothAdapter != null && !mBluetoothAdapter.isEnabled()) {
            Intent enableBtIntent = new Intent(BluetoothAdapter.ACTION_REQUEST_ENABLE);
            startActivityForResult(enableBtIntent, REQUEST_ENABLE_BT);
        }
        else {
            scanLeDevice(true);
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode,
                                           String permissions[], int[] grantResults) {
        switch (requestCode) {
            case REQUEST_PERMISSIONS: {
                // If request is cancelled, the result arrays are empty.
                if (grantResults.length > 0
                        && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    setUpBluetooth();
                } else {
                    // handle permissions rejection
                }
                return;
            }
        }
    }


    public  void verifyStoragePermissions(Activity activity) {
        // Check if we have write permission
        int permission = ActivityCompat.checkSelfPermission(activity, Manifest.permission.ACCESS_FINE_LOCATION);

        if (permission != PackageManager.PERMISSION_GRANTED) {
            // We don't have permission so prompt the user
            ActivityCompat.requestPermissions(
                    activity,
                    PERMISSIONS_BJE,
                    REQUEST_PERMISSIONS
            );
        }
        else if(permission == PackageManager.PERMISSION_GRANTED) {
            setUpBluetooth();
        }
    }


    private final ServiceConnection mServiceConnection = new ServiceConnection() {

        @Override
        public void onServiceConnected(ComponentName componentName, IBinder service) {
            mBluetoothLeService = ((BluetoothLeService.LocalBinder) service).getService();
            if (!mBluetoothLeService.initialize()) {
                finish();
            }

            mBleGatt =  mBluetoothLeService.getGatt();
            // Automatically connects to the device upon successful start-up initialization.
            if(scannedDevices.size() > 0)
                mBluetoothLeService.connect(scannedDevices.get(0).btAddress);

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

        if (loaded) {
            if (webview != null) {
                //Review javaScript Enbable again:
                webview.getSettings().setJavaScriptEnabled(true);
            }
        }
        registerReceiver(mGattUpdateReceiver, makeGattUpdateIntentFilter());

    }

    void connectDevice(final String address){
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                getDeviceInfo = true;
                mBluetoothLeService.connect(address);
            }
        });
    }

    void disConnectDevice() {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                getDeviceInfo = false;
                mBluetoothLeService.disconnect();
            }
        });
    }

    void connectNextDevice() {
        final Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        if (deviceIndex < scannedDevices.size()) {
                            mBluetoothLeService.connect(scannedDevices.get(deviceIndex).btAddress);
                        }
                        else {
                            sendDeviceInfo();
                        }
                    }
                });
            }
        },10);
    }

    void notifyAppAboutConnection(){
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                BluetoothDevice device = mBluetoothLeService.getGatt().getDevice();
                try {
                    JSONObject jsonObject =  new JSONObject();
                    jsonObject.put("deviceaddress",device.getAddress());
                    String deviceData = "";
                    deviceData = deviceData + "onDeviceConnected(";
                    deviceData = deviceData + jsonObject.toString() + ")";
                    webview.evaluateJavascript(deviceData, null);
                }catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    private final BroadcastReceiver mGattUpdateReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            final String action = intent.getAction();
            if (BluetoothLeService.ACTION_GATT_CONNECTED.equals(action)) {
                if(getDeviceInfo == true)
                    notifyAppAboutConnection();
            }
            else if (BluetoothLeService.ACTION_GATT_DISCONNECTED.equals(action)) {
                connectNextDevice();
            }
            else if (BluetoothLeService.ACTION_GATT_SERVICES_DISCOVERED.equals(action)) {
                getGattServices(mBluetoothLeService.getSupportedGattServices());
                getDeviceInfo();
            }
            else if (BluetoothLeService.ACTION_DATA_AVAILABLE.equals(action)) {
                setDeviceInfo(intent);
            }
        }
    };

    void sendBLEDataToApp(final byte[] data) {
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                char sendData[] = new char[data.length];
                for(int i = 0; i < data.length; i++) {
                    sendData[i] = (char)(0x00FF & data[i]);
                }
                try {
                    String devicesdata = "";
                    JSONObject dataobject = new JSONObject();
                    String text = String.copyValueOf(sendData);
                    dataobject.put("data",text);
                    devicesdata = devicesdata + "setBLEDataToService(";
                    devicesdata = devicesdata + dataobject.toString() + ")";
                    webview.evaluateJavascript(devicesdata, null);
                }catch ( Exception e) {
                    e.printStackTrace();
                }

            }
        });
    }

    void setDeviceInfo(final Intent intent){
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                byte[] data = intent.getByteArrayExtra(BluetoothLeService.EXTRA_DATA);
                String charecterstic = intent.getStringExtra(BluetoothLeService.EXTRA_CHARECTERSTIC);

                if (charecterstic.contains("00805f9b34fb")) {

                    if (charecterstic.contains("2a29")) {
                        deviceInfo.put("manufacturerName", new String(data));
                    }
                    if (charecterstic.contains("2a24")) {
                        deviceInfo.put("modelNumber", new String(data));
                    }
                    if (charecterstic.contains("2a26")) {
                        deviceInfo.put("firmwareVersion", new String(data));
                    }
                    if (charecterstic.contains("2a28")) {
                        deviceInfo.put("softwareVersion", new String(data));
                    }
                    if (deviceInfo.size() == 4 && deviceIndex < scannedDevices.size()) {
                        scannedDevices.get(deviceIndex).manufacturerName = deviceInfo.get("manufacturerName");
                        scannedDevices.get(deviceIndex).modelNumber = deviceInfo.get("modelNumber");
                        scannedDevices.get(deviceIndex).firmwareVersion = deviceInfo.get("firmwareVersion");
                        scannedDevices.get(deviceIndex).softwareVersion = deviceInfo.get("softwareVersion");

                        mBluetoothLeService.disconnect();
                        deviceInfo.clear();
                        deviceIndex = deviceIndex + 1;
                    }
                }
                else if (charecterstic.equalsIgnoreCase("0783b03e-8535-b5a0-7140-a304d2495cb8")) {

                    byte[] rawdata = data;
                    if (rawdata.length == 2 && rawdata[0] == (byte) 126) {
                        blePacketStart = true;
                        inDataArray =  new JSONArray();
                        bleRecvBuffer = ByteBuffer.allocate(rawdata[1]);
                        bleRecvBuffer.put(rawdata[1]);
                        blePacketCounter = 0;
                    }
                    else if (blePacketStart == true) {


                        if (rawdata[0] == (byte) 126) {
                            if (blePacketCounter == bleRecvBuffer.get(0) - 1) {
                                blePacketEnd = true;
                                char recvCRC = SCCPEnumerations.computeCRC(bleRecvBuffer.array());
                                if (recvCRC == 0) {
                                    byte[] recvData = bleRecvBuffer.array();
                                    Log.d("BJE", "CRC MATCH");
                                    sendBLEDataToApp(bleRecvBuffer.array());
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
        });
    }




   void sendBLEAppFrame(byte[] appData) {
       sendBLEFrame(appData);
   }


    void sendBLEFrame(final byte[] data) {

        final Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {

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
                try {
                    Gson gson = new GsonBuilder().create();
                    JsonArray myCustomArray = gson.toJsonTree(scannedDevices).getAsJsonArray();
                    String devicesdata =  "updateScanList(";
                    devicesdata = devicesdata + myCustomArray.toString();
                    devicesdata = devicesdata + ")";
                    Toast.makeText(getApplicationContext(),"DEVICE CONNECTED ,GO TO ELECTRICIAN",Toast.LENGTH_LONG).show();
                    webview.evaluateJavascript(devicesdata,null);
                }catch (Exception e) {
                    e.printStackTrace();
                }
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
                        if(gattCharacteristics.size() > 0 && (gattCharacteristics.get(infocharcount).getUuid().toString().contains("2a24")
                                || gattCharacteristics.get(infocharcount).getUuid().toString().contains("2a26")
                                || gattCharacteristics.get(infocharcount).getUuid().toString().contains("2a28")
                                || gattCharacteristics.get(infocharcount).getUuid().toString().contains("2a29"))
                                ){
                            mBluetoothLeService.readCharacteristic(gattCharacteristics.get(infocharcount));
                            infocharcount++;
                            handler.postDelayed(this,200);
                        }else {
                            handler.removeCallbacks(this);
                        }

                    }
                }, 200);
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

    private void getGattServices(List<BluetoothGattService> gattServices) {
        mGattServices.clear();
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
        unbindService(mServiceConnection);
    }




    ScanCallback bleCallback =  new ScanCallback() {
        @Override
        public void onScanResult(int callbackType, final ScanResult result) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    BluetoothDevice device = result.getDevice();
                    if(device.getName() != null && device.getName().equalsIgnoreCase("BJE_HOLGER")){
                        if(mBluetoothLeService != null) {
                            boolean deviceExists = false;
                            //parseAdvertisementPacket(scanRecord);
                            for(int i = 0; i < scannedDevices.size(); i++) {
                                if(device.hashCode() == Integer.parseInt(scannedDevices.get(i).hashCode)) {
                                    deviceExists = true;
                                    break;
                                }
                            }
                            if(deviceExists == false){
                                DetectorInfo deviceInfo = new DetectorInfo();
                                deviceInfo.hashCode = Integer.toString(device.hashCode());
                                deviceInfo.btAddress = device.getAddress();
                                deviceInfo.btDeviceName = device.getName();
                                scannedDevices.add(deviceInfo);
                            }
                        }
                    }
                }
            });
            super.onScanResult(callbackType, result);
        }

        /**
         * Callback when batch results are delivered.
         *
         * @param results List of scan results that are previously scanned.
         */
        @Override
        public void onBatchScanResults(List<ScanResult> results) {
            super.onBatchScanResults(results);
        }

        /**
         * Callback when scan could not be started.
         *
         * @param errorCode Error code (one of SCAN_FAILED_*) for scan failure.
         */
        @Override
        public void onScanFailed(int errorCode) {
            super.onScanFailed(errorCode);
        }

    };



    private void scanLeDevice(final boolean enable) {

        if (enable) {
            scannedDevices.clear();
            // Stops scanning after a pre-defined scan period.
            mHandler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    scanner.stopScan(bleCallback);
                    deviceIndex = 0;
                    if(scannedDevices.size() > 0)
                        mBluetoothLeService.connect(scannedDevices.get(deviceIndex).btAddress);
                }
            }, SCAN_PERIOD);

            scanner.startScan(bleCallback);
        } else {
            scanner.stopScan(bleCallback);
        }
    }

}
