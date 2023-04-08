let lastCard = [];
let currentCard = [];
let cards = [];
let score = 0;
const shuffleSound = new Audio("sounds/Shuffle.mp3");
const cardFlip = new Audio("sounds/CardFlip.mp3");
suit = ["Heart", "Diamond", "Spade", "Club"];
$(".lower").prop('disabled', true);
$(".same").prop('disabled', true);
$(".higher").prop('disabled', true);


//basic functions
function Deck() {
  for (i = 0; i < suit.length; i++) {
    for (rank = 14; rank > 1; rank--) {
      cards.push({
        suit: suit[i],
        rank: rank
      });
    }
  }
}

function shuffle() {
    for (let i = cards.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let x = cards[i];
        cards[i] = cards[j];
        cards[j] = x;
    }
}

const deal = function() {
  let card = Math.floor(Math.random() * cards.length);
  return cards.splice(card, 1)[0];
}

function updateCurrentCard() {
  $(".remaining").text("Remaining Cards: " + cards.length)
  $(".current").addClass(currentCard[0].suit);
  if (currentCard[0].rank == "14") {
    $(".current").text("A");
  } else if (currentCard[0].rank == "11") {
    $(".current").text("J");
  } else if (currentCard[0].rank == "12") {
    $(".current").text("Q");
  } else if (currentCard[0].rank == "13") {
    $(".current").text("K");
  } else {
    $(".current").text(currentCard[0].rank);
  }
}

function onPress() {
  lastCard = currentCard;
  cardFlip.play();
  $(".previous").removeClass("Club Spade Diamond Heart");
  $(".previous").addClass(currentCard[0].suit);
  if (currentCard[0].rank == "14") {
    $(".previous").text("A");
  } else if (currentCard[0].rank == "11") {
    $(".previous").text("J");
  } else if (currentCard[0].rank == "12") {
    $(".previous").text("Q");
  } else if (currentCard[0].rank == "13") {
    $(".previous").text("K");
  } else {
    $(".previous").text(currentCard[0].rank);
  }
  currentCard = [];
  $(".current").removeClass("Club Spade Diamond Heart");
  currentCard.push(deal());
  updateCurrentCard();
  scoring();
  endGame();
}

function scoring() {
  let evaluate = eval(currentCard[0].rank + userInput + lastCard[0].rank);
  if (evaluate == true) {
    score++;
    $(".score").text("Current Score: " + score);
  }
}

function endGame() {
  if (cards.length == 0) {
    $(".final").text("Your final score is: " + score + ". Press start to play again!");
    $(".final").removeClass("hidden");
    $(".lower").prop('disabled', true);
    $(".same").prop('disabled', true);
    $(".higher").prop('disabled', true);
  }
}

//button functions
$(".start").click(function() {
    cards = [];
    currentCard =[]; 
    score = 0;
    $(".final").text("Your final score is: " + score + ". Press start to play again!");
    $(".final").addClass("hidden");
    $(".score").text("Current Score: " + score);
    $(".previous").removeClass("Club Spade Diamond Heart");
    $(".previous").text("");
    $(".current").removeClass("Club Spade Diamond Heart");
    $(".current").text("");
    $(".lower").prop('disabled', false);
    $(".same").prop('disabled', false);
    $(".higher").prop('disabled', false);
    $(".start").text("Restart");
    new Deck();
    new shuffle();
    shuffleSound.play();
    console.log(cards);
    currentCard.push(deal());
    updateCurrentCard();
});

$(".lower").click(function() {
  userInput = "<";
  onPress();
});

$(".same").click(function() {
  userInput = "==";
  onPress();
});

$(".higher").click(function() {
  userInput = ">";
  onPress();
});

