/*
Dependencies
  questions.js
*/

// Variable Declarations

var timerBoxEl = document.querySelector(".timer-box");
var timerEl = document.getElementById("timer");
var buttonEl = document.getElementById("start-button");
var quizSectionEl = document.querySelector(".quiz");
var buttonBoxEl = document.querySelector('.button-box');
var qIndex = 0;
var choiceAEl, choiceBEl, choiceCEl, choiceDEl;
var buttonBox = document.querySelector(".button-box");
var secondsLeft = 61;

// begins multiple choice quiz
function startQuiz() {
  hideElement(document.querySelector(".start"));
  displayElement(quizSectionEl);
  buildQuestion(qIndex);
  startTimer();
}

/**
 * Adds class with 'display: none;' to e.
 * 
 * @param {element} e the element to hide. 
 */
function hideElement(e) {
  e.classList.add("hide");
}

/**
 * Removes class with 'display: none;' from e.
 * 
 * @param {element} e the element to display.
 */
function displayElement(e) {
  e.classList.remove("hide");
}

/**
 * Builds multiple choice question from object at qIndex in the
 * questions array.
 * 
 * @param {number} qIndex The index of the current a question object.
 */
function buildQuestion (qIndex) {
  // check if qIndex is within the range of the questions array
  if (qIndex < questions.length) {
    buttonBoxEl.innerHTML = ''
    var currentQuestion = questions[qIndex];
    // Display the question
    document.getElementById("question-text").innerHTML = questions[qIndex].text;
    
    // Create buttons for multiple choice options
    currentQuestion.choices.forEach(function (choice) {
      buttonBoxEl.innerHTML += `<button>${choice}</button>`
    })
  } else {
    showResults();
  }
}

// // display results of multiple choice quiz
// function showResults() {
//   hideElement(quizSectionEl); //remove display of quiz section
//   displayElement(document.querySelector(".results")); // display results section 
// }

function startTimer () {
  console.log(timerBoxEl);
  
  timerBoxEl.classList.remove("invisible")

  var timerInterval = setInterval(function() {
    secondsLeft--;
    timerEl.innerHTML = secondsLeft;

    if(secondsLeft === 0) {
      clearInterval(timerInterval);
    }
  }, 1000)
}

function checkAnswer (event) {
  var answerClicked = event.target.innerText;
  if(answerClicked === questions[qIndex].correct) {
    console.log("correct");
  } else {
    timerEl.innerHTML = -5;
    // pause program for 0.5sec to allow -5 to display
    setTimeout(() => {}, 500)
  }
  // timer penalty for wrong answer
  secondsLeft -= 5;
  // qIndex variable increased to move to next question
  qIndex++;
  // build next question
  buildQuestion(qIndex);
}

// even listeners
buttonEl.addEventListener("click", startQuiz);
buttonBox.addEventListener("click", checkAnswer);
