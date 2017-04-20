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
import android.bluetooth.le.ScanRecord;
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
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.ParcelUuid;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.util.ArrayMap;
import android.util.Log;
import android.util.SparseArray;
import android.view.Display;
import android.view.MotionEvent;
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
import java.sql.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.UUID;

/*
    Main Activity
 */
public class MainActivity extends Activity {

    private WebView webview;
    View splashScreen;
    View mainScreen;

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
    // Stops scanning after 5 seconds.
    private static final long SCAN_PERIOD = 5000;


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
        String deviceType;
        String rssi;
        String firmwareVersion;
        String softwareVersion;
        String btAddress;
    }
    BluetoothLeScanner scanner;
    BluetoothGatt mBleGatt;

    int bleDataLengthReceived = 0;
    ArrayList<DetectorInfo> scannedDevices =  new ArrayList<>();
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        PackageInfo pInfo = null;
        String buildDate= "2017-04-20\n16:30:00";
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
        webview.getSettings().setUseWideViewPort(true);

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


        webview.setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View v) {
                webview.loadUrl("javascript:document.dispatchEvent(new CustomEvent('longpress'))");
                return true;
            }
        });

        webview.setWebViewClient(new WebViewClient() {

            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                if(url.contains("busch-jaeger.de")) {
                    Intent browserIntent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                    startActivity(browserIntent);
                    return true;
                }
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

        bluetoothManager =
                (BluetoothManager) getSystemService(Context.BLUETOOTH_SERVICE);
        mBluetoothAdapter = bluetoothManager.getAdapter();
        scanner = mBluetoothAdapter.getBluetoothLeScanner();

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


    void notifyAppAboutConnection(final boolean isConnection){
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                BluetoothDevice device = mBluetoothLeService.getGatt().getDevice();
                try {
                    JSONObject jsonObject =  new JSONObject();
                    jsonObject.put("deviceaddress",device.getAddress());
                    String deviceData = "";
                    if(isConnection == true)
                        deviceData = deviceData + "onDeviceConnected(";
                    else
                        deviceData = deviceData + "onDeviceDisconnected(";
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

            }
            else if (BluetoothLeService.ACTION_GATT_DISCONNECTED.equals(action)) {
                notifyAppAboutConnection(false);
            }
            else if (BluetoothLeService.ACTION_GATT_SERVICES_DISCOVERED.equals(action)) {
                getGattServices(mBluetoothLeService.getSupportedGattServices());
                getDeviceInfo();
                if(getDeviceInfo == true)
                    notifyAppAboutConnection(true);
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

                if (charecterstic.equalsIgnoreCase(SCCPEnumerations.SERVER_TX_DATA)) {

                    byte[] rawdata = data;

                    if (rawdata[0] == (byte) 126) {
                        rawdata = removeEscapeChars(rawdata);
                        blePacketStart = true;
                        bleDataLengthReceived = 0;
                        try {
                            if (rawdata[rawdata.length - 1] == (byte) 126) {
                                bleRecvBuffer = ByteBuffer.allocate(rawdata.length);
                                bleRecvBuffer.put(rawdata);
                            }
                            else {
                                bleRecvBuffer = ByteBuffer.allocate(rawdata[1] + 2);
                                bleRecvBuffer.put(rawdata);
                            }
                        }
                        catch (Exception e) {
                            e.printStackTrace();
                        }
                        bleDataLengthReceived = rawdata.length;
                        if (rawdata[rawdata.length - 1] == (byte) 126) {
                            blePacketEnd = true;

                            if (rawdata.length - 2 == rawdata[1]) {
                                byte[] dataArray = bleRecvBuffer.array();
                                byte[] subArray = Arrays.copyOfRange(dataArray, 1, rawdata[1] + 1);
                                char recvCRC = SCCPEnumerations.computeCRC(subArray);
                                if (recvCRC == 0) {
                                    byte[] recvData = bleRecvBuffer.array();
                                    sendBLEDataToApp(bleRecvBuffer.array());
                                }
                                else {
                                    Log.d("BJE", "CRC MIS MATCH");
                                }
                            }
                            else {
                                Log.d("BJE", "LENGTH MISMATCH");
                            }

                        }
                    }
                }
            }
        });
    }

    byte[] removeEscapeChars(byte[] data) {
        boolean escapeCharloc = false;

        Byte[] bytes = new Byte[data.length];
        int i = 0;
        for (byte b : data) bytes[i++] = b; // Autoboxing
        ArrayList<Byte> indata = new ArrayList<Byte>(Arrays.asList(bytes));

        for(int j =1; j<data.length -2;j++){
            if(data[j] == (byte) 125 && (data[j+1] == (byte) 126 || data[j+1] == (byte) 125)){
                escapeCharloc =true;
                indata.remove(j);
            }
        }
        if(escapeCharloc) {
            byte[] obytes = new byte[indata.size()];
            for(int k = 0; k < indata.size(); k++) {
                obytes[k] = indata.get(k);
            }
            return obytes;
        }else {
            return data;
        }
    }


   void sendBLEAppFrame(byte[] data) {
       boolean escapeCharloc = false;


       Byte[] bytes = new Byte[data.length];
       int i = 0;
       for (byte b : data) bytes[i++] = b; // Autoboxing
       ArrayList<Byte> indata = new ArrayList<Byte>(Arrays.asList(bytes));

       for(int j =1; j<data.length -1;j++){
           if(data[j] == (byte) 126 || data[j] == (byte) 125){
               escapeCharloc =true;
               indata.add(j,(byte) 125);
           }
       }

       if(escapeCharloc) {
           byte[] obytes = new byte[indata.size()];
           for(int k = 0; k < indata.size(); k++) {
               obytes[k] = indata.get(k);
           }
           sendBLEFrame(obytes);
       }else {
           sendBLEFrame(data);
       }


   }


    void sendBLEFrame(final byte[] data) {

        final Handler handler = new Handler();
        handler.postDelayed(new Runnable() {
            @Override
            public void run() {
                if (writeCharecteristic != null) {
                    writeCharecteristic.setValue(data);
                    writeCharecteristic.setWriteType(BluetoothGattCharacteristic.WRITE_TYPE_NO_RESPONSE);
                    blePacketStart = false;

                    if (bleRecvBuffer != null)
                        bleRecvBuffer.clear();

                    mBluetoothLeService.writeCharacteristic(writeCharecteristic);
                    return;
                }
                else {
                    for (int i = 0; i < mGattServices.size(); i++) {
                        if (mGattServices.get(i).getUuid().toString().equalsIgnoreCase(SCCPEnumerations.DSPS_SERVICE)) {
                            final List<BluetoothGattCharacteristic> gattCharacteristics =
                                    mGattServices.get(i).getCharacteristics();
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
        }, 1000);
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
                    if(scannedDevices.size() > 0)
                        Toast.makeText(getApplicationContext(),"Devices Discovered",Toast.LENGTH_LONG).show();
                    else
                        Toast.makeText(getApplicationContext(),"DEMO MODE",Toast.LENGTH_LONG).show();
                    webview.evaluateJavascript(devicesdata,null);
                }catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }


    public void getDeviceInfo() {
        for(int i =0; i < mGattServices.size(); i++) {
            if(mGattServices.get(i).getUuid().toString().equalsIgnoreCase(SCCPEnumerations.DSPS_SERVICE)) {
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
                    ScanRecord scanRecord = result.getScanRecord();
                    List<ParcelUuid> sUUIDs = scanRecord.getServiceUuids();
                    boolean isABBPresenseDetector = false;
                    if (sUUIDs != null) {
                        for (int i = 0; i < sUUIDs.size(); i++) {
                            if (SCCPEnumerations.DSPS_SERVICE.equalsIgnoreCase(sUUIDs.get(i).getUuid().toString())) {
                                isABBPresenseDetector = true;
                            }
                        }
                        if (isABBPresenseDetector == true) {
                            if (mBluetoothLeService != null) {
                                boolean deviceExists = false;
                                SparseArray<byte[]> manufacturerSpecificData = scanRecord.getManufacturerSpecificData();

                                //parseAdvertisementPacket(scanRecord);
                                for (int i = 0; i < scannedDevices.size(); i++) {
                                    if (device.hashCode() == Integer.parseInt(scannedDevices.get(i).hashCode)) {
                                        deviceExists = true;
                                        break;
                                    }
                                }
                                if (deviceExists == false) {
                                    DetectorInfo deviceInfo = new DetectorInfo();
                                    deviceInfo.hashCode = Integer.toString(device.hashCode());
                                    deviceInfo.btAddress = device.getAddress();
                                    deviceInfo.btDeviceName = device.getName();
                                    deviceInfo.rssi = Integer.toString(result.getRssi());

                                    byte[] manufactureDataBytes = manufacturerSpecificData.valueAt(0);
                                    StringBuilder firmwareVersionStr = new StringBuilder();
                                    StringBuilder modelNumber = new StringBuilder();
                                    try {
                                        for (int j = 2; j <= 4; j++) {
                                            firmwareVersionStr.append(String.format("%02X", manufactureDataBytes[j]));
                                            firmwareVersionStr.append(".");
                                        }
                                        modelNumber.append(String.format("%02X", manufactureDataBytes[6]));
                                        modelNumber.append(String.format("%02X", manufactureDataBytes[8]));
                                        modelNumber.append("/");
                                        modelNumber.append(String.format("%02X", manufactureDataBytes[7]));
                                    }
                                    catch (Exception e) {
                                        e.printStackTrace();
                                    }
                                    deviceInfo.firmwareVersion = firmwareVersionStr.toString();
                                    deviceInfo.modelNumber = modelNumber.toString();
                                    if( deviceInfo.modelNumber.contains("05"))
                                        deviceInfo.deviceType = "daliMaster1c";
                                    if( deviceInfo.modelNumber.contains("03"))
                                        deviceInfo.deviceType = "mosfet1c";
                                    if(deviceInfo.modelNumber.contains("01"))
                                            deviceInfo.deviceType = "relay1c";
                                    scannedDevices.add(deviceInfo);
                                }
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

    @Override
    public void onBackPressed() {
        if(webview.canGoBack()){
            webview.goBack();
        }
        else {
            super.onBackPressed();
        }

    }

    private void scanLeDevice(final boolean enable) {

        if (enable) {
            scannedDevices.clear();
            // Stops scanning after a pre-defined scan period.
            mHandler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    if(scanner != null) {
                        scanner.stopScan(bleCallback);
                        sendDeviceInfo();
                    }

                }
            }, SCAN_PERIOD);

            if(scanner != null)
                scanner.startScan(bleCallback);
        } else {
            if(scanner != null)
                scanner.stopScan(bleCallback);
        }
    }

}
