import Engine from '..';


const engine = new Engine(null);

describe('Engine', () => {
  describe('_handleOneLine', () => {

    it(`given ${[2, 4, 4, 0]} and should return [2, 8, 0, 0]`, () => {
      expect(engine._handleOneLine([2, 4, 4, 0], false)).toEqual([2, 8, 0, 0]);
    });

    it(`given ${[2, 2, 4, 4]} and should return [4, 8, 0, 0]`, () => {
      expect(engine._handleOneLine([2, 2, 4, 4], false)).toEqual([4, 8, 0, 0]);
    });

    it(`given ${[0, 0, 0, 0]} and should return [0, 0, 0, 0]`, () => {
      expect(engine._handleOneLine([0, 0, 0, 0], false)).toEqual([0, 0, 0, 0]);
    });

    it(`given ${[4, 2, 4, 2]} and should return [4, 2, 4, 2]`, () => {
      expect(engine._handleOneLine([4, 2, 4, 2], false)).toEqual([4, 2, 4, 2]);
    });
  });

  describe('_merge', () => {
    it(`      [${[2, 4, 4, 0,]}]                   [2, 8, 0, 0]
              [${[2, 2, 4, 4,]}]                   [4, 8, 0, 0]
        given [${[0, 0, 0, 0,]}] and should return [0, 0, 0, 0]
              [${[4, 2, 4, 2,]}]                   [4, 2, 4, 2]`, () => {
      expect(
        engine._merge([2, 4, 4, 0, 2, 2, 4, 4, 0, 0, 0, 0, 4, 2, 4, 2], false)
      ).toEqual([2, 8, 0, 0, 4, 8, 0, 0, 0, 0, 0, 0, 4, 2, 4, 2]);
    });
  });

  describe('Transposing', () => {
    it(`from right to left
              [${[0, 0, 0, 1,]}]                   [1, 0, 0, 0]
              [${[0, 0, 0, 1,]}]                   [1, 0, 0, 0]
        given [${[0, 0, 0, 1,]}] and should return [1, 0, 0, 0]
              [${[0, 0, 0, 1,]}]                   [1, 0, 0, 0]`, () => {
      expect(
        engine._toLeft([0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], 'right')
      ).toEqual([1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0]);
    });

    it(`from up to left
              [${[0, 0, 0, 1,]}]                   [1, 1, 1, 1]
              [${[0, 0, 0, 1,]}]                   [0, 0, 0, 0]
        given [${[0, 0, 0, 1,]}] and should return [0, 0, 0, 0]
              [${[0, 0, 0, 1,]}]                   [0, 0, 0, 0]`, () => {
      expect(
        engine._toLeft([0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], 'up')
      ).toEqual([1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });

    it(`from down  to left
              [${[0, 0, 0, 1,]}]                   [0, 0, 0, 0]
              [${[0, 0, 0, 1,]}]                   [0, 0, 0, 0]
        given [${[0, 0, 0, 1,]}] and should return [0, 0, 0, 0]
              [${[0, 0, 0, 1,]}]                   [1, 1, 1, 1]`, () => {
      expect(
        engine._toLeft([0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1], 'down')
      ).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1]);
    });
  });

  describe('fillRandomCell', () => {

    it(`should fill random cell`, () => {
      const zeroArray = Array(16).fill(0);
      const lengthBefore = zeroArray.filter(el => el !== 0).length;

      expect(
        engine.fillRandomCell(zeroArray).filter(el => el !== 0).length
      ).toEqual(lengthBefore + 1);
    });

    it(`should not fill random cell`, () => {
      const fullArray = Array(16).fill(1);
      const lengthBefore = fullArray.filter(el => el !== 0).length;
      expect(
        engine.fillRandomCell(fullArray).filter(el => el !== 0).length
      ).toEqual(lengthBefore);
    });
  });

  describe('_next', () => {
    it(`up
              [${[0, 0, 0, 2,]}]                   [0, 0, 0, 4]
              [${[0, 0, 0, 2,]}]                   [0, 0, 0, 8]
        given [${[0, 0, 0, 4,]}] and should return [0, 0, 0, 0]
              [${[0, 0, 0, 4,]}]                   [0, 0, 0, 0]`, () => {
      expect(
        engine._next([0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 4, 0, 0, 0, 4], 'up')
      ).toEqual([0, 0, 0, 4, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 0, 0]);
    });

    it(`down
              [${[0, 0, 0, 2,]}]                   [0, 0, 0, 0]
              [${[0, 0, 0, 2,]}]                   [0, 0, 0, 0]
        given [${[0, 0, 0, 4,]}] and should return [0, 0, 0, 4]
              [${[0, 0, 0, 4,]}]                   [0, 0, 0, 8]`, () => {
      expect(
        engine._next([0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 4, 0, 0, 0, 4], 'down')
      ).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 8]);
    });

    it(`left
              [${[0, 0, 0, 2,]}]                   [2, 0, 0, 0]
              [${[0, 0, 0, 2,]}]                   [2, 0, 0, 0]
        given [${[0, 0, 0, 4,]}] and should return [4, 0, 0, 0]
              [${[0, 0, 0, 4,]}]                   [4, 0, 0, 0]`, () => {
      expect(
        engine._next([0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 4, 0, 0, 0, 4], 'left')
      ).toEqual([2, 0, 0, 0, 2, 0, 0, 0, 4, 0, 0, 0, 4, 0, 0, 0]);
    });

    it(`right
              [${[0, 0, 0, 2,]}]                   [0, 0, 0, 2]
              [${[0, 0, 0, 2,]}]                   [0, 0, 0, 2]
        given [${[0, 0, 0, 4,]}] and should return [0, 0, 0, 4]
              [${[0, 0, 0, 4,]}]                   [0, 0, 0, 4]`, () => {
      expect(
        engine._next([0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 4, 0, 0, 0, 4], 'right')
      ).toEqual([0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0, 4, 0, 0, 0, 4]);
    });
  });

  describe('_gameOver', () => {
    it(`up
              [   2, 4,   8, 2,]
              [  32, 2,  16, 2,]
        given [   4, 8, 128, 8,] and should return false
              [1024, 4,  32, 4,]`, () => {
      expect(
        engine._gameOver([2, 4, 8, 2, 32, 2, 16, 2, 4, 8, 128, 8, 1024, 4, 32, 4], 'up')
      ).toBeFalsy();
    });

    it(`left
              [   2, 4,   8, 2,]
              [  32, 2,  16, 2,]
        given [   4, 8, 128, 8,] and should return false
              [1024, 4,  32, 4,]`, () => {
      expect(
        engine._gameOver([2, 4, 8, 2, 32, 2, 16, 2, 4, 8, 128, 8, 1024, 4, 32, 4], 'left')
      ).toBeFalsy();
    });

    it(`
              [   2, 4,   8, 2,]
              [  32, 2,  16, 4,]
        given [   4, 8, 128, 8,] and should return true
              [1024, 4,  32, 4,]`, () => {
      expect(
      engine._gameOver([2, 4, 8, 2, 32, 2, 16, 4, 4, 8, 128, 8, 1024, 4, 32, 4], 'up')
      ).toBeTruthy();
    });
  });
});