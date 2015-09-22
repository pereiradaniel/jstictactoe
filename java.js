$(document).ready(function() {

var isPlayerOneTurn = true;

var gameState = {
	
	winner: null,
	xScore: null,
	oScore: null,


};

	selectMark = function() {
		if (isPlayerOneTurn === true) {
			playerMark = "X";
		} else {
			playerMark = "O";
		}
		return playerMark;
	};

	var checkForWinner = function(currentPlayerMark) {
		if (checkRow(1, 2, 3, currentPlayerMark) ||
			checkRow(4, 5, 6, currentPlayerMark) ||
			checkRow(7, 8, 9, currentPlayerMark) ||
			checkRow(1, 4, 7, currentPlayerMark) ||
			checkRow(2, 5, 8, currentPlayerMark) ||
			checkRow(3, 6, 9, currentPlayerMark) ||
			checkRow(1, 5, 9, currentPlayerMark) ||
			checkRow(3, 5, 7, currentPlayerMark)) {
				//console.log("Win condition for " + currentPlayerMark);
				addToScore();
				gameState.winner = currentPlayerMark;
		}else{};
	};

	var checkRow = function(box1, box2, box3, mark) {
		return (checkBox(box1) == mark && checkBox(box2) == mark && checkBox(box3) == mark);
	};

	var checkBox = function(num) {
		return document.getElementById(num).innerText;
	};

	var addToScore = function() {
		if (isPlayerOneTurn == true) {
			gameState.xScore ++;
			document.getElementById("xscorebox").innerText = gameState.xScore;
		}else{
			gameState.oScore ++;
			document.getElementById("oscorebox").innerText = gameState.oScore;
		}
	};

	var clearBoxes = function() {
		for (var i = 1; i < 10; i++) {
			document.getElementById(i).innerText = "";
		}
		gameState.winner = null;
	};

	document.getElementById("reset").onclick = clearBoxes;


	$(".box").click(function() {
		if (!gameState.winner) {
			if (this.innerText == "") {
			// place mark in the selected box
			this.innerText = selectMark();
			// place mark on the gameState board
			gameState.board = selectMark();
			// $(this).off("click");
			// checkForWinner
			checkForWinner(selectMark());
			isPlayerOneTurn = !isPlayerOneTurn;
			setGameMsg(selectMark() + "'s turn");
			}else{console.log("Pick an empty box!")};
		}else{
			// console.log("Game is over!");
		};
	});

	var setGameMsg = function(msg) {
		document.getElementById("game-msg").innerText = msg;
	};

	setGameMsg(selectMark() + "'s turn");

});