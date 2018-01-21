import Control from '..';
import {
  arrowPressed,
} from 'Engine/actions';

export default class Keyboard extends Control {
  constructor(service) {
    super(service);
  }

  [Symbol.for("KeyboardRegisteredListeners")] = {
    keydown: [],
    keyup: [],
    keypress: [],
  };

  arrows = (e) => {
    const direction = this._getDirection(e.keyCode);

    if (!direction) return false;

    return this.controlAction(e, arrowPressed, direction);
  };

  init = (target, eventType, callback) => {
    const keyboardEvents = Object.keys(
      this[Symbol.for("KeyboardRegisteredListeners")]
    );

    if (
      !(target instanceof EventTarget)
    ) throw new Error(`Need reference to EventTarget instance but got ${typeof target}`);

    if (target !== document && !target.tabIndex) target.tabIndex = 1;

    if (
      !(typeof eventType === 'string' &&  keyboardEvents.indexOf(eventType) !== -1)
    ) throw new Error(`Wrong keyboard eventType. Need one of 'keydown', 'keyup', 'keypress'`);

    if (
      !this[callback] ||
      typeof this[callback] !== 'function'
    ) throw new Error(`Keyboard class has not ${callback} method`);

    target.addEventListener(eventType, this[callback]);

    this[Symbol.for("KeyboardRegisteredListeners")][eventType].push([target, this[callback]]);
  };

  stopAll = () => {
    const eventTypes = Object.keys(this[Symbol.for("KeyboardRegisteredListeners")]);
    eventTypes.forEach(
      (eventType) => {
        this[Symbol.for("KeyboardRegisteredListeners")][eventType].forEach(
          (listener) => {
            listener[0].removeEventListener(eventType, listener[1]);
          }
        );
        this[Symbol.for("KeyboardRegisteredListeners")][eventType] = [];
      }
    );
  };

  _getDirection = (keyCode) => {
    switch(keyCode) {
      case 38:
        return 'up';
      case 40:
        return 'down';
      case 37:
        return 'left';
      case 39:
        return 'right';
      default:
        return null;
    }
  };
}