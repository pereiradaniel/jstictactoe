$(document).ready(function() {

var rowCompilation = [];
var winRow = [];
var rowState = [];
var moveEvaluation = [];
var potentialWins = [
	[1,2,3],
	[4,5,6],
	[7,8,9],
	[1,4,7],
	[2,5,8],
	[3,6,9],
	[1,5,9],
	[3,5,7],
];
var isOnePlayerGame = false;


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

	// for (i = 0; i < potentialWins.length; i++) {
	// 	if (evaluateComputerMove(potentialWins[i][0], potentialWins[i][1], potentialWins[i][2],) === true) {

	// 	}else{};
	// };


// BULK
	// var evaluateComputerMove = function() {
	// 	for (i = 0; i < potentialWins.length; i++) {
	// 		moveEvaluation.push(getRow(potentialWins[i][0], potentialWins[i][1], potentialWins[i][2], selectMark()));			
	// 		if (canRowWin(moveEvaluation.last) == true) {
	// 			return true;
	// 		}else{
	// 			return false;
	// 		}
	// 	};

	// };

	// var canRowWin = function(rowInput) {
	// 	var rowCount = 0;
	// 	for (i = 0; i < rowInput.length; i++) {
	// 		if (checkBox(rowInput[i]) == playerMark()) {
	// 			rowCount ++;
	// 			if (rowCount == 2) {
	// 				return true;
	// 			}else{
	// 				return false;
	// 			}
	// 		}else{};


	// };

	// var getRow = function(num1, num2, num3, playerMark) {
	// 	var rowCompilation = [];
	// 	var winRow = [];
	// 	var rowState = [];
	// 	winRow.push(playerMark);
	// 	winRow.push(num1);
	// 	winRow.push(num2);
	// 	winRow.push(num3);
	// 	rowState.push(playerMark);
	// 	rowState.push(checkBox(num1));
	// 	rowState.push(checkBox(num2));
	// 	rowState.push(checkBox(num3));
	// 	rowCompilation.push(winRow);
	// 	rowCompilation.push(rowState);
	// 	return rowCompilation;
	// };
// END BULK


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

	var resetBoxPropertiesOnMouseOut = function (box) {
		$(box).css("box-shadow", "");
		$(box).css("background-color", "");
		$(box).css("color", "");
		$(box).css("box-shadow", "");
		$(box).css("background", "");
	
	};

	var setBoxPropertiesOnMouseOver = function (box) {

		if (box.innerText) {
			$(box).css("box-shadow", "0px 0px 10px #F1696D");
			// $(box).css("background-color", "#F6F5E0");
			$(box).css("background", "linear-gradient(to bottom right, rgba(255,0,0,0), rgba(255,0,0,0), #F1696D)");
			$(box).css("color", "#F1696D");
		}else{
			$(box).css("box-shadow", "0px 0px 30px #F6F5E0");
			// $(this).css("background", "linear-gradient(to bottom #C9DA58, #F6F5E0)");
			$(box).css("background-color", "#F6F5E0");
			$(box).css("color", "#F1696D");
		};
	};

	var setBoxPropertiesOnClick = function(box) {
		$(box).css("background", "linear-gradient(to bottom right, rgba(255,0,0,0), rgba(255,0,0,0), #F6F5E0");
		$(box).css("box-shadow", "0px 0px 10px #F1696D");
		$(box).css("border-radius", "50%");
		$(box).css("font-size", "32px")
	};

	$(".box").on("mouseover", function() {
		setBoxPropertiesOnMouseOver(this);
	});

	$(".box").on("mouseout", function() {
		resetBoxPropertiesOnMouseOut(this);
	});


	$(".box").click(function() {
		currentElement = this;

		setBoxPropertiesOnClick(this);
	
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
				if (isOnePlayerGame) {
					computerMove();
					checkForWinner(selectMark());
					isPlayerOneTurn = !isPlayerOneTurn;
				}else{};
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