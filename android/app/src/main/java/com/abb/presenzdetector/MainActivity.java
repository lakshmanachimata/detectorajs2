/*
    Developer : Preethi Warrier
    Project : Busch Praesenz Detector App
    Copyrights:ABB GISPL
 */
package com.abb.presenzdetector;

import android.Manifest;
import android.app.Activity;
import android.app.ProgressDialog;
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
import android.net.http.SslError;
import android.os.AsyncTask;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.IBinder;
import android.os.ParcelUuid;
import android.support.v4.app.ActivityCompat;
import android.util.Base64;
import android.util.Log;
import android.util.SparseArray;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.view.WindowManager.LayoutParams;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.webkit.ClientCertRequest;
import android.webkit.HttpAuthHandler;
import android.webkit.SslErrorHandler;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;

import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.lang.ref.WeakReference;
import java.lang.reflect.Field;
import java.net.URL;
import java.nio.ByteBuffer;
import java.nio.channels.FileChannel;
import java.security.KeyFactory;
import java.security.KeyStore;
import java.security.PrivateKey;
import java.security.cert.Certificate;
import java.security.cert.CertificateFactory;
import java.security.cert.X509Certificate;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.UUID;

import javax.net.ssl.HttpsURLConnection;
import javax.net.ssl.SSLContext;
import javax.net.ssl.TrustManager;
import javax.net.ssl.TrustManagerFactory;
import javax.net.ssl.X509TrustManager;
import de.buschjaeger.freeathomedemo.FreeathomeJNI;
import de.buschjaeger.freeathomedemo.Util;


/*
    Main Activity
 */
public class MainActivity extends Activity {


    static final String DSPS_SERVICE   = "0783B03E-8535-B5A0-7140-A304D2495CB7";
    static final String SUOTA_SERVICE   = "0000fef5-0000-1000-8000-00805f9b34fb";
    static final String SERVER_TX_DATA = "0783B03E-8535-B5A0-7140-A304D2495CB8";
    static final String SERVER_RX_DATA = "0783B03E-8535-B5A0-7140-A304D2495CBA";
//    static final String INFO_SERVICE = "0000180a-0000-1000-8000-00805f9b34fb";

    static final String NEW_DSPS_SERVICE   = "10af0100-50de-11e7-b114-b2f933d5fe66";
    static final String NEW_SERVER_TX_DATA   = "10af0101-50de-11e7-b114-b2f933d5fe66";
    static final String NEW_SERVER_RX_DATA   = "10af0103-50de-11e7-b114-b2f933d5fe66";
//    static final String NEW_FLOW_CONTROL   = "10af0102-11de-11e7-b114-b2f933d5fe66";

//    public static final String PROGRESS_UPDATE = "ProgressUpdate";
//    public static final String CONNECTION_STATE_UPDATE = "ConnectionState";
    public static final int fileChunkSize = 20;

    public static final int MEMORY_TYPE_SYSTEM_RAM = 1;
    public static final int MEMORY_TYPE_RETENTION_RAM = 2;
    public static final int MEMORY_TYPE_SPI = 3;
    public static final int MEMORY_TYPE_I2C = 4;


    public static final UUID SPOTA_SERVICE_UUID = UUID.fromString("0000fef5-0000-1000-8000-00805f9b34fb");
    public static final UUID SPOTA_MEM_DEV_UUID = UUID.fromString("8082caa8-41a6-4021-91c6-56f9b954cc34");
    public static final UUID SPOTA_GPIO_MAP_UUID = UUID.fromString("724249f0-5eC3-4b5f-8804-42345af08651");
    public static final UUID SPOTA_MEM_INFO_UUID = UUID.fromString("6c53db25-47a1-45fe-a022-7c92fb334fd4");
    public static final UUID SPOTA_PATCH_LEN_UUID = UUID.fromString("9d84b9a3-000c-49d8-9183-855b673fda31");
    public static final UUID SPOTA_PATCH_DATA_UUID = UUID.fromString("457871e8-d516-4ca1-9116-57d0b17b9cb2");
    public static final UUID SPOTA_SERV_STATUS_UUID = UUID.fromString("5f78df94-798c-46f5-990a-b3eb6a065c88");
    public static final UUID SPOTA_DESCRIPTOR_UUID = UUID.fromString("00002902-0000-1000-8000-00805f9b34fb");
//    public static final UUID ORG_BLUETOOTH_SERVICE_DEVICE_INFORMATION              = UUID.fromString("0000180a-0000-1000-8000-00805f9b34fb");
    public static final UUID ORG_BLUETOOTH_CHARACTERISTIC_MANUFACTURER_NAME_STRING = UUID.fromString("00002A29-0000-1000-8000-00805f9b34fb");
    public static final UUID ORG_BLUETOOTH_CHARACTERISTIC_MODEL_NUMBER_STRING      = UUID.fromString("00002A24-0000-1000-8000-00805f9b34fb");
//    public static final UUID ORG_BLUETOOTH_CHARACTERISTIC_SERIAL_NUMBER_STRING     = UUID.fromString("00002A25-0000-1000-8000-00805f9b34fb");
//    public static final UUID ORG_BLUETOOTH_CHARACTERISTIC_HARDWARE_REVISION_STRING = UUID.fromString("00002A27-0000-1000-8000-00805f9b34fb");
    public static final UUID ORG_BLUETOOTH_CHARACTERISTIC_FIRMWARE_REVISION_STRING = UUID.fromString("00002A26-0000-1000-8000-00805f9b34fb");
    public static final UUID ORG_BLUETOOTH_CHARACTERISTIC_SOFTWARE_REVISION_STRING = UUID.fromString("00002A28-0000-1000-8000-00805f9b34fb");
//    public static final UUID ORG_BLUETOOTH_CHARACTERISTIC_SYSTEM_ID                = UUID.fromString("00002A23-0000-1000-8000-00805f9b34fb");
//    public static final UUID ORG_BLUETOOTH_CHARACTERISTIC_IEEE_11073               = UUID.fromString("00002A2A-0000-1000-8000-00805f9b34fb");
//    public static final UUID ORG_BLUETOOTH_CHARACTERISTIC_PNP_ID                   = UUID.fromString("00002A50-0000-1000-8000-00805f9b34fb");
    // Default SPI memory settings
//    public static final int DEFAULT_MISO_VALUE = 5;
//    public static final int DEFAULT_MOSI_VALUE = 6;
//    public static final int DEFAULT_CS_VALUE = 3;
//    public static final int DEFAULT_SCK_VALUE = 0;
//    public static final String DEFAULT_BLOCK_SIZE_VALUE = "240";

