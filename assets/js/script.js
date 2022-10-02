/*
Dependencies
  questions.js
*/

// Global Variables

var timerBoxEl = document.querySelector(".timer-box");
var timerEl = document.getElementById("timer");
var buttonEl = document.getElementById("start-button");
var quizSectionEl = document.querySelector(".quiz");
var buttonBoxEl = document.querySelector('.button-box');
var qIndex = 0;
var timerInterval;
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
    // check if a question is currently being displayed
    if (buttonBoxEl.innerHTML !== '')
      buttonBoxEl.innerHTML = '' // clear previous question

    // Display the current question
    document.getElementById("question-text").innerHTML = questions[qIndex].text;
    
    // Create buttons with multiple choice options
    questions[qIndex].choices.forEach(function (choice) {
      buttonBoxEl.innerHTML += `<button>${choice}</button>`
    })
  } else {
    stop();
    showResults();
  }
}

// display results of multiple choice quiz
function showResults() {
  hideElement(quizSectionEl); //remove display of quiz section
  displayElement(document.querySelector(".results")); // display results section 
}

// starts the timer for the quiz
function startTimer () {
  timerBoxEl.classList.remove("invisible") //makes timer visible

  // countown clock with 1 second interval
  timerInterval = setInterval(function() {
    secondsLeft--;
    timerEl.innerHTML = secondsLeft; //displays time remaining

    if(secondsLeft === 0) {
      stop();      
      showResults();
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

// stops quiz timer
function stop() {
  clearInterval(timerInterval);
}

// even listeners
buttonEl.addEventListener("click", startQuiz);
buttonBoxEl.addEventListener("click", checkAnswer);
