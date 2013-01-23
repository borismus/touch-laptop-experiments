var zoomFactor = 1;

function initialize() {
  scene = document.querySelector('#scene');
  object = document.querySelector('#object');

  // Handle mouse move and mouse wheel move from the trackpad.
  window.addEventListener('mousewheel', onmousewheel);
  window.addEventListener('mousemove', onmousemove);

  // Handle touch screen events.
  window.addEventListener('touchstart', ontouchstart);
  window.addEventListener('touchmove', ontouchmove);
  window.addEventListener('touchend', ontouchend);

  window.addEventListener('click', onclick);
}

function onmousewheel(event) {
  var dx = event.wheelDeltaX;
  var dy = event.wheelDeltaY;
  console.log('mousewheel', dx, dy);

  if (dy > 0) {
    zoomFactor = zoomFactor * 0.9;
  } else if (dy < 0) {
    zoomFactor = zoomFactor * 1.1;
  }
  zoom(zoomFactor);
}

function onmousemove(event) {
  var dx = event.webkitMovementX;
  var dy = event.webkitMovementY;
  console.log('mousemove', dx, dy);
}

function onclick(event) {
  document.body.webkitRequestPointerLock();
}

function zoom(factor) {
  scene.style.webkitTransform = 'scale(' + factor + ')';
}

function ontouchstart(e) {
  // See if target is the object. If it is, set the target.
  if (e.target.id == 'object') {
    activeObject = e.target;
    console.log('Set active object');
  }
}
function ontouchmove(e) {
}
function ontouchend(e) {
  // If the target is the current target,
  if (e.target == activeObject) {
    activeObject = null;
    console.log('Unset active object');
  }
}
