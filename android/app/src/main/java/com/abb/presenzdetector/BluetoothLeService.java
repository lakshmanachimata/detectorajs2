/*
 * Copyright (C) 2013 The Android Open Source Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.abb.presenzdetector;

import android.app.Service;
import android.bluetooth.BluetoothAdapter;
import android.bluetooth.BluetoothDevice;
import android.bluetooth.BluetoothGatt;
import android.bluetooth.BluetoothGattCallback;
import android.bluetooth.BluetoothGattCharacteristic;
import android.bluetooth.BluetoothGattDescriptor;
import android.bluetooth.BluetoothGattService;
import android.bluetooth.BluetoothManager;
import android.bluetooth.BluetoothProfile;
import android.content.Context;
import android.content.Intent;
import android.os.Binder;
import android.os.IBinder;
import android.util.Log;


import java.util.List;

/**
 * Service for managing connection and data communication with a GATT server hosted on a
 * given Bluetooth LE device.
 */
public class BluetoothLeService extends Service {

    private BluetoothManager mBluetoothManager;
    private BluetoothAdapter mBluetoothAdapter;
    private String mBluetoothDeviceAddress;
    private BluetoothGatt mBluetoothGatt;
    public int mConnectionState = STATE_DISCONNECTED;

    public static final int STATE_DISCONNECTED = 0;
    public static final int STATE_CONNECTING = 1;
    public static final int STATE_CONNECTED = 2;

    private int checkRefreshAttempts;
    private boolean refreshDone;
    private int refreshAttempt;