    // Default I2C memory settings
//    public static final int DEFAULT_MEMORY_BANK = 0;
//    public static final String DEFAULT_I2C_DEVICE_ADDRESS = "0x50";
//    public static final int DEFAULT_SCL_GPIO_VALUE = 2;
//    public static final int DEFAULT_SDA_GPIO_VALUE = 3;
//
//    public static final int MEMORY_TYPE_SUOTA_INDEX = 100;
//    public static final int MEMORY_TYPE_SPOTA_INDEX = 101;

    // Application error codes (must be greater than 255 in order not to conflict with SUOTA error codes)
    public static final int ERROR_COMMUNICATION = 0xffff; // ble communication error
    public static final int ERROR_SUOTA_NOT_FOUND = 0xfffe; // suota service was not found

    public final static String ACTION_GATT_CONNECTED =
            "com.abb.presenzdetector.ACTION_GATT_CONNECTED";
    public final static String ACTION_GATT_DISCONNECTED =
            "com.abb.presenzdetector.ACTION_GATT_DISCONNECTED";
    public final static String ACTION_GATT_RETRY_CONNECTION=
            "com.abb.presenzdetector.ACTION_GATT_RETRY_CONNECTION";
    public final static String ACTION_GATT_SERVICES_DISCOVERED =
            "com.abb.presenzdetector.ACTION_GATT_SERVICES_DISCOVERED";
    public final static String ACTION_DATA_AVAILABLE =
            "com.abb.presenzdetector.ACTION_DATA_AVAILABLE";
    public final static String EXTRA_DATA =
            "com.abb.presenzdetector.EXTRA_DATA";
    public final static String EXTRA_CHARECTERSTIC =
            "com.abb.presenzdetector.EXTRA_CHARECTERSTIC";
    public final static String ACTION_FW_UPDATE =
            "com.abb.presenzdetector.ACTION_FW_UPDATE";
    public final static String EXTRA_FWUPDATE_STEP =
            "com.abb.presenzdetector.EXTRA_FWUPDATE_STEP";

    public final static String EXTRA_FWUPDATE_ERROR =
            "com.abb.presenzdetector.EXTRA_FWUPDATE_ERROR";

    public final static String EXTRA_FWUPDATE_MEMDEVVALUE =
            "com.abb.presenzdetector.EXTRA_FWUPDATE_MEMDEVVALUE";

    // Default memory type
    //public static final int DEFAULT_MEMORY_TYPE = MEMORY_TYPE_SPI;


    X509Certificate myBJECert;
    PrivateKey myBJEKey;
    public  static String fwFileDirectory = "";
    SSLContext sslContext;
    DetectorInfo selectedDetectorInfo = null;
    private WebView webview;
    View splashScreen;
    View mainScreen;

    ArrayList<String> fwFilesList = new ArrayList<>();

    BluetoothManager bluetoothManager;
    boolean blePacketStart = false;
    boolean blePacketEnd = false;
    ByteBuffer bleRecvBuffer;

    private BluetoothLeService mBluetoothLeService;
    private boolean loaded = false;
    final Activity activity = this;
    private BluetoothAdapter mBluetoothAdapter;
    private Handler mHandler;
    Animation out;
    Locale currentLocale;
    ArrayList <BluetoothGattService> mGattServices =  new ArrayList<>();
    BluetoothGattCharacteristic writeCharecteristic;

    int memoryType;
    public  static boolean isUpdateFWStart =  false;

    String certText = "";
    String keyText = "";
    String keyOrgText = "";

    BluetoothDevice bluetoothDevice;
    Animation in;
    WebInterface webInterface;
    private static final int REQUEST_ENABLE_BT = 1;
    private static final long SCAN_PERIOD = 15 * 60 * 1000;
    private static boolean isScanning =  false;

    boolean getDeviceInfo =  false;
    private static final int REQUEST_PERMISSIONS = 124;
    private static String[] PERMISSIONS_BJE = {
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.ACCESS_COARSE_LOCATION,
    };

    boolean isABB = false;

    Handler scanDevicesMessagesHandler  =  new Handler();
    ProgressDialog dialog;
    class DetectorInfo {
        String hashCode = "";
        String btDeviceName = "";
        String modelNumber = "";
        String manufacturerName = "";
        String deviceType = "";
        String rssi = "";
        String firmwareVersion = "";
        String softwareVersion = "";
        String btAddress = "";
        String btIAddress = "";
        String idenfiy = "0";
        boolean OTASupported = false;

    }


    static public BJBLEManager suotaManager;
    //static public SpotaManager spotaManager;
    BluetoothLeScanner scanner;

    int bleDataLengthReceived = 0;
    ArrayList<DetectorInfo> scannedDevices =  new ArrayList<>();

    public static final String LOG_TAG = "bje_detector_native";
    private static BluetoothGattCharacteristic spotaMemInfoCharacteristic = null;

    private static MainActivity mInstance;
    static boolean certDebug = false;
    private static class MyHandler extends Handler {
        final static int MSG_EMIT_NEXT_EVENT = 1;
        private final WeakReference<MainActivity> mActivity;
        MyHandler(MainActivity activity) {
            mActivity = new WeakReference<>(activity);
        }

        // NOTE: Called on the main thread.
        @Override
        public void handleMessage(android.os.Message msg) {
            MainActivity activity = mActivity.get();
            if (activity == null) {
                return;
            }
            switch (msg.what) {
                case MSG_EMIT_NEXT_EVENT:
                    FreeathomeJNI.EmitNextEvent(activity.mFreeathomeContext);
                    break;
            }
        }
    }
    private final MyHandler FHHandler = new MyHandler(this);
    private long mFreeathomeContext = 0;

