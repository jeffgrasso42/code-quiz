// DEPENDENCIES

// qustions.js
var timerBoxEl = document.getElementById('timer-box');
var timerEl = document.getElementById('timer');
var startButtonEl = document.getElementById('start-button');
var quizSectionEl = document.getElementById('quiz-section');
var buttonBoxEl = document.querySelector('.button-box');
var userScoreBoxEl = document.getElementById('user-score');
var userScoreEl = document.getElementById('score');
var initialsFormEl = document.getElementById('initials-form');
var initialsInputEl = document.getElementById('initials-text');
var resultsSectionEl = document.getElementById('results-section');
var displayScoresButtonEl = document.getElementById('display-button');
var scoresListEl = document.getElementById('scores-list');
var clearButtonEl = document.getElementById('clear-button');

// Assignment Code

var qIndex = 0;
var timerInterval;
var secondsLeft = 61;
var userScore = 0;

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
  displayElement(resultsSectionEl); // display results section 
  renderScore();
}

function renderScore() {
  userScoreEl.innerHTML = userScore;
}

function scoreSubmitMessage() {
  hideElement(resultsSectionEl.children[0]);
  displayElement(resultsSectionEl.children[1]);
}

function getScores() {
  return JSON.parse(localStorage.getItem("scores"));
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

/**
 * Constructs a JS object array from JSON string
 * 
 * @returns array of JS objects
 */

/**
 * Saves score and the user input user initials
 * 
 * @param {event} e The submit event for initials input
 */
function saveScore(e) {
  e.preventDefault();
  var storedScores = getScores();
  if (storedScores !== null) scoresArray = storedScores;
  
  var scoreInfo = {
    initials: initialsInputEl.value.trim(),
    score: userScore
  };
  scoresArray.push(scoreInfo); //add new score to scores array
  localStorage.setItem('scores', JSON.stringify(scoresArray));
  scoreSubmitMessage();
}

// displays the div containing the scoreboard
function renderScoreboard() {
  hideElement(resultsSectionEl.children[1]);
  displayElement(resultsSectionEl.children[2]);

  var gameRecords = getScores();

  if(gameRecords !== null){
    // display list of scores
    for ( var record of gameRecords) {
      scoresListEl.innerHTML += `<li>Initials: ${record.initials} - Score: ${record.score} </li>`;
    };
  } else {
    scoresListEl.parentElement.innerHTML = `<h4>Scores Cleared</h4>`;
  }  
}

// Clears scores from local storage
function clearScores() {
  localStorage.clear();
  renderScoreboard(); // render changes
}

// begins multiple choice quiz
function startQuiz() {
  hideElement(document.getElementById('start-section'));
  displayElement(quizSectionEl);
  buildQuestion(qIndex);
  startTimer();
}

// INITIALIZATION


// EVENT LISTENERS
startButtonEl.addEventListener("click", startQuiz); 
buttonBoxEl.addEventListener("click", checkAnswer);
initialsFormEl.addEventListener("submit", saveScore);
displayScoresButtonEl.addEventListener('click', renderScoreboard);
clearButtonEl.addEventListener('click', clearScores);