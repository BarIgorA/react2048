import Control from '..';
import {
  swipe,
} from 'Engine/actions';

export default class Swipe extends Control {
  constructor(service) {
    super(service);
    this.touchStartPoint = null;
    this.ACCURATE_INTENTION = 10;
  }

  touchStart = (e) => {
    const changedTouches = e.changedTouches;
    this.touchStartPoint = {
      x: changedTouches[0].pageX,
      y: changedTouches[0].pageY,
    };
  };

  touchMove = (e) => {
    if (e && e.preventDefault) e.preventDefault();
  };

  touchEnd = (e) => {
    const changedTouches = e.changedTouches;
    const touchEndPoint = {
      x: changedTouches[0].pageX,
      y: changedTouches[0].pageY,
    };

    if (!this._accurateIntention(touchEndPoint.x, touchEndPoint.y)) return false;

    const direction = this._touchMoveDirection(touchEndPoint.x, touchEndPoint.y);

    this.touchStartPoint = null;

    return this.controlAction(e, swipe, direction);
  };

  init = () => {
    if (document) {
      document.addEventListener('touchstart', this.touchStart);
      document.addEventListener('touchmove', this.touchMove);
      document.addEventListener('touchend', this.touchEnd);
    }
  };

  stop = () => {
    if (document) {
      document.removeEventListener('touchstart', this.touchStart);
      document.removeEventListener('touchmove', this.touchMove);
      document.removeEventListener('touchend', this.touchEnd);
    }
  };

  _accurateIntention = (_x, _y) => {
    if (!this.touchStartPoint) return false;
    return (
      Math.abs(_x - this.touchStartPoint.x) > this.ACCURATE_INTENTION ||
      Math.abs(_y - this.touchStartPoint.y) > this.ACCURATE_INTENTION
    );
  };

  _touchMoveDirection = (_x, _y) => {
    const dx = _x - this.touchStartPoint.x;
    const dy = _y - this.touchStartPoint.y;

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
}