//click start button ask first question
//select start button
var timerBoxEl = document.querySelector(".timer-box");
var timerEl = document.getElementById("timer");
var buttonEl = document.getElementById("start-button");
var quizSectionEl = document.querySelector(".quiz");
var choices = ["A", "B", "C", "D"];
var qIndex = 0;
var choiceAEl, choiceBEl, choiceCEl, choiceDEl;
var buttonBox = document.querySelector(".button-box");
var secondsLeft = 61;

function startGame() {
  document.querySelector(".start").classList.add("hide");
  quizSectionEl.classList.remove("hide");
  buildQuestion(qIndex);
  startTimer();
}

function buildQuestion (qIndex) {
  if (qIndex < questions.length) {
    document.getElementById("question-text").innerHTML = questions[qIndex].text;
    
    document.getElementById('choiceButtons').innerHTML=
    `
    <button>${questions[qIndex].choices[0]}</button>
    <button>${questions[qIndex].choices[1]}</button>
    <button>${questions[qIndex].choices[2]}</button>
    <button>${questions[qIndex].choices[3]}</button>
    `
  } else {
    showResults();
  }
}

function showResults() {
  quizSectionEl.classList.add("hide");
  document.querySelector(".end").classList.remove('hide');
}

function startTimer () {
  console.log(timerBoxEl);
  
  timerBoxEl.classList.remove("invisible")

  var timerInterval = setInterval(function() {
    secondsLeft--;
    timerEl.textContent = secondsLeft;

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
    console.log("wrong");
    secondsLeft -= 5;
  }
  qIndex++;
  buildQuestion(qIndex);
  
}

buttonEl.addEventListener("click", startGame);
buttonBox.addEventListener("click", checkAnswer);
