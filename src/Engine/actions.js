import {
  CLOSE_MODAL_WINDOW,
  INIT_ENGINE,
  ON_OFF_MOUSE,
  MOUSE_MOVE,
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

function mouseMove(now, x, y) {
  return {
    type: MOUSE_MOVE,
    now,
    x,
    y,
  };
}

export {
  closeModal,
  initEngine,
  onOffMouse,
  mouseMove,
}