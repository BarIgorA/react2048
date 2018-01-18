import gameStatus from './statuses';

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
        const { field, progress, is2048 } = prevState;
        const newField = this._next(field, direction);

        if (
          field.toString() === newField.toString() &&
          !this._hasEmpty(newField)
        ) return { progress: gameStatus.loss };

        return {
          lastMoveEvent: {
            occurredAt: time,
            direction,
          },
          field: newField,
          ...(newField.filter((item) => item === 2048).length && !is2048) ? { is2048: true, progress: gameStatus.win } : progress,
        };
      }
    );

    this.view.setState(
      ({ field }) => ({ field: this.fillRandomCell(field) })
    );
  };

  _next = (array, direction) => this._normalize(
    this._merge(
      this._toLeft(array, direction)
    ),
    direction
  );

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

  _merge = (array) => [].concat(
    ...Array(4)
      .fill(1)
      .map(
        (_, index) => this._handleOneLine(array.slice(4 * index, 4 * (index + 1)))
      )
  );

  _shakeOutEmpty = (array) => array.filter(item => item > 0);

  _score = (el) => {
    this.score += el;
    if (this.score > this.best) this.best = this.score;
    this.view.setState({
      score: this.score,
      best: this.best,
    });
  };

  _handleOneLine = (array) => {
    const shaken = this._shakeOutEmpty(array).reduce(
      (init, el, index, arr, added = false) => {
        if (!added && index < arr.length && el === arr[index + 1]) {
          el = el + arr[index + 1];
          arr[index + 1] = 0;
          added = true;
          this._score(el);
        }
        return el > 0 ? init.concat(el) : init;
      },
      []
    );
    return [...shaken, ...Array(array.length - shaken.length).fill(0)];
  };
}