    // Implements callback methods for GATT events that the app cares about.  For example,
    // connection change and services discovered.
    private final BluetoothGattCallback mGattCallback = new BluetoothGattCallback() {
        @Override
        public void onConnectionStateChange(BluetoothGatt gatt, int status, int newState) {
            String intentAction;
            if (newState == BluetoothProfile.STATE_CONNECTED) {
                intentAction = MainActivity.ACTION_GATT_CONNECTED;
                mConnectionState = STATE_CONNECTED;
                broadcastUpdate(intentAction);
                Log.i(MainActivity.LOG_TAG, "Connected to GATT server.");
                // Attempts to discover services after successful connection.
                Log.i(MainActivity.LOG_TAG, "Attempting to start service discovery:" +
                        mBluetoothGatt.discoverServices());

            } else if (newState == BluetoothProfile.STATE_DISCONNECTED) {
                intentAction = MainActivity.ACTION_GATT_DISCONNECTED;
                mConnectionState = STATE_DISCONNECTED;
                Log.i(MainActivity.LOG_TAG, "Disconnected from GATT server.");
                broadcastUpdate(intentAction);
            }
        }

        @Override
        public void onServicesDiscovered(BluetoothGatt gatt, int status) {

            if(MainActivity.isUpdateFWStart == true) {
                if (status != BluetoothGatt.GATT_SUCCESS) {
                    Intent intent = new Intent();
                    intent.setAction(MainActivity.ACTION_FW_UPDATE);
                    intent.putExtra(MainActivity.EXTRA_FWUPDATE_ERROR, MainActivity.ERROR_COMMUNICATION);
                    MainActivity.getInstance().sendBroadcast(intent);
                    return;
                }
                // Refresh device cache. This is the safest place to initiate the procedure.
                if (!refreshDone && ++refreshAttempt <= 10) {
                    refreshDone = BJBLEManager.refresh(gatt); // should not fail
                    if (refreshDone)
                        Log.d(MainActivity.LOG_TAG, "restart discovery after refresh");
                    gatt.discoverServices();
                    return;
                }
                BluetoothGattService suota = gatt.getService(MainActivity.SPOTA_SERVICE_UUID);
                if (suota == null
                        || suota.getCharacteristic(MainActivity.SPOTA_MEM_DEV_UUID) == null
                        || suota.getCharacteristic(MainActivity.SPOTA_GPIO_MAP_UUID) == null
                        || suota.getCharacteristic(MainActivity.SPOTA_MEM_INFO_UUID) == null
                        || suota.getCharacteristic(MainActivity.SPOTA_PATCH_LEN_UUID) == null
                        || suota.getCharacteristic(MainActivity.SPOTA_PATCH_DATA_UUID) == null
                        || suota.getCharacteristic(MainActivity.SPOTA_SERV_STATUS_UUID) == null
                        || suota.getCharacteristic(MainActivity.SPOTA_SERV_STATUS_UUID).getDescriptor(MainActivity.SPOTA_DESCRIPTOR_UUID) == null
                        ) {
                    Intent intent = new Intent();
                    intent.setAction(MainActivity.ACTION_FW_UPDATE);
                    intent.putExtra(MainActivity.EXTRA_FWUPDATE_ERROR, MainActivity.ERROR_SUOTA_NOT_FOUND);
                    MainActivity.getInstance().sendBroadcast(intent);
                    return;
                }
                Intent intent = new Intent();
                intent.setAction(MainActivity.ACTION_FW_UPDATE);
                intent.putExtra(MainActivity.EXTRA_FWUPDATE_STEP, 0);
                MainActivity.getInstance().sendBroadcast(intent);
            }else {

                if (status == BluetoothGatt.GATT_SUCCESS) {
                    broadcastUpdate(MainActivity.ACTION_GATT_SERVICES_DISCOVERED);
                }
                else {
                    Log.w(MainActivity.LOG_TAG, "onServicesDiscovered received: " + status);
                }
            }
        }

        @Override
        public void onCharacteristicRead(BluetoothGatt gatt,
                                         BluetoothGattCharacteristic characteristic,
                                         int status) {
            if(MainActivity.isUpdateFWStart == true) {
                int index = -1;
                int step = -1;
                boolean sendUpdate = true;

                if (characteristic.getUuid().equals(MainActivity.ORG_BLUETOOTH_CHARACTERISTIC_MANUFACTURER_NAME_STRING)) {
                    index = 0;
                }
                else if (characteristic.getUuid().equals(MainActivity.ORG_BLUETOOTH_CHARACTERISTIC_MODEL_NUMBER_STRING)) {
                    index = 1;
                }
                else if (characteristic.getUuid().equals(MainActivity.ORG_BLUETOOTH_CHARACTERISTIC_FIRMWARE_REVISION_STRING)) {
                    index = 2;
                }
                else if (characteristic.getUuid().equals(MainActivity.ORG_BLUETOOTH_CHARACTERISTIC_SOFTWARE_REVISION_STRING)) {
                    index = 3;
                }// SPOTA
                else if (characteristic.getUuid().equals(MainActivity.SPOTA_MEM_INFO_UUID)) {
//			int memInfoValue = characteristic.getIntValue(BluetoothGattCharacteristic.FORMAT_UINT32, 0);
//			Log.d("mem info", memInfoValue + "");
//			DeviceActivity.getInstance().logMemInfoValue(memInfoValue);
                    step = 5;
                }
                else {
                    sendUpdate = false;
                }

                if (sendUpdate) {
                    Intent intent = new Intent();
                    intent.setAction(MainActivity.ACTION_FW_UPDATE);
                    if (index >= 0) {
                        intent.putExtra("characteristic", index);
                        intent.putExtra("value", new String(characteristic.getValue()));
                    }
                    else {
                        intent.putExtra(MainActivity.EXTRA_FWUPDATE_STEP, step);
                        intent.putExtra("value", characteristic.getIntValue(BluetoothGattCharacteristic.FORMAT_UINT32, 0));
                    }
                    MainActivity.getInstance().sendBroadcast(intent);
                }
            }else {
                if (status == BluetoothGatt.GATT_SUCCESS ) {
                    broadcastUpdate(MainActivity.ACTION_DATA_AVAILABLE, characteristic);
                }
                super.onCharacteristicRead(gatt, characteristic, status);
            }
        }

        @Override
        public void onCharacteristicChanged(BluetoothGatt gatt,
                                            BluetoothGattCharacteristic characteristic) {
            if(MainActivity.isUpdateFWStart == true) {
                super.onCharacteristicChanged(gatt, characteristic);
                int value = characteristic.getIntValue(BluetoothGattCharacteristic.FORMAT_UINT8, 0);
                Log.d(MainActivity.LOG_TAG, String.format("SPOTA_SERV_STATUS notification: %#04x", value));

                int step = -1;
                int error = -1;
                int memDevValue = -1;
                // Set memtype callback
                if (value == 0x10) {
                    step = 3;
                }
                // Successfully sent a block, send the next one
                else if (value == 0x02) {
                    step = MainActivity.suotaManager.type == SuotaManager.TYPE ? 5 : 8;
                }
                else if (value == 0x03 || value == 0x01) {
                    memDevValue = value;
                }
                else {
                    error = value;
                }
                if (step >= 0 || error >= 0 || memDevValue >= 0) {
                    Intent intent = new Intent();
                    intent.setAction(MainActivity.ACTION_FW_UPDATE);
                    intent.putExtra(MainActivity.EXTRA_FWUPDATE_STEP, step);
                    intent.putExtra(MainActivity.EXTRA_FWUPDATE_ERROR, error);
                    intent.putExtra(MainActivity.EXTRA_FWUPDATE_MEMDEVVALUE, memDevValue);
                    MainActivity.getInstance().sendBroadcast(intent);
                }
            }else {
                broadcastUpdate(MainActivity.ACTION_DATA_AVAILABLE, characteristic);
            }
        }
        /**
         * Callback indicating the result of a characteristic write operation.
         *
         * <p>If this callback is invoked while a reliable write transaction is
         * in progress, the value of the characteristic represents the value
         * reported by the remote device. An application should compare this
         * value to the desired value to be written. If the values don't match,
         * the application must abort the reliable write transaction.
         *
         * @param gatt GATT client invoked {@link BluetoothGatt#writeCharacteristic}
         * @param characteristic Characteristic that was written to the associated
         *                       remote device.
         * @param status The result of the write operation
         *               {@link BluetoothGatt#GATT_SUCCESS} if the operation succeeds.
         */
        public void onCharacteristicWrite(BluetoothGatt gatt,
                                          BluetoothGattCharacteristic characteristic, int status) {
            if(MainActivity.isUpdateFWStart == true) {
                if (status == BluetoothGatt.GATT_SUCCESS) {
                    Log.i(MainActivity.LOG_TAG, "write succeeded");
                    int step = -1;
                    // Step 2 callback: write SPOTA_MEM_DEV_UUID value
                    if (characteristic.getUuid().equals(MainActivity.SPOTA_MEM_DEV_UUID)) {
                        int currStep = MainActivity.getInstance().suotaManager.step;
                        if (currStep == 2 || currStep == 3)
                            step = 3;
                    }
                    // Step 3 callback: write SPOTA_GPIO_MAP_UUID value
                    else if (characteristic.getUuid().equals(MainActivity.SPOTA_GPIO_MAP_UUID)) {
                        step = 4;
                    }
                    // Step 4 callback: set the patch length, default 240
                    else if (characteristic.getUuid().equals(MainActivity.SPOTA_PATCH_LEN_UUID)) {
                        step = MainActivity.getInstance().suotaManager.type == SuotaManager.TYPE ? 5 : 7;
                    }
                    else if (characteristic.getUuid().equals(MainActivity.SPOTA_PATCH_DATA_UUID)
                            //&& DeviceActivity.getInstance().bluetoothManager.type == SuotaManager.TYPE
                            && MainActivity.getInstance().suotaManager.chunkCounter != -1
                            ) {
                        //step = DeviceActivity.getInstance().bluetoothManager.type == SuotaManager.TYPE ? 5 : 7;
                /*DeviceActivity.getInstance().runOnUiThread(new Runnable() {
                    @Override
                    public void run() {
                        DeviceActivity.getInstance().bluetoothManager.sendBlock();
                    }
                });*/
                        //Log.d(TAG, "Next block in chunk " + DeviceActivity.getInstance().bluetoothManager.chunkCounter);
                        MainActivity.getInstance().suotaManager.sendBlock();
                    }

                    if (step > 0) {
                        Intent intent = new Intent();
                        intent.setAction(MainActivity.ACTION_FW_UPDATE);
                        intent.putExtra(MainActivity.EXTRA_FWUPDATE_STEP, step);
                        MainActivity.getInstance().sendBroadcast(intent);
                    }
                }
                else {
                    Log.e(MainActivity.LOG_TAG, "write failed: " + status);
                    // Suota on remote device doesn't send write response before reboot
                    if (!MainActivity.getInstance().suotaManager.rebootsignalSent) {
                        Intent intent = new Intent();
                        intent.setAction(MainActivity.ACTION_FW_UPDATE);
                        intent.putExtra(MainActivity.EXTRA_FWUPDATE_ERROR, MainActivity.ERROR_COMMUNICATION);
                        MainActivity.getInstance().sendBroadcast(intent);
                    }
                }
                super.onCharacteristicWrite(gatt, characteristic, status);
            }
        }

        /**
         * Callback reporting the result of a descriptor read operation.
         *
         * @param gatt GATT client invoked {@link BluetoothGatt#readDescriptor}
         * @param descriptor Descriptor that was read from the associated
         *                   remote device.
         * @param status {@link BluetoothGatt#GATT_SUCCESS} if the read operation
         *               was completed successfully
         */
        public void onDescriptorRead(BluetoothGatt gatt, BluetoothGattDescriptor descriptor,
                                     int status) {
        }

        /**
         * Callback indicating the result of a descriptor write operation.
         *
         * @param gatt GATT client invoked {@link BluetoothGatt#writeDescriptor}
         * @param descriptor Descriptor that was writte to the associated
         *                   remote device.
         * @param status The result of the write operation
         *               {@link BluetoothGatt#GATT_SUCCESS} if the operation succeeds.
         */
        public void onDescriptorWrite(BluetoothGatt gatt, BluetoothGattDescriptor descriptor,
                                      int status) {
            if(MainActivity.isUpdateFWStart == true) {
                super.onDescriptorWrite(gatt, descriptor, status);
                Log.d(MainActivity.LOG_TAG, "onDescriptorWrite");
                if (status != BluetoothGatt.GATT_SUCCESS) {
                    Intent intent = new Intent();
                    intent.setAction(MainActivity.ACTION_FW_UPDATE);
                    intent.putExtra(MainActivity.EXTRA_FWUPDATE_ERROR, MainActivity.ERROR_COMMUNICATION);
                    MainActivity.getInstance().sendBroadcast(intent);
                    return;
                }
                if (descriptor.getCharacteristic().getUuid().equals(MainActivity.SPOTA_SERV_STATUS_UUID)) {
                    int step = 2;

                    Intent intent = new Intent();
                    intent.setAction(MainActivity.ACTION_FW_UPDATE);
                    intent.putExtra(MainActivity.EXTRA_FWUPDATE_STEP, step);
                    MainActivity.getInstance().sendBroadcast(intent);
                }
            }
        }

        /**
         * Callback invoked when a reliable write transaction has been completed.
         *
         * @param gatt GATT client invoked {@link BluetoothGatt#executeReliableWrite}
         * @param status {@link BluetoothGatt#GATT_SUCCESS} if the reliable write
         *               transaction was executed successfully
         */
        public void onReliableWriteCompleted(BluetoothGatt gatt, int status) {
        }

        /**
         * Callback reporting the RSSI for a remote device connection.
         *
         * This callback is triggered in response to the
         * {@link BluetoothGatt#readRemoteRssi} function.
         *
         * @param gatt GATT client invoked {@link BluetoothGatt#readRemoteRssi}
         * @param rssi The RSSI value for the remote device
         * @param status {@link BluetoothGatt#GATT_SUCCESS} if the RSSI was read successfully
         */
        public void onReadRemoteRssi(BluetoothGatt gatt, int rssi, int status) {
        }

        /**
         * Callback indicating the MTU for a given device connection has changed.
         *
         * This callback is triggered in response to the
         * {@link BluetoothGatt#requestMtu} function, or in response to a connection
         * event.
         *
         * @param gatt GATT client invoked {@link BluetoothGatt#requestMtu}
         * @param mtu The new MTU size
         * @param status {@link BluetoothGatt#GATT_SUCCESS} if the MTU has been changed successfully
         */
        public void onMtuChanged(BluetoothGatt gatt, int mtu, int status) {
        }
    };

