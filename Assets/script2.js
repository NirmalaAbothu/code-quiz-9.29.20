var finalTotalScoreEL = document.getElementById("finaltotalscore");
var quizzerInitialsEL = document.getElementById("initialsId");
// quizzerInitialsEL.textContent = localStorage.getItem("initials");
// finalTotalScoreEL.textContent = localStorage.getItem("finalscores");
var clearHighScoreButtonEL = document.getElementById("clear-btn");
var resetButtonEL = document.getElementById("reset-btn");
var displayScoreEL = document.querySelector(".displayscore");
clearHighScoreButtonEL.addEventListener("click", ClearScore);
//function to retrive local storage items
function GetLocalStoragItems() {
     quizzerInitialsEL.textContent = localStorage.getItem("initials");
     finalTotalScoreEL.textContent = localStorage.getItem("finalscores");
}
//function to clear highscore section
function ClearScore() {
     localStorage.clear();
     displayScoreEL.classList.add("hide");
}
resetButtonEL.addEventListener("click", GoBackToQuizPage);
//function to navigate to Quiz app page
function GoBackToQuizPage() {
     window.location.href = "./index.html";
}
GetLocalStoragItems();
