// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
var database = admin.database();
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// This registration token comes from the client FCM SDKs.
var registrationToken = "bk3RNwTe3H0:CI2k_HHwgIpoDKCIZvvDMExUdFQ3P1...";

// Set the message as high priority and have it expire after 24 hours.
var options = {
  priority: "high"
};
  
exports.saveTemp = functions.database.ref('currentTemp').onWrite(event => {
	
    const temperature = event.data.val();
	const now = Date.now();
	
	var highTemp = database.ref("highTemp");
	highTemp.on("value", function(snapshot) {
		console.log(snapshot.val());
		
		if (temperature > snapshot.val()){
		admin.messaging().sendToDevice(registrationToken, payload, options)
		.then(function(response) {
			// See the MessagingDevicesResponse reference documentation for
			// the contents of response.
			console.log("Successfully sent message:", response);
		})
		.catch(function(error) {
			console.log("Error sending message:", error);
		});
		}
	
	}, function (errorObject) {
	console.log("The read failed: " + errorObject.code);
	});
	
	var payload = {
		notification: {
			temp: temperature,
			time: now
		}
	};
	
	return database.ref('tempHistory/' + now).set({temp: temperature});
    }
);