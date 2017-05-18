package de.buschjaeger.freeathomedemo;

import java.io.UnsupportedEncodingException;

public class Util {
    public static String byteArrayUtf8ToString(byte[] b) {
        if (b == null) {
            return null;
        }
        try {
            return new String(b, "UTF-8");
        }
        catch (UnsupportedEncodingException ex) {
            return null;
        }
    }
    public static byte[] stringToByteArrayUtf8(String s) {
        if (s == null) {
            return null;
        }
        try {
            return s.getBytes("UTF-8");
        }
        catch (UnsupportedEncodingException e) {
            return null;
        }
    }

    // create a bytearray containing multiple strings separated by \0 terminated by \0
    public static byte[] stringArrayToByteArrayUtf8(String[] strings) {
        byte[] arr = null;
        int totalLen = 0;
        for (String s : strings) {
            totalLen += s.length() + 1;
        }
        totalLen++;
        arr = new byte[totalLen];
        int pos = 0;
        for (String s : strings) {
            byte[] a = stringToByteArrayUtf8(s);
            System.arraycopy(a, 0, arr, pos, a.length);
            pos += a.length;
            arr[pos] = 0;
            pos++;
        }
        arr[pos] = 0;

        return arr;
    }
}
