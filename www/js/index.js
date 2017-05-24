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
	
	gyro();
	
	
}

function gyro () {
	// The compass is a sensor that detects the direction or heading that the device is pointed, 
	// typically from the top of the device. It measures the heading in degrees from 0 to 359.99, 
	// where 0 is north.
	var options = { frequency: 100 };  // Update every 100 ms
	navigator.compass.watchHeading(onSuccess, onError, options);
	
	function onSuccess(heading) {
		document.getElementById('heading').innerHTML = "heading " + heading.magneticHeading;
		document.getElementById('timestamp').innerHTML = "Timestamp: " + heading.timestamp;

		document.getElementById('myImage').setAttribute('style', '-webkit-transform: rotate(' + (360 - heading.magneticHeading) + 'deg)');
    };

	
	function onError(error) {
        alert('Accelerometer Error!' + error.code);
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
