let score = 5;
const scoreDisplay = document.getElementById("score");
const button = document.getElementById("clickBtn");
const button2 = document.getElementById("clickBtn");
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    // Example: Draw a red rectangle
    ctx.fillStyle = 'red';
    ctx.fillRect(50, 50, 100, 75);

    // Example: Draw a blue circle
    ctx.beginPath();
    ctx.arc(150, 100, 40, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.stroke();

    // Example: Draw a green triangle
    ctx.beginPath();
    ctx.moveTo(200, 150);
    ctx.lineTo(250, 75);
    ctx.lineTo(300, 150);
    ctx.closePath();
    ctx.strokeStyle = 'green';
    ctx.stroke();


    function showGif() {
  const container = document.getElementById("gifContainer");
  const img = document.createElement("img");
  img.src = "funny.gif"; // make sure this file is in your project folder
  img.alt = "Funny gif";
  img.width = 300; // optional
  container.appendChild(img);
}
button.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;
});

function changeScreen() {
button2.addEventListener("click", () => {
  score++;
  scoreDisplay.textContent = score;
});

