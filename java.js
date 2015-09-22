$(document).ready(function() {

var isPlayerOneTurn = true;
var winBoxes = [];
var currentElement = null;

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
				setGameMsg(currentPlayerMark + " has won!");
		}else{};
	};

	var checkRow = function(box1, box2, box3, mark) {
		if ((checkBox(box1) == mark && checkBox(box2) == mark && checkBox(box3) == mark)) {
			$(getBox(box1)).toggleClass("anim");
			$(getBox(box2)).toggleClass("anim");
			$(getBox(box3)).toggleClass("anim");
			$(currentElement).trigger("mouseleave");

			winBoxes.push($(getBox(box1)));
			winBoxes.push($(getBox(box2)));
			winBoxes.push($(getBox(box3)));

			return (checkBox(box1) == mark && checkBox(box2) == mark && checkBox(box3) == mark);
		}else{
			return (checkBox(box1) == mark && checkBox(box2) == mark && checkBox(box3) == mark);
		}
	};

	var checkBox = function(num) {
		return document.getElementById("s" + num).innerText;
	};

	var getBox = function(num) {
		return document.getElementById("s" + num);
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
		getBox(i).innerText = "";
		$(getBox(i)).toggleClass("animate");
		$(getBox(i)).css("background", "");
		$(getBox(i)).css("border-radius", "20%");
		$(getBox(i)).css("font-size", "2px")
		};
		for (var i = 0; i < winBoxes.length; i++) {
			$(winBoxes[i]).toggleClass("anim");
		};
		winBoxes = [];

		gameState.winner = null;
		setGameMsg(selectMark() + "'s turn");

	};

	document.getElementById("reset").onclick = clearBoxes;

	$(".box").on("mouseover", function() {
		$(this).css("box-shadow", "0px 0px 30px #F6F5E0");
		// $(this).css("background", "linear-gradient(to bottom #C9DA58, #F6F5E0)");
		$(this).css("background-color", "#F6F5E0");
		$(this).css("color", "#F1696D");
	});

	$(".box").on("mouseout", function() {
		$(this).css("box-shadow", "");
		$(this).css("background-color", "");
		$(this).css("color", "");
		$(this).css("box-shadow", "");
		$(this).css("background", "");
		// $(this).css("background", "");

	});


	$(".box").click(function() {
		currentElement = this;

		$(this).css("background", "linear-gradient(to bottom right, rgba(255,0,0,0), rgba(255,0,0,0), #F6F5E0");
		$(this).css("box-shadow", "0px 0px 10px #F1696D");
		$(this).css("border-radius", "50%");
		$(this).css("font-size", "32px")

		if (!gameState.winner) {
			if (this.innerText == "") {
			// place mark in the selected box
			this.innerText = selectMark();
			// $(this).off("click");
			// checkForWinner
			checkForWinner(selectMark());
			isPlayerOneTurn = !isPlayerOneTurn;
			if (!gameState.winner) {
				setGameMsg(selectMark() + "'s turn");
			}else{

			};

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