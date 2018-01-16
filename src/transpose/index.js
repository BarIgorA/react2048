export default class Transpose {
  static toLeft = (array, from) => {
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
  }

  static normalize = (array, from) => {
    switch(from) {
      case 'right':
        return Transpose.toLeft(array, from);
      case 'up':
        return Transpose.toLeft(array, 'down');
      case 'down':
        return Transpose.toLeft(array, 'up');
      default:
        return array;
    }
  }

  static merge = (array) => {
    return [].concat(
      Transpose.leftAddRightPad(array.slice(0, 4)),
      Transpose.leftAddRightPad(array.slice(4, 8)),
      Transpose.leftAddRightPad(array.slice(8, 12)),
      Transpose.leftAddRightPad(array.slice(12)),
    );
  };

  static leftAddRightPad = (array) => {
    const leftAdd = array.filter(item => item > 0).reduce(
      (init, el, index, arr, added = false) => {
        if (!added && index < arr.length && el === arr[index + 1]) {
          const next = arr[index + 1];
          arr[index + 1] = 0;
          added = true;
          return init.concat(el + next);
        }
        return el > 0 ? init.concat(el) : init;
      },
      []
    );
    return [...leftAdd, ...Array(array.length - leftAdd.length).fill(0)];
  }
}