var questions = [
  {
    text: "1) Inside which HTML element do we put the JavaScript?",
    choices: [
      'A) &lt;js&gt;',
      'B) &lt;scripting&gt;',
      'C) &lt;script&gt;', 
      'D) &lt;javascript&gt;'
    ],
    correct: 'C) <script>' //eagle brackets match the innerHTML of choices[2]
  },
  {
    text: 'What is the correct syntax for referromg tp an external script called "script.js"',
    choices: [
      'A) &ltscript src="script.js"&gt;',
      'B) &ltscript name="script.js"&gt;', 
      'C) &ltscript href="script.js"&gt;',
      'C) &ltscript href="script.js"&gt;'],
    correct: 'A) <script src="script.js">' //eagle brackets match innerHTML of choices[0]
  },
  {
    text: "3) What is the correct JavaScript syntax to change the content of the HTML element below?",
    choices: [
      'A) document.getElement("p").innerHTML = "Hello World!;"', 
      'B) #demo.innerHTML = "Hello World!";', 
      'C) document.getElementById("demo").innerHTML = "Hello World!";', 
      'D) document.getElementByName("p").innerHTML = "Hello World!";'
    ],
    correct: 'C) document.getElementById("demo").innerHTML = "Hello World!";'
  },
  {
    text: "4) True or False: The external JavaScript file must contain the &lt;script&gt; tag",
    choices: ['True', 'False'],
    correct: "False"
  }
]