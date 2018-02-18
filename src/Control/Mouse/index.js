import Control from '..';
import {
  closeModal,
  initEngine,
  onOffMouse,
  mouseMove,
  revert,
} from 'Engine/actions';

export default class Mouse extends Control {
  constructor(service) {
    super(service);
    this.mode = {
      CENTER: { x: 0, y: 0 },
      ACCURATE_INTENTION: 4000,
      lastMoveOccurredAt: 0,
      lastDirection: null,
    };
  }

  closeModal = (e) => this.controlAction(e, closeModal);

  reset = (e) => this.controlAction(e, initEngine);

  revert = (e) => this.controlAction(e, revert);

  onOff = (e) => this.controlAction(e, onOffMouse);

  move = (e) => {
    const now = Date.now();
    const direction = this._mouseMoveDirection(e.clientX, e.clientY);

    if (
      !(
        this._mouseMoveReleased(now) &&
        this._accurateIntention(e.clientX, e.clientY) &&
        this.mode.lastDirection !== direction
      )
    ) return false;

    this.mode.lastMoveOccurredAt = now;
    this.mode.lastDirection = direction;

    return this.controlAction(e, mouseMove, direction);
  };

  init = (ref) => {
    if (
      !(ref && ref instanceof HTMLElement)
    ) throw new Error(`Need reference to HTMLElement instance but got ${typeof ref}`);

    const domRect = ref.getBoundingClientRect();
    this.mode = {
      CENTER: {
        x: domRect.left + domRect.width / 2,
        y: domRect.top + domRect.height / 2,
      },
      ACCURATE_INTENTION: domRect.width / 4,
      lastMoveOccurredAt: Date.now(),
      lastDirection: null,
    }
  };

  _accurateIntention = (_x, _y) => {
    return (
      Math.abs(_x - this.mode.CENTER.x) > this.mode.ACCURATE_INTENTION ||
      Math.abs(_y - this.mode.CENTER.y) > this.mode.ACCURATE_INTENTION
    );
  };

  _mouseMoveDirection = (_x, _y) => {
    const dx = _x - this.mode.CENTER.x;
    const dy = _y - this.mode.CENTER.y;

    switch(true) {
      case dx === 0 && dy > 0: return 'down';
      case dx === 0 && dy < 0: return 'up';
      case dy / dx >= 1 && dx > 0: return 'down';
      case dy / dx >= 1 && dx < 0: return 'up';
      case dy / dx <= -1 && dx < 0: return 'down';
      case dy / dx <= -1 && dx > 0: return 'up';
      case dx > 0: return 'right';
      case dx < 0: return 'left';
    }
  };

  _mouseMoveReleased = (now) => {
    const MOUSE_MOVE_THROTTLING = 135;
    return now - this.mode.lastMoveOccurredAt > MOUSE_MOVE_THROTTLING;
  }
}