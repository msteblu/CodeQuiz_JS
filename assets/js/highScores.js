let back = document.querySelector(".back");
let clear = document.querySelector(".clear");
let results = document.querySelector(".results");

// Display
let highScores = JSON.parse(localStorage.getItem("highScore"));

if (highScores === null) {
    highScores = [];
  }

highScores = highScores.sort((a, b) => (b[0] - a[0]) || (b[1] - a[1]));

for (let i=0; i < highScores.length; i++) {
    let users = document.createElement("p");
    results.appendChild(users);
    users.textContent = highScores[i][0] + " - " + highScores[i][1];
}

// Back Button
back.addEventListener("click", home);

function home() {
    location.href = "index.html";
}

// Clear Button
clear.addEventListener("click", clearScores);


function clearScores() {
    localStorage.clear()
    results.textContent = "";
};