    private void broadcastUpdate(final String action) {
        final Intent intent = new Intent(action);
        sendBroadcast(intent);
    }

    private void broadcastUpdate(final String action,
                                 final BluetoothGattCharacteristic characteristic) {
        final Intent intent = new Intent(action);


        // For all other profiles, writes the data formatted in HEX.
        final byte[] data = characteristic.getValue();
        if (data != null && data.length > 0) {
            final StringBuilder stringBuilder = new StringBuilder(data.length);
            for(byte byteChar : data)
                stringBuilder.append(String.format("%02X ", byteChar));

            intent.putExtra(MainActivity.EXTRA_DATA, data);
            intent.putExtra(MainActivity.EXTRA_CHARECTERSTIC, new String(characteristic.getUuid().toString()));
        }
        sendBroadcast(intent);
    }

    public class LocalBinder extends Binder {
        BluetoothLeService getService() {
            return BluetoothLeService.this;
        }
    }

    @Override
    public IBinder onBind(Intent intent) {
        return mBinder;
    }

    @Override
    public boolean onUnbind(Intent intent) {
        // After using a given device, you should make sure that BluetoothGatt.close() is called
        // such that resources are cleaned up properly.  In this particular example, close() is
        // invoked when the UI is disconnected from the Service.
        close();
        return super.onUnbind(intent);
    }

