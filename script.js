let score = 0;
const scoreDisplay = document.getElementById("score");
const button = document.getElementById("clickBtn");

button.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;
});
