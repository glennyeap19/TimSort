// dark mode button

var background = document.getElementById('body');
var head = document.getElementById('head');
var mode = document.getElementById('mode');

function makeDark(body) {
    if (background.style.backgroundColor == 'black') {
        lightMode();
    } else {
        darkMode();
    }
}

function lightMode() {

    background.style.backgroundColor = 'white';

    head.style.color = 'black';

    mode.style.color = 'black';
    mode.style.border = '2px solid black';
    mode.textContent = 'Dark Mode';

}

function darkMode() {

    background.style.backgroundColor = 'black';

    head.style.color = 'white';

    mode.style.backgroundColor = 'white';
    mode.style.border = '2px solid white';
    mode.textContent = 'Light Mode';
}
function draw() {
    background("#333333");
    for (let i = 0; i < values.length; i++) {
      switch (states[i]) {
        case colors.current:
          fill('#FF4136');
          break;
        case colors.access:
          fill('#01FF70');
          break;
        case colors.sort:
          fill('#0074D9');
          break;
        case colors.off:
          fill('#FFFFFF');
          break;
        default:
          break;
      }
      rect(i * colWidth, height - values[i] * colHeight, colWidth, values[i] * colHeight);
    }
  }
  function toggleText() {
    var text = document.getElementById("demo");
    if (text.style.display === "none") {
      text.style.display = "block";
    } else {
      text.style.display = "none";
    }
  }
