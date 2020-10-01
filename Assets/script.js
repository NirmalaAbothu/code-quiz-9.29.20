// DOM reference variables
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

//declaring the timeInterval variable
var timerInterval;

//declaring and assigning value 0 to currentQuesionIndex variable
var currentQuestionIndex = 0;

//declaring and assigning value 0 to totalSeconds variable
var totalSeconds = 0;

//declaring and initializing the variable scores with 0
var scores = 0;

//clicking startQuiz button to start the quiz
startButton.addEventListener("click", startGame);

//function startGame to start the quiz
function startGame() {
     //hide the starting page of quiz
     codeQuizElement.classList.add("hide");
     //Initializing the totalseconds variable with value 40
     totalSeconds = 40;
     //assign the totalSeconds to DOM element of Time
     timeEL.textContent = totalSeconds;
     //Calling setTime() to countdown the totalSeconds
     setTime();
     //clearing the prevous localstorage values
     localStorage.clear();
     //removing the hide for questionContainerElement to diplay question
     //and answers
     questionContainerElement.classList.remove("hide");
     //calling the setNextQuestion method with currentWQuestionIndex value
     setNextQuestion(currentQuestionIndex);
}

//SetNextquestion function
function setNextQuestion() {
     //calling showQuestion function
     showQuestion(questions[currentQuestionIndex]);
}

//function ShowQuestion
function showQuestion(question) {
     //checking whether questions array length is grater than the currentQuestionIndex
     if (questions.length > currentQuestionIndex) {
          questionElement.innerText = question.question;
          answerButtonsElement.innerHTML = "";
          //calling setTimeOutForResultDisplay function to display result
          setTimeOutForResultDisplay();
          //displaying anwers from questions array
          question.answers.forEach((answer) => {
               //creating li element
               var li = document.createElement("li");
               //assinging anwer text to li textContent
               li.textContent = answer.text;
               //checking the value of correct in answer array,if it is true storing in dataset
               if (answer.correct) {
                    li.dataset.correct = answer.correct;
               }
               //After user clicked answer,calling selectAnswer function
               li.addEventListener("click", selectAnswer);
               //added the btn class to answerButtonsElements
               answerButtonsElement.classList.add("btn");
               //append the li to anserButtonsElement
               answerButtonsElement.appendChild(li);
               //removing hide class from showResultElement
               showResultElement.classList.remove("hide");
          });
     } else {
          //calling function displayScores
          displayScores();
     }
}

//function displayScores
function displayScores() {
     //calling the clearInterval if no more questions to diplay or
     //currentQuestionIndex is grater than the length of the questions array
     clearInterval(timerInterval);
     //hiding the questionContainerElement
     questionContainerElement.classList.add("hide");
     //removing hide class from totalScoreDiv element
     totalScoresDiv.classList.remove("hide");
     //calling setTimeOutForResultDisplay function to display result
     setTimeOutForResultDisplay();
     //calling GetScores function to display scores
     getScores();
}

//function to set time for show result section
function setTimeOutForResultDisplay() {
     setTimeout(function () {
          showResultElement.innerText = "";
     }, 2000);
}
//selectAnswer function will be called after answerButtonsElement is clicked
function selectAnswer(event) {
     //storing the target in element variable
     var element = event.target;
     //storing the element dateset correct value in variable named correct
     var correct = element.dataset.correct;
     //checking whether user selected correct answer choice or not
     if (!correct) {
          //calling showResult function,if user select wrong answer
          // to display text wrong in showResultElement
          showResult("wrong");
          //if user select wrong answer deduct time from totalSeconds
          totalSeconds = totalSeconds - 5;
     } else {
          //calling showResult function,if user select correct answer
          // to display text correct in showResultElement
          showResult("correct");
          //increaing the score as user select correct answer
          scores = scores + 10;
     }
     //dislaying the remaing totalSeconds
     timeEL.textContent = totalSeconds;
     //calling the setScores method
     setScores();
     //comparing currentQuestionIndex with the length of the questions array length
     if (questions.length > currentQuestionIndex) {
          //if currentQuestionIndex length is less than the questions array length
          //then calling the setNextQuestion function to display next question
          setNextQuestion(currentQuestionIndex++);
     } else {
          //calling function displayScores
          displayScores();
     }
}

//function showResult
function showResult(text) {
     showResultElement.innerText = text;
}

//function Redirect to the scores page
function pageRedirect() {
     //redirecting from current page to the index2.html page
     window.location.href = "./index2.html";
}

//Function to countdown the time from totalSeconds
function setTime() {
     //assing the setInterval method to timerInterval variable
     timerInterval = setInterval(function () {
          //decrement the totalSeconds
          totalSeconds--;
          //assigning the remaing totlaSeconds to timeEL textContent
          timeEL.textContent = totalSeconds;
          //if totalSeconds equal to 0, then stop the setInterval  and alert the
          //message to user
          if (totalSeconds === 0) {
               //calling clearInterval method
               clearInterval(timerInterval);
               //calling sendMessage method
               sendMessage();
          }
     }, 1000);
}

//sendMessage function, alert the user
function sendMessage() {
     alert("ran out of time.");
}

//set scores to localstorage
function setScores() {
     localStorage.setItem("score", scores);
}

//get scores from loclastorage
function getScores() {
     var totalScores = localStorage.getItem("score");
     finalScoresEL.textContent = totalScores;
}

//function displayMessage to display the message to user
function displayMessage(type, message) {
     msgSection.textContent = message;
     msgSection.setAttribute("class", type);
}

//function will be called after user clicks the submit button
submitButtonEL.addEventListener("click", function (event) {
     //prevent the default form submission
     event.preventDefault();
     //intializing user's intials input value to variable initialEL
     var initialsEL = initialInput.value;
     //if user trying to submit the form without entering the initials,then displays
     //friendly message to user
     if (initialsEL === "") {
          displayMessage("error", "Initials cannot be blank");
     } else {
          // Save initials and finalscore to localStorage and render
          // the last highscores.
          localStorage.setItem("initials", initialsEL);
          localStorage.setItem("finalscores", finalScoresEL.textContent);
          //calling pageRedirct function
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
