const startScreen = document.getElementById("startScreen");
const gameScreen = document.getElementById("gameScreen");
const playingScreen = document.getElementById("playingScreen");
const resultsScreen = document.getElementById("resultsScreen");

const startButton = document.getElementById("startButton");
const startGameButton = document.getElementById("startGameButton");
const reactionButton = document.getElementById("reactionButton");
const playAgainButton = document.getElementById("playAgainButton");
const helpButton = document.getElementById("helpButton");

const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const finalScore = document.getElementById("finalScore");
const reactionResult = document.getElementById("reactionResult");
const reactionRating = document.getElementById("reactionRating");

let score = 0;
let timeLeft = 10;
let timer;

startButton.addEventListener("click", function() {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
});

function moveButton() {
    const maxX = window.innerWidth - reactionButton.offsetWidth;
    const maxY = window.innerHeight - reactionButton.offsetHeight;

    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;

    reactionButton.style.left = randomX + "px";
    reactionButton.style.top = randomY + "px";
    reactionButton.style.transform = "none";
}

function startGame() {
    score = 0;
    timeLeft = 10;

    scoreDisplay.textContent = "Clicks: " + score;
    timerDisplay.textContent = "Time: " + timeLeft;

    gameScreen.classList.add("hidden");
    resultsScreen.classList.add("hidden");
    playingScreen.classList.remove("hidden");

    moveButton();

    timer = setInterval(function() {
        timeLeft--;

        timerDisplay.textContent = "Time: " + timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);

            playingScreen.classList.add("hidden");
            resultsScreen.classList.remove("hidden");

            finalScore.textContent = "Your final score: " + score;

            if (score > 0) {
                let averageTime = 10000 / score;

                reactionResult.textContent =
                    "Average time per click: " + averageTime.toFixed(2) + " ms";

                if (averageTime < 350) {
                    reactionRating.textContent = "Good reaction time!";
                    reactionRating.style.color = "#90ff90";
                } else {
                    reactionRating.textContent = "Check with a professional...";
                    reactionRating.style.color = "#ff9999";
                }

            } else {
                reactionResult.textContent = "No clicks recorded.";
                reactionRating.textContent = "UNRESPONSIVE: MEDICAL HELP COMING";
            }
        }

    }, 1000);
}

startGameButton.addEventListener("click", startGame);

reactionButton.addEventListener("click", function() {
    if (timeLeft > 0) {
        score++;
        scoreDisplay.textContent = "Clicks: " + score;
        moveButton();
    }
});

playAgainButton.addEventListener("click", function() {
    resultsScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
});
 helpButton.addEventListener("click", function() {
            alert("Help is on the way!");
});
