//click start button ask first question
//select start button

var buttonEl = document.getElementById("start-button");

function startGame() {
  document.querySelector(".start").classList.add("hide");
  document.querySelector(".quiz").classList.remove("hide");
  buildQuestion();
}

function buildQuestion () {
  document.getElementById("question-text").textContent = questions[0].text;

  var buttonBox = document.querySelector(".button-box");
  questions[0].choices.forEach(function(choice) {
    var button = document.createElement("button");
    button.textContent = choice;
    buttonBox.appendChild(button);
  }) 
}

buttonEl.addEventListener("click", startGame);