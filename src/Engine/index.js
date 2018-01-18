export default class Engine {
  score = 0;
  best = 0;

  next = (array, direction) => this._normalize(
    this._merge(
      this._toLeft(array, direction)
    ),
    direction
  )

  twoOrFour = () => (new Date()).getTime() % 10 === 4 ? 4 : 2;

  hasEmpty = (array) => array.filter((el) => el === 0).length;

  fillRandomCell = (array) => {
    while (this.hasEmpty(array)) {
      let choosedIndex = Math.floor(Math.random() * array.length);
      if (array[choosedIndex] === 0) {
        array[choosedIndex] = this.twoOrFour();
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
  };

  _handleOneLine = (array) => {
    const shaked = this._shakeOutEmpty(array).reduce(
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
    return [...shaked, ...Array(array.length - shaked.length).fill(0)];
  };
}