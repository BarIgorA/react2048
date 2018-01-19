import gameStatus from './statuses';
import {
  CLOSE_MODAL_WINDOW,
  INIT_ENGINE,
  ON_OFF_MOUSE,
  MOUSE_MOVE,
} from './constants';


export default class Engine {
  constructor(component) {
    this.score = 0;
    this.best = 0;
    this.view = component;
  }

  init = () => {
    this.score = 0;

    this.view.setState({
      score: 0,
      best: this.best,
      mouseActive: false,
      is2048: false,
      progress: gameStatus.fun,
      field: Array(16).fill(0),
      lastMoveEvent: {
        occurredAt: Date.now(),
        direction: null,
      },
    });

    Array(2).fill(1).map(
      () => this.view.setState(
        ({ field }) => ({ field: this.fillRandomCell(field) })
      )
    );
  };

  action = (time, direction) => {
    this.view.setState(
      (prevState) => {
        const { field, progress } = prevState;
        const newField = this._next(field, direction, true);

        if (this._gameOver(field, direction)) return { progress: gameStatus.loss };

        return {
          lastMoveEvent: {
            occurredAt: time,
            direction,
          },
          field: newField,
          ...(this.is2048 && !prevState.is2048) ? { is2048: true, progress: gameStatus.win } : progress,
          score: this.score,
          best: this.best,
        };
      }
    );

    this.view.setState(
      ({ field }) => ({ field: this.fillRandomCell(field) })
    );
  };

  dispatch = (action) => this._viewStateManager(action);

  _next = (array, direction, score = false) => this._normalize(
    this._merge(
      this._toLeft(array, direction),
      score
    ),
    direction
  );

  _gameOver = (array, direction) => {
    const nextFields = ['left', 'right', 'up', 'down'].reduce(
      (init, item) => {
        init[item] = this._next(array, item);
        return init;
      },
      {}
    );
    const left = nextFields.left.toString();
    const right = nextFields.right.toString();
    const up = nextFields.up.toString();
    const down = nextFields.down.toString();

    return (
      array.toString() === left &&
      left === right &&
      right === up &&
      up === down &&
      !this._hasEmpty(nextFields[direction])
    );
  }

  _twoOrFour = () => (new Date()).getTime() % 10 === 4 ? 4 : 2;

  _hasEmpty = (array) => array.filter((el) => el === 0).length;

  fillRandomCell = (array) => {
    while (this._hasEmpty(array)) {
      let choosedIndex = Math.floor(Math.random() * array.length);
      if (array[choosedIndex] === 0) {
        array[choosedIndex] = this._twoOrFour();
        break;
      }
    }

    return array;
  };

  _toLeft = (array, from) => {
    switch(from) {
      case 'right':
        return []
          .concat(
            array.slice(0, 4).reverse(),
            array.slice(4, 8).reverse(),
            array.slice(8, 12).reverse(),
            array.slice(12).reverse()
          );
      case 'up':
        return []
          .concat(
            ...[3, 2, 1, 0].map(
              (start) => [0, 4, 8, 12].map(
                (offset) => array[start + offset]
              )
            )
          );
      case 'down':
        return []
          .concat(
            ...[12, 13, 14, 15].map(
              (start) => [0, 4, 8, 12].map(
                (offset) => array[start - offset]
              )
            )
          );
      default:
        return array;
    }
  };

  _normalize = (array, from) => {
    switch(from) {
      case 'right':
        return this._toLeft(array, 'right');
      case 'up':
        return this._toLeft(array, 'down');
      case 'down':
        return this._toLeft(array, 'up');
      default:
        return array;
    }
  };

  _merge = (array, score) => [].concat(
    ...Array(4)
      .fill(1)
      .map(
        (_, index) => this._handleOneLine(array.slice(4 * index, 4 * (index + 1)), score)
      )
  );

  _shakeOutEmpty = (array) => array.filter(item => item > 0);

  _score = (el) => {
    this.score += el;
    if (this.score > this.best) this.best = this.score;
    this.is2048 = this.is2048 || el === 2048;
  };

  _handleOneLine = (array, score) => {
    const shaken = this._shakeOutEmpty(array).reduce(
      (init, el, index, arr, added = false) => {
        if (!added && index < arr.length && el === arr[index + 1]) {
          el = el + arr[index + 1];
          arr[index + 1] = 0;
          added = true;
          score && this._score(el);
        }
        return el > 0 ? init.concat(el) : init;
      },
      []
    );
    return [...shaken, ...Array(array.length - shaken.length).fill(0)];
  };

  _mouseMoveReleased = (now) => {
    const MOUSE_MOVE_THROTTLING = 135;
    return now - this.view.state.lastMoveEvent.occurredAt > MOUSE_MOVE_THROTTLING
  };

  _accurateIntention = (_x, _y) => {
    const ACCURATE_INTENTION = this.view.ACCURATE_INTENTION;
    return Math.abs(_x - this.view.x) > ACCURATE_INTENTION || Math.abs(_y - this.view.y) > ACCURATE_INTENTION
  };

  _mouseMoveDirection = (_x, _y) => {
    const dx = _x - this.view.x;
    const dy = _y - this.view.y;

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

  _viewStateManager(action) {
    switch(action.type) {
      case CLOSE_MODAL_WINDOW:
        return this.view.setState({ progress: gameStatus.fun });
      case INIT_ENGINE:
        return this.init();
      case ON_OFF_MOUSE:
        return this.view.setState(({ mouseActive }) => ({ mouseActive: !mouseActive }));
      case MOUSE_MOVE:
        {
          if (
            !(this.view.state.mouseActive && this._mouseMoveReleased(action.now) && this._accurateIntention(action.x, action.y))
          ) return null;

          const direction = this._mouseMoveDirection(action.x, action.y);

          if (direction === this.view.state.lastMoveEvent.direction) return null;

          return this.action(action.now, direction);
        }
      default:
      return null;
    }
  }
}