    private final IBinder mBinder = new LocalBinder();

    /**
     * Initializes a reference to the local Bluetooth adapter.
     *
     * @return Return true if the initialization is successful.
     */
    public boolean initialize() {
        // For API level 18 and above, get a reference to BluetoothAdapter through
        // BluetoothManager.
        if (mBluetoothManager == null) {
            mBluetoothManager = (BluetoothManager) getSystemService(Context.BLUETOOTH_SERVICE);
            if (mBluetoothManager == null) {
                Log.e(MainActivity.LOG_TAG, "Unable to initialize BluetoothManager.");
                return false;
            }
        }

        mBluetoothAdapter = mBluetoothManager.getAdapter();
        if (mBluetoothAdapter == null) {
            Log.e(MainActivity.LOG_TAG, "Unable to obtain a BluetoothAdapter.");
            return false;
        }

        return true;
    }

    /**
     * Connects to the GATT server hosted on the Bluetooth LE device.
     *
     * @param address The device address of the destination device.
     *
     * @return Return true if the connection is initiated successfully. The connection result
     *         is reported asynchronously through the
     *         {@code BluetoothGattCallback#onConnectionStateChange(android.bluetooth.BluetoothGatt, int, int)}
     *         callback.
     */
    public boolean  connect(final String address) {
        if (mBluetoothAdapter == null || address == null) {
            Log.w(MainActivity.LOG_TAG, "BluetoothAdapter not initialized or unspecified address.");
            initialize();
            //return false;
        }

        // Previously connected device.  Try to reconnect.
        if (mBluetoothDeviceAddress != null && address.equals(mBluetoothDeviceAddress)
                && mBluetoothGatt != null) {
            Log.d(MainActivity.LOG_TAG, "Trying to use an existing mBluetoothGatt for connection.");
            if (mBluetoothGatt.connect()) {
                mConnectionState = STATE_CONNECTING;
                return true;
            } else {
                return false;
            }
        }

        final BluetoothDevice device = mBluetoothAdapter.getRemoteDevice(address);
        if (device == null) {
            Log.w(MainActivity.LOG_TAG, "Device not found.  Unable to connect.");
            return false;
        }
        // We want to directly connect to the device, so we are setting the autoConnect
        // parameter to false.
        mBluetoothGatt = device.connectGatt(this, false, mGattCallback);
        Log.d(MainActivity.LOG_TAG, "Trying to create a new connection.");
        mBluetoothDeviceAddress = address;
        mConnectionState = STATE_CONNECTING;
        return true;
    }

