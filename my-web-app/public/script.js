 const square = document.getElementById('square');
    const scoreDisplay = document.getElementById('score');
    let score = 0;
    var x = 0;
    let y = 0;
    // Make sure the square starts at 0px
    square.style.left = '15px';
    square.style.top = '15px';
    // On click, increase score and move square
    // WASD key movement
    document.addEventListener('keydown', function(event) {

      if (event.key === 'w') {
        x-=5;
      } else if (event.key === 's') {
        x+=5;
      }
      else
      if (event.key === 'a') {
        y-=5;
      } else if (event.key === 'd') {
        y+=5;
      }
      else{x=(Math.round(x/2));}
    });
    setInterval(function() {
        square.style.top = parseInt(square.style.top)-x + 'px';
        console.log('Top -x:', parseInt(square.style.top)-x);
        x=(Math.floor(x/2));
     }, 20);

