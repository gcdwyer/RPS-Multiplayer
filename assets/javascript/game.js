$(document).ready(function() {




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

	function p1StartButton () {

		$("#addButton").on("click", function() {

			if ($("#nameInput").val() === "") {

				alert("Please enter name");

			} else {

				console.log("you clicked the start button");

				var p1Name = $("#nameInput").val();

				console.log("P1 Name: " + p1Name);

				$(".box1").html(p1Name);

				$(".display").html("Welcome " + p1Name + "! You are Player 1");

				$("#nameInput").val("");

				$("#nameInput").hide();

				$("#addButton").hide();

			}
		})
	}

	p1StartButton();

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
