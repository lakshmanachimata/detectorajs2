'use strict';

var https = require('https');
var fs = require('fs');
var path = require('path');

var certPath = path.join(__dirname, 'client.cert');
var keyPath = path.join(__dirname, 'client.private');
var obj = JSON.parse(fs.readFileSync('params.json', 'utf8'));
var bodyStr = JSON.stringify(obj);

var username = 'harsha'
var password = 'P@$$w0rd123#'

var baseUrl = '/api/user/key-value/presence-detector-backup'
var devicesUrl = baseUrl+ '/devices';
var deviceDataUrl =  devicesUrl + 'device-';

function getDevices(){

    var options = {
    hostname: 'api.my-staging.busch-jaeger.de',
    port: 443,
    path: devicesUrl,
    method: 'GET',
    headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
        }
    };
    var req = https.request(options, function(res) {
        res.on('data', function(data) {
            process.stdout.write(data);
        });
    });
    req.end();
    req.on('error', function(e) {
            console.error(e);
    });

}

function updateDevices(devices){
    var options = {
    hostname: 'api.my-staging.busch-jaeger.de',
    port: 443,
    path: devicesUrl,
    method: 'PUT',
    headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
        }
    };
    var req = https.request(options, function(res) {
        res.on('data', function(data) {
            process.stdout.write(data);
        });
    });
    req.end(devices);
    req.on('error', function(e) {
            console.error(e);
    });
}

function updateParamsJsonForDevice(btAddress,jsonObj){
    var options = {
    hostname: 'api.my-staging.busch-jaeger.de',
    port: 443,
    path: deviceDataUrl+'/'+btAddress,
    method: 'PUT',
    headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
        }
    };
    var req = https.request(options, function(res) {
        res.on('data', function(data) {
            process.stdout.write(data);
        });
    });
    req.end(jsonObj);
    req.on('error', function(e) {
            console.error(e);
    });
}

function getParamsJSONForDevice(btAddress){
    var options = {
    hostname: 'api.my-staging.busch-jaeger.de',
    port: 443,
    path: devicesUrl,
    method: 'GET',
    headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
        }
    };
    var req = https.request(options, function(res) {
        res.on('data', function(data) {
            process.stdout.write(data);
        });
    });
    req.end();
    req.on('error', function(e) {
            console.error(e);
    });
}


