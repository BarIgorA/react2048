import {
  CLOSE_MODAL_WINDOW,
  INIT_ENGINE,
  ON_OFF_MOUSE,
  MOUSE_MOVE,
  ARROW_PRESSED,
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

export {
  arrowPressed,
  closeModal,
  initEngine,
  mouseMove,
  onOffMouse,
}
