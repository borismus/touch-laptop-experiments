function initialize() {

  var pagination = document.querySelector('.pagination');
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.btn'));

  var Modes = {
    TOUCH: 1,
    MOUSE: 2
  };
  var currentMode = null;

  // Start with mouse mode by default.
  changeMode(Modes.MOUSE);

  window.addEventListener('touchstart', function() {
    // Now we're in touch mode.
    changeMode(Modes.TOUCH);
  });
  window.addEventListener('mousemove', function() {
    // Now we're in mouse mode.
    changeMode(Modes.MOUSE);
  });
  window.addEventListener('keydown', function(e) {
    if (e.keyCode == 13) { // Enter.
      changeMode(currentMode == Modes.MOUSE ? Modes.TOUCH : Modes.MOUSE);
    }
  });


  function changeMode(mode) {
    currentMode = mode;
    if (mode == Modes.TOUCH) {
      // Make buttons bigger!
      pagination.classList.remove('pagination-mini');
      buttons.forEach(function(button) {
        button.classList.remove('btn-mini');
      });
    } else if (mode == Modes.MOUSE) {
      // Make buttons smaller!
      pagination.classList.add('pagination-mini');
      buttons.forEach(function(button) {
        button.classList.add('btn-mini');
      });
    }
  }

}

var index = 0;
var root = 'http://www.placecage.com/c';
function setIndex(i) {
  index = i;
  setUrl();
}

function setRoot(url) {
  root = url;
  setUrl();
}

function setUrl() {
  document.querySelector('img#main').src = root + '/' + 800 + '/' + (600 + index*2);
}
