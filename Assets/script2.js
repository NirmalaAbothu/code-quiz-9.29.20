// DOM reference variables
var finalTotalScoreEL = document.getElementById("finaltotalscore");
var quizzerInitialsEL = document.getElementById("initialsId");
var clearHighScoreButtonEL = document.getElementById("clear-btn");
var resetButtonEL = document.getElementById("reset-btn");
var displayScoreEL = document.querySelector(".displayscore");
clearHighScoreButtonEL.addEventListener("click", clearScore);

//function to retrive initials and finalscores from localstorage
function getLocalStoragItems() {
     quizzerInitialsEL.textContent = localStorage.getItem("initials");
     finalTotalScoreEL.textContent = localStorage.getItem("finalscores");
}

//function to clear highscore localstorage
function clearScore() {
     localStorage.clear();
     displayScoreEL.classList.add("hide");
}

//when user clicks on  Go Back button it will navigate to starting page of quiz app
resetButtonEL.addEventListener("click", goBackToQuizPage);
//function to navigate to Quiz app
function goBackToQuizPage() {
     window.location.href = "./index.html";
}

//calling getLocalStorageItems function
getLocalStoragItems();