    /**
     * Disconnects an existing connection or cancel a pending connection. The disconnection result
     * is reported asynchronously through the
     * {@code BluetoothGattCallback#onConnectionStateChange(android.bluetooth.BluetoothGatt, int, int)}
     * callback.
     */
    public void disconnect() {
        if (mBluetoothAdapter == null || mBluetoothGatt == null) {
            Log.w(MainActivity.LOG_TAG, "BluetoothAdapter not initialized");
            return;
        }
        mBluetoothGatt.disconnect();
    }

    /**
     * After using a given BLE device, the app must call this method to ensure resources are
     * released properly.
     */
    public void close() {
        if (mBluetoothGatt == null) {
            return;
        }
        mBluetoothGatt.close();
        mBluetoothGatt = null;
    }


    public BluetoothGatt getGatt() {
        return mBluetoothGatt;
    }
    /**
     * Request a read on a given {@code BluetoothGattCharacteristic}. The read result is reported
     * asynchronously through the {@code BluetoothGattCallback#onCharacteristicRead(android.bluetooth.BluetoothGatt, android.bluetooth.BluetoothGattCharacteristic, int)}
     * callback.
     *
     * @param characteristic The characteristic to read from.
     */
    public void readCharacteristic(BluetoothGattCharacteristic characteristic) {
        if (mBluetoothAdapter == null || mBluetoothGatt == null) {
            Log.w(MainActivity.LOG_TAG, "BluetoothAdapter not initialized");
            return;
        }
        if(mBluetoothGatt.readCharacteristic(characteristic)){

        }else {
            Log.d(MainActivity.LOG_TAG,"not able to send readCharacteristic");
        }
    }

