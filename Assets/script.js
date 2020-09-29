var startButton = document.getElementById("start-btn");

var questionContainerElement = document.getElementById("qcontainer");
var questionElement = document.getElementById("question");
var answerButtonsElement = document.getElementById("answer-buttons");
var totalScoresDiv = document.getElementById("scores");
var codeQuizElement = document.getElementById("codequiz");
var showResultElement = document.getElementById("showresult");
var timeEL = document.getElementById("totalminutes");
var finalScoresEL = document.getElementById("finalscores");
var initialInput = document.getElementById("initials");
var submitButtonEL = document.getElementById("sign-up");
var msgSection = document.querySelector("#msg");
var finalTotalScoreEL = document.getElementById("finaltotalscore");
var quizzerInitialsEL = document.getElementById("initialsId");
var shuffledQuestions, currentQuestionaIndex;
var totalSeconds = 40;
var isCorrect = true;
var scores;
timeEL.textContent = totalSeconds;
var secondsElapsed = 0;

var interval;
//var secondsLeft;
startButton.addEventListener("click", StartGame);

function StartGame() {
     console.log("started");
     localStorage.clear();
     codeQuizElement.classList.add("hide");

     scores = 0;
     currentQuestionIndex = 0;
     questionContainerElement.classList.remove("hide");
     SetNextQuestion(currentQuestionIndex);
}

//SetNextquestion function
function SetNextQuestion() {
     //ResetState();
     ShowQuestion(questions[currentQuestionIndex]);
}

//functio ResetState
function ResetState() {
     while (answerButtonsElement.firstChild) {
          answerButtonsElement.removeChild(answerButtonsElement.firstChild);
     }
}

//function ShowQuestion
function ShowQuestion(question) {
     if (questions.length > currentQuestionIndex) {
          questionElement.innerText = question.question;
          answerButtonsElement.innerHTML = "";
          question.answers.forEach((answer) => {
               var li = document.createElement("li");
               li.textContent = answer.text;

               if (answer.correct) {
                    li.dataset.correct = answer.correct;
                    //scores++;
               }
               //added new
               li.addEventListener("click", SelectAnswer);
               // setTime();
               answerButtonsElement.classList.add("btn");
               answerButtonsElement.appendChild(li);

               console.log(answerButtonsElement);
               showResultElement.classList.remove("hide");
          });
          // else{
          // showResultElement.classList.remove("hide");
          // //clearInterval(interval);

          // questionContainerElement.classList.add("hide");
          // totalScoresDiv.classList.remove("hide");
          // //clearInterval(interval);
          // GetScores();
          // }
     } else {
          clearInterval(interval);
          showResultElement.classList.add("hide");

          questionContainerElement.classList.add("hide");
          totalScoresDiv.classList.remove("hide");
          clearInterval(interval);

          GetScores();
     }
}

function SelectAnswer1(event) {
     // When a element inside of the answerButtonsElement is clicked...
     // answerButtonsElement.addEventListener("click", function (event) {
     console.log("function called");

     var element = event.target;
     var correct = element.dataset.correct;
     if (!correct) {
          showResultElement.innerText = "wrong";
          isCorrect = false;
     } else {
          showResultElement.innerText = "correct";
          isCorrect = true;
     }

     console.log(setTimecalled);
     if (questions.length > currentQuestionIndex) {
          SetNextQuestion(currentQuestionIndex++);

          console.log("next question");
     } else {
          questionContainerElement.classList.add("hide");
          totalScoresDiv.classList.remove("hide");
     }
}
//function restet

