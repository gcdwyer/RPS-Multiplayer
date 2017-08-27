
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

var player1Name = "";
var player2Name = "";

var playerName = "";

// Adding players =============================================================================

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

// Add listener to DB to check for any changes ========================================================
database.ref("/players/").on("value", function (snapshot) {

	console.log(snapshot.val());

	if (snapshot.child("player1").exists()) {

		console.log("P1 exists");

		// console.log("palyer1 name: " + player1.name);

		player1 = snapshot.val().player1;

		player1Name = player1.name;

		$("#playerPanel1").html(player1Name);

		$("#player1Stats").html("Win: " + player1.win + " | Loss: " + player1.loss + " | Tie: " + player1.tie);

	} else {

		$("#playerPanel1").text("Waiting on Player 1...");

		$("#player1Stats").text("Wins: 0 | Loss: 0 | Tie: 0");

		console.log("P1 does NOT exist");
	}


	if (snapshot.child("player2").exists()) {

		console.log("P2 exists");

		// console.log("palyer2 name: " + player2.name);

		player2 = snapshot.val().player2;

		player2Name = player2.name;

		$("#playerPanel2").html(player2.name);

		$("#player2Stats").html("Win: " + player2.win + " | Loss: " + player2.loss + " | Tie: " + player2.tie);

	} else {
		
		$("#playerPanel2").text("Waiting on Player 2...");

		$("#player2Stats").text("Wins: 0 | Loss: 0 | Tie: 0");

		console.log("P2 does NOT exist");
	}


	if (player1 !== null && player2 !== null) {

		$("#Status").text("Waiting on " + player1Name + " to choose...");

	}


});


// Player 1 choice =======================================================================

$("#player1Panel").on("click", ".panelOption", function() {

	// event.preventDefault();

	console.log("RPS was chosen");

	var choice = $(this).text().trim();

	console.log("p1 choice: " + choice);

	database.ref("/players/player1/choice").set(choice);

})

// Player 2 choice =======================================================================

$("#player1Pane2").on("click", ".panelOption", function() {

	// event.preventDefault();

	console.log("RPS was chosen");

	var choice = $(this).text().trim();

	console.log("p2 choice: " + choice);

	database.ref("/players/player2/choice").set(choice);

	compare();

})


// RPS Compare =========================================================================

function compare() {

	console.log("running compare funciton");

	console.log("P1: " + player1.choice);
	console.log("P2: " + player2.choice);

	var p1choice = player1.choice;
	var p2choice = player2.choice;


	if (p1choice === "Rock") {

		if (p2choice === "Rock") {

			console.log("Tie");

		}


	}

}











// Display RPS options in p1 box
// Display waiting on P1 in the second window
// After P1 selects RPS, display choice in p1 box
// Display P2 turn in the second window
// Display RPS options in p2 box
// After P2 selects RPS, display choice in p2 box
// Diplay who wins in middle box
// Increment wins and losses accordingly
// Reset game after ~3 seconds
