/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

window.onload = function() {
	document.addEventListener("deviceready", onDeviceReady, false);	
}

function onDeviceReady () {
	var parentElement = document.getElementById("deviceready");
	var listeningElement = parentElement.querySelector('.listening');
	var receivedElement = parentElement.querySelector('.received');
	
	listeningElement.setAttribute('style', 'display:none');
	receivedElement.setAttribute('style', 'display:block');

	$('#info').html('Cordova Version: ' + device.cordova +'<br>');
	$('#info').append(device.model + '<br>');
	$('#info').append(device.platform+ ' ' + device.version + '<br>');
	
	//takePicture();
	gyro();
}
function gyro () {
	var options = { frequency: 100 };  // Update every 100 ms
	navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
	
	function onSuccess(acceleration) {
		document.getElementById('accX').innerHTML = "Acceleration X: " + Math.round(acceleration.x * 100) / 100;
		document.getElementById('accY').innerHTML = "Acceleration Y: " + Math.round(acceleration.y * 100) / 100;
		document.getElementById('accZ').innerHTML = "Acceleration Z: " + Math.round(acceleration.z * 100) / 100;
		document.getElementById('timestamp').innerHTML = "Timestamp: " + acceleration.timestamp;
    };
	
	function onError() {
        alert('Accelerometer Error!');
    };
}
function vibrate(t){
	navigator.vibrate(t);
}
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    alert('Connection type: ' + states[networkState]);
}
function takePicture () {
	navigator.camera.getPicture(onSuccess, onFail, { quality: 50, destinationType: Camera.DestinationType.DATA_URL})
	
	function onSuccess(imageData) {
		var image = document.getElementById('myImage');
		image.src = "data:image/jpeg;base64," + imageData;
		console.log('image updated');
	}
	
	function onFail (message) {
		console.log("image capture failed because " + message);
	}
}
