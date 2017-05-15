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
var namespace = 'presence-detector-backup'
var baseUrl = '/api/user/key-value/'+ presence-detector-backup; 
var devicesUrl = baseUrl+ '/devices';
var deviceDataUrl =  devicesUrl + 'device-';
var detectorHostName = 'api.my-staging.busch-jaeger.de';
var detectorPort = 443;
var customHeaders = {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + new Buffer(username + ':' + password).toString('base64')
        }
var options = {};


function initOptions(){
    options = {
        hostname: detectorHostName,
        port: detectorPort,
        path: devicesUrl,
        method: 'GET',
        headers: customHeaders,
    };
}
function setCreds(user, pwd){
    username = user;
    password = pwd;
}

function onError(error){
    console.log(error);
}

function onData(jsonData){
    console.log(jsonData);
}

function updateDevices(devices){
    initOptions();
    options.method = 'PUT';
    options.path = devicesUrl;
    makeRequest(options,devices)
}

function updateParamsJsonForDevice(btAddress,jsonObj){
    initOptions();
    options.method = 'PUT';
    options.path = deviceDataUrl+'/'+btAddress;
    makeRequest(options,jsonObj)
}

function getDevices(){
    initOptions();
    makeRequest(options,'')
}

function getParamsJSONForDevice(btAddress){
    initOptions();
    options.path = deviceDataUrl+'/'+btAddress;
    makeRequest(options,'')
}

function makeRequest(options,body)
{
     var req = https.request(options, function(res) {
        res.on('data', function(data) {
            onData(data);
        });
    });
    if(body.length > 0)
        req.end(body);
    else
        req.end();
    req.on('error', function(e) {
            onError(e);
    });
}

