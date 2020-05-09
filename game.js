
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

//Start next sequence on key press "a"
$(document).on("keydown", function(evt) {
  if (!started) {
    if (evt.key === "a") {
      nextSequence();
      started = true;
    }
  } else {
    console.log("Game in progress.")
  }
});

//Detecting button click
$(".btn").on("click", function(event) {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function () {
          nextSequence();
        }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    var gamePage = document.querySelector("body");
    gamePage.classList.add("game-over");
    setTimeout(function() {
      gamePage.classList.remove("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    $(document).on("keydown", startOver());
  }
}


//Generate random number to be used to select a random colour
function nextSequence() {
  //Reset user clcik pattern
  userClickedPattern = [];

  //Update header with level number
  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);

  //Choose a random colour from array of colours
  var randomChosenColour = buttonColours[randomNumber];

  //Add random colour to game pattern array
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn("fast").fadeOut("fast").fadeIn("fast");
  $("#" + randomChosenColour).on("animationend", playSound(randomChosenColour));
}


//Determine which sound to play
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


//user input animation
function animatePress(currentColour) {
  var activeButton = document.querySelector("." + currentColour);
  activeButton.classList.add("pressed");
  setTimeout(function() {
    activeButton.classList.remove("pressed");
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
