package de.buschjaeger.freeathomedemo;

import com.abb.presenzdetector.MainActivity;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.UUID;

public class FreeathomeJNI {
    private final static String LOG_TAG = MainActivity.LOG_TAG;
    public native static long CreateContext(byte[] language, byte[] writableDir, boolean useStaging, boolean debugVerbose);
    public native static void FinishContext(long context); // barely tested and possibly not working. normally not needed.
    public native static void Connect(long context, byte[] hostNameUtf8, byte[] userNameUtf8, byte[] passwordUtf8);
    public native static void EmitNextEvent(long context);

    /**
     * Generate a UUID string. Used by freeathome JNI code.
     **/
    public static byte[] GenUUID() {
        return Util.stringToByteArrayUtf8(UUID.randomUUID().toString());
    }

    /**
     * Trigger the app to call {@link #EmitNextEvent} on the main thread. Used by freeathome JNI
     * code.
     **/
    public static void App_EmitNextEventOnMainThread() {
        final MainActivity activity = MainActivity.getInstance();
        if (activity == null) {
            return;
        }
        activity.emitNextEventOnMainThread();
    }

    /**
     * Compare two UTF-8 encoded strings. Used by freeathome JNI code.
     **/
    public static int FHUtf8Compare(byte[] s1, byte[] s2, boolean caseSensitive) {
        String a = Util.byteArrayUtf8ToString(s1);
        String b = Util.byteArrayUtf8ToString(s2);
        if (a == null) {
            a = "";
        }
        if (b == null) {
            b = "";
        }
        if (caseSensitive) {
            return a.compareTo(b);
        }
        return a.compareToIgnoreCase(b);
    }

    /**
     * Convert a UTF-8 encoded string to lowercase. Used by freeathome JNI code.
     **/
    public static byte[] FHUtf8ToLower(byte[] str) {
        String a = Util.byteArrayUtf8ToString(str);
        if (a == null) {
            a = "";
        }
        return Util.stringToByteArrayUtf8(a.toLowerCase());
    }

    public static byte[] Sys_GetDNSServerList() {
        ArrayList<String> servers = new ArrayList<String>();
        try {
            Class<?> SystemProperties = null;
            SystemProperties = Class.forName("android.os.SystemProperties");
            Method method = SystemProperties.getMethod("get", new Class[] { String.class });
            for (String name : new String[] { "net.dns1", "net.dns2", "net.dns3", "net.dns4", }) {
                String value = (String)method.invoke(null, name);
                if (value != null && !"".equals(value) && !servers.contains(value)) {
                    servers.add(value);
                }
            }
        }
        catch (ClassNotFoundException e) {
            android.util.Log.e(LOG_TAG, "Sys_GetDNSServerList: ClassNotFoundException: " + e);
        }
        catch (NoSuchMethodException e) {
            android.util.Log.e(LOG_TAG, "Sys_GetDNSServerList: NoSuchMethodException: " + e);
        }
        catch (IllegalAccessException e) {
            android.util.Log.e(LOG_TAG, "Sys_GetDNSServerList: IllegalAccessException: " + e);
        }
        catch (InvocationTargetException e) {
            android.util.Log.e(LOG_TAG, "Sys_GetDNSServerList: InvocationTargetException: " + e);
        }
        String arr[] = new String[servers.size()];
        return Util.stringArrayToByteArrayUtf8(servers.toArray(arr));
    }
}
