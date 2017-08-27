
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

var turn = 1;

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

		database.ref("/players/turn").set(turn);

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

		$("#nameStart").hide();
	}

	console.log("playerName: " + playerName);

	// add player to message when joining
	var message = playerName + " has joined the chat!";

	console.log("joined: " + message);

	$("#chatDisplay").append(message + "<br>");

	// clears the name field
	$("#nameInput").val("");

})

// Chat =========================================================================

$("#chatSend").on("click", function(event) {

	event.preventDefault();

	console.log("Send chat button pressed");

	var message = $("#textField").val().trim();

	console.log("message: " + message);

	$("#textField").val("");



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

		// $("#Status").text("Waiting on " + player1Name + " to choose...");

		$("#Status").text("Waiting on " + player1.name + " to make a selection");

	}


});

// Mouse over to change display =============================================================

	$(".panel1Option").on("mouseover", function () {

	 		$(this).css("background-color", "lightgray");

	 	})

	$(".panel1Option").on("mouseout", function () {

	 		$(this).css("background-color", "white");

	 	})

	$(".panel2Option").on("mouseover", function () {

	 		$(this).css("background-color", "lightgray");

	 	})

	$(".panel2Option").on("mouseout", function () {

	 		$(this).css("background-color", "white");

	 	})


// Player 1 choice =======================================================================

$("#player1Panel").on("click", ".panel1Option", function() {

	// event.preventDefault();

	if (player1 !== null && player2 !== null && turn === 1) {

		console.log("RPS was chosen");

		var choice = $(this).text().trim();

		console.log("p1 choice: " + choice);

		database.ref("/players/player1/choice").set(choice);

		$(".panel1Option").hide();

		$("#playerPanel1").append("<br><br><br><h1>" + choice + "</h1><br><br>");

		turn = 2;

		database.ref().child("/players/turn").set(turn);

		console.log("Player " + turn + " turn");

		$("#Status").text("Waiting on " + player2.name + " to make a selection");

	}

})

// Player 2 choice =======================================================================

$("#player1Pane2").on("click", ".panel2Option", function() {

	// event.preventDefault();

	if (player1 !== null && player2 !== null && turn === 2) {

		console.log("RPS was chosen");

		var choice = $(this).text().trim();

		console.log("p2 choice: " + choice);

		database.ref("/players/player2/choice").set(choice);

		$(".panel2Option").hide();

		$("#playerPanel2").html("<br><br><br><h1>" + choice + "</h1><br><br>");

		compare();

	}

})


// RPS Compare =========================================================================

function compare() {

	console.log("running compare funciton");

	console.log("P1: " + player1.choice);
	console.log("P2: " + player2.choice);

	var p1choice = player1.choice;
	var p2choice = player2.choice;

	// $(".panel1Option").show();
	// $(".panel2Option").show();

	$("#Status").show();

	if (p1choice === "Rock") {

		if (p2choice === "Rock") {

			console.log("Tie Game");
			database.ref("/players/player1/tie").set(player1.tie + 1);
			database.ref("/players/player2/tie").set(player2.tie + 1);
			$("#Status").html("<br><br><br><h2>Tie</h2>");

		} else if (p2choice === "Paper") {

			console.log("Paper Wins");
			database.ref("/players/player1/loss").set(player1.loss + 1);
			database.ref("/players/player2/win").set(player2.win + 1);
			$("#Status").html("<br><br><br><h2>" + player2Name + " wins!</h2>");

		} else { //Scissors

			console.log("Rock Wins");
			database.ref("/players/player1/win").set(player1.win + 1);
			database.ref("/players/player2/loss").set(player2.loss + 1);
			$("#Status").html("<br><br><br><h2>" + player1Name + " wins!</h2>");

		}

	} 

	else if (p1choice === "Paper") {

		if (p2choice === "Rock") {

			console.log("Paper Wins");
			database.ref("/players/player1/win").set(player1.win + 1);
			database.ref("/players/player2/loss").set(player2.loss + 1);
			$("#Status").html("<br><br><br><h2>" + player1Name + " wins!</h2>");

		} else if (p2choice === "Paper") {

			console.log("Tie Game");
			database.ref("/players/player1/tie").set(player1.tie + 1);
			database.ref("/players/player2/tie").set(player2.tie + 1);
			$("#Status").html("<br><br><br><h2>Tie</h2>");

		} else { //Scissors

			console.log("Scissors Win");
			database.ref("/players/player1/loss").set(player1.loss + 1);
			database.ref("/players/player2/win").set(player2.win + 1);
			$("#Status").html("<br><br><br><h2>" + player2Name + " wins!</h2>");

		}

	} 

	else if (p1choice === "Scissors") {

		if (p2choice === "Rock") {

			console.log("Rock Wins");
			database.ref("/players/player1/loss").set(player1.loss + 1);
			database.ref("/players/player2/win").set(player2.win + 1);
			$("#Status").html("<br><br><br><h2>" + player2Name + " wins!</h2>");

		} else if (p2choice === "Paper") {

			console.log("Scissors Win");
			database.ref("/players/player1/win").set(player1.win + 1);
			database.ref("/players/player2/loss").set(player2.loss + 1);
			$("#Status").html("<br><br><br><h2>" + player1Name + " wins!</h2>");

		} else { //Scissors

			console.log("Tie Game");
			database.ref("/players/player1/tie").set(player1.tie + 1);
			database.ref("/players/player2/tie").set(player2.tie + 1);
			$("#Status").html("<br><br><br><h2>Tie</h2>");

		}

	}

	// RESET Timeout

	setTimeout(reset, 1000 * 3);

	function reset() {

		console.log("Reset after 3 seconds");

		// $("#playerPanel1 text").last().remove();

		$("#playerPanel2 text").last().remove();

		$(".panel1Option").show();

		$(".panel2Option").show();

		$("#Status").hide();

		console.log("I got here");




	}



	turn = 1;

	// database.ref().child("/players/turn").set(turn);

	console.log("Player " + turn + " turn");

}


// Reset game after ~3 seconds