    // Used to load the 'native-lib' library on application startup.
    static {
        System.loadLibrary("native-lib");
    }


    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);

        mHandler = new Handler();
        currentLocale = getResources().getConfiguration().locale;

        mInstance = this;

        fwFileDirectory =  getAssets().toString() + "/fwupdate";


        Field[] fields=R.raw.class.getFields();
        fwFilesList.clear();
        for(int count=0; count < fields.length; count++){
            fwFilesList.add(fields[count].getName());
        }
        suotaManager = new SuotaManager(MainActivity.this);
        setMemoryType(MainActivity.MEMORY_TYPE_SPI);

        //spotaManager = new SpotaManager(MainActivity.this);
        LayoutParams lp = new LayoutParams(LayoutParams.MATCH_PARENT,LayoutParams.MATCH_PARENT);


        mainScreen = View.inflate(activity, R.layout.activity_main, null);
        addContentView(mainScreen, lp);
        mainScreen.setVisibility(View.INVISIBLE);
        in = AnimationUtils.loadAnimation(activity, android.R.anim.fade_in);
        in.setDuration(2500);//TODO: instead of static duration value,animate as soon as webview is loaded


        splashScreen = View.inflate(activity,R.layout.activity_splash,null);
        addContentView(splashScreen, lp);

        webview = (WebView) findViewById(R.id.webViewMain);

        webview.getSettings().setJavaScriptEnabled(true);
        webview.getSettings().setDomStorageEnabled(true);
        webview.getSettings().setUseWideViewPort(true);
        webview.getSettings().setAllowUniversalAccessFromFileURLs(true);
        webview.getSettings().setAllowFileAccessFromFileURLs(true);
        webview.clearCache(true);
        WebView.setWebContentsDebuggingEnabled(true);


        webInterface = new WebInterface(MainActivity.this);
        webview.addJavascriptInterface(webInterface,"BJE");




//        String version = pInfo.versionName;

