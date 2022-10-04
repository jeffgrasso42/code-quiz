/*
Dependencies
  questions.js
*/

// Assignment Code

var timerBoxEl = document.querySelector('.timer-box');
var timerEl = document.getElementById('timer');
var buttonEl = document.getElementById('start-button');
var quizSectionEl = document.querySelector('.quiz');
var buttonBoxEl = document.querySelector('.button-box');
var userScoreEl = document.getElementById('score');
var qIndex = 0;
var timerInterval;
var secondsLeft = 61;
var userScore = 0;
var initialsFormEl = document.getElementById('initials-form');
var initialsInputEl = document.getElementById('initials-text');


// DATA
var scoresArray = [];


// FUNCTIONS
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

// stops quiz timer
function stop() {
  clearInterval(timerInterval);
  timerEl.innerHTML = secondsLeft; //ensures -5 is not displayed as time remaining
}

// display results of multiple choice quiz
function showResults() {
  hideElement(quizSectionEl); //remove display of quiz section
  displayElement(document.querySelector(".results")); // display results section 
  renderScore();
}

function renderScore() {
  userScoreEl.innerHTML = userScore;
}

// USER INTERACTIONS
/**
 * Adds class with 'display: none;' to e.
 * 
 * @param {element} element The element to hide. 
 */
function hideElement(element) {
  element.classList.add("hide");
}

/**
 * Removes class with 'display: none;' from e.
 * 
 * @param {element} element The element to display.
 */
function displayElement(element) {
  element.classList.remove("hide");
}

/**
 * Checks the user's selection against the correct answer 
 * 
 * @param {event} e The click event
 */
function checkAnswer (e) {
  var answerClicked = e.target.innerText;
  console.log(answerClicked);
  console.log(questions[qIndex].correct);
  // check if answer is correct
  if(answerClicked === questions[qIndex].correct) {
    userScore++
    buttonBoxEl.dataset.message = 'Correct!' //input feedback
  } else {
    buttonBoxEl.dataset.message = 'Wrong!' // input feedback
    timerEl.innerHTML = -5; // display time penalty for wrong answer
    // pause program for 0.5sec to allow -5 to display
    setTimeout(() => {}, 500)
    // timer penalty for wrong answer
    secondsLeft -= 5;
  }
  // move to next question
  qIndex++;
  
  // build next question
  buildQuestion(qIndex);
}

// function save user intials and score to local storage
function saveScore(e) {
  e.preventDefault();
  var storedScores = JSON.parse(localStorage.getItem("scoresArray"));
  
  if (storedScores !== null) scoresArray = storedScores;
  
  var scoreInfo = {
    initials: initialsInputEl.value.trim(),
    score: userScore
  };
  
  scoresArray.push(scoreInfo);
  localStorage.setItem("scoreInfo", JSON.stringify("scoreInfo"));
}

// begins multiple choice quiz
function startQuiz() {
  hideElement(document.querySelector(".start"));
  displayElement(quizSectionEl);
  buildQuestion(qIndex);
  startTimer();
}

// EVENT LISTENERS
buttonEl.addEventListener("click", startQuiz);
buttonBoxEl.addEventListener("click", checkAnswer);
initialsFormEl.addEventListener("submit", saveScore);