let score = 0;
const scoreDisplay = document.getElementById("score");
const button = document.getElementById("clickBtn");
<<<<<<< HEAD
const button2 = document.getElementById("clickBtn");
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    // Example: Draw a red rectangle
    ctx.fillStyle = 'red';
    ctx.fillRect(50, 50, 100, 75);
=======
>>>>>>> parent of f3cbc4d (experimentation)

button.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;
});
<<<<<<< HEAD

function changeScreen() {
button2.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;
});

=======
>>>>>>> parent of f3cbc4d (experimentation)
