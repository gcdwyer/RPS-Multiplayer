
// Initialize Firebase
var config = {
	apiKey: "AIzaSyBPmYZHjpEDxOy9RHvlM4dvDED_iWwRbSY",
	authDomain: "rps-multiplayer-10a10.firebaseapp.com",
	databaseURL: "https://rps-multiplayer-10a10.firebaseio.com",
	projectId: "rps-multiplayer-10a10",
	storageBucket: "rps-multiplayer-10a10.appspot.com",
	messagingSenderId: "125264776474"
};

firebase.initializeApp(config);

var database = firebase.database();

var player1 = null;
var player2 = null;

var playerName = "";

// Adding players ===================================================================

$("#addButton").on("click", function(event) {

	event.preventDefault();

	if ($("#nameInput").val() === "") {

		alert("Please enter name");

	} else if (player1 === null) {

		console.log("About to add P1");

		playerName = $("#nameInput").val().trim();

		player1 = {
			name: playerName,
			win: 0,
			loss: 0,
			tie: 0
		};

		database.ref().child("/players/player1").set(player1);



	} else if (player1 !== null && player2 === null) {

		console.log("About to add P2");

		playerName = $("#nameInput").val().trim();

		player2 = {
			name: playerName,
			win: 0,
			loss: 0,
			tie: 0
		};

		database.ref().child("/players/player2").set(player2);
	}

	$("#nameInput").val("");

})


database.ref("/players/").on("value", function (snapshot) {

	if (snapshot.child("player1").exists()) {

		console.log("P1 exists");

		console.log("palyer1 name: " + player1.name);

		$("#playerPanel1").html(player1.name);

		$("#player1Stats").html("Win: " + player1.win + " | Loss: " + player1.loss + " | Tie: " + player1.tie);

	} else {

		console.log("P1 does NOT exist");
	}


	if (snapshot.child("player2").exists()) {

		console.log("P2 exists");

		console.log("palyer2 name: " + player2.name);

		$("#playerPanel2").html(player2.name);

		$("#player2Stats").html("Win: " + player2.win + " | Loss: " + player2.loss + " | Tie: " + player2.tie);

	} else {

		console.log("P2 does NOT exist");
	}






// console.log("snapshot: " + snapshot.val());

});



// Only 2 users can play at same time
// P1 enter name
// Click Start button to save name
// Place P1 into p1 box
// P2 enter name
// Click Start butotn to save name
// Place P2 into p2 box
// Display P1 turn in the first window
// Display RPS options in p1 box
// Display waiting on P1 in the second window
// After P1 selects RPS, display choice in p1 box
// Display P2 turn in the second window
// Display RPS options in p2 box
// After P2 selects RPS, display choice in p2 box
// Diplay who wins in middle box
// Increment wins and losses accordingly
// Reset game after ~3 seconds
