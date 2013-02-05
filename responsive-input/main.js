function initialize() {

  var pagination = document.querySelector('.pagination');
  var buttons = Array.prototype.slice.call(document.querySelectorAll('.btn'));

  var Modes = {
    TOUCH: 1,
    MOUSE: 2
  };
  var currentMode = null;
  var isTouching = false;

  // Start with mouse mode by default.
  changeMode(Modes.MOUSE);

  window.addEventListener('touchstart', function(e) {
    // Now we're in touch mode.
    changeMode(Modes.TOUCH);
    console.log('touchstart');
    isTouching = true;
  });
  window.addEventListener('touchend', function(e) {
    e.preventDefault();
    console.log('touchend');
    isTouching = false;
  });
  window.addEventListener('mousemove', function() {
    // Now we're in mouse mode.
    if (!isTouching) {
      changeMode(Modes.MOUSE);
    }
    console.log('mousemove');
  });
  window.addEventListener('keydown', function(e) {
    if (e.keyCode == 13) { // Enter.
      changeMode(currentMode == Modes.MOUSE ? Modes.TOUCH : Modes.MOUSE);
    }
  });


  function changeMode(mode) {
    // If we're already in the desired mode, do nothing.
    if (currentMode == mode) {
      return;
    }
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
    console.log('Changed modes to', mode);
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
