const colorCodeContainer = document.getElementById("color-code");
const optionContainer = document.getElementById("options-container");
const scoreContainer = document.getElementById("score");
const levelContainer = document.getElementById("level");
const livesContainer = document.getElementById("lives");
const messageContainer = document.getElementById("message");
const easyBtn = document.getElementById("easy");
const hardBtn = document.getElementById("hard");
const newGameBtn = document.getElementById("new-game");
const themeToggle = document.getElementById("theme-toggle");
const colorblindToggle = document.getElementById("colorblind-toggle");

const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");
const winSound = document.getElementById("win-sound");

let randomColor = null;
let score = 0;
let highScore = 0;
let lives = 3;
let level = 1;
let numOptions = 8;
let colorblindMode = false;

function generateRandomNumberBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}

function generateRandomColorRGB() {
  const r = generateRandomNumberBetween(0, 255);
  const g = generateRandomNumberBetween(0, 255);
  const b = generateRandomNumberBetween(0, 255);
  return `rgb(${r}, ${g}, ${b})`;
}

function updateStats() {
  scoreContainer.textContent = `${score}`;
  levelContainer.textContent = level;
  livesContainer.textContent = lives;
}

function gameOver() {
  messageContainer.textContent = "💀 Game Over! Restart to play again.";
  winSound.play();
  lives = 3;
  score = 0;
  level = 1;
  numOptions = 8;
  updateStats();
}

function validateResult(e) {
  const selectedColor = e.target.style.backgroundColor;
  if (selectedColor === randomColor) {
    correctSound.play();
    score++;
    if (score > highScore) highScore = score;
    messageContainer.textContent = "✅ Correct!";
    if (score % 5 === 0) {
      level++;
      numOptions = Math.min(10, numOptions + 1);
    }
  } else {
    wrongSound.play();
    lives--;
    messageContainer.textContent = "❌ Wrong!";
    if (lives <= 0) {
      gameOver();
      return;
    }
  }
  updateStats();
  setTimeout(startGame, 800);
}

function startGame() {
  optionContainer.innerHTML = "";
  messageContainer.textContent = "";
  updateStats();
  randomColor = generateRandomColorRGB();
  colorCodeContainer.textContent = randomColor;

  const answerIndex = generateRandomNumberBetween(0, numOptions - 1);

  for (let i = 0; i < numOptions; i++) {
    const div = document.createElement("div");
    div.classList.add("color-option");
    if (colorblindMode) div.classList.add("pattern", `pattern${(i % 3) + 1}`);
    div.style.backgroundColor = i === answerIndex ? randomColor : generateRandomColorRGB();
    div.addEventListener("click", validateResult);
    optionContainer.appendChild(div);
  }
}

newGameBtn.addEventListener("click", () => {
  score = 0;
  level = 1;
  lives = 3;
  numOptions = 6;
  updateStats();
  startGame();
});

easyBtn.addEventListener("click", () => {
  easyBtn.classList.add("active");
  hardBtn.classList.remove("active");
  numOptions = 3;
  startGame();
});

hardBtn.addEventListener("click", () => {
  hardBtn.classList.add("active");
  easyBtn.classList.remove("active");
  numOptions = 8;
  startGame();
});

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("light", themeToggle.checked);
});

colorblindToggle.addEventListener("change", () => {
  colorblindMode = colorblindToggle.checked;
  startGame();
});

window.addEventListener("load", startGame);
const toggleButton = document.getElementById('theme-toggle');

// Apply theme based on saved preference
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.body.classList.toggle("light-mode", savedTheme === "light");
  toggleButton.checked = savedTheme === "light";
});

// Toggle listener
toggleButton.addEventListener("change", () => {
  const isLight = toggleButton.checked;
  document.body.classList.toggle("light-mode", isLight);
  localStorage.setItem("theme", isLight ? "light" : "dark");
});

