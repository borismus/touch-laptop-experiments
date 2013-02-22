var zoomFactor = 1;
var panX = 0;
var panY = 0;

var scaleFactor = 1;
var tX = 100;
var tY = 100;
var rX = 0;
var rY = 0;
var angle = 0;

var activeObject = null;
// Original positions of the finger.
var fingerX = -1;
var fingerY = -1;
var mouseX = -1;
var mouseY = -1;

var ZOOM_DELTA = 0.03;

function initialize() {
  scene = document.querySelector('#scene');
  object = document.querySelector('#object');

  // Handle keyboard events.
  window.addEventListener('keydown', onkeydown);
  window.addEventListener('keyup', onkeyup);

  // Handle mouse move and mouse wheel move from the trackpad.
  window.addEventListener('mousewheel', onmousewheel);
  window.addEventListener('mousemove', onmousemove);

  // Handle touch screen events.
  document.body.addEventListener('touchstart', ontouchstart);
  document.body.addEventListener('touchmove', ontouchmove);
  document.body.addEventListener('touchend', ontouchend);

  window.addEventListener('click', onclick);

  setObjectTransform();
}

function onmousewheel(event) {
  var dx = event.wheelDeltaX;
  var dy = event.wheelDeltaY;
  console.log('mousewheel', dx, dy);

  if (activeObject) {
    scale(dy);
  } else {
    zoom(dy);
  }
}

function onmousemove(event) {
  var dx = event.webkitMovementX;
  var dy = event.webkitMovementY;
  // TODO: Get rid of this once crbug.com/174358 is fixed.
  if (Math.abs(dx) >= 10000 || Math.abs(dy) >= 10000) {
    return;
  }
  console.log('mousemove', dx, dy);

  if (activeObject) {
    rotate(dx, dy);
  } else {
    console.log(zoomFactor);
    pan(dx / zoomFactor, dy / zoomFactor);
  }
}

function onclick(event) {
  document.body.webkitRequestPointerLock();
}

function setSceneTransform() {
  var scale = 'scale(' + zoomFactor + ')';
  var translate = 'translate(' + panX + 'px, ' + panY + 'px)';
  scene.style.webkitTransform = scale + ' ' + translate;
}

function zoom(dy) {
  if (dy > 0) {
    zoomFactor = zoomFactor * (1-ZOOM_DELTA);
  } else if (dy < 0) {
    zoomFactor = zoomFactor * (1+ZOOM_DELTA);
  }
  setSceneTransform();
}

function pan(dx, dy) {
  panX += dx;
  panY += dy;
  setSceneTransform();
}

function setObjectTransform(id) {
  var scale = 'scale(' + scaleFactor + ')';
  var translate = 'translate(' + tX + 'px, ' + tY + 'px)';
  var rotate = 'rotate(' + angle + 'deg)';
  object.style.webkitTransform = [translate, rotate, scale].join(' ');
}

var timer = null;
function temporarilySetIcon(url) {
  var icon = document.querySelector('#transform');
  icon.style.display = 'block';
  icon.src = url;
  if (timer) {
    clearTimeout(timer);
  }
  timer = setTimeout(clearIcon, 300);
}
function clearIcon() {
  var icon = document.querySelector('#transform');
  icon.style.display = 'none';
}

function scale(dy) {
  if (dy > 0) {
    scaleFactor = scaleFactor * 0.9;
  } else if (dy < 0) {
    scaleFactor = scaleFactor * 1.1;
  }
  setObjectTransform();
  temporarilySetIcon('img/scale.png');
}

function rotate(dx, dy) {
  angle += (dx + dy) * 0.5;
  console.log('angle is now', angle);

  setObjectTransform();
  temporarilySetIcon('img/rotate.png');
}

function translate(dx, dy) {
  tX += dx;
  tY += dy;
  setObjectTransform();
}

function ontouchstart(e) {
  e.preventDefault();
  console.log('touchstart');
  // See if target is the object. If it is, set the target.
  if (e.target.id == 'object') {
    activeObject = e.target;
    var touch = e.targetTouches[0];
    touchX = touch.pageX;
    touchY = touch.pageY;
    console.log('Set active object');
  }
}
function ontouchmove(e) {
  // TODO: Implement dragging objects.
  e.preventDefault();
  console.log('touchmove');
  if (e.target == activeObject) {
    var touch = e.targetTouches[0];
    var dx = touch.pageX - touchX;
    var dy = touch.pageY - touchY;
    translate(dx / zoomFactor, dy / zoomFactor);
    touchX = touch.pageX;
    touchY = touch.pageY;
  }
}
function ontouchend(e) {
  e.preventDefault();
  // If the target is the current target,
  if (e.target == activeObject) {
    activeObject = null;
    console.log('Unset active object');
  }
}

var SPACEBAR = 32;
function onkeydown(e) {
  if (e.keyCode == SPACEBAR) {
    activeObject = object;
  }
}
function onkeyup(e) {
  if (e.keyCode == SPACEBAR) {
    activeObject = null;
  }
}
