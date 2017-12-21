// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

exports.saveTemp = functions.database.ref('currentTemp').onWrite(event => {
	
    const temperature = event.data.val();
	  
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	var hour = today.getHours();
	var minutes = today.getMinutes();
	var seconds = today.getSeconds();
	if(dd < 10){
		dd = '0' + dd;
	}
	if(mm < 10){
		mm = '0' + mm;
	}
	
	var date = yyyy + '-' + mm + '-' + dd + ':' + hour + ':' + minutes + ':' + seconds;
    console.log('Temperatura registrada em', date, temperature);
	return admin.database().ref('tempHistory/' + date).set({temp: temperature});
    }
);