//        TextView tvLogo = (TextView) (splashScreen.findViewById(R.id.textViewLogo));
//        String logoText = "BJE\n presence\n detector";
//        tvLogo.setText(logoText);
//
//
//        TextView tvVersion =(TextView) (splashScreen.findViewById(R.id.textViewVersion));
//        String versionText = "Version "+version+"\n"+ buildDate;
//        tvVersion.setText(versionText);


        Window window = activity.getWindow();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            window.clearFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);
            window.addFlags(WindowManager.LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);
            window.setStatusBarColor(activity.getResources().getColor(android.R.color.black));
        }

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
                super.onPageStarted(view, url, favicon);
            }

            @Override
            public void onReceivedClientCertRequest(WebView view, ClientCertRequest request) {


                X509Certificate certs[] = new X509Certificate[1];
                certs[0] = myBJECert;
                request.proceed(myBJEKey,certs);
//                request.cancel();
            }
            @Override
            public void onReceivedHttpAuthRequest(WebView view,
                                                  HttpAuthHandler handler, String host, String realm) {
                handler.cancel();
            }

            @Override
            public void onReceivedSslError(WebView view, SslErrorHandler handler,
                                           SslError error) {
                String message = "SSL Certificate error.";
                switch (error.getPrimaryError()) {
                    case SslError.SSL_UNTRUSTED:
                        message = "The certificate authority is not trusted.";
                        break;
                    case SslError.SSL_EXPIRED:
                        message = "The certificate has expired.";
                        break;
                    case SslError.SSL_IDMISMATCH:
                        message = "The certificate Hostname mismatch.";
                        break;
                    case SslError.SSL_NOTYETVALID:
                        message = "The certificate is not yet valid.";
                        break;
                }
                message =  message + "ERROR";
                handler.cancel();
            }


            @Override
            public void onPageFinished(WebView view, String url) {
                // do your stuff here
                if (url.equals("file:///android_asset/") ||
                        url.equals("file:///android_asset/welcome") ||
                        url.equals("file:///android_asset/index.html") ) {
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
                    setFlavorType();
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



//        initFreeathomeContext();
//        String hostName = "api.my-staging.busch-jaeger.de";
//        String userName = "lakshmana";
//        String password = "Abb@123456";
//        Log.d(LOG_TAG, "Starting to connect to " + hostName);
//        FreeathomeJNI.CreateCert(mFreeathomeContext, Util.stringToByteArrayUtf8(userName), Util.stringToByteArrayUtf8(password), Util.stringToByteArrayUtf8("Some Device ID"), Util.stringToByteArrayUtf8("Some Name"));
//        checkForFilesAgain();
    }

    public BluetoothGatt getGatt(){
        return mBluetoothLeService.getGatt();

    }

    public void showConnectingDialog(){
        dialog = ProgressDialog.show(MainActivity.this, "Connecting", "Connecting to Device");
        dialog.getWindow().setGravity(Gravity.CENTER);
    }

    public void closeConnectingDialog(){
        if(dialog != null && dialog.isShowing()){
            dialog.dismiss();
        }
    }

    public void showMessageIfNoDevicesAreAvailable(){
        scanDevicesMessagesHandler.postDelayed(new Runnable() {
            @Override
            public void run() {
                if(scannedDevices.size() == 0){
                    try {
                        JSONObject demoData = new JSONObject();
                        demoData.put("demomode", 1);
                        String demoSData = "";
                        demoSData = demoSData + "setDemoMode(";
                        demoSData =  demoSData + demoData.toString()+ ")";
                        webview.evaluateJavascript(demoSData,null);

                    }catch (Exception e){
                        e.printStackTrace();
                    }

                    Toast.makeText(getApplicationContext(), "NO DEVICES ARE AVAILABLE",Toast.LENGTH_LONG).show();
                }
            }
        },5 * 60 * 1000);
    }
    public void killApp(){
        if(scanner != null)
            scanner.stopScan(bleCallback);
        if(mBluetoothLeService.mConnectionState == BluetoothLeService.STATE_CONNECTED ||
                mBluetoothLeService.mConnectionState ==  BluetoothLeService.STATE_CONNECTING ) {
            mBluetoothLeService.disconnect();
            mBluetoothLeService.close();
        }
        finish();
    }

    void copyFile(File src, File dst)  {
        if(certDebug) {
            try {
                FileChannel inChannel = new FileInputStream(src).getChannel();
                FileChannel outChannel = new FileOutputStream(dst).getChannel();
                try {
                    inChannel.transferTo(0, inChannel.size(), outChannel);
                }
                finally {
                    if (inChannel != null)
                        inChannel.close();
                    if (outChannel != null)
                        outChannel.close();
                }
            }
            catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
    void preparePemFile(){
        try {
            String filesPath = getFilesDir().getAbsolutePath();
            String pemFilePath = filesPath.concat("/client.pem");
            File pemFile = new File(pemFilePath);
            if (pemFile.exists()) {
                pemFile.delete();
            }
            pemFile.createNewFile();

            FileOutputStream fOut = new FileOutputStream(pemFile);
            OutputStreamWriter myOutWriter = new OutputStreamWriter(fOut);
            myOutWriter.append(keyOrgText);
            myOutWriter.append(certText);

            myOutWriter.close();

            fOut.flush();
            fOut.close();

        }catch (Exception e){
            e.printStackTrace();
        }
    }

        void checkForFilesAgain(){
            mHandler.postDelayed(new Runnable() {
                @Override
                public void run() {
                    File files[] = getFilesDir().listFiles();
                    try {
                        for (int i = 0; i < files.length; i++) {
                            if (files[i].toString().contains("client.cert") && files[i].exists()) {
                                if(certDebug) {
                                    File downloaDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
                                    File dstFile = new File(downloaDir + "/" + "client.cert");
                                    copyFile(files[i], dstFile);
                                }
                                ArrayList<Integer> data = new ArrayList<Integer>();
                                BufferedReader r=new BufferedReader(new FileReader(files[i]));
                                int ch;
                                while((ch=r.read())!=-1){
                                    data.add(ch);
                                }
                                char sendData[] = new char[data.size()];
                                for(int j = 0; j < data.size(); j++) {
                                    sendData[j] = (char)(0x00FF & data.get(j));
                                }
                                FileInputStream fis = new FileInputStream(files[i]);
                                BufferedInputStream bis = new BufferedInputStream(fis);

                                CertificateFactory cf = CertificateFactory.getInstance("X.509");

                                while (bis.available() > 0) {
                                    myBJECert = (X509Certificate) cf.generateCertificate(bis);
                                }


                                JSONObject certiData = new JSONObject();
                                certText = String.copyValueOf(sendData);
                                if(certText.length() > 10 && keyText.length() > 10){
                                    preparePemFile();
                                }

                                certiData.put("data",certText);
                                String certData = "";
                                certData = certData + "setCertData(";
                                certData =  certData + certiData.toString()+ ")";
                                webview.evaluateJavascript(certData,null);
                                r.close();
                            }
                            if (files[i].toString().contains("client.private")) {
                                if(certDebug) {
                                    File downloaDir = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DOWNLOADS);
                                    File dstFile = new File(downloaDir + "/" + "client.private");
                                    copyFile(files[i], dstFile);
                                }

                                ArrayList<Integer> data = new ArrayList<Integer>();
                                BufferedReader r=new BufferedReader(new FileReader(files[i]));

                                int ch;
                                while((ch=r.read())!=-1){
                                    data.add(ch);
                                }
                                char sendData[] = new char[data.size()];
                                for(int j = 0; j < data.size(); j++) {
                                    sendData[j] = (char)(0x00FF & data.get(j));
                                }

                                JSONObject keyiData = new JSONObject();
                                 keyText = String.copyValueOf(sendData);
                                keyOrgText = String.copyValueOf(sendData);
                                 if(certText.length() > 10 && keyText.length() > 10){
                                     preparePemFile();
                                 }

                                keyiData.put("data",keyText);

                                String keyData = "";
                                keyData =  keyData + "setKeyData(";
                                keyData =  keyData + keyiData.toString()+ ")";
                                webview.evaluateJavascript(keyData,null);
                                r.close();


                                int size = (int) files[i].length();
                                byte[] bytes = new byte[size];
                                try {
                                    BufferedInputStream buf = new BufferedInputStream(new FileInputStream(files[i]));
                                    buf.read(bytes, 0, bytes.length);
                                    buf.close();
                                } catch (FileNotFoundException e) {
                                    // TODO Auto-generated catch block
                                    e.printStackTrace();
                                } catch (IOException e) {
                                    // TODO Auto-generated catch block
                                    e.printStackTrace();
                                }

                                try{
                                KeyFactory keyFactory = KeyFactory.getInstance("RSA");
                                    keyText = keyText.replace("-----BEGIN PRIVATE KEY-----\n","");
                                    keyText = keyText.replace("-----END PRIVATE KEY-----","");
                                myBJEKey = keyFactory.generatePrivate(new PKCS8EncodedKeySpec(Base64.decode(keyText,0)));
                                String algorithm = keyFactory.getAlgorithm();
                                //algorithm = "RSA";
                                //publicKey = keyFactory.generatePublic(keySpec);
                            } catch (InvalidKeySpecException excep1)
                                {
                                    try {
                                        KeyFactory keyFactory = KeyFactory.getInstance("DSA");
                                        myBJEKey = keyFactory.generatePrivate(new PKCS8EncodedKeySpec(Base64.decode(keyText,0)));
                                        String algorithm = keyFactory.getAlgorithm();
                                        //publicKey = keyFactory.generatePublic(keySpec);
                                    } catch (InvalidKeySpecException excep2) {

                                        KeyFactory keyFactory = KeyFactory.getInstance("EC");
                                        myBJEKey = keyFactory.generatePrivate(new PKCS8EncodedKeySpec(Base64.decode(keyText,0)));

                                    } catch(Exception e){
                                        e.printStackTrace();   // inner catch
                                    }
                                }
                            }
                        }
                    }catch (Exception e){
                        e.printStackTrace();
                    }
                }
            },10000);
        }


    void addDevice(String btAddress,String filename){

        try {
            // Load CAs from an InputStream
// (could be from a resource or ByteArrayInputStream or ...)
            CertificateFactory cf = CertificateFactory.getInstance("X.509");
            InputStream caInput = new BufferedInputStream(new FileInputStream(filename));
            Certificate ca;
            try {
                ca = cf.generateCertificate(caInput);
                System.out.println("ca=" + ((X509Certificate) ca).getSubjectDN());
            } finally {
                caInput.close();
            }

            String keyStoreType = KeyStore.getDefaultType();
            KeyStore keyStore = KeyStore.getInstance(keyStoreType);
            keyStore.load(null, null);
            keyStore.setCertificateEntry("ca", ca);



            String tmfAlgorithm = TrustManagerFactory.getDefaultAlgorithm();
            TrustManagerFactory tmf = TrustManagerFactory.getInstance(tmfAlgorithm);
            tmf.init(keyStore);

            TrustManager[] trustManagers = tmf.getTrustManagers();
            final X509TrustManager origTrustmanager = (X509TrustManager)trustManagers[0];


            TrustManager[] wrappedTrustManagers = new TrustManager[]{
                    new X509TrustManager() {
                        public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                            return origTrustmanager.getAcceptedIssuers();
                        }

                        public void checkClientTrusted(X509Certificate[] certs, String authType) {
                            try {
                                origTrustmanager.checkClientTrusted(certs, authType);
                            }catch (Exception e){
                                e.printStackTrace();
                            }
                        }

                        public void checkServerTrusted(X509Certificate[] certs, String authType) {
                            try {
                                origTrustmanager.checkServerTrusted(certs, authType);
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }
                    }
            };

            sslContext = SSLContext.getInstance("TLS");
            sslContext.init(null, wrappedTrustManagers, null);
            new URLTask().execute("https://api.my-staging.busch-jaeger.de/api/user/key-value/presence-detector-backup/devices");
        }catch (Exception e){
            e.printStackTrace();
        }
    }



    public static BluetoothGattCharacteristic getSpotaMemInfoCharacteristic() {
        return spotaMemInfoCharacteristic;
    }

    public static void setSpotaMemInfoCharacteristic(BluetoothGattCharacteristic in_SpotaMemInfoCharacteristic) {
        spotaMemInfoCharacteristic = in_SpotaMemInfoCharacteristic;
    }

    private class URLTask extends AsyncTask<String, Void, String> {
        @Override
        protected String doInBackground(String... params) {
            String result = "";
            HttpsURLConnection urlConnection = null;

            try {
                URL requestedUrl = new URL(params[0]);
                urlConnection = (HttpsURLConnection) requestedUrl.openConnection();
                if(urlConnection instanceof HttpsURLConnection) {
                    ((HttpsURLConnection)urlConnection)
                            .setSSLSocketFactory(sslContext.getSocketFactory());
                }
                JSONObject newObjet =  new JSONObject();
                newObjet.put("name","test");
                newObjet.put("software_version","0.1");
                newObjet.put("description","testing");
                urlConnection.setRequestMethod("GET");
                urlConnection.setConnectTimeout(1500);
                urlConnection.setReadTimeout(1500);
                urlConnection.setRequestProperty("Content-Type","application/json");
                OutputStreamWriter osw = new OutputStreamWriter(urlConnection.getOutputStream());
                osw.write(newObjet.toString());
                osw.flush();
                osw.close();
                int lastResponseCode = urlConnection.getResponseCode();
                String lastContentType = urlConnection.getContentType();
                InputStreamReader in = new InputStreamReader((InputStream) urlConnection.getContent());
                BufferedReader buff = new BufferedReader(in);
                String line;
                do {
                    line = buff.readLine();
                    result = result + (line + "\n");
                } while (line != null);
                return  result;
            } catch(Exception ex) {
                result = ex.toString();
            } finally {
                if(urlConnection != null) {
                    urlConnection.disconnect();
                }
            }
            return result;
        }

        @Override
        protected void onPostExecute(String result) {
        }

        @Override
        protected void onPreExecute() {
        }

        @Override
        protected void onProgressUpdate(Void... values) {
        }
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
        intentFilter.addAction(ACTION_GATT_CONNECTED);
        intentFilter.addAction(ACTION_FW_UPDATE);
        intentFilter.addAction(ACTION_GATT_DISCONNECTED);
        intentFilter.addAction(ACTION_GATT_SERVICES_DISCOVERED);
        intentFilter.addAction(ACTION_DATA_AVAILABLE);
        intentFilter.addAction(ACTION_GATT_RETRY_CONNECTION);
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
        //showMessageIfNoDevicesAreAvailable();
        super.onResume();
        if (loaded) {
            if (webview != null) {
                webview.getSettings().setJavaScriptEnabled(true);
            }
        }
        if (android.os.Build.VERSION.SDK_INT >= 23) {
            verifyStoragePermissions(MainActivity.this);
        }
        else {
            setUpBluetooth();
        }

        registerReceiver(mGattUpdateReceiver, makeGattUpdateIntentFilter());
    }

    void connectDevice(final String address){
        scanLeDevice(false);
        showConnectingDialog();
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
        if(scannedDevices.size() > 0){
            this.scannedDevices.clear();
        }
    }

    void setFlavorType(){
        JSONObject jsonObject =  new JSONObject();
        try {
            String deviceData = "";
            deviceData = deviceData + "setFlavor(";
            deviceData = deviceData + jsonObject.toString() + ")";
            webview.evaluateJavascript(deviceData, null);
        }catch (Exception e){

        }
    }


    void notifyAppAboutConnection(final boolean isConnection){
        Log.d(LOG_TAG,"notifyAppAboutConnection state " + isConnection);
        runOnUiThread(new Runnable() {
            @Override
            public void run() {
                try {
                    JSONObject jsonObject =  new JSONObject();

                    String deviceData = "";
                    if(isConnection == true)
                    {
                        if(mBluetoothLeService.getGatt() == null){
                            return;
                        }
                        BluetoothDevice device = null;
                        device  = mBluetoothLeService.getGatt().getDevice();
                        jsonObject.put("deviceaddress",device.getAddress());
                        deviceData = deviceData + "onDeviceConnected(";
                        closeConnectingDialog();
                    }
                    else {
                        deviceData = deviceData + "onDeviceDisconnected(";
                    }
                    deviceData = deviceData + jsonObject.toString() + ")";
                    webview.evaluateJavascript(deviceData, null);
                }catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }

    public void retryConnection(){
        Log.d(LOG_TAG,"retryConnection");
        try {
            String deviceData = "";
            deviceData = deviceData + "retryConnection()";
            webview.evaluateJavascript(deviceData, null);
        }catch (Exception e){

        }
    }

    private final BroadcastReceiver mGattUpdateReceiver = new BroadcastReceiver() {
        @Override
        public void onReceive(Context context, Intent intent) {
            final String action = intent.getAction();
            if (ACTION_GATT_CONNECTED.equals(action)) {
                for (int di = 0; di < scannedDevices.size(); di++) {
                    if (getGatt().getDevice().getAddress().equalsIgnoreCase(scannedDevices.get(di).btAddress)) {
                        bluetoothDevice = getGatt().getDevice();
                        selectedDetectorInfo = scannedDevices.get(di);
                    }
                }
            }
            else if (ACTION_GATT_DISCONNECTED.equals(action)) {
                notifyAppAboutConnection(false);
                mBluetoothLeService.close();
                for(int di =0; di < scannedDevices.size(); di++) {
                    bluetoothDevice = null;
                    selectedDetectorInfo = null;
                }
                scanLeDevice(true);
            }
            else if (ACTION_GATT_RETRY_CONNECTION.equals(action)) {
                retryConnection();
            }
            else if (ACTION_GATT_SERVICES_DISCOVERED.equals(action)) {
                getGattServices(mBluetoothLeService.getSupportedGattServices());
                getDeviceInfo();
                notifyAppAboutConnection(true);
            }
            else if (ACTION_DATA_AVAILABLE.equals(action)) {
                setDeviceInfo(intent);
            }
//            else if(ACTION_FW_UPDATE.equals(action)){
//                suotaManager.processStep(intent);
//            }
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
                byte[] data = intent.getByteArrayExtra(EXTRA_DATA);
                String charecterstic = intent.getStringExtra(EXTRA_CHARECTERSTIC);

                if (charecterstic.equalsIgnoreCase(SERVER_TX_DATA) ||
                        charecterstic.equalsIgnoreCase(NEW_SERVER_TX_DATA)) {

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
                                char recvCRC = computeCRC(subArray);
                                if (recvCRC == 0) {
                                    sendBLEDataToApp(bleRecvBuffer.array());
                                }
                                else {
                                    Log.d(MainActivity.LOG_TAG, "CRC MISMATCH");
                                }
                            }
                            else {
                                Log.d(MainActivity.LOG_TAG, "LENGTH MISMATCH");
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
                        if (mGattServices.get(i).getUuid().toString().equalsIgnoreCase(DSPS_SERVICE) ||
                                mGattServices.get(i).getUuid().toString().equalsIgnoreCase(NEW_DSPS_SERVICE)   ) {
                            final List<BluetoothGattCharacteristic> gattCharacteristics =
                                    mGattServices.get(i).getCharacteristics();
                            for (int j = 0; j < gattCharacteristics.size(); j++) {
                                if (gattCharacteristics.get(j).getUuid().toString().equalsIgnoreCase(SERVER_RX_DATA) ||
                                        gattCharacteristics.get(j).getUuid().toString().equalsIgnoreCase(NEW_SERVER_RX_DATA) ) {
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
        }, 1);
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
                    if(scannedDevices.size() > 0) {
                        webview.evaluateJavascript(devicesdata, null);
                    }
                    else
                        Toast.makeText(getApplicationContext(),"NO DEVICES FOUND",Toast.LENGTH_LONG).show();
                }catch (Exception e) {
                    e.printStackTrace();
                }
            }
        });
    }


    public void getDeviceInfo() {
        for(int i =0; i < mGattServices.size(); i++) {
            //if(mGattServices.get(i).getUuid().toString().equalsIgnoreCase(DSPS_SERVICE))
            {
                    final List<BluetoothGattCharacteristic> gattCharacteristics =
                            mGattServices.get(i).getCharacteristics();
                for(int j =0;j < gattCharacteristics.size(); j++ ){

                    UUID myUUID =  gattCharacteristics.get(j).getUuid();
                    String uuidstr = myUUID.toString();
                    if(uuidstr.equalsIgnoreCase(SERVER_RX_DATA) ||
                            uuidstr.equalsIgnoreCase(NEW_SERVER_RX_DATA)) {
                        writeCharecteristic =  gattCharacteristics.get(j);
                    }else if(uuidstr.equalsIgnoreCase(SERVER_TX_DATA) ||
                            uuidstr.equalsIgnoreCase(NEW_SERVER_TX_DATA)) {
                        mBluetoothLeService.setCharacteristicNotification(gattCharacteristics.get(j),true);
                    }else if (myUUID.equals(MainActivity.ORG_BLUETOOTH_CHARACTERISTIC_MANUFACTURER_NAME_STRING)) {
                        suotaManager.characteristicsQueue.add(gattCharacteristics.get(j));
                    }else if (myUUID.equals(MainActivity.ORG_BLUETOOTH_CHARACTERISTIC_MODEL_NUMBER_STRING)) {
                        suotaManager.characteristicsQueue.add(gattCharacteristics.get(j));
                    } else if (myUUID.equals(MainActivity.ORG_BLUETOOTH_CHARACTERISTIC_FIRMWARE_REVISION_STRING)) {
                        suotaManager.characteristicsQueue.add(gattCharacteristics.get(j));
                    } else if (myUUID.equals(MainActivity.ORG_BLUETOOTH_CHARACTERISTIC_SOFTWARE_REVISION_STRING)) {
                        suotaManager.characteristicsQueue.add(gattCharacteristics.get(j));
                    }else if (myUUID.equals(MainActivity.SPOTA_MEM_INFO_UUID)) {
                        setSpotaMemInfoCharacteristic(gattCharacteristics.get(j));
                    }
                }
            }
            suotaManager.readNextCharacteristic();
        }
    }

    public void setItemValue(int index, String value) {
        switch (index){
            case 0:
                if(selectedDetectorInfo != null){
                    selectedDetectorInfo.manufacturerName = value;
                }
                break;
            case 1:
                break;
            case 2:
                if(selectedDetectorInfo != null){
                    selectedDetectorInfo.softwareVersion = value;
                }
                break;
            case 3:
                if(selectedDetectorInfo != null){
                    selectedDetectorInfo.firmwareVersion = value;
                }
                break;
            default:
                break;
        }
    }

    private void getGattServices(List<BluetoothGattService> gattServices) {
        mGattServices.clear();
        mGattServices.addAll(gattServices);
    }

    @Override
    public void onDestroy() {
        scanLeDevice(false);
        if (webview != null) {
            ViewGroup parent = (ViewGroup) webview.getParent();
            if (parent != null) {
                parent.removeView(webview);
            }
            webview.removeAllViews();
            webview.destroy();
        }
        if(mBluetoothLeService != null){
            mBluetoothLeService.disconnect();
            mBluetoothLeService.close();
        }
        super.onDestroy();
        unbindService(mServiceConnection);
        mFreeathomeContext = 0;
        mInstance = null;
    }


    private void initFreeathomeContext() {
        final byte[] lang = Util.stringToByteArrayUtf8(Locale.getDefault().getLanguage());
        final byte[] writableDir = Util.stringToByteArrayUtf8(getFilesDir().getAbsolutePath());
        final boolean useStaging = true;
        final boolean debugVerbose = false;
        mFreeathomeContext = FreeathomeJNI.CreateContext(lang, writableDir, useStaging, debugVerbose);
    }

    static public MainActivity getInstance() {
        return mInstance;
    }

    public void emitNextEventOnMainThread() {
        FHHandler.sendEmptyMessage(MyHandler.MSG_EMIT_NEXT_EVENT);
    }

    ScanCallback bleCallback =  new ScanCallback() {
        @Override
        public void onScanResult(int callbackType, final ScanResult result) {
            runOnUiThread(new Runnable() {
                @Override
                public void run() {
                    BluetoothDevice device = result.getDevice();
                    Log.d(MainActivity.LOG_TAG,"GOT SCAN CALLBACK   " + device.getAddress());
                    ParcelUuid[] dUUIDs;
                    try {
                        dUUIDs  = device.getUuids();
                    }catch (Exception e){
                        e.printStackTrace();
                    }
                    ScanRecord scanRecord = result.getScanRecord();
                    List<ParcelUuid> sUUIDs = scanRecord.getServiceUuids();
                    boolean isABBPresenseDetector = false;
                    boolean isSUOTASupported =  false;
                    if (sUUIDs != null) {
                        for (int i = 0; i < sUUIDs.size(); i++) {
                            if (DSPS_SERVICE.equalsIgnoreCase(sUUIDs.get(i).getUuid().toString()) ||
                                    NEW_DSPS_SERVICE.equalsIgnoreCase(sUUIDs.get(i).getUuid().toString()) ) {
                                isABBPresenseDetector = true;
                            }
                            if (SUOTA_SERVICE.equalsIgnoreCase(sUUIDs.get(i).getUuid().toString()) ||
                                    NEW_DSPS_SERVICE.equalsIgnoreCase(sUUIDs.get(i).getUuid().toString()) ) {
                                isSUOTASupported = true;
                            }
                        }

                        if (isABBPresenseDetector == true) {
                            if (mBluetoothLeService != null) {
                                boolean deviceExists = false;
                                SparseArray<byte[]> manufacturerSpecificData = scanRecord.getManufacturerSpecificData();

                                for (int i = 0; i < scannedDevices.size(); i++) {
                                    if (device.getAddress().equals(scannedDevices.get(i).btAddress)) {
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
                                    deviceInfo.OTASupported =  isSUOTASupported;
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
                    if(scannedDevices.size() >0)
                        sendDeviceInfo();
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
            Log.d(MainActivity.LOG_TAG, "onBatchScanResults  " + results.size());
            super.onBatchScanResults(results);
        }

        /**
         * Callback when scan could not be started.
         *
         * @param errorCode Error code (one of SCAN_FAILED_*) for scan failure.
         */
        @Override
        public void onScanFailed(int errorCode) {
            Log.d(MainActivity.LOG_TAG, "onScanFailed  " + errorCode);
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
                        isScanning  = false;
                    }
                }
            }, SCAN_PERIOD);

            if(scanner != null) {
                scanner.startScan(bleCallback);
                scanner.flushPendingScanResults(bleCallback);
                isScanning = true;
            }
        } else {
            if(scanner != null) {
                scanner.stopScan(bleCallback);
                isScanning = false;
            }
        }
        Log.d(MainActivity.LOG_TAG," IS SCANNING  " +  isScanning);
    }




    public  void startUpdate() {

        String existingFwVersion =  selectedDetectorInfo.firmwareVersion;
        String deviceType = selectedDetectorInfo.modelNumber;
        String fileName = "";
        for(int jj =0; jj <fwFilesList.size(); jj++){
            String iFile = fwFilesList.get(jj);
            if(deviceType.contains("01")){
                if(iFile.contains("relais")){
                    fileName = fwFilesList.get(jj);
                }

            }else if(deviceType.contains("03")){
                if(iFile.contains("mosfet")){
                    fileName = fwFilesList.get(jj);
                }
            }else if(deviceType.contains("05")){
                if(iFile.contains("dali")){
                    fileName = fwFilesList.get(jj);
                }
            }
        }

        try {
            InputStream ins = getResources().openRawResource(
                    getResources().getIdentifier(fileName,
                            "raw", getPackageName()));
            suotaManager.setFile(new BLEFile(ins));
        }catch (Exception e){
            e.printStackTrace();
        }

        Intent intent = new Intent();

        if (suotaManager.type == SpotaManager.TYPE) {
            suotaManager.setPatchBaseAddress(0);
        } else if (suotaManager.type == SuotaManager.TYPE) {
        }

        if (memoryType == MainActivity.MEMORY_TYPE_I2C) {
            try {
                suotaManager.setI2CDeviceAddress(0);
            } catch (NumberFormatException nfe) {
                return;
            }
        }

        // Set default block size to 1 for SPOTA, this will not be used in this case
        int fileBlockSize = 1;
        if (suotaManager.type == SuotaManager.TYPE) {
            try {
                fileBlockSize = BLEFile.fileBlockSize;
            } catch (NumberFormatException nfe) {
                fileBlockSize = 0;
            }
            if (fileBlockSize == 0) {
                return;
            }
        }
        suotaManager.getFile().setFileBlockSize(fileBlockSize);

        intent.setAction(MainActivity.ACTION_FW_UPDATE);
        intent.putExtra(MainActivity.EXTRA_FWUPDATE_STEP, 1);
        sendBroadcast(intent);
    }



    private void setMemoryType(int memoryType) {
        this.memoryType = memoryType;
        suotaManager.setMemoryType(memoryType);


        switch (memoryType) {
            case MainActivity.MEMORY_TYPE_SYSTEM_RAM:
                break;
            case MainActivity.MEMORY_TYPE_RETENTION_RAM:
                break;
            case MainActivity.MEMORY_TYPE_SPI:
                if (suotaManager.type == SpotaManager.TYPE) {
                }
                break;
            case MainActivity.MEMORY_TYPE_I2C:
                if (suotaManager.type == SpotaManager.TYPE) {
                }
                break;
        }
    }


    static char seed = 0xFFFF;

    static char[] crcCCITTLookupTable = {
            0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50A5, 0x60C6, 0x70E7, 0x8108,
            0x9129, 0xA14A, 0xB16B, 0xC18C, 0xD1AD, 0xE1CE, 0xF1EF, 0x1231, 0x0210,
            0x3273, 0x2252, 0x52B5, 0x4294, 0x72F7, 0x62D6, 0x9339, 0x8318, 0xB37B,
            0xA35A, 0xD3BD, 0xC39C, 0xF3FF, 0xE3DE, 0x2462, 0x3443, 0x0420, 0x1401,
            0x64E6, 0x74C7, 0x44A4, 0x5485, 0xA56A, 0xB54B, 0x8528, 0x9509, 0xE5EE,
            0xF5CF, 0xC5AC, 0xD58D, 0x3653, 0x2672, 0x1611, 0x0630, 0x76D7, 0x66F6,
            0x5695, 0x46B4, 0xB75B, 0xA77A, 0x9719, 0x8738, 0xF7DF, 0xE7FE, 0xD79D,
            0xC7BC, 0x48C4, 0x58E5, 0x6886, 0x78A7, 0x0840, 0x1861, 0x2802, 0x3823,
            0xC9CC, 0xD9ED, 0xE98E, 0xF9AF, 0x8948, 0x9969, 0xA90A, 0xB92B, 0x5AF5,
            0x4AD4, 0x7AB7, 0x6A96, 0x1A71, 0x0A50, 0x3A33, 0x2A12, 0xDBFD, 0xCBDC,
            0xFBBF, 0xEB9E, 0x9B79, 0x8B58, 0xBB3B, 0xAB1A, 0x6CA6, 0x7C87, 0x4CE4,
            0x5CC5, 0x2C22, 0x3C03, 0x0C60, 0x1C41, 0xEDAE, 0xFD8F, 0xCDEC, 0xDDCD,
            0xAD2A, 0xBD0B, 0x8D68, 0x9D49, 0x7E97, 0x6EB6, 0x5ED5, 0x4EF4, 0x3E13,
            0x2E32, 0x1E51, 0x0E70, 0xFF9F, 0xEFBE, 0xDFDD, 0xCFFC, 0xBF1B, 0xAF3A,
            0x9F59, 0x8F78, 0x9188, 0x81A9, 0xB1CA, 0xA1EB, 0xD10C, 0xC12D, 0xF14E,
            0xE16F, 0x1080, 0x00A1, 0x30C2, 0x20E3, 0x5004, 0x4025, 0x7046, 0x6067,
            0x83B9, 0x9398, 0xA3FB, 0xB3DA, 0xC33D, 0xD31C, 0xE37F, 0xF35E, 0x02B1,
            0x1290, 0x22F3, 0x32D2, 0x4235, 0x5214, 0x6277, 0x7256, 0xB5EA, 0xA5CB,
            0x95A8, 0x8589, 0xF56E, 0xE54F, 0xD52C, 0xC50D, 0x34E2, 0x24C3, 0x14A0,
            0x0481, 0x7466, 0x6447, 0x5424, 0x4405, 0xA7DB, 0xB7FA, 0x8799, 0x97B8,
            0xE75F, 0xF77E, 0xC71D, 0xD73C, 0x26D3, 0x36F2, 0x0691, 0x16B0, 0x6657,
            0x7676, 0x4615, 0x5634, 0xD94C, 0xC96D, 0xF90E, 0xE92F, 0x99C8, 0x89E9,
            0xB98A, 0xA9AB, 0x5844, 0x4865, 0x7806, 0x6827, 0x18C0, 0x08E1, 0x3882,
            0x28A3, 0xCB7D, 0xDB5C, 0xEB3F, 0xFB1E, 0x8BF9, 0x9BD8, 0xABBB, 0xBB9A,
            0x4A75, 0x5A54, 0x6A37, 0x7A16, 0x0AF1, 0x1AD0, 0x2AB3, 0x3A92, 0xFD2E,
            0xED0F, 0xDD6C, 0xCD4D, 0xBDAA, 0xAD8B, 0x9DE8, 0x8DC9, 0x7C26, 0x6C07,
            0x5C64, 0x4C45, 0x3CA2, 0x2C83, 0x1CE0, 0x0CC1, 0xEF1F, 0xFF3E, 0xCF5D,
            0xDF7C, 0xAF9B, 0xBFBA, 0x8FD9, 0x9FF8, 0x6E17, 0x7E36, 0x4E55, 0x5E74,
            0x2E93, 0x3EB2, 0x0ED1, 0x1EF0,
    };


    static char  computeCRC(byte[] data)  {
        char sum = seed;

        byte[] array = (data);
        for(int i =0; i<array.length; i++){
            char indata = (char)(array[i] & 0x00FF);
            int index = (sum >> 8) ^ indata;
            char lookupdata = (char)crcCCITTLookupTable[index];
            sum =  (char)(lookupdata ^ (sum << 8));
        }


        return sum;
    }

    public void log(String message) {
        Log.d(LOG_TAG, LOG_TAG + "  " + message);
    }
}
