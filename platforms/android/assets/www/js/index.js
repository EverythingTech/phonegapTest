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
 
var xAcceleration = 0;
var yAcceleration = 0;

var context;
var x=100;
var y=100;
var dx=5;
var dy=5;

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
	
	//gyro();
	
	context = myCanvas.getContext('2d');
	setInterval(draw,10);
	
}

function gyro () {
	// this will keep track of the device's motion
	
	
	function onSuccess(acceleration) {
		xAcceleration = acceleration.x;
        yAcceleration = acceleration.y
}

	function onError() {
		alert('onError!');
	}

	var options = { frequency: 100 };  // Update every 100 miliseconds

		var watchID = navigator.accelerometer.watchAcceleration(onSuccess, onError, options);
	}


function draw() {
	context.clearRect(0,0, 300,300);
	context.beginPath();
	context.fillStyle="#0000ff";
	// Draws a circle of radius 20 at the coordinates 100,100 on the canvas
	context.arc(x,y,20,0,Math.PI*2,true); 
	context.closePath();
	context.fill();
	x += dx;
	y += dy;
}

 




