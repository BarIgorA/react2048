import {
  CLOSE_MODAL_WINDOW,
  INIT_ENGINE,
  ON_OFF_MOUSE,
  MOUSE_MOVE,
  ARROW_PRESSED,
  SWIPE,
  REVERT,
} from './constants';

function closeModal() {
  return {
    type: CLOSE_MODAL_WINDOW,
  };
}

function initEngine() {
  return {
    type: INIT_ENGINE,
  };
}

function revert() {
  return {
    type: REVERT,
  };
}

function onOffMouse() {
  return {
    type: ON_OFF_MOUSE,
  };
}

function mouseMove(direction) {
  return {
    type: MOUSE_MOVE,
    direction,
  };
}

function arrowPressed(direction) {
  return {
    type: ARROW_PRESSED,
    direction,
  };
}

function swipe(direction) {
  return {
    type: SWIPE,
    direction,
  };
}

export {
  arrowPressed,
  closeModal,
  initEngine,
  mouseMove,
  onOffMouse,
  swipe,
  revert,
}