    public void writeCharacteristic(BluetoothGattCharacteristic characteristic) {
        if (mBluetoothAdapter == null || mBluetoothGatt == null) {
            Log.w(MainActivity.LOG_TAG, "BluetoothAdapter not initialized");
            return;
        }
        if(mBluetoothGatt.writeCharacteristic(characteristic)) {
            Log.d("bje_detector","bje_detector write is success");
        }
        else {
            Log.d("bje_detector","bje_detector write is fail    " + getGatt().getDevice().getAddress());
        }
    }

    /**
     * Enables or disables notification on a give characteristic.
     *
     * @param characteristic Characteristic to act on.
     * @param enabled If true, enable notification.  False otherwise.
     */
    public void setCharacteristicNotification(BluetoothGattCharacteristic characteristic,
                                              boolean enabled) {
        if (mBluetoothAdapter == null || mBluetoothGatt == null) {
            Log.w(MainActivity.LOG_TAG, "BluetoothAdapter not initialized");
            return;
        }
        mBluetoothGatt.setCharacteristicNotification(characteristic, enabled);
    }

    /**
     * Retrieves a list of supported GATT services on the connected device. This should be
     * invoked only after {@code BluetoothGatt#discoverServices()} completes successfully.
     *
     * @return A {@code List} of supported services.
     */
    public List<BluetoothGattService> getSupportedGattServices() {
        if (mBluetoothGatt == null)
            return null;
        return mBluetoothGatt.getServices();
    }
}