function SelectAnswer(event) {
     // When a element inside of the answerButtonsElement is clicked...

     var element = event.target;
     var correct = element.dataset.correct;

     if (!correct) {
          showResultElement.innerText = "wrong";
          isCorrect = false;
          //startTimer();
     } else {
          showResultElement.innerText = "correct";
          scores = scores + 10;
          // startTimer();
          // SetScores();
          console.log("setscores");
          console.log(scores);
          console.log(showResultElement.innerText);
          isCorrect = true;
          console.log(isCorrect);
          console.log("called");
          // startTimer();
          // SetScores();
          //startTimer();
          //clearInterval(interval);
     }
     startTimer();
     //clearInterval(interval);
     SetScores();

     if (questions.length > currentQuestionIndex) {
          SetNextQuestion(currentQuestionIndex++);
          // questionElement.innerText = "";
          console.log("next question");
     } else {
          //clearInterval(interval);
          // SetScores();
          questionContainerElement.classList.add("hide");
          totalScoresDiv.classList.remove("hide");

          GetScores();
          // clearInterval(interval);
          console.log("getscores");
     }
}
//function Redirct to the scores page
function pageRedirect() {
     window.location.href = "./index2.html";

     //var finalQuizScore = localStorage.getItem("finalscores");
     console.log(finalQuizScore);

     //finalTotalScoreEL.textContent = finalQuizScore;
     console.log(finalScoresEL.textContent);
}

//startTimer function
function startTimer() {
     console.log("timerstarted");
     //clearInterval(interval);
     //setTime(totalSeconds);
     if (totalSeconds > 0) {
          console.log("totalseconds");
          interval = setInterval(function () {
               if (!isCorrect) {
                    totalSeconds = totalSeconds - 5;
               } else {
                    totalSeconds = totalSeconds - 10;
               }
               totalSeconds = totalSeconds;
               timeEL.textContent = totalSeconds;
               // totalSeconds=totalSeconds;
               clearInterval(interval);
               // console.log(secondsLeft);
          }, 1000);
     }
}

//Set scores to localstorage
function SetScores() {
     localStorage.setItem("score", scores);
}
//Get scores from loclastorage

function GetScores() {
     var totalScores = localStorage.getItem("score");

     finalScoresEL.textContent = totalScores;

     console.log(finalScoresEL.textContent);
}

function displayMessage(type, message) {
     msgSection.textContent = message;
     msgSection.setAttribute("class", type);
}

submitButtonEL.addEventListener("click", function (event) {
     event.preventDefault();

     var initialsEL = initialInput.value;

     if (initialsEL === "") {
          displayMessage("error", "Initials cannot be blank");
     } else {
          displayMessage("success", "Entered initials");

          // Save initials and finalscore to localStorage and render the last highscores.
          localStorage.setItem("initials", initialsEL);
          localStorage.setItem("finalscores", finalScoresEL.textContent);

          pageRedirect();
     }
});

//Array of questions

var questions = [
     //first question
     {
          question: "Inside which HTML element do we put the JavaScript?",
          answers: [
               { text: "<script>", correct: true },
               { text: "<scripting>", correct: false },
               { text: "<js>", correct: false },
               { text: "<javascript>", correct: false },
          ],
     },
     //second question
     {
          question: "Where is the correct place to insert a JavaScript?",
          answers: [
               { text: "The <head> section", correct: false },
               {
                    text: "Both <head> section and <body> section",
                    correct: true,
               },
               { text: " The <body> section", correct: true },
               { text: "Out of <body> section", correct: false },
          ],
     },

     //Third question

     {
          question:
               "What is the correct syntax for referring to an external script called xxx.js",
          answers: [
               { text: "<script name=xxx.js", correct: false },
               {
                    text: "<script src=xxx.js",
                    correct: true,
               },
               { text: " <script href=xxx.js", correct: false },
               { text: "<script file=xxx.js", correct: false },
          ],
     },

     //Fourth question

     {
          question: "How do you write" + "Hello World" + "in an alert box?",
          answers: [
               { text: "alertBox" + "(" + "Hello World" + ")", correct: false },
               {
                    text: "msg" + "(" + "Hello World" + ")",
                    correct: false,
               },
               { text: "msgBox" + "(" + "Hello World" + ")", correct: false },
               { text: "alert" + "(" + "Hello World" + ")", correct: true },
          ],
     },
];
