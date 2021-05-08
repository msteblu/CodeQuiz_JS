/****************************************************************
* Program: Code Quiz
*
* Author: Megan Steblay
*
* Description:
*
* This program produces a timed quiz.
****************************************************************/

// DEFINE VARIABLES //

const introContainer = document.querySelector(".intro")
const doneContainer = document.querySelector(".done");
const startButton = document.querySelector(".start");
const submitButton = document.querySelector(".submit");
const input = document.querySelector(".input");

let line = document.getElementById("line");
let wrong = document.getElementById("wrong");
let right = document.getElementById("right");

let finalScore= [];

// Variables for timer function
let timerEl = document.getElementById('countdown');
let timeLeft = 75;
let timeEnd = 0;
let currentQuestion = 0
let timeInterval;

// Array of JSON objects that represent each question, possible answers, and correct answer
// Questions from w3schools JavaScript Quiz
let myQuestions = [
  {
    div: "question1",
    question: "Where is the correct place to insert a Javascript?",
    answers: {
      1: 'The body section.',
      2: 'The head section.',
      3: 'Both the head and the body section are correct.',
    },
    correctAnswer: '3'
  },
  {
    div: "question2",
    question: "How do you call a function named myFunction?",
    answers: {
      1: 'call myFunction()',
      2: 'call function myFunction()',
      3: 'myFunction()',
      4: 'myFunction'
    },
    correctAnswer: '3'
  },
  {
    div: "question3",
    question: "How to write an IF statement for executing some code if 'i' is NOT equal to 5?",
    answers: {
      1: 'if i <> 5',
      2: 'if (i != 5)',
      3: 'if i=! 5 then',
      4: 'if (i <> 5)'
    },
    correctAnswer: '2'
  },
  {
    div: "question4",
    question: "How does a FOR loop start?",
    answers: {
      1: 'for (i = 0; i <= 5; i++)',
      2: 'for i = 1 to 5',
      3: 'for (i = 0; i <= 5)',
      4: 'for (i <= 5; i++)'
    },
    correctAnswer: '1'
  },
  {
    div: "question5",
    question: "How do you write 'Hello World' in an alert box?",
    answers: {
      1: 'msg("Hello World")',
      2: 'alert("Hello World")',
      3: 'alertBox("Hello World")',
      4: 'msgBox("Hello World")'
    },
    correctAnswer: '2'
  },
];

// FUNCTIONS //

// Function on Page Load
function init() {
  doneContainer.style.display = "none";
  line.style.display = 'none';
  wrong.style.display = "none";
  right.style.display = "none";
  let storedScores = JSON.parse(localStorage.getItem("highScore"));

  if (storedScores !== null) {
    finalScore = storedScores
  }

  startButton.addEventListener("click", callQuiz)
};

// Function on Start click

function callQuiz() {
  introContainer.style.display = "none";

  countdown();
  generateQuiz(myQuestions);
};


// Function for producing countdown timer

function countdown() {

  timeInterval = setInterval(function () {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 0) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = "Time: " + timeLeft;
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      endQuiz();
    }
  }, 1000);
};

// Function that generates quiz HTML

function generateQuiz(questions) {

  // Variable for div that will hold the questions
  let theQuestions = document.querySelector("#questions")

  // Array variables for holding question and answer information
  let divOutput = [];
  let questionsOutput = [];
  let answerOutput = [];

  // For each question generate HTML
  for (let i = 0; i < questions.length; i++) {
    divOutput[i] = document.createElement("div")
    if (i > 0) {
      divOutput[i].style.display = "none"
    }
    divOutput[i].setAttribute("class", questions[i].div)
    theQuestions.appendChild(divOutput[i])
    questionsOutput[i] = document.createElement("h3")
    divOutput[i].appendChild(questionsOutput[i])
    questionsOutput[i].textContent = questions[i].question
    // For each available answer to this question this generates HTML with for loop that iterates through object answers array
    for (number in questions[i].answers) {
      answerOutput[i] = document.createElement("p")
      answerOutput[i].setAttribute("data-number", number)

      divOutput[i].appendChild(answerOutput[i])
      answerOutput[i].textContent = number + ". " + questions[i].answers[number]
      // Add click event listener for each answer
      answerOutput[i].addEventListener("click", clickPerformed)
    }
  }
  line.style.display = "block";
};

// Function to text for correct/incorrect answer

function clickPerformed(event) {
  let eventElement = event.target
  let questionNumber = eventElement.getAttribute("data-number")
  if (myQuestions[currentQuestion].correctAnswer !== questionNumber) {
    timeLeft = timeLeft - 10
    wrong.style.display = "block";
  } else {
    right.style.display = "block";
  }

  // Hide "Wrong"/"Correct" after one second
  setTimeout(function() {
    wrong.style.display = "none";
    right.style.display = "none";
  }, 1000);

  
  if (currentQuestion === (myQuestions.length - 1)) {
    endQuiz();
    
  } else {
    let currentDiv = document.querySelector("." + myQuestions[currentQuestion].div)
    let newDiv = document.querySelector("." + myQuestions[currentQuestion+1].div)
    currentDiv.style.display = "none"
    newDiv.style.display = "block"
    currentQuestion ++
  }
}

// Function to show end of quiz
function endQuiz() {
  
  clearInterval(timeInterval);

  timeEnd = timeLeft;
  console.log(timeEnd);

  timerEl.textContent = "Time: " + timeEnd;

  //Hide quiz section
  document.getElementById("questions").style.display = "none";
  line.style.display = "none";
  
  //Show 'All Done' element
  doneContainer.style.display = "block";

  score = document.createElement("p")
  document.querySelector(".done").children[0].appendChild(score);
  score.textContent = "Your final score is " + timeEnd + "."

  submitButton.addEventListener("click", submit);
}

// On submit, go to 'Highscores' page
function submit() {
  if (input.value === "") {
    input.value = "ANON"
  }
  
  finalScore.push([input.value.toUpperCase(), timeEnd]);

  localStorage.setItem("highScore", JSON.stringify(finalScore));
  
  input.value = ""
  
  window.location.href = "highScores.html";
  
}



// EXECUTE FUNCTIONS